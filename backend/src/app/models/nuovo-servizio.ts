import { BaseModel } from "./base-model";

export class NuovoServizio extends BaseModel {
    codice: string;
    descrizione: string;
    importo: number;
    note: string;
}
