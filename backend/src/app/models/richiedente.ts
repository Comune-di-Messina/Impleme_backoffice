import { BaseModel } from "./base-model";
import { Indirizzo } from "./indirizzo";

export class Richiedente extends BaseModel {
    codiFisc: string;
    dataNascita: string;
    email: string;
    flagEnte: boolean;
    flagOrganizza: boolean;
    indirizzo: Indirizzo;
    luogoNascita: string;
    name: string;
    piva: string;
    ragioneSociale: string;
    surname: string;
    telephoneNumber: string;
}
