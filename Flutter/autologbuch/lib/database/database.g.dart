// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'database.dart';

// ignore_for_file: type=lint
mixin _$FahrzeugDaoMixin on DatabaseAccessor<AppDatabase> {
  $FahrzeugeTable get fahrzeuge => attachedDatabase.fahrzeuge;
}
mixin _$WartungDaoMixin on DatabaseAccessor<AppDatabase> {
  $FahrzeugeTable get fahrzeuge => attachedDatabase.fahrzeuge;
  $WartungseintraegeTable get wartungseintraege =>
      attachedDatabase.wartungseintraege;
}
mixin _$FahrtDaoMixin on DatabaseAccessor<AppDatabase> {
  $FahrzeugeTable get fahrzeuge => attachedDatabase.fahrzeuge;
  $FahrtenTable get fahrten => attachedDatabase.fahrten;
}

class $FahrzeugeTable extends Fahrzeuge
    with TableInfo<$FahrzeugeTable, FahrzeugeData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $FahrzeugeTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _nameMeta = const VerificationMeta('name');
  @override
  late final GeneratedColumn<String> name = GeneratedColumn<String>(
    'name',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _markeMeta = const VerificationMeta('marke');
  @override
  late final GeneratedColumn<String> marke = GeneratedColumn<String>(
    'marke',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _modellMeta = const VerificationMeta('modell');
  @override
  late final GeneratedColumn<String> modell = GeneratedColumn<String>(
    'modell',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  @override
  List<GeneratedColumn> get $columns => [id, name, marke, modell];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'fahrzeuge';
  @override
  VerificationContext validateIntegrity(
    Insertable<FahrzeugeData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('name')) {
      context.handle(
        _nameMeta,
        name.isAcceptableOrUnknown(data['name']!, _nameMeta),
      );
    } else if (isInserting) {
      context.missing(_nameMeta);
    }
    if (data.containsKey('marke')) {
      context.handle(
        _markeMeta,
        marke.isAcceptableOrUnknown(data['marke']!, _markeMeta),
      );
    }
    if (data.containsKey('modell')) {
      context.handle(
        _modellMeta,
        modell.isAcceptableOrUnknown(data['modell']!, _modellMeta),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  FahrzeugeData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return FahrzeugeData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      name: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}name'],
      )!,
      marke: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}marke'],
      ),
      modell: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}modell'],
      ),
    );
  }

  @override
  $FahrzeugeTable createAlias(String alias) {
    return $FahrzeugeTable(attachedDatabase, alias);
  }
}

class FahrzeugeData extends DataClass implements Insertable<FahrzeugeData> {
  final int id;
  final String name;
  final String? marke;
  final String? modell;
  const FahrzeugeData({
    required this.id,
    required this.name,
    this.marke,
    this.modell,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['name'] = Variable<String>(name);
    if (!nullToAbsent || marke != null) {
      map['marke'] = Variable<String>(marke);
    }
    if (!nullToAbsent || modell != null) {
      map['modell'] = Variable<String>(modell);
    }
    return map;
  }

  FahrzeugeCompanion toCompanion(bool nullToAbsent) {
    return FahrzeugeCompanion(
      id: Value(id),
      name: Value(name),
      marke: marke == null && nullToAbsent
          ? const Value.absent()
          : Value(marke),
      modell: modell == null && nullToAbsent
          ? const Value.absent()
          : Value(modell),
    );
  }

  factory FahrzeugeData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return FahrzeugeData(
      id: serializer.fromJson<int>(json['id']),
      name: serializer.fromJson<String>(json['name']),
      marke: serializer.fromJson<String?>(json['marke']),
      modell: serializer.fromJson<String?>(json['modell']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'name': serializer.toJson<String>(name),
      'marke': serializer.toJson<String?>(marke),
      'modell': serializer.toJson<String?>(modell),
    };
  }

  FahrzeugeData copyWith({
    int? id,
    String? name,
    Value<String?> marke = const Value.absent(),
    Value<String?> modell = const Value.absent(),
  }) => FahrzeugeData(
    id: id ?? this.id,
    name: name ?? this.name,
    marke: marke.present ? marke.value : this.marke,
    modell: modell.present ? modell.value : this.modell,
  );
  FahrzeugeData copyWithCompanion(FahrzeugeCompanion data) {
    return FahrzeugeData(
      id: data.id.present ? data.id.value : this.id,
      name: data.name.present ? data.name.value : this.name,
      marke: data.marke.present ? data.marke.value : this.marke,
      modell: data.modell.present ? data.modell.value : this.modell,
    );
  }

  @override
  String toString() {
    return (StringBuffer('FahrzeugeData(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('marke: $marke, ')
          ..write('modell: $modell')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(id, name, marke, modell);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is FahrzeugeData &&
          other.id == this.id &&
          other.name == this.name &&
          other.marke == this.marke &&
          other.modell == this.modell);
}

class FahrzeugeCompanion extends UpdateCompanion<FahrzeugeData> {
  final Value<int> id;
  final Value<String> name;
  final Value<String?> marke;
  final Value<String?> modell;
  const FahrzeugeCompanion({
    this.id = const Value.absent(),
    this.name = const Value.absent(),
    this.marke = const Value.absent(),
    this.modell = const Value.absent(),
  });
  FahrzeugeCompanion.insert({
    this.id = const Value.absent(),
    required String name,
    this.marke = const Value.absent(),
    this.modell = const Value.absent(),
  }) : name = Value(name);
  static Insertable<FahrzeugeData> custom({
    Expression<int>? id,
    Expression<String>? name,
    Expression<String>? marke,
    Expression<String>? modell,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (name != null) 'name': name,
      if (marke != null) 'marke': marke,
      if (modell != null) 'modell': modell,
    });
  }

  FahrzeugeCompanion copyWith({
    Value<int>? id,
    Value<String>? name,
    Value<String?>? marke,
    Value<String?>? modell,
  }) {
    return FahrzeugeCompanion(
      id: id ?? this.id,
      name: name ?? this.name,
      marke: marke ?? this.marke,
      modell: modell ?? this.modell,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (name.present) {
      map['name'] = Variable<String>(name.value);
    }
    if (marke.present) {
      map['marke'] = Variable<String>(marke.value);
    }
    if (modell.present) {
      map['modell'] = Variable<String>(modell.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('FahrzeugeCompanion(')
          ..write('id: $id, ')
          ..write('name: $name, ')
          ..write('marke: $marke, ')
          ..write('modell: $modell')
          ..write(')'))
        .toString();
  }
}

class $WartungseintraegeTable extends Wartungseintraege
    with TableInfo<$WartungseintraegeTable, WartungseintraegeData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $WartungseintraegeTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _fahrzeugIdMeta = const VerificationMeta(
    'fahrzeugId',
  );
  @override
  late final GeneratedColumn<int> fahrzeugId = GeneratedColumn<int>(
    'fahrzeug_id',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'REFERENCES fahrzeuge (id) ON DELETE CASCADE',
    ),
  );
  static const VerificationMeta _datumMeta = const VerificationMeta('datum');
  @override
  late final GeneratedColumn<DateTime> datum = GeneratedColumn<DateTime>(
    'datum',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _kilometerstandMeta = const VerificationMeta(
    'kilometerstand',
  );
  @override
  late final GeneratedColumn<int> kilometerstand = GeneratedColumn<int>(
    'kilometerstand',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _kostenMeta = const VerificationMeta('kosten');
  @override
  late final GeneratedColumn<double> kosten = GeneratedColumn<double>(
    'kosten',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _beschreibungMeta = const VerificationMeta(
    'beschreibung',
  );
  @override
  late final GeneratedColumn<String> beschreibung = GeneratedColumn<String>(
    'beschreibung',
    aliasedName,
    false,
    type: DriftSqlType.string,
    requiredDuringInsert: true,
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    fahrzeugId,
    datum,
    kilometerstand,
    kosten,
    beschreibung,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'wartungseintraege';
  @override
  VerificationContext validateIntegrity(
    Insertable<WartungseintraegeData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('fahrzeug_id')) {
      context.handle(
        _fahrzeugIdMeta,
        fahrzeugId.isAcceptableOrUnknown(data['fahrzeug_id']!, _fahrzeugIdMeta),
      );
    } else if (isInserting) {
      context.missing(_fahrzeugIdMeta);
    }
    if (data.containsKey('datum')) {
      context.handle(
        _datumMeta,
        datum.isAcceptableOrUnknown(data['datum']!, _datumMeta),
      );
    } else if (isInserting) {
      context.missing(_datumMeta);
    }
    if (data.containsKey('kilometerstand')) {
      context.handle(
        _kilometerstandMeta,
        kilometerstand.isAcceptableOrUnknown(
          data['kilometerstand']!,
          _kilometerstandMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_kilometerstandMeta);
    }
    if (data.containsKey('kosten')) {
      context.handle(
        _kostenMeta,
        kosten.isAcceptableOrUnknown(data['kosten']!, _kostenMeta),
      );
    } else if (isInserting) {
      context.missing(_kostenMeta);
    }
    if (data.containsKey('beschreibung')) {
      context.handle(
        _beschreibungMeta,
        beschreibung.isAcceptableOrUnknown(
          data['beschreibung']!,
          _beschreibungMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_beschreibungMeta);
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  WartungseintraegeData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return WartungseintraegeData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      fahrzeugId: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}fahrzeug_id'],
      )!,
      datum: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}datum'],
      )!,
      kilometerstand: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}kilometerstand'],
      )!,
      kosten: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}kosten'],
      )!,
      beschreibung: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}beschreibung'],
      )!,
    );
  }

  @override
  $WartungseintraegeTable createAlias(String alias) {
    return $WartungseintraegeTable(attachedDatabase, alias);
  }
}

