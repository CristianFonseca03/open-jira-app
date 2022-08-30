export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}

/* Defino los types para tipos de datos que no se van a expandir */
export type EntryStatus = 'pending' | 'in-progress' | 'finished';