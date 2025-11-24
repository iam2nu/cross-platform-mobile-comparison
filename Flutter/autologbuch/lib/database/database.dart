import 'dart:io';
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

part 'database.g.dart';

// Tabelle 1: Fahrzeuge
class Fahrzeuge extends Table {
  IntColumn get id => integer().autoIncrement()();
  TextColumn get name => text()();
  TextColumn get marke => text().nullable()();
  TextColumn get modell => text().nullable()();
}

// Tabelle 2: Wartungseintraege
class Wartungseintraege extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get fahrzeugId => integer().references(Fahrzeuge, #id, onDelete: KeyAction.cascade)();
  DateTimeColumn get datum => dateTime()();
  IntColumn get kilometerstand => integer()();
  RealColumn get kosten => real()();
  TextColumn get beschreibung => text()();
}

// Tabelle 3: Fahrten (Trips with GPS tracking)
class Fahrten extends Table {
  IntColumn get id => integer().autoIncrement()();
  IntColumn get fahrzeugId => integer().references(Fahrzeuge, #id, onDelete: KeyAction.cascade)();
  DateTimeColumn get startZeit => dateTime()();
  DateTimeColumn get endZeit => dateTime().nullable()();
  RealColumn get startLatitude => real()();
  RealColumn get startLongitude => real()();
  RealColumn get endLatitude => real().nullable()();
  RealColumn get endLongitude => real().nullable()();
  RealColumn get distanzKm => real().withDefault(const Constant(0.0))();
  TextColumn get startAdresse => text().nullable()();
  TextColumn get endAdresse => text().nullable()();
  TextColumn get notizen => text().nullable()();
  BoolColumn get istAbgeschlossen => boolean().withDefault(const Constant(false))();
}

// DAOs
@DriftAccessor(tables: [Fahrzeuge])
class FahrzeugDao extends DatabaseAccessor<AppDatabase> with _$FahrzeugDaoMixin {
  // ignore: use_super_parameters
  FahrzeugDao(AppDatabase db) : super(db);

  Stream<List<FahrzeugeData>> watchAllFahrzeuge() => select(fahrzeuge).watch();

  Future<int> insertFahrzeug(FahrzeugeCompanion fahrzeug) =>
      into(fahrzeuge).insert(fahrzeug);

  Future<FahrzeugeData?> getFahrzeugById(int id) =>
      (select(fahrzeuge)..where((f) => f.id.equals(id))).getSingleOrNull();
}

@DriftAccessor(tables: [Wartungseintraege])
class WartungDao extends DatabaseAccessor<AppDatabase> with _$WartungDaoMixin {
  // ignore: use_super_parameters
  WartungDao(AppDatabase db) : super(db);

  Stream<List<WartungseintraegeData>> watchEintraegeForFahrzeug(int fahrzeugId) =>
      (select(wartungseintraege)
            ..where((e) => e.fahrzeugId.equals(fahrzeugId))
            ..orderBy([(e) => OrderingTerm.desc(e.datum)]))
          .watch();

  Future<int> insertEintrag(WartungseintraegeCompanion eintrag) =>
      into(wartungseintraege).insert(eintrag);

  Stream<double?> watchTotalKostenForFahrzeug(int fahrzeugId) {
    final query = selectOnly(wartungseintraege)
      ..addColumns([wartungseintraege.kosten.sum()])
      ..where(wartungseintraege.fahrzeugId.equals(fahrzeugId));

    return query.map((row) => row.read(wartungseintraege.kosten.sum())).watchSingle();
  }
}

@DriftAccessor(tables: [Fahrten, Fahrzeuge])
class FahrtDao extends DatabaseAccessor<AppDatabase> with _$FahrtDaoMixin {
  // ignore: use_super_parameters
  FahrtDao(AppDatabase db) : super(db);

  // Alle Fahrten für ein Fahrzeug
  Stream<List<FahrtenData>> watchFahrtenForFahrzeug(int fahrzeugId) =>
      (select(fahrten)
            ..where((f) => f.fahrzeugId.equals(fahrzeugId))
            ..orderBy([(f) => OrderingTerm.desc(f.startZeit)]))
          .watch();

  // Aktive (nicht abgeschlossene) Fahrt für ein Fahrzeug
  Stream<FahrtenData?> watchActiveFahrt(int fahrzeugId) =>
      (select(fahrten)
            ..where((f) => f.fahrzeugId.equals(fahrzeugId) & f.istAbgeschlossen.equals(false))
            ..limit(1))
          .watchSingleOrNull();

  // Alle Fahrten (für Übersicht)
  Stream<List<FahrtenData>> watchAllFahrten() =>
      (select(fahrten)..orderBy([(f) => OrderingTerm.desc(f.startZeit)])).watch();

  // Fahrt starten
  Future<int> startFahrt(FahrtenCompanion fahrt) => into(fahrten).insert(fahrt);

  // Fahrt beenden
  Future<int> endFahrt(int fahrtId, DateTime endZeit, double endLat, double endLng, double distanz, String? endAdresse) {
    return (update(fahrten)..where((f) => f.id.equals(fahrtId))).write(
      FahrtenCompanion(
        endZeit: Value(endZeit),
        endLatitude: Value(endLat),
        endLongitude: Value(endLng),
        distanzKm: Value(distanz),
        endAdresse: Value(endAdresse),
        istAbgeschlossen: const Value(true),
      ),
    );
  }

  // Fahrt aktualisieren (z.B. Notizen)
  Future<int> updateFahrt(int fahrtId, FahrtenCompanion updates) {
    return (update(fahrten)..where((f) => f.id.equals(fahrtId))).write(updates);
  }

  // Fahrt nach ID
  Future<FahrtenData?> getFahrtById(int id) =>
      (select(fahrten)..where((f) => f.id.equals(id))).getSingleOrNull();

  // Gesamtdistanz für Fahrzeug
  Stream<double?> watchTotalDistanzForFahrzeug(int fahrzeugId) {
    final query = selectOnly(fahrten)
      ..addColumns([fahrten.distanzKm.sum()])
      ..where(fahrten.fahrzeugId.equals(fahrzeugId) & fahrten.istAbgeschlossen.equals(true));

    return query.map((row) => row.read(fahrten.distanzKm.sum())).watchSingle();
  }
}

// Datenbank-Klasse
@DriftDatabase(tables: [Fahrzeuge, Wartungseintraege, Fahrten], daos: [FahrzeugDao, WartungDao, FahrtDao])
class AppDatabase extends _$AppDatabase {
  AppDatabase() : super(_openConnection());

  @override
  int get schemaVersion => 2;

  @override
  MigrationStrategy get migration => MigrationStrategy(
    onCreate: (Migrator m) async {
      await m.createAll();
    },
    onUpgrade: (Migrator m, int from, int to) async {
      if (from < 2) {
        await m.createTable(fahrten);
      }
    },
  );

  static LazyDatabase _openConnection() {
    return LazyDatabase(() async {
      final dbFolder = await getApplicationDocumentsDirectory();
      final file = File(p.join(dbFolder.path, 'autologbuch.sqlite'));
      return NativeDatabase(file);
    });
  }
}