class WartungseintraegeData extends DataClass
    implements Insertable<WartungseintraegeData> {
  final int id;
  final int fahrzeugId;
  final DateTime datum;
  final int kilometerstand;
  final double kosten;
  final String beschreibung;
  const WartungseintraegeData({
    required this.id,
    required this.fahrzeugId,
    required this.datum,
    required this.kilometerstand,
    required this.kosten,
    required this.beschreibung,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['fahrzeug_id'] = Variable<int>(fahrzeugId);
    map['datum'] = Variable<DateTime>(datum);
    map['kilometerstand'] = Variable<int>(kilometerstand);
    map['kosten'] = Variable<double>(kosten);
    map['beschreibung'] = Variable<String>(beschreibung);
    return map;
  }

  WartungseintraegeCompanion toCompanion(bool nullToAbsent) {
    return WartungseintraegeCompanion(
      id: Value(id),
      fahrzeugId: Value(fahrzeugId),
      datum: Value(datum),
      kilometerstand: Value(kilometerstand),
      kosten: Value(kosten),
      beschreibung: Value(beschreibung),
    );
  }

  factory WartungseintraegeData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return WartungseintraegeData(
      id: serializer.fromJson<int>(json['id']),
      fahrzeugId: serializer.fromJson<int>(json['fahrzeugId']),
      datum: serializer.fromJson<DateTime>(json['datum']),
      kilometerstand: serializer.fromJson<int>(json['kilometerstand']),
      kosten: serializer.fromJson<double>(json['kosten']),
      beschreibung: serializer.fromJson<String>(json['beschreibung']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'fahrzeugId': serializer.toJson<int>(fahrzeugId),
      'datum': serializer.toJson<DateTime>(datum),
      'kilometerstand': serializer.toJson<int>(kilometerstand),
      'kosten': serializer.toJson<double>(kosten),
      'beschreibung': serializer.toJson<String>(beschreibung),
    };
  }

  WartungseintraegeData copyWith({
    int? id,
    int? fahrzeugId,
    DateTime? datum,
    int? kilometerstand,
    double? kosten,
    String? beschreibung,
  }) => WartungseintraegeData(
    id: id ?? this.id,
    fahrzeugId: fahrzeugId ?? this.fahrzeugId,
    datum: datum ?? this.datum,
    kilometerstand: kilometerstand ?? this.kilometerstand,
    kosten: kosten ?? this.kosten,
    beschreibung: beschreibung ?? this.beschreibung,
  );
  WartungseintraegeData copyWithCompanion(WartungseintraegeCompanion data) {
    return WartungseintraegeData(
      id: data.id.present ? data.id.value : this.id,
      fahrzeugId: data.fahrzeugId.present
          ? data.fahrzeugId.value
          : this.fahrzeugId,
      datum: data.datum.present ? data.datum.value : this.datum,
      kilometerstand: data.kilometerstand.present
          ? data.kilometerstand.value
          : this.kilometerstand,
      kosten: data.kosten.present ? data.kosten.value : this.kosten,
      beschreibung: data.beschreibung.present
          ? data.beschreibung.value
          : this.beschreibung,
    );
  }

  @override
  String toString() {
    return (StringBuffer('WartungseintraegeData(')
          ..write('id: $id, ')
          ..write('fahrzeugId: $fahrzeugId, ')
          ..write('datum: $datum, ')
          ..write('kilometerstand: $kilometerstand, ')
          ..write('kosten: $kosten, ')
          ..write('beschreibung: $beschreibung')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode =>
      Object.hash(id, fahrzeugId, datum, kilometerstand, kosten, beschreibung);
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is WartungseintraegeData &&
          other.id == this.id &&
          other.fahrzeugId == this.fahrzeugId &&
          other.datum == this.datum &&
          other.kilometerstand == this.kilometerstand &&
          other.kosten == this.kosten &&
          other.beschreibung == this.beschreibung);
}

class WartungseintraegeCompanion
    extends UpdateCompanion<WartungseintraegeData> {
  final Value<int> id;
  final Value<int> fahrzeugId;
  final Value<DateTime> datum;
  final Value<int> kilometerstand;
  final Value<double> kosten;
  final Value<String> beschreibung;
  const WartungseintraegeCompanion({
    this.id = const Value.absent(),
    this.fahrzeugId = const Value.absent(),
    this.datum = const Value.absent(),
    this.kilometerstand = const Value.absent(),
    this.kosten = const Value.absent(),
    this.beschreibung = const Value.absent(),
  });
  WartungseintraegeCompanion.insert({
    this.id = const Value.absent(),
    required int fahrzeugId,
    required DateTime datum,
    required int kilometerstand,
    required double kosten,
    required String beschreibung,
  }) : fahrzeugId = Value(fahrzeugId),
       datum = Value(datum),
       kilometerstand = Value(kilometerstand),
       kosten = Value(kosten),
       beschreibung = Value(beschreibung);
  static Insertable<WartungseintraegeData> custom({
    Expression<int>? id,
    Expression<int>? fahrzeugId,
    Expression<DateTime>? datum,
    Expression<int>? kilometerstand,
    Expression<double>? kosten,
    Expression<String>? beschreibung,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (fahrzeugId != null) 'fahrzeug_id': fahrzeugId,
      if (datum != null) 'datum': datum,
      if (kilometerstand != null) 'kilometerstand': kilometerstand,
      if (kosten != null) 'kosten': kosten,
      if (beschreibung != null) 'beschreibung': beschreibung,
    });
  }

  WartungseintraegeCompanion copyWith({
    Value<int>? id,
    Value<int>? fahrzeugId,
    Value<DateTime>? datum,
    Value<int>? kilometerstand,
    Value<double>? kosten,
    Value<String>? beschreibung,
  }) {
    return WartungseintraegeCompanion(
      id: id ?? this.id,
      fahrzeugId: fahrzeugId ?? this.fahrzeugId,
      datum: datum ?? this.datum,
      kilometerstand: kilometerstand ?? this.kilometerstand,
      kosten: kosten ?? this.kosten,
      beschreibung: beschreibung ?? this.beschreibung,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (fahrzeugId.present) {
      map['fahrzeug_id'] = Variable<int>(fahrzeugId.value);
    }
    if (datum.present) {
      map['datum'] = Variable<DateTime>(datum.value);
    }
    if (kilometerstand.present) {
      map['kilometerstand'] = Variable<int>(kilometerstand.value);
    }
    if (kosten.present) {
      map['kosten'] = Variable<double>(kosten.value);
    }
    if (beschreibung.present) {
      map['beschreibung'] = Variable<String>(beschreibung.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('WartungseintraegeCompanion(')
          ..write('id: $id, ')
          ..write('fahrzeugId: $fahrzeugId, ')
          ..write('datum: $datum, ')
          ..write('kilometerstand: $kilometerstand, ')
          ..write('kosten: $kosten, ')
          ..write('beschreibung: $beschreibung')
          ..write(')'))
        .toString();
  }
}

class $FahrtenTable extends Fahrten with TableInfo<$FahrtenTable, FahrtenData> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $FahrtenTable(this.attachedDatabase, [this._alias]);
  static const VerificationMeta _idMeta = const VerificationMeta('id');
  @override
  late final GeneratedColumn<int> id = GeneratedColumn<int>(
    'id',
    aliasedName,
    false,
    hasAutoIncrement: true,
    type: DriftSqlType.int,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'PRIMARY KEY AUTOINCREMENT',
    ),
  );
  static const VerificationMeta _fahrzeugIdMeta = const VerificationMeta(
    'fahrzeugId',
  );
  @override
  late final GeneratedColumn<int> fahrzeugId = GeneratedColumn<int>(
    'fahrzeug_id',
    aliasedName,
    false,
    type: DriftSqlType.int,
    requiredDuringInsert: true,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'REFERENCES fahrzeuge (id) ON DELETE CASCADE',
    ),
  );
  static const VerificationMeta _startZeitMeta = const VerificationMeta(
    'startZeit',
  );
  @override
  late final GeneratedColumn<DateTime> startZeit = GeneratedColumn<DateTime>(
    'start_zeit',
    aliasedName,
    false,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _endZeitMeta = const VerificationMeta(
    'endZeit',
  );
  @override
  late final GeneratedColumn<DateTime> endZeit = GeneratedColumn<DateTime>(
    'end_zeit',
    aliasedName,
    true,
    type: DriftSqlType.dateTime,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _startLatitudeMeta = const VerificationMeta(
    'startLatitude',
  );
  @override
  late final GeneratedColumn<double> startLatitude = GeneratedColumn<double>(
    'start_latitude',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _startLongitudeMeta = const VerificationMeta(
    'startLongitude',
  );
  @override
  late final GeneratedColumn<double> startLongitude = GeneratedColumn<double>(
    'start_longitude',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: true,
  );
  static const VerificationMeta _endLatitudeMeta = const VerificationMeta(
    'endLatitude',
  );
  @override
  late final GeneratedColumn<double> endLatitude = GeneratedColumn<double>(
    'end_latitude',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _endLongitudeMeta = const VerificationMeta(
    'endLongitude',
  );
  @override
  late final GeneratedColumn<double> endLongitude = GeneratedColumn<double>(
    'end_longitude',
    aliasedName,
    true,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _distanzKmMeta = const VerificationMeta(
    'distanzKm',
  );
  @override
  late final GeneratedColumn<double> distanzKm = GeneratedColumn<double>(
    'distanz_km',
    aliasedName,
    false,
    type: DriftSqlType.double,
    requiredDuringInsert: false,
    defaultValue: const Constant(0.0),
  );
  static const VerificationMeta _startAdresseMeta = const VerificationMeta(
    'startAdresse',
  );
  @override
  late final GeneratedColumn<String> startAdresse = GeneratedColumn<String>(
    'start_adresse',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _endAdresseMeta = const VerificationMeta(
    'endAdresse',
  );
  @override
  late final GeneratedColumn<String> endAdresse = GeneratedColumn<String>(
    'end_adresse',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _notizenMeta = const VerificationMeta(
    'notizen',
  );
  @override
  late final GeneratedColumn<String> notizen = GeneratedColumn<String>(
    'notizen',
    aliasedName,
    true,
    type: DriftSqlType.string,
    requiredDuringInsert: false,
  );
  static const VerificationMeta _istAbgeschlossenMeta = const VerificationMeta(
    'istAbgeschlossen',
  );
  @override
  late final GeneratedColumn<bool> istAbgeschlossen = GeneratedColumn<bool>(
    'ist_abgeschlossen',
    aliasedName,
    false,
    type: DriftSqlType.bool,
    requiredDuringInsert: false,
    defaultConstraints: GeneratedColumn.constraintIsAlways(
      'CHECK ("ist_abgeschlossen" IN (0, 1))',
    ),
    defaultValue: const Constant(false),
  );
  @override
  List<GeneratedColumn> get $columns => [
    id,
    fahrzeugId,
    startZeit,
    endZeit,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    distanzKm,
    startAdresse,
    endAdresse,
    notizen,
    istAbgeschlossen,
  ];
  @override
  String get aliasedName => _alias ?? actualTableName;
  @override
  String get actualTableName => $name;
  static const String $name = 'fahrten';
  @override
  VerificationContext validateIntegrity(
    Insertable<FahrtenData> instance, {
    bool isInserting = false,
  }) {
    final context = VerificationContext();
    final data = instance.toColumns(true);
    if (data.containsKey('id')) {
      context.handle(_idMeta, id.isAcceptableOrUnknown(data['id']!, _idMeta));
    }
    if (data.containsKey('fahrzeug_id')) {
      context.handle(
        _fahrzeugIdMeta,
        fahrzeugId.isAcceptableOrUnknown(data['fahrzeug_id']!, _fahrzeugIdMeta),
      );
    } else if (isInserting) {
      context.missing(_fahrzeugIdMeta);
    }
    if (data.containsKey('start_zeit')) {
      context.handle(
        _startZeitMeta,
        startZeit.isAcceptableOrUnknown(data['start_zeit']!, _startZeitMeta),
      );
    } else if (isInserting) {
      context.missing(_startZeitMeta);
    }
    if (data.containsKey('end_zeit')) {
      context.handle(
        _endZeitMeta,
        endZeit.isAcceptableOrUnknown(data['end_zeit']!, _endZeitMeta),
      );
    }
    if (data.containsKey('start_latitude')) {
      context.handle(
        _startLatitudeMeta,
        startLatitude.isAcceptableOrUnknown(
          data['start_latitude']!,
          _startLatitudeMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_startLatitudeMeta);
    }
    if (data.containsKey('start_longitude')) {
      context.handle(
        _startLongitudeMeta,
        startLongitude.isAcceptableOrUnknown(
          data['start_longitude']!,
          _startLongitudeMeta,
        ),
      );
    } else if (isInserting) {
      context.missing(_startLongitudeMeta);
    }
    if (data.containsKey('end_latitude')) {
      context.handle(
        _endLatitudeMeta,
        endLatitude.isAcceptableOrUnknown(
          data['end_latitude']!,
          _endLatitudeMeta,
        ),
      );
    }
    if (data.containsKey('end_longitude')) {
      context.handle(
        _endLongitudeMeta,
        endLongitude.isAcceptableOrUnknown(
          data['end_longitude']!,
          _endLongitudeMeta,
        ),
      );
    }
    if (data.containsKey('distanz_km')) {
      context.handle(
        _distanzKmMeta,
        distanzKm.isAcceptableOrUnknown(data['distanz_km']!, _distanzKmMeta),
      );
    }
    if (data.containsKey('start_adresse')) {
      context.handle(
        _startAdresseMeta,
        startAdresse.isAcceptableOrUnknown(
          data['start_adresse']!,
          _startAdresseMeta,
        ),
      );
    }
    if (data.containsKey('end_adresse')) {
      context.handle(
        _endAdresseMeta,
        endAdresse.isAcceptableOrUnknown(data['end_adresse']!, _endAdresseMeta),
      );
    }
    if (data.containsKey('notizen')) {
      context.handle(
        _notizenMeta,
        notizen.isAcceptableOrUnknown(data['notizen']!, _notizenMeta),
      );
    }
    if (data.containsKey('ist_abgeschlossen')) {
      context.handle(
        _istAbgeschlossenMeta,
        istAbgeschlossen.isAcceptableOrUnknown(
          data['ist_abgeschlossen']!,
          _istAbgeschlossenMeta,
        ),
      );
    }
    return context;
  }

  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  FahrtenData map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return FahrtenData(
      id: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}id'],
      )!,
      fahrzeugId: attachedDatabase.typeMapping.read(
        DriftSqlType.int,
        data['${effectivePrefix}fahrzeug_id'],
      )!,
      startZeit: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}start_zeit'],
      )!,
      endZeit: attachedDatabase.typeMapping.read(
        DriftSqlType.dateTime,
        data['${effectivePrefix}end_zeit'],
      ),
      startLatitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}start_latitude'],
      )!,
      startLongitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}start_longitude'],
      )!,
      endLatitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}end_latitude'],
      ),
      endLongitude: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}end_longitude'],
      ),
      distanzKm: attachedDatabase.typeMapping.read(
        DriftSqlType.double,
        data['${effectivePrefix}distanz_km'],
      )!,
      startAdresse: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}start_adresse'],
      ),
      endAdresse: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}end_adresse'],
      ),
      notizen: attachedDatabase.typeMapping.read(
        DriftSqlType.string,
        data['${effectivePrefix}notizen'],
      ),
      istAbgeschlossen: attachedDatabase.typeMapping.read(
        DriftSqlType.bool,
        data['${effectivePrefix}ist_abgeschlossen'],
      )!,
    );
  }

  @override
  $FahrtenTable createAlias(String alias) {
    return $FahrtenTable(attachedDatabase, alias);
  }
}

