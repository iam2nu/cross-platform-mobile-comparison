export interface Fahrzeug {
    id: number;
    name: string;
    marke?: string;
    modell?: string;
}

export interface FahrzeugInput {
    name: string;
    marke?: string;
    modell?: string;
}
