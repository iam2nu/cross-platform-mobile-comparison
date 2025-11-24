export interface Fahrt {
    id: number;
    fahrzeugId: number;
    startZeit: string;
    endZeit: string | null;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number | null;
    endLongitude: number | null;
    distanzKm: number;
    startAdresse: string | null;
    endAdresse: string | null;
    notizen: string;
    istAbgeschlossen: boolean;
}

export interface FahrtInput {
    fahrzeugId: number;
    startZeit: string;
    startLatitude: number;
    startLongitude: number;
    distanzKm: number;
    notizen: string;
}

export interface FahrtUpdate {
    endZeit?: string;
    endLatitude?: number;
    endLongitude?: number;
    distanzKm?: number;
    startAdresse?: string | null;
    endAdresse?: string | null;
    notizen?: string;
    istAbgeschlossen?: boolean;
}
