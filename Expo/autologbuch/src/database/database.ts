import * as SQLite from 'expo-sqlite';
import { Fahrzeug, FahrzeugInput, Wartungseintrag, WartungseintragInput, Fahrt, FahrtInput, FahrtUpdate } from '../models';

class Database {
    private db: SQLite.SQLiteDatabase | null = null;

    async init() {
        this.db = await SQLite.openDatabaseAsync('autologbuch.db');
        await this.createTables();
    }

    private async createTables() {
        if (!this.db) return;

        // Tabelle Fahrzeuge
        await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS fahrzeuge (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        marke TEXT,
        modell TEXT
      );
    `);

        // Tabelle Wartungseinträge
        await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS wartungseintraege (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fahrzeugId INTEGER NOT NULL,
        datum TEXT NOT NULL,
        kilometerstand INTEGER NOT NULL,
        kosten REAL NOT NULL,
        beschreibung TEXT NOT NULL,
        FOREIGN KEY (fahrzeugId) REFERENCES fahrzeuge(id) ON DELETE CASCADE
      );
    `);

        // Tabelle Fahrten
        await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS fahrten (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fahrzeugId INTEGER NOT NULL,
        startZeit TEXT NOT NULL,
        endZeit TEXT,
        startLatitude REAL NOT NULL,
        startLongitude REAL NOT NULL,
        endLatitude REAL,
        endLongitude REAL,
        distanzKm REAL DEFAULT 0.0,
        startAdresse TEXT,
        endAdresse TEXT,
        notizen TEXT,
        istAbgeschlossen INTEGER DEFAULT 0,
        FOREIGN KEY (fahrzeugId) REFERENCES fahrzeuge(id) ON DELETE CASCADE
      );
    `);
    }

    // ============ FAHRZEUGE ============

    async getAllFahrzeuge(): Promise<Fahrzeug[]> {
        if (!this.db) return [];
        const result = await this.db.getAllAsync<Fahrzeug>('SELECT * FROM fahrzeuge ORDER BY name');
        return result;
    }

    async getFahrzeugById(id: number): Promise<Fahrzeug | null> {
        if (!this.db) return null;
        const result = await this.db.getFirstAsync<Fahrzeug>(
            'SELECT * FROM fahrzeuge WHERE id = ?',
            [id]
        );
        return result || null;
    }

    async insertFahrzeug(fahrzeug: FahrzeugInput): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');
        const result = await this.db.runAsync(
            'INSERT INTO fahrzeuge (name, marke, modell) VALUES (?, ?, ?)',
            [fahrzeug.name, fahrzeug.marke || null, fahrzeug.modell || null]
        );
        return result.lastInsertRowId;
    }

    async deleteFahrzeug(id: number): Promise<void> {
        if (!this.db) return;
        await this.db.runAsync('DELETE FROM fahrzeuge WHERE id = ?', [id]);
    }

    // ============ WARTUNGEN ============

    async getWartungenForFahrzeug(fahrzeugId: number): Promise<Wartungseintrag[]> {
        if (!this.db) return [];
        const result = await this.db.getAllAsync<Wartungseintrag>(
            'SELECT * FROM wartungseintraege WHERE fahrzeugId = ? ORDER BY datum DESC',
            [fahrzeugId]
        );
        return result;
    }

    async insertWartung(wartung: WartungseintragInput): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');
        const result = await this.db.runAsync(
            'INSERT INTO wartungseintraege (fahrzeugId, datum, kilometerstand, kosten, beschreibung) VALUES (?, ?, ?, ?, ?)',
            [wartung.fahrzeugId, wartung.datum, wartung.kilometerstand, wartung.kosten, wartung.beschreibung]
        );
        return result.lastInsertRowId;
    }

    async getTotalKostenForFahrzeug(fahrzeugId: number): Promise<number> {
        if (!this.db) return 0;
        const result = await this.db.getFirstAsync<{ total: number | null }>(
            'SELECT SUM(kosten) as total FROM wartungseintraege WHERE fahrzeugId = ?',
            [fahrzeugId]
        );
        return result?.total || 0;
    }

    async deleteWartung(id: number): Promise<void> {
        if (!this.db) return;
        await this.db.runAsync('DELETE FROM wartungseintraege WHERE id = ?', [id]);
    }

    // ============ FAHRTEN ============

    async getFahrtenForFahrzeug(fahrzeugId: number): Promise<Fahrt[]> {
        if (!this.db) return [];
        const result = await this.db.getAllAsync<any>(
            'SELECT * FROM fahrten WHERE fahrzeugId = ? ORDER BY startZeit DESC',
            [fahrzeugId]
        );
        return result.map(row => ({
            ...row,
            istAbgeschlossen: Boolean(row.istAbgeschlossen)
        }));
    }

    async getAllFahrten(): Promise<Fahrt[]> {
        if (!this.db) return [];
        const result = await this.db.getAllAsync<any>(
            'SELECT * FROM fahrten ORDER BY startZeit DESC'
        );
        return result.map(row => ({
            ...row,
            istAbgeschlossen: Boolean(row.istAbgeschlossen)
        }));
    }

    async getActiveFahrt(fahrzeugId: number): Promise<Fahrt | null> {
        if (!this.db) return null;
        const result = await this.db.getFirstAsync<any>(
            'SELECT * FROM fahrten WHERE fahrzeugId = ? AND istAbgeschlossen = 0 LIMIT 1',
            [fahrzeugId]
        );
        if (!result) return null;
        return {
            ...result,
            istAbgeschlossen: Boolean(result.istAbgeschlossen)
        };
    }

    async getFahrtById(id: number): Promise<Fahrt | null> {
        if (!this.db) return null;
        const result = await this.db.getFirstAsync<any>(
            'SELECT * FROM fahrten WHERE id = ?',
            [id]
        );
        if (!result) return null;
        return {
            ...result,
            istAbgeschlossen: Boolean(result.istAbgeschlossen)
        };
    }

    async startFahrt(fahrt: FahrtInput): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');
        const result = await this.db.runAsync(
            'INSERT INTO fahrten (fahrzeugId, startZeit, startLatitude, startLongitude, istAbgeschlossen) VALUES (?, ?, ?, ?, ?)',
            [fahrt.fahrzeugId, fahrt.startZeit, fahrt.startLatitude, fahrt.startLongitude, fahrt.istAbgeschlossen ? 1 : 0]
        );
        return result.lastInsertRowId;
    }

    async endFahrt(
        fahrtId: number,
        endZeit: string,
        endLat: number,
        endLng: number,
        distanz: number,
        endAdresse?: string
    ): Promise<void> {
        if (!this.db) return;
        await this.db.runAsync(
            'UPDATE fahrten SET endZeit = ?, endLatitude = ?, endLongitude = ?, distanzKm = ?, endAdresse = ?, istAbgeschlossen = 1 WHERE id = ?',
            [endZeit, endLat, endLng, distanz, endAdresse || null, fahrtId]
        );
    }

    async updateFahrt(fahrtId: number, updates: FahrtUpdate): Promise<void> {
        if (!this.db) return;

        const setClauses: string[] = [];
        const values: any[] = [];

        if (updates.notizen !== undefined) {
            setClauses.push('notizen = ?');
            values.push(updates.notizen);
        }
        if (updates.endZeit !== undefined) {
            setClauses.push('endZeit = ?');
            values.push(updates.endZeit);
        }
        if (updates.endLatitude !== undefined) {
            setClauses.push('endLatitude = ?');
            values.push(updates.endLatitude);
        }
        if (updates.endLongitude !== undefined) {
            setClauses.push('endLongitude = ?');
            values.push(updates.endLongitude);
        }
        if (updates.distanzKm !== undefined) {
            setClauses.push('distanzKm = ?');
            values.push(updates.distanzKm);
        }
        if (updates.startAdresse !== undefined) {
            setClauses.push('startAdresse = ?');
            values.push(updates.startAdresse);
        }
        if (updates.endAdresse !== undefined) {
            setClauses.push('endAdresse = ?');
            values.push(updates.endAdresse);
        }
        if (updates.istAbgeschlossen !== undefined) {
            setClauses.push('istAbgeschlossen = ?');
            values.push(updates.istAbgeschlossen ? 1 : 0);
        }

        if (setClauses.length === 0) return;

        values.push(fahrtId);
        const query = `UPDATE fahrten SET ${setClauses.join(', ')} WHERE id = ?`;
        await this.db.runAsync(query, values);
    }

    async getTotalDistanzForFahrzeug(fahrzeugId: number): Promise<number> {
        if (!this.db) return 0;
        const result = await this.db.getFirstAsync<{ total: number | null }>(
            'SELECT SUM(distanzKm) as total FROM fahrten WHERE fahrzeugId = ? AND istAbgeschlossen = 1',
            [fahrzeugId]
        );
        return result?.total || 0;
    }

    async deleteFahrt(id: number): Promise<void> {
        if (!this.db) return;
        await this.db.runAsync('DELETE FROM fahrten WHERE id = ?', [id]);
    }
}

export default new Database();
