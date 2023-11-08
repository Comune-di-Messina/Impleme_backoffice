import { BaseModel } from './base-model'
import { Legale } from './legale'
import { NuovoAllegato } from './nuovo-allegato'
import { Organizzatore } from './organizzatore'
import { Presidente } from './presidente'
import { Richiedente } from './richiedente'
import { Servizio } from './servizio'

export class RichiestaPrenotazione extends BaseModel {
  id: string
  numeroPratica: string
  allegati: NuovoAllegato[]
  descrizioneEvento: string
  flagPrivacy1: boolean
  flagPrivacy2: boolean
  flagPrivacy3: boolean
  flagPrivacy4: boolean
  giornoA: string
  giornoDa: string
  interaGiornata: boolean
  legale: Legale
  note: string
  oraA: string
  oraDa: string
  organizzatore: Organizzatore
  presidente: Presidente
  richiedente: Richiedente
  roomId: string
  serviziPrenotati: Servizio[]
  tipoEvento: number
  titoloEvento: string
  dataPrenotazione: string
  stato: boolean
}

export interface RichiestaPrenotazioneSearchParameters {
  id?: string
  numeroPratica?: string
}