class FahrtenData extends DataClass implements Insertable<FahrtenData> {
  final int id;
  final int fahrzeugId;
  final DateTime startZeit;
  final DateTime? endZeit;
  final double startLatitude;
  final double startLongitude;
  final double? endLatitude;
  final double? endLongitude;
  final double distanzKm;
  final String? startAdresse;
  final String? endAdresse;
  final String? notizen;
  final bool istAbgeschlossen;
  const FahrtenData({
    required this.id,
    required this.fahrzeugId,
    required this.startZeit,
    this.endZeit,
    required this.startLatitude,
    required this.startLongitude,
    this.endLatitude,
    this.endLongitude,
    required this.distanzKm,
    this.startAdresse,
    this.endAdresse,
    this.notizen,
    required this.istAbgeschlossen,
  });
  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    map['id'] = Variable<int>(id);
    map['fahrzeug_id'] = Variable<int>(fahrzeugId);
    map['start_zeit'] = Variable<DateTime>(startZeit);
    if (!nullToAbsent || endZeit != null) {
      map['end_zeit'] = Variable<DateTime>(endZeit);
    }
    map['start_latitude'] = Variable<double>(startLatitude);
    map['start_longitude'] = Variable<double>(startLongitude);
    if (!nullToAbsent || endLatitude != null) {
      map['end_latitude'] = Variable<double>(endLatitude);
    }
    if (!nullToAbsent || endLongitude != null) {
      map['end_longitude'] = Variable<double>(endLongitude);
    }
    map['distanz_km'] = Variable<double>(distanzKm);
    if (!nullToAbsent || startAdresse != null) {
      map['start_adresse'] = Variable<String>(startAdresse);
    }
    if (!nullToAbsent || endAdresse != null) {
      map['end_adresse'] = Variable<String>(endAdresse);
    }
    if (!nullToAbsent || notizen != null) {
      map['notizen'] = Variable<String>(notizen);
    }
    map['ist_abgeschlossen'] = Variable<bool>(istAbgeschlossen);
    return map;
  }

  FahrtenCompanion toCompanion(bool nullToAbsent) {
    return FahrtenCompanion(
      id: Value(id),
      fahrzeugId: Value(fahrzeugId),
      startZeit: Value(startZeit),
      endZeit: endZeit == null && nullToAbsent
          ? const Value.absent()
          : Value(endZeit),
      startLatitude: Value(startLatitude),
      startLongitude: Value(startLongitude),
      endLatitude: endLatitude == null && nullToAbsent
          ? const Value.absent()
          : Value(endLatitude),
      endLongitude: endLongitude == null && nullToAbsent
          ? const Value.absent()
          : Value(endLongitude),
      distanzKm: Value(distanzKm),
      startAdresse: startAdresse == null && nullToAbsent
          ? const Value.absent()
          : Value(startAdresse),
      endAdresse: endAdresse == null && nullToAbsent
          ? const Value.absent()
          : Value(endAdresse),
      notizen: notizen == null && nullToAbsent
          ? const Value.absent()
          : Value(notizen),
      istAbgeschlossen: Value(istAbgeschlossen),
    );
  }

  factory FahrtenData.fromJson(
    Map<String, dynamic> json, {
    ValueSerializer? serializer,
  }) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return FahrtenData(
      id: serializer.fromJson<int>(json['id']),
      fahrzeugId: serializer.fromJson<int>(json['fahrzeugId']),
      startZeit: serializer.fromJson<DateTime>(json['startZeit']),
      endZeit: serializer.fromJson<DateTime?>(json['endZeit']),
      startLatitude: serializer.fromJson<double>(json['startLatitude']),
      startLongitude: serializer.fromJson<double>(json['startLongitude']),
      endLatitude: serializer.fromJson<double?>(json['endLatitude']),
      endLongitude: serializer.fromJson<double?>(json['endLongitude']),
      distanzKm: serializer.fromJson<double>(json['distanzKm']),
      startAdresse: serializer.fromJson<String?>(json['startAdresse']),
      endAdresse: serializer.fromJson<String?>(json['endAdresse']),
      notizen: serializer.fromJson<String?>(json['notizen']),
      istAbgeschlossen: serializer.fromJson<bool>(json['istAbgeschlossen']),
    );
  }
  @override
  Map<String, dynamic> toJson({ValueSerializer? serializer}) {
    serializer ??= driftRuntimeOptions.defaultSerializer;
    return <String, dynamic>{
      'id': serializer.toJson<int>(id),
      'fahrzeugId': serializer.toJson<int>(fahrzeugId),
      'startZeit': serializer.toJson<DateTime>(startZeit),
      'endZeit': serializer.toJson<DateTime?>(endZeit),
      'startLatitude': serializer.toJson<double>(startLatitude),
      'startLongitude': serializer.toJson<double>(startLongitude),
      'endLatitude': serializer.toJson<double?>(endLatitude),
      'endLongitude': serializer.toJson<double?>(endLongitude),
      'distanzKm': serializer.toJson<double>(distanzKm),
      'startAdresse': serializer.toJson<String?>(startAdresse),
      'endAdresse': serializer.toJson<String?>(endAdresse),
      'notizen': serializer.toJson<String?>(notizen),
      'istAbgeschlossen': serializer.toJson<bool>(istAbgeschlossen),
    };
  }

  FahrtenData copyWith({
    int? id,
    int? fahrzeugId,
    DateTime? startZeit,
    Value<DateTime?> endZeit = const Value.absent(),
    double? startLatitude,
    double? startLongitude,
    Value<double?> endLatitude = const Value.absent(),
    Value<double?> endLongitude = const Value.absent(),
    double? distanzKm,
    Value<String?> startAdresse = const Value.absent(),
    Value<String?> endAdresse = const Value.absent(),
    Value<String?> notizen = const Value.absent(),
    bool? istAbgeschlossen,
  }) => FahrtenData(
    id: id ?? this.id,
    fahrzeugId: fahrzeugId ?? this.fahrzeugId,
    startZeit: startZeit ?? this.startZeit,
    endZeit: endZeit.present ? endZeit.value : this.endZeit,
    startLatitude: startLatitude ?? this.startLatitude,
    startLongitude: startLongitude ?? this.startLongitude,
    endLatitude: endLatitude.present ? endLatitude.value : this.endLatitude,
    endLongitude: endLongitude.present ? endLongitude.value : this.endLongitude,
    distanzKm: distanzKm ?? this.distanzKm,
    startAdresse: startAdresse.present ? startAdresse.value : this.startAdresse,
    endAdresse: endAdresse.present ? endAdresse.value : this.endAdresse,
    notizen: notizen.present ? notizen.value : this.notizen,
    istAbgeschlossen: istAbgeschlossen ?? this.istAbgeschlossen,
  );
  FahrtenData copyWithCompanion(FahrtenCompanion data) {
    return FahrtenData(
      id: data.id.present ? data.id.value : this.id,
      fahrzeugId: data.fahrzeugId.present
          ? data.fahrzeugId.value
          : this.fahrzeugId,
      startZeit: data.startZeit.present ? data.startZeit.value : this.startZeit,
      endZeit: data.endZeit.present ? data.endZeit.value : this.endZeit,
      startLatitude: data.startLatitude.present
          ? data.startLatitude.value
          : this.startLatitude,
      startLongitude: data.startLongitude.present
          ? data.startLongitude.value
          : this.startLongitude,
      endLatitude: data.endLatitude.present
          ? data.endLatitude.value
          : this.endLatitude,
      endLongitude: data.endLongitude.present
          ? data.endLongitude.value
          : this.endLongitude,
      distanzKm: data.distanzKm.present ? data.distanzKm.value : this.distanzKm,
      startAdresse: data.startAdresse.present
          ? data.startAdresse.value
          : this.startAdresse,
      endAdresse: data.endAdresse.present
          ? data.endAdresse.value
          : this.endAdresse,
      notizen: data.notizen.present ? data.notizen.value : this.notizen,
      istAbgeschlossen: data.istAbgeschlossen.present
          ? data.istAbgeschlossen.value
          : this.istAbgeschlossen,
    );
  }

  @override
  String toString() {
    return (StringBuffer('FahrtenData(')
          ..write('id: $id, ')
          ..write('fahrzeugId: $fahrzeugId, ')
          ..write('startZeit: $startZeit, ')
          ..write('endZeit: $endZeit, ')
          ..write('startLatitude: $startLatitude, ')
          ..write('startLongitude: $startLongitude, ')
          ..write('endLatitude: $endLatitude, ')
          ..write('endLongitude: $endLongitude, ')
          ..write('distanzKm: $distanzKm, ')
          ..write('startAdresse: $startAdresse, ')
          ..write('endAdresse: $endAdresse, ')
          ..write('notizen: $notizen, ')
          ..write('istAbgeschlossen: $istAbgeschlossen')
          ..write(')'))
        .toString();
  }

  @override
  int get hashCode => Object.hash(
    id,
    fahrzeugId,
    startZeit,
    endZeit,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
    distanzKm,
    startAdresse,
    endAdresse,
    notizen,
    istAbgeschlossen,
  );
  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      (other is FahrtenData &&
          other.id == this.id &&
          other.fahrzeugId == this.fahrzeugId &&
          other.startZeit == this.startZeit &&
          other.endZeit == this.endZeit &&
          other.startLatitude == this.startLatitude &&
          other.startLongitude == this.startLongitude &&
          other.endLatitude == this.endLatitude &&
          other.endLongitude == this.endLongitude &&
          other.distanzKm == this.distanzKm &&
          other.startAdresse == this.startAdresse &&
          other.endAdresse == this.endAdresse &&
          other.notizen == this.notizen &&
          other.istAbgeschlossen == this.istAbgeschlossen);
}

