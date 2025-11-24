// Model für Fahrten mit GPS-Tracking
export interface Fahrt {
    id: number;
    fahrzeugId: number;
    startZeit: string; // ISO date string
    endZeit?: string; // ISO date string
    startLatitude: number;
    startLongitude: number;
    endLatitude?: number;
    endLongitude?: number;
    distanzKm: number;
    startAdresse?: string;
    endAdresse?: string;
    notizen?: string;
    istAbgeschlossen: boolean;
}

export interface FahrtInput {
    fahrzeugId: number;
    startZeit: string;
    startLatitude: number;
    startLongitude: number;
    istAbgeschlossen?: boolean;
}

export interface FahrtUpdate {
    endZeit?: string;
    endLatitude?: number;
    endLongitude?: number;
    distanzKm?: number;
    startAdresse?: string;
    endAdresse?: string;
    notizen?: string;
    istAbgeschlossen?: boolean;
}
