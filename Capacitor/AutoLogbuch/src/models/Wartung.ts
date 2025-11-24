export interface Wartung {
    id: number;
    fahrzeugId: number;
    datum: string;
    kilometerstand: number;
    kosten: number;
    beschreibung: string;
}

export interface WartungInput {
    fahrzeugId: number;
    datum: string;
    kilometerstand: number;
    kosten: number;
    beschreibung: string;
}
