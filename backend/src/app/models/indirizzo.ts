import { BaseModel } from "./base-model";

export class Indirizzo extends BaseModel {
    cap: string;
    civico: string;
    comune: string;
    indirizzo: string;
    provincia: string;
    stato: string;
}
