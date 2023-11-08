import { BaseModel } from "./base-model";

export class Servizio extends BaseModel {
    codice: string;
    descrizione: string;
    id: number;
    importo: number;
    note: string;
}
