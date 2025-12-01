import { Preferences } from '@capacitor/preferences';
import { Fahrzeug, FahrzeugInput, Wartung, WartungInput, Fahrt, FahrtInput, FahrtUpdate } from '../models';

// Simple in-memory database using Preferences as persistent storage
let fahrzeuge: Fahrzeug[] = [];
let wartungen: Wartung[] = [];
let fahrten: Fahrt[] = [];

let nextFahrzeugId = 1;
let nextWartungId = 1;
let nextFahrtId = 1;

const STORAGE_KEYS = {
    FAHRZEUGE: 'autologbuch_fahrzeuge',
    WARTUNGEN: 'autologbuch_wartungen',
    FAHRTEN: 'autologbuch_fahrten',
    NEXT_IDS: 'autologbuch_next_ids'
};

export const initDatabase = async (): Promise<void> => {
    try {
        // Load data from Preferences
        const fahrzeugeData = await Preferences.get({ key: STORAGE_KEYS.FAHRZEUGE });
        const wartungenData = await Preferences.get({ key: STORAGE_KEYS.WARTUNGEN });
        const fahrtenData = await Preferences.get({ key: STORAGE_KEYS.FAHRTEN });
        const nextIdsData = await Preferences.get({ key: STORAGE_KEYS.NEXT_IDS });

        if (fahrzeugeData.value) {
            fahrzeuge = JSON.parse(fahrzeugeData.value);
        }
        if (wartungenData.value) {
            wartungen = JSON.parse(wartungenData.value);
        }
        if (fahrtenData.value) {
            fahrten = JSON.parse(fahrtenData.value);
        }
        if (nextIdsData.value) {
            const ids = JSON.parse(nextIdsData.value);
            nextFahrzeugId = ids.fahrzeug || 1;
            nextWartungId = ids.wartung || 1;
            nextFahrtId = ids.fahrt || 1;
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

const saveData = async () => {
    await Preferences.set({
        key: STORAGE_KEYS.FAHRZEUGE,
        value: JSON.stringify(fahrzeuge)
    });
    await Preferences.set({
        key: STORAGE_KEYS.WARTUNGEN,
        value: JSON.stringify(wartungen)
    });
    await Preferences.set({
        key: STORAGE_KEYS.FAHRTEN,
        value: JSON.stringify(fahrten)
    });
    await Preferences.set({
        key: STORAGE_KEYS.NEXT_IDS,
        value: JSON.stringify({
            fahrzeug: nextFahrzeugId,
            wartung: nextWartungId,
            fahrt: nextFahrtId
        })
    });
};

// Fahrzeuge
export const insertFahrzeug = async (input: FahrzeugInput): Promise<Fahrzeug> => {
    const fahrzeug: Fahrzeug = {
        id: nextFahrzeugId++,
        name: input.name,
        marke: input.marke,
        modell: input.modell
    };
    fahrzeuge.push(fahrzeug);
    await saveData();
    return fahrzeug;
};

export const getAllFahrzeuge = async (): Promise<Fahrzeug[]> => {
    return [...fahrzeuge];
};

export const getFahrzeugById = async (id: number): Promise<Fahrzeug | undefined> => {
    return fahrzeuge.find(f => f.id === id);
};

export const deleteFahrzeug = async (id: number): Promise<void> => {
    fahrzeuge = fahrzeuge.filter(f => f.id !== id);
    wartungen = wartungen.filter(w => w.fahrzeugId !== id);
    fahrten = fahrten.filter(f => f.fahrzeugId !== id);
    await saveData();
};

// Wartungen
export const insertWartung = async (input: WartungInput): Promise<Wartung> => {
    const wartung: Wartung = {
        id: nextWartungId++,
        ...input
    };
    wartungen.push(wartung);
    await saveData();
    return wartung;
};

export const getWartungenByFahrzeug = async (fahrzeugId: number): Promise<Wartung[]> => {
    return wartungen
        .filter(w => w.fahrzeugId === fahrzeugId)
        .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
};

export const deleteWartung = async (id: number): Promise<void> => {
    wartungen = wartungen.filter(w => w.id !== id);
    await saveData();
};

// Fahrten
export const startFahrt = async (input: FahrtInput): Promise<Fahrt> => {
    const fahrt: Fahrt = {
        id: nextFahrtId++,
        ...input,
        endZeit: null,
        endLatitude: null,
        endLongitude: null,
        startAdresse: null,
        endAdresse: null,
        istAbgeschlossen: false
    };
    fahrten.push(fahrt);
    await saveData();
    return fahrt;
};

export const updateFahrt = async (id: number, update: Partial<FahrtUpdate>): Promise<void> => {
    const fahrt = fahrten.find(f => f.id === id);
    if (fahrt) {
        Object.assign(fahrt, update);
        await saveData();
    }
};

export const endFahrt = async (id: number, endLatitude: number, endLongitude: number, distanzKm: number, endAdresse: string | null = null): Promise<void> => {
    const fahrt = fahrten.find(f => f.id === id);
    if (fahrt) {
        fahrt.endZeit = new Date().toISOString();
        fahrt.endLatitude = endLatitude;
        fahrt.endLongitude = endLongitude;
        fahrt.distanzKm = distanzKm;
        fahrt.endAdresse = endAdresse;
        fahrt.istAbgeschlossen = true;
        await saveData();
    }
};

export const getFahrtById = async (id: number): Promise<Fahrt | undefined> => {
    return fahrten.find(f => f.id === id);
};

export const getFahrtenByFahrzeug = async (fahrzeugId: number): Promise<Fahrt[]> => {
    return fahrten
        .filter(f => f.fahrzeugId === fahrzeugId)
        .sort((a, b) => new Date(b.startZeit).getTime() - new Date(a.startZeit).getTime());
};

export const deleteFahrt = async (id: number): Promise<void> => {
    fahrten = fahrten.filter(f => f.id !== id);
    await saveData();
};

export const getActiveFahrtForFahrzeug = async (fahrzeugId: number): Promise<Fahrt | undefined> => {
    return fahrten.find(f => f.fahrzeugId === fahrzeugId && !f.istAbgeschlossen);
};
