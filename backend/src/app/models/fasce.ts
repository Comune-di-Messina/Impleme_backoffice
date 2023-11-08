import { Apertura } from "./apertura";
import { BaseModel } from "./base-model";
import { Fascia } from "./fascia";
import { NewEvento } from "./new-evento";
import { NuovoServizio } from "./nuovo-servizio";

export class Fasce extends BaseModel {
    fasce: Fascia[];
    giorno: string

    fromJson(json): Fasce {
        for (var propName in json)
        {
            if(propName === 'fasce')
            {
                this[propName] = Fascia.fromJsonArray(json[propName]);
            }
            else
            {
                this[propName] = json[propName];
            }
        }
        return this;
    }
}
