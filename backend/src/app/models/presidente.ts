import { BaseModel } from "./base-model";
import { Indirizzo } from "./indirizzo";

export class Presidente extends BaseModel {
    codiFisc: string;
    cognome: string;
    dataNascita: string;
    email: string;
    luogoNascita: string;
    nome: string;
    telefono: string;
}