class FahrtenCompanion extends UpdateCompanion<FahrtenData> {
  final Value<int> id;
  final Value<int> fahrzeugId;
  final Value<DateTime> startZeit;
  final Value<DateTime?> endZeit;
  final Value<double> startLatitude;
  final Value<double> startLongitude;
  final Value<double?> endLatitude;
  final Value<double?> endLongitude;
  final Value<double> distanzKm;
  final Value<String?> startAdresse;
  final Value<String?> endAdresse;
  final Value<String?> notizen;
  final Value<bool> istAbgeschlossen;
  const FahrtenCompanion({
    this.id = const Value.absent(),
    this.fahrzeugId = const Value.absent(),
    this.startZeit = const Value.absent(),
    this.endZeit = const Value.absent(),
    this.startLatitude = const Value.absent(),
    this.startLongitude = const Value.absent(),
    this.endLatitude = const Value.absent(),
    this.endLongitude = const Value.absent(),
    this.distanzKm = const Value.absent(),
    this.startAdresse = const Value.absent(),
    this.endAdresse = const Value.absent(),
    this.notizen = const Value.absent(),
    this.istAbgeschlossen = const Value.absent(),
  });
  FahrtenCompanion.insert({
    this.id = const Value.absent(),
    required int fahrzeugId,
    required DateTime startZeit,
    this.endZeit = const Value.absent(),
    required double startLatitude,
    required double startLongitude,
    this.endLatitude = const Value.absent(),
    this.endLongitude = const Value.absent(),
    this.distanzKm = const Value.absent(),
    this.startAdresse = const Value.absent(),
    this.endAdresse = const Value.absent(),
    this.notizen = const Value.absent(),
    this.istAbgeschlossen = const Value.absent(),
  }) : fahrzeugId = Value(fahrzeugId),
       startZeit = Value(startZeit),
       startLatitude = Value(startLatitude),
       startLongitude = Value(startLongitude);
  static Insertable<FahrtenData> custom({
    Expression<int>? id,
    Expression<int>? fahrzeugId,
    Expression<DateTime>? startZeit,
    Expression<DateTime>? endZeit,
    Expression<double>? startLatitude,
    Expression<double>? startLongitude,
    Expression<double>? endLatitude,
    Expression<double>? endLongitude,
    Expression<double>? distanzKm,
    Expression<String>? startAdresse,
    Expression<String>? endAdresse,
    Expression<String>? notizen,
    Expression<bool>? istAbgeschlossen,
  }) {
    return RawValuesInsertable({
      if (id != null) 'id': id,
      if (fahrzeugId != null) 'fahrzeug_id': fahrzeugId,
      if (startZeit != null) 'start_zeit': startZeit,
      if (endZeit != null) 'end_zeit': endZeit,
      if (startLatitude != null) 'start_latitude': startLatitude,
      if (startLongitude != null) 'start_longitude': startLongitude,
      if (endLatitude != null) 'end_latitude': endLatitude,
      if (endLongitude != null) 'end_longitude': endLongitude,
      if (distanzKm != null) 'distanz_km': distanzKm,
      if (startAdresse != null) 'start_adresse': startAdresse,
      if (endAdresse != null) 'end_adresse': endAdresse,
      if (notizen != null) 'notizen': notizen,
      if (istAbgeschlossen != null) 'ist_abgeschlossen': istAbgeschlossen,
    });
  }

