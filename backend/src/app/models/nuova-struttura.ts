import { Apertura } from "./apertura";
import { BaseModel } from "./base-model";
import { NewEvento } from "./new-evento";
import { NuovoServizio } from "./nuovo-servizio";
import { Tariffario } from "./tariffario";

export class NuovaStruttura extends BaseModel {
    aperture : Apertura[];
    blocked: boolean;
    capienza: number;
    categoria: number;
    catering: boolean;
    comune: string;
    condizioniUtilizzo: string
    eventi: NewEvento[];
    giorniAnticipo: number;
    id: string;
    nome: string;
    servizi: NuovoServizio[];
    tariffario: Tariffario[];
    terzeParti: boolean;
    tipoStruttura: number;

    fromJson(json): NuovaStruttura {
        for (var propName in json)
        {
            if(propName === 'aperture')
            {
                this[propName] = Apertura.fromJsonArray(json[propName]);
            }
            else if(propName === 'eventi')
            {
                this[propName] = NewEvento.fromJsonArray(json[propName]);
            }
            else if(propName === 'servizi')
            {
                this[propName] = NuovoServizio.fromJsonArray(json[propName]);
            }
            else if(propName === 'tariffario')
            {
                this[propName] = Tariffario.fromJsonArray(json[propName]);
            }
            else
            {
                this[propName] = json[propName];
            }
        }
        return this;
    }
}
