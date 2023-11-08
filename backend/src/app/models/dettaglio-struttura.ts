import { Apertura } from './apertura'
import { BaseModel } from './base-model'

export class DettaglioStruttura extends BaseModel {
  aperture: Apertura[]
  blocked: boolean
  capienza: number
  categoria: number
  catering: boolean
  comune: string
  condizioniUtilizzo: string
  eventi: any[]
  giorniAnticipo: number
  id: string
  nome: string
  riserve: any[]
  servizi: any[]
  tariffario: any[]
  terzeParti: boolean
  tipoStruttura: number

  static fromJson(json): DettaglioStruttura {
    var model = new DettaglioStruttura()
    for (var propName in json) {
      if (propName === 'aperture') {
        model[propName] = Apertura.fromJsonArray(json[propName])
      } else {
        model[propName] = json[propName]
      }
    }
    return model
  }
}