  FahrtenCompanion copyWith({
    Value<int>? id,
    Value<int>? fahrzeugId,
    Value<DateTime>? startZeit,
    Value<DateTime?>? endZeit,
    Value<double>? startLatitude,
    Value<double>? startLongitude,
    Value<double?>? endLatitude,
    Value<double?>? endLongitude,
    Value<double>? distanzKm,
    Value<String?>? startAdresse,
    Value<String?>? endAdresse,
    Value<String?>? notizen,
    Value<bool>? istAbgeschlossen,
  }) {
    return FahrtenCompanion(
      id: id ?? this.id,
      fahrzeugId: fahrzeugId ?? this.fahrzeugId,
      startZeit: startZeit ?? this.startZeit,
      endZeit: endZeit ?? this.endZeit,
      startLatitude: startLatitude ?? this.startLatitude,
      startLongitude: startLongitude ?? this.startLongitude,
      endLatitude: endLatitude ?? this.endLatitude,
      endLongitude: endLongitude ?? this.endLongitude,
      distanzKm: distanzKm ?? this.distanzKm,
      startAdresse: startAdresse ?? this.startAdresse,
      endAdresse: endAdresse ?? this.endAdresse,
      notizen: notizen ?? this.notizen,
      istAbgeschlossen: istAbgeschlossen ?? this.istAbgeschlossen,
    );
  }

  @override
  Map<String, Expression> toColumns(bool nullToAbsent) {
    final map = <String, Expression>{};
    if (id.present) {
      map['id'] = Variable<int>(id.value);
    }
    if (fahrzeugId.present) {
      map['fahrzeug_id'] = Variable<int>(fahrzeugId.value);
    }
    if (startZeit.present) {
      map['start_zeit'] = Variable<DateTime>(startZeit.value);
    }
    if (endZeit.present) {
      map['end_zeit'] = Variable<DateTime>(endZeit.value);
    }
    if (startLatitude.present) {
      map['start_latitude'] = Variable<double>(startLatitude.value);
    }
    if (startLongitude.present) {
      map['start_longitude'] = Variable<double>(startLongitude.value);
    }
    if (endLatitude.present) {
      map['end_latitude'] = Variable<double>(endLatitude.value);
    }
    if (endLongitude.present) {
      map['end_longitude'] = Variable<double>(endLongitude.value);
    }
    if (distanzKm.present) {
      map['distanz_km'] = Variable<double>(distanzKm.value);
    }
    if (startAdresse.present) {
      map['start_adresse'] = Variable<String>(startAdresse.value);
    }
    if (endAdresse.present) {
      map['end_adresse'] = Variable<String>(endAdresse.value);
    }
    if (notizen.present) {
      map['notizen'] = Variable<String>(notizen.value);
    }
    if (istAbgeschlossen.present) {
      map['ist_abgeschlossen'] = Variable<bool>(istAbgeschlossen.value);
    }
    return map;
  }

  @override
  String toString() {
    return (StringBuffer('FahrtenCompanion(')
          ..write('id: $id, ')
          ..write('fahrzeugId: $fahrzeugId, ')
          ..write('startZeit: $startZeit, ')
          ..write('endZeit: $endZeit, ')
          ..write('startLatitude: $startLatitude, ')
          ..write('startLongitude: $startLongitude, ')
          ..write('endLatitude: $endLatitude, ')
          ..write('endLongitude: $endLongitude, ')
          ..write('distanzKm: $distanzKm, ')
          ..write('startAdresse: $startAdresse, ')
          ..write('endAdresse: $endAdresse, ')
          ..write('notizen: $notizen, ')
          ..write('istAbgeschlossen: $istAbgeschlossen')
          ..write(')'))
        .toString();
  }
}

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  $AppDatabaseManager get managers => $AppDatabaseManager(this);
  late final $FahrzeugeTable fahrzeuge = $FahrzeugeTable(this);
  late final $WartungseintraegeTable wartungseintraege =
      $WartungseintraegeTable(this);
  late final $FahrtenTable fahrten = $FahrtenTable(this);
  late final FahrzeugDao fahrzeugDao = FahrzeugDao(this as AppDatabase);
  late final WartungDao wartungDao = WartungDao(this as AppDatabase);
  late final FahrtDao fahrtDao = FahrtDao(this as AppDatabase);
  @override
  Iterable<TableInfo<Table, Object?>> get allTables =>
      allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseSchemaEntity> get allSchemaEntities => [
    fahrzeuge,
    wartungseintraege,
    fahrten,
  ];
  @override
  StreamQueryUpdateRules get streamUpdateRules => const StreamQueryUpdateRules([
    WritePropagation(
      on: TableUpdateQuery.onTableName(
        'fahrzeuge',
        limitUpdateKind: UpdateKind.delete,
      ),
      result: [TableUpdate('wartungseintraege', kind: UpdateKind.delete)],
    ),
    WritePropagation(
      on: TableUpdateQuery.onTableName(
        'fahrzeuge',
        limitUpdateKind: UpdateKind.delete,
      ),
      result: [TableUpdate('fahrten', kind: UpdateKind.delete)],
    ),
  ]);
}

typedef $$FahrzeugeTableCreateCompanionBuilder =
    FahrzeugeCompanion Function({
      Value<int> id,
      required String name,
      Value<String?> marke,
      Value<String?> modell,
    });
typedef $$FahrzeugeTableUpdateCompanionBuilder =
    FahrzeugeCompanion Function({
      Value<int> id,
      Value<String> name,
      Value<String?> marke,
      Value<String?> modell,
    });

