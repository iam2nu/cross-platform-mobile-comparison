// Model für Wartungseinträge
export interface Wartungseintrag {
    id: number;
    fahrzeugId: number;
    datum: string; // ISO date string
    kilometerstand: number;
    kosten: number;
    beschreibung: string;
}

export interface WartungseintragInput {
    fahrzeugId: number;
    datum: string;
    kilometerstand: number;
    kosten: number;
    beschreibung: string;
}
