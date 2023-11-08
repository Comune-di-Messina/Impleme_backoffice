import { Apertura } from "./apertura";
import { BaseModel } from "./base-model";
import { Fasce } from "./fasce";

export class Tariffario extends BaseModel {
    costoFasce: Fasce[];
    costoInteraGiornata: number;
    costoOrario: number;
    costoSettimanale: number;
    evento: number;
    flagInteraGiornata: boolean;
    flagInteraSettimana: boolean;
    note: string;

    fromJson(json): Tariffario {
        for (var propName in json)
        {
            if(propName === 'costoFasce')
            {
                this[propName] = Fasce.fromJsonArray(json[propName]);
            }
            else
            {
                this[propName] = json[propName];
            }
        }
        return this;
    }
}