final class $$FahrzeugeTableReferences
    extends BaseReferences<_$AppDatabase, $FahrzeugeTable, FahrzeugeData> {
  $$FahrzeugeTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static MultiTypedResultKey<
    $WartungseintraegeTable,
    List<WartungseintraegeData>
  >
  _wartungseintraegeRefsTable(_$AppDatabase db) =>
      MultiTypedResultKey.fromTable(
        db.wartungseintraege,
        aliasName: $_aliasNameGenerator(
          db.fahrzeuge.id,
          db.wartungseintraege.fahrzeugId,
        ),
      );

  $$WartungseintraegeTableProcessedTableManager get wartungseintraegeRefs {
    final manager = $$WartungseintraegeTableTableManager(
      $_db,
      $_db.wartungseintraege,
    ).filter((f) => f.fahrzeugId.id.sqlEquals($_itemColumn<int>('id')!));

    final cache = $_typedResult.readTableOrNull(
      _wartungseintraegeRefsTable($_db),
    );
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: cache),
    );
  }

  static MultiTypedResultKey<$FahrtenTable, List<FahrtenData>>
  _fahrtenRefsTable(_$AppDatabase db) => MultiTypedResultKey.fromTable(
    db.fahrten,
    aliasName: $_aliasNameGenerator(db.fahrzeuge.id, db.fahrten.fahrzeugId),
  );

  $$FahrtenTableProcessedTableManager get fahrtenRefs {
    final manager = $$FahrtenTableTableManager(
      $_db,
      $_db.fahrten,
    ).filter((f) => f.fahrzeugId.id.sqlEquals($_itemColumn<int>('id')!));

    final cache = $_typedResult.readTableOrNull(_fahrtenRefsTable($_db));
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: cache),
    );
  }
}

class $$FahrzeugeTableFilterComposer
    extends Composer<_$AppDatabase, $FahrzeugeTable> {
  $$FahrzeugeTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get marke => $composableBuilder(
    column: $table.marke,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get modell => $composableBuilder(
    column: $table.modell,
    builder: (column) => ColumnFilters(column),
  );

  Expression<bool> wartungseintraegeRefs(
    Expression<bool> Function($$WartungseintraegeTableFilterComposer f) f,
  ) {
    final $$WartungseintraegeTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.wartungseintraege,
      getReferencedColumn: (t) => t.fahrzeugId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$WartungseintraegeTableFilterComposer(
            $db: $db,
            $table: $db.wartungseintraege,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }

  Expression<bool> fahrtenRefs(
    Expression<bool> Function($$FahrtenTableFilterComposer f) f,
  ) {
    final $$FahrtenTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.fahrten,
      getReferencedColumn: (t) => t.fahrzeugId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrtenTableFilterComposer(
            $db: $db,
            $table: $db.fahrten,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$FahrzeugeTableOrderingComposer
    extends Composer<_$AppDatabase, $FahrzeugeTable> {
  $$FahrzeugeTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get name => $composableBuilder(
    column: $table.name,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get marke => $composableBuilder(
    column: $table.marke,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get modell => $composableBuilder(
    column: $table.modell,
    builder: (column) => ColumnOrderings(column),
  );
}

class $$FahrzeugeTableAnnotationComposer
    extends Composer<_$AppDatabase, $FahrzeugeTable> {
  $$FahrzeugeTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<String> get name =>
      $composableBuilder(column: $table.name, builder: (column) => column);

  GeneratedColumn<String> get marke =>
      $composableBuilder(column: $table.marke, builder: (column) => column);

  GeneratedColumn<String> get modell =>
      $composableBuilder(column: $table.modell, builder: (column) => column);

  Expression<T> wartungseintraegeRefs<T extends Object>(
    Expression<T> Function($$WartungseintraegeTableAnnotationComposer a) f,
  ) {
    final $$WartungseintraegeTableAnnotationComposer composer =
        $composerBuilder(
          composer: this,
          getCurrentColumn: (t) => t.id,
          referencedTable: $db.wartungseintraege,
          getReferencedColumn: (t) => t.fahrzeugId,
          builder:
              (
                joinBuilder, {
                $addJoinBuilderToRootComposer,
                $removeJoinBuilderFromRootComposer,
              }) => $$WartungseintraegeTableAnnotationComposer(
                $db: $db,
                $table: $db.wartungseintraege,
                $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
                joinBuilder: joinBuilder,
                $removeJoinBuilderFromRootComposer:
                    $removeJoinBuilderFromRootComposer,
              ),
        );
    return f(composer);
  }

  Expression<T> fahrtenRefs<T extends Object>(
    Expression<T> Function($$FahrtenTableAnnotationComposer a) f,
  ) {
    final $$FahrtenTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.id,
      referencedTable: $db.fahrten,
      getReferencedColumn: (t) => t.fahrzeugId,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrtenTableAnnotationComposer(
            $db: $db,
            $table: $db.fahrten,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return f(composer);
  }
}

class $$FahrzeugeTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $FahrzeugeTable,
          FahrzeugeData,
          $$FahrzeugeTableFilterComposer,
          $$FahrzeugeTableOrderingComposer,
          $$FahrzeugeTableAnnotationComposer,
          $$FahrzeugeTableCreateCompanionBuilder,
          $$FahrzeugeTableUpdateCompanionBuilder,
          (FahrzeugeData, $$FahrzeugeTableReferences),
          FahrzeugeData,
          PrefetchHooks Function({bool wartungseintraegeRefs, bool fahrtenRefs})
        > {
  $$FahrzeugeTableTableManager(_$AppDatabase db, $FahrzeugeTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$FahrzeugeTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$FahrzeugeTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$FahrzeugeTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<String> name = const Value.absent(),
                Value<String?> marke = const Value.absent(),
                Value<String?> modell = const Value.absent(),
              }) => FahrzeugeCompanion(
                id: id,
                name: name,
                marke: marke,
                modell: modell,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required String name,
                Value<String?> marke = const Value.absent(),
                Value<String?> modell = const Value.absent(),
              }) => FahrzeugeCompanion.insert(
                id: id,
                name: name,
                marke: marke,
                modell: modell,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable(table),
                  $$FahrzeugeTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback:
              ({wartungseintraegeRefs = false, fahrtenRefs = false}) {
                return PrefetchHooks(
                  db: db,
                  explicitlyWatchedTables: [
                    if (wartungseintraegeRefs) db.wartungseintraege,
                    if (fahrtenRefs) db.fahrten,
                  ],
                  addJoins: null,
                  getPrefetchedDataCallback: (items) async {
                    return [
                      if (wartungseintraegeRefs)
                        await $_getPrefetchedData<
                          FahrzeugeData,
                          $FahrzeugeTable,
                          WartungseintraegeData
                        >(
                          currentTable: table,
                          referencedTable: $$FahrzeugeTableReferences
                              ._wartungseintraegeRefsTable(db),
                          managerFromTypedResult: (p0) =>
                              $$FahrzeugeTableReferences(
                                db,
                                table,
                                p0,
                              ).wartungseintraegeRefs,
                          referencedItemsForCurrentItem:
                              (item, referencedItems) => referencedItems.where(
                                (e) => e.fahrzeugId == item.id,
                              ),
                          typedResults: items,
                        ),
                      if (fahrtenRefs)
                        await $_getPrefetchedData<
                          FahrzeugeData,
                          $FahrzeugeTable,
                          FahrtenData
                        >(
                          currentTable: table,
                          referencedTable: $$FahrzeugeTableReferences
                              ._fahrtenRefsTable(db),
                          managerFromTypedResult: (p0) =>
                              $$FahrzeugeTableReferences(
                                db,
                                table,
                                p0,
                              ).fahrtenRefs,
                          referencedItemsForCurrentItem:
                              (item, referencedItems) => referencedItems.where(
                                (e) => e.fahrzeugId == item.id,
                              ),
                          typedResults: items,
                        ),
                    ];
                  },
                );
              },
        ),
      );
}

typedef $$FahrzeugeTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $FahrzeugeTable,
      FahrzeugeData,
      $$FahrzeugeTableFilterComposer,
      $$FahrzeugeTableOrderingComposer,
      $$FahrzeugeTableAnnotationComposer,
      $$FahrzeugeTableCreateCompanionBuilder,
      $$FahrzeugeTableUpdateCompanionBuilder,
      (FahrzeugeData, $$FahrzeugeTableReferences),
      FahrzeugeData,
      PrefetchHooks Function({bool wartungseintraegeRefs, bool fahrtenRefs})
    >;
typedef $$WartungseintraegeTableCreateCompanionBuilder =
    WartungseintraegeCompanion Function({
      Value<int> id,
      required int fahrzeugId,
      required DateTime datum,
      required int kilometerstand,
      required double kosten,
      required String beschreibung,
    });
typedef $$WartungseintraegeTableUpdateCompanionBuilder =
    WartungseintraegeCompanion Function({
      Value<int> id,
      Value<int> fahrzeugId,
      Value<DateTime> datum,
      Value<int> kilometerstand,
      Value<double> kosten,
      Value<String> beschreibung,
    });

final class $$WartungseintraegeTableReferences
    extends
        BaseReferences<
          _$AppDatabase,
          $WartungseintraegeTable,
          WartungseintraegeData
        > {
  $$WartungseintraegeTableReferences(
    super.$_db,
    super.$_table,
    super.$_typedResult,
  );

  static $FahrzeugeTable _fahrzeugIdTable(_$AppDatabase db) =>
      db.fahrzeuge.createAlias(
        $_aliasNameGenerator(db.wartungseintraege.fahrzeugId, db.fahrzeuge.id),
      );

  $$FahrzeugeTableProcessedTableManager get fahrzeugId {
    final $_column = $_itemColumn<int>('fahrzeug_id')!;

    final manager = $$FahrzeugeTableTableManager(
      $_db,
      $_db.fahrzeuge,
    ).filter((f) => f.id.sqlEquals($_column));
    final item = $_typedResult.readTableOrNull(_fahrzeugIdTable($_db));
    if (item == null) return manager;
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: [item]),
    );
  }
}

class $$WartungseintraegeTableFilterComposer
    extends Composer<_$AppDatabase, $WartungseintraegeTable> {
  $$WartungseintraegeTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get datum => $composableBuilder(
    column: $table.datum,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<int> get kilometerstand => $composableBuilder(
    column: $table.kilometerstand,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get kosten => $composableBuilder(
    column: $table.kosten,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get beschreibung => $composableBuilder(
    column: $table.beschreibung,
    builder: (column) => ColumnFilters(column),
  );

  $$FahrzeugeTableFilterComposer get fahrzeugId {
    final $$FahrzeugeTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableFilterComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WartungseintraegeTableOrderingComposer
    extends Composer<_$AppDatabase, $WartungseintraegeTable> {
  $$WartungseintraegeTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get datum => $composableBuilder(
    column: $table.datum,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<int> get kilometerstand => $composableBuilder(
    column: $table.kilometerstand,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get kosten => $composableBuilder(
    column: $table.kosten,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get beschreibung => $composableBuilder(
    column: $table.beschreibung,
    builder: (column) => ColumnOrderings(column),
  );

  $$FahrzeugeTableOrderingComposer get fahrzeugId {
    final $$FahrzeugeTableOrderingComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableOrderingComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WartungseintraegeTableAnnotationComposer
    extends Composer<_$AppDatabase, $WartungseintraegeTable> {
  $$WartungseintraegeTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<DateTime> get datum =>
      $composableBuilder(column: $table.datum, builder: (column) => column);

  GeneratedColumn<int> get kilometerstand => $composableBuilder(
    column: $table.kilometerstand,
    builder: (column) => column,
  );

  GeneratedColumn<double> get kosten =>
      $composableBuilder(column: $table.kosten, builder: (column) => column);

  GeneratedColumn<String> get beschreibung => $composableBuilder(
    column: $table.beschreibung,
    builder: (column) => column,
  );

  $$FahrzeugeTableAnnotationComposer get fahrzeugId {
    final $$FahrzeugeTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableAnnotationComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$WartungseintraegeTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $WartungseintraegeTable,
          WartungseintraegeData,
          $$WartungseintraegeTableFilterComposer,
          $$WartungseintraegeTableOrderingComposer,
          $$WartungseintraegeTableAnnotationComposer,
          $$WartungseintraegeTableCreateCompanionBuilder,
          $$WartungseintraegeTableUpdateCompanionBuilder,
          (WartungseintraegeData, $$WartungseintraegeTableReferences),
          WartungseintraegeData,
          PrefetchHooks Function({bool fahrzeugId})
        > {
  $$WartungseintraegeTableTableManager(
    _$AppDatabase db,
    $WartungseintraegeTable table,
  ) : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$WartungseintraegeTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$WartungseintraegeTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$WartungseintraegeTableAnnotationComposer(
                $db: db,
                $table: table,
              ),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<int> fahrzeugId = const Value.absent(),
                Value<DateTime> datum = const Value.absent(),
                Value<int> kilometerstand = const Value.absent(),
                Value<double> kosten = const Value.absent(),
                Value<String> beschreibung = const Value.absent(),
              }) => WartungseintraegeCompanion(
                id: id,
                fahrzeugId: fahrzeugId,
                datum: datum,
                kilometerstand: kilometerstand,
                kosten: kosten,
                beschreibung: beschreibung,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required int fahrzeugId,
                required DateTime datum,
                required int kilometerstand,
                required double kosten,
                required String beschreibung,
              }) => WartungseintraegeCompanion.insert(
                id: id,
                fahrzeugId: fahrzeugId,
                datum: datum,
                kilometerstand: kilometerstand,
                kosten: kosten,
                beschreibung: beschreibung,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable(table),
                  $$WartungseintraegeTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({fahrzeugId = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [],
              addJoins:
                  <
                    T extends TableManagerState<
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic
                    >
                  >(state) {
                    if (fahrzeugId) {
                      state =
                          state.withJoin(
                                currentTable: table,
                                currentColumn: table.fahrzeugId,
                                referencedTable:
                                    $$WartungseintraegeTableReferences
                                        ._fahrzeugIdTable(db),
                                referencedColumn:
                                    $$WartungseintraegeTableReferences
                                        ._fahrzeugIdTable(db)
                                        .id,
                              )
                              as T;
                    }

                    return state;
                  },
              getPrefetchedDataCallback: (items) async {
                return [];
              },
            );
          },
        ),
      );
}

typedef $$WartungseintraegeTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $WartungseintraegeTable,
      WartungseintraegeData,
      $$WartungseintraegeTableFilterComposer,
      $$WartungseintraegeTableOrderingComposer,
      $$WartungseintraegeTableAnnotationComposer,
      $$WartungseintraegeTableCreateCompanionBuilder,
      $$WartungseintraegeTableUpdateCompanionBuilder,
      (WartungseintraegeData, $$WartungseintraegeTableReferences),
      WartungseintraegeData,
      PrefetchHooks Function({bool fahrzeugId})
    >;
typedef $$FahrtenTableCreateCompanionBuilder =
    FahrtenCompanion Function({
      Value<int> id,
      required int fahrzeugId,
      required DateTime startZeit,
      Value<DateTime?> endZeit,
      required double startLatitude,
      required double startLongitude,
      Value<double?> endLatitude,
      Value<double?> endLongitude,
      Value<double> distanzKm,
      Value<String?> startAdresse,
      Value<String?> endAdresse,
      Value<String?> notizen,
      Value<bool> istAbgeschlossen,
    });
typedef $$FahrtenTableUpdateCompanionBuilder =
    FahrtenCompanion Function({
      Value<int> id,
      Value<int> fahrzeugId,
      Value<DateTime> startZeit,
      Value<DateTime?> endZeit,
      Value<double> startLatitude,
      Value<double> startLongitude,
      Value<double?> endLatitude,
      Value<double?> endLongitude,
      Value<double> distanzKm,
      Value<String?> startAdresse,
      Value<String?> endAdresse,
      Value<String?> notizen,
      Value<bool> istAbgeschlossen,
    });

final class $$FahrtenTableReferences
    extends BaseReferences<_$AppDatabase, $FahrtenTable, FahrtenData> {
  $$FahrtenTableReferences(super.$_db, super.$_table, super.$_typedResult);

  static $FahrzeugeTable _fahrzeugIdTable(_$AppDatabase db) =>
      db.fahrzeuge.createAlias(
        $_aliasNameGenerator(db.fahrten.fahrzeugId, db.fahrzeuge.id),
      );

  $$FahrzeugeTableProcessedTableManager get fahrzeugId {
    final $_column = $_itemColumn<int>('fahrzeug_id')!;

    final manager = $$FahrzeugeTableTableManager(
      $_db,
      $_db.fahrzeuge,
    ).filter((f) => f.id.sqlEquals($_column));
    final item = $_typedResult.readTableOrNull(_fahrzeugIdTable($_db));
    if (item == null) return manager;
    return ProcessedTableManager(
      manager.$state.copyWith(prefetchedData: [item]),
    );
  }
}

class $$FahrtenTableFilterComposer
    extends Composer<_$AppDatabase, $FahrtenTable> {
  $$FahrtenTableFilterComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnFilters<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get startZeit => $composableBuilder(
    column: $table.startZeit,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<DateTime> get endZeit => $composableBuilder(
    column: $table.endZeit,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get startLatitude => $composableBuilder(
    column: $table.startLatitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get startLongitude => $composableBuilder(
    column: $table.startLongitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get endLatitude => $composableBuilder(
    column: $table.endLatitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get endLongitude => $composableBuilder(
    column: $table.endLongitude,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<double> get distanzKm => $composableBuilder(
    column: $table.distanzKm,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get startAdresse => $composableBuilder(
    column: $table.startAdresse,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get endAdresse => $composableBuilder(
    column: $table.endAdresse,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<String> get notizen => $composableBuilder(
    column: $table.notizen,
    builder: (column) => ColumnFilters(column),
  );

  ColumnFilters<bool> get istAbgeschlossen => $composableBuilder(
    column: $table.istAbgeschlossen,
    builder: (column) => ColumnFilters(column),
  );

  $$FahrzeugeTableFilterComposer get fahrzeugId {
    final $$FahrzeugeTableFilterComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableFilterComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$FahrtenTableOrderingComposer
    extends Composer<_$AppDatabase, $FahrtenTable> {
  $$FahrtenTableOrderingComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  ColumnOrderings<int> get id => $composableBuilder(
    column: $table.id,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get startZeit => $composableBuilder(
    column: $table.startZeit,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<DateTime> get endZeit => $composableBuilder(
    column: $table.endZeit,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get startLatitude => $composableBuilder(
    column: $table.startLatitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get startLongitude => $composableBuilder(
    column: $table.startLongitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get endLatitude => $composableBuilder(
    column: $table.endLatitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get endLongitude => $composableBuilder(
    column: $table.endLongitude,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<double> get distanzKm => $composableBuilder(
    column: $table.distanzKm,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get startAdresse => $composableBuilder(
    column: $table.startAdresse,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get endAdresse => $composableBuilder(
    column: $table.endAdresse,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<String> get notizen => $composableBuilder(
    column: $table.notizen,
    builder: (column) => ColumnOrderings(column),
  );

  ColumnOrderings<bool> get istAbgeschlossen => $composableBuilder(
    column: $table.istAbgeschlossen,
    builder: (column) => ColumnOrderings(column),
  );

  $$FahrzeugeTableOrderingComposer get fahrzeugId {
    final $$FahrzeugeTableOrderingComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableOrderingComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$FahrtenTableAnnotationComposer
    extends Composer<_$AppDatabase, $FahrtenTable> {
  $$FahrtenTableAnnotationComposer({
    required super.$db,
    required super.$table,
    super.joinBuilder,
    super.$addJoinBuilderToRootComposer,
    super.$removeJoinBuilderFromRootComposer,
  });
  GeneratedColumn<int> get id =>
      $composableBuilder(column: $table.id, builder: (column) => column);

  GeneratedColumn<DateTime> get startZeit =>
      $composableBuilder(column: $table.startZeit, builder: (column) => column);

  GeneratedColumn<DateTime> get endZeit =>
      $composableBuilder(column: $table.endZeit, builder: (column) => column);

  GeneratedColumn<double> get startLatitude => $composableBuilder(
    column: $table.startLatitude,
    builder: (column) => column,
  );

  GeneratedColumn<double> get startLongitude => $composableBuilder(
    column: $table.startLongitude,
    builder: (column) => column,
  );

  GeneratedColumn<double> get endLatitude => $composableBuilder(
    column: $table.endLatitude,
    builder: (column) => column,
  );

  GeneratedColumn<double> get endLongitude => $composableBuilder(
    column: $table.endLongitude,
    builder: (column) => column,
  );

  GeneratedColumn<double> get distanzKm =>
      $composableBuilder(column: $table.distanzKm, builder: (column) => column);

  GeneratedColumn<String> get startAdresse => $composableBuilder(
    column: $table.startAdresse,
    builder: (column) => column,
  );

  GeneratedColumn<String> get endAdresse => $composableBuilder(
    column: $table.endAdresse,
    builder: (column) => column,
  );

  GeneratedColumn<String> get notizen =>
      $composableBuilder(column: $table.notizen, builder: (column) => column);

  GeneratedColumn<bool> get istAbgeschlossen => $composableBuilder(
    column: $table.istAbgeschlossen,
    builder: (column) => column,
  );

  $$FahrzeugeTableAnnotationComposer get fahrzeugId {
    final $$FahrzeugeTableAnnotationComposer composer = $composerBuilder(
      composer: this,
      getCurrentColumn: (t) => t.fahrzeugId,
      referencedTable: $db.fahrzeuge,
      getReferencedColumn: (t) => t.id,
      builder:
          (
            joinBuilder, {
            $addJoinBuilderToRootComposer,
            $removeJoinBuilderFromRootComposer,
          }) => $$FahrzeugeTableAnnotationComposer(
            $db: $db,
            $table: $db.fahrzeuge,
            $addJoinBuilderToRootComposer: $addJoinBuilderToRootComposer,
            joinBuilder: joinBuilder,
            $removeJoinBuilderFromRootComposer:
                $removeJoinBuilderFromRootComposer,
          ),
    );
    return composer;
  }
}

class $$FahrtenTableTableManager
    extends
        RootTableManager<
          _$AppDatabase,
          $FahrtenTable,
          FahrtenData,
          $$FahrtenTableFilterComposer,
          $$FahrtenTableOrderingComposer,
          $$FahrtenTableAnnotationComposer,
          $$FahrtenTableCreateCompanionBuilder,
          $$FahrtenTableUpdateCompanionBuilder,
          (FahrtenData, $$FahrtenTableReferences),
          FahrtenData,
          PrefetchHooks Function({bool fahrzeugId})
        > {
  $$FahrtenTableTableManager(_$AppDatabase db, $FahrtenTable table)
    : super(
        TableManagerState(
          db: db,
          table: table,
          createFilteringComposer: () =>
              $$FahrtenTableFilterComposer($db: db, $table: table),
          createOrderingComposer: () =>
              $$FahrtenTableOrderingComposer($db: db, $table: table),
          createComputedFieldComposer: () =>
              $$FahrtenTableAnnotationComposer($db: db, $table: table),
          updateCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                Value<int> fahrzeugId = const Value.absent(),
                Value<DateTime> startZeit = const Value.absent(),
                Value<DateTime?> endZeit = const Value.absent(),
                Value<double> startLatitude = const Value.absent(),
                Value<double> startLongitude = const Value.absent(),
                Value<double?> endLatitude = const Value.absent(),
                Value<double?> endLongitude = const Value.absent(),
                Value<double> distanzKm = const Value.absent(),
                Value<String?> startAdresse = const Value.absent(),
                Value<String?> endAdresse = const Value.absent(),
                Value<String?> notizen = const Value.absent(),
                Value<bool> istAbgeschlossen = const Value.absent(),
              }) => FahrtenCompanion(
                id: id,
                fahrzeugId: fahrzeugId,
                startZeit: startZeit,
                endZeit: endZeit,
                startLatitude: startLatitude,
                startLongitude: startLongitude,
                endLatitude: endLatitude,
                endLongitude: endLongitude,
                distanzKm: distanzKm,
                startAdresse: startAdresse,
                endAdresse: endAdresse,
                notizen: notizen,
                istAbgeschlossen: istAbgeschlossen,
              ),
          createCompanionCallback:
              ({
                Value<int> id = const Value.absent(),
                required int fahrzeugId,
                required DateTime startZeit,
                Value<DateTime?> endZeit = const Value.absent(),
                required double startLatitude,
                required double startLongitude,
                Value<double?> endLatitude = const Value.absent(),
                Value<double?> endLongitude = const Value.absent(),
                Value<double> distanzKm = const Value.absent(),
                Value<String?> startAdresse = const Value.absent(),
                Value<String?> endAdresse = const Value.absent(),
                Value<String?> notizen = const Value.absent(),
                Value<bool> istAbgeschlossen = const Value.absent(),
              }) => FahrtenCompanion.insert(
                id: id,
                fahrzeugId: fahrzeugId,
                startZeit: startZeit,
                endZeit: endZeit,
                startLatitude: startLatitude,
                startLongitude: startLongitude,
                endLatitude: endLatitude,
                endLongitude: endLongitude,
                distanzKm: distanzKm,
                startAdresse: startAdresse,
                endAdresse: endAdresse,
                notizen: notizen,
                istAbgeschlossen: istAbgeschlossen,
              ),
          withReferenceMapper: (p0) => p0
              .map(
                (e) => (
                  e.readTable(table),
                  $$FahrtenTableReferences(db, table, e),
                ),
              )
              .toList(),
          prefetchHooksCallback: ({fahrzeugId = false}) {
            return PrefetchHooks(
              db: db,
              explicitlyWatchedTables: [],
              addJoins:
                  <
                    T extends TableManagerState<
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic,
                      dynamic
                    >
                  >(state) {
                    if (fahrzeugId) {
                      state =
                          state.withJoin(
                                currentTable: table,
                                currentColumn: table.fahrzeugId,
                                referencedTable: $$FahrtenTableReferences
                                    ._fahrzeugIdTable(db),
                                referencedColumn: $$FahrtenTableReferences
                                    ._fahrzeugIdTable(db)
                                    .id,
                              )
                              as T;
                    }

                    return state;
                  },
              getPrefetchedDataCallback: (items) async {
                return [];
              },
            );
          },
        ),
      );
}

typedef $$FahrtenTableProcessedTableManager =
    ProcessedTableManager<
      _$AppDatabase,
      $FahrtenTable,
      FahrtenData,
      $$FahrtenTableFilterComposer,
      $$FahrtenTableOrderingComposer,
      $$FahrtenTableAnnotationComposer,
      $$FahrtenTableCreateCompanionBuilder,
      $$FahrtenTableUpdateCompanionBuilder,
      (FahrtenData, $$FahrtenTableReferences),
      FahrtenData,
      PrefetchHooks Function({bool fahrzeugId})
    >;

class $AppDatabaseManager {
  final _$AppDatabase _db;
  $AppDatabaseManager(this._db);
  $$FahrzeugeTableTableManager get fahrzeuge =>
      $$FahrzeugeTableTableManager(_db, _db.fahrzeuge);
  $$WartungseintraegeTableTableManager get wartungseintraege =>
      $$WartungseintraegeTableTableManager(_db, _db.wartungseintraege);
  $$FahrtenTableTableManager get fahrten =>
      $$FahrtenTableTableManager(_db, _db.fahrten);
}
