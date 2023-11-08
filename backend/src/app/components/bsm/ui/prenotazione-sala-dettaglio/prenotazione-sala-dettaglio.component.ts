import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core'
import { EntiService, RoomsService } from 'src/app/services/api'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import * as Formatter from 'src/app/utils/formatters'
import { until } from 'selenium-webdriver'
import elementIsSelected = until.elementIsSelected

@Component({
  selector: 'bsm-prenotazione-sala-dettaglio',
  templateUrl: './prenotazione-sala-dettaglio.component.html',
  styleUrls: ['./prenotazione-sala-dettaglio.component.scss'],
})
export class PrenotazioneSalaDettaglioComponent {
  @Input() roomBooking: any = null
  data = []
  room: any
  ente: {
    codice: string
    descrizione: string
  }
  numeroPratica: string

  constructor(
    private roomBookingBookingsService: RoomBookingBookingsService,
    private roomsService: RoomsService,
    private entiService: EntiService,
  ) {}

  ngOnChanges(changes: SimpleChange) {
    const changesRoomBooking = changes['roomBooking'].currentValue

    if (changesRoomBooking) {
      this.roomBooking = changesRoomBooking
      this.updateData()
      this.loadRoom(this.roomBooking.roomId)
      this.loadEnti(this.roomBooking.ente)
    }
  }

  loadRoom(roomId) {
    this.roomsService.view(roomId).subscribe(data => {
      this.room = data
      this.updateData()
    })
  }

  loadEnti(enteCodice) {
    this.entiService.index().subscribe(data => {
      this.ente = data.find(d => d.codice === enteCodice)
      this.updateData()
    })
  }

  onDocumentClick(document) {
    this.roomBookingBookingsService.documentContent(document.idDocumentale).subscribe(data => {
      const a = window.document.createElement('a')
      const objectUrl = URL.createObjectURL(data)
      a.href = objectUrl
      a.download = document.fileName
      a.click()
      URL.revokeObjectURL(objectUrl)
    })
  }

  isStandardItem(item) {
    return ['Allegati'].indexOf(item.title) === -1
  }

  get titoloEvento(): string {
    return this.roomBooking.titoloEvento
  }

  get descrizioneEvento(): string {
    return this.roomBooking.descrizioneEvento
  }

  get dataInvio(): string {
    return Formatter.asDate(this.roomBooking.dataPrenotazione)
  }

  get protocollo(): string {
    return `nr. ${this.roomBooking.numeroProtocollo} del ${Formatter.asDate(
      this.roomBooking.dataProtocollo,
    )}`
  }

  get accessori(): any[] {
    return this.roomBooking.serviziUtilizzati
  }

  get allegati(): any[] {
    return this.roomBooking.allegati
  }

  get nomeEnte(): string {
    return this.ente?.descrizione
  }

  get dataInizio(): string {
    return Formatter.asDate(this.roomBooking.giornoDa)
  }

  get dataFine(): string {
    return Formatter.asDate(this.roomBooking.giornoA)
  }

  get oraInizio(): string {
    return this.roomBooking.oraDa
  }

  get oraFine(): string {
    return this.roomBooking.oraA
  }

  get importo(): string {
    return Formatter.asCurrency(this.roomBooking.importo)
  }

  get importoServizi(): string {
    return Formatter.asCurrency(this.roomBooking.importoServizi)
  }

  get struttura(): string {
    return this.room ? this.room.nome : null
  }

  get richiedente(): Richiedente {
    return this.roomBooking.richiedente
  }

  get organizzatore(): Organizzatore {
    return this.roomBooking.organizzatore
  }

  get rappresentanteLegale(): RappresentanteLegale | {} {
    if (this.roomBooking.hasOwnProperty('legale')) {
      return this.roomBooking.legale
    } else {
      return {}
    }
  }

  formatDate(date: string): string {
    return Formatter.asDate(date)
  }

  formatImporto(importo: number): string {
    return Formatter.asCurrency(importo)
  }

  updateData() {
    this.numeroPratica = this.roomBooking.numeroPratica
  }
}

export interface RappresentanteLegale {
  nome: string
  cognome: string
  luogoNascita: string
  dataNascita: string
  codiFisc: string
  email?: string
  telefono?: string
}

export interface Richiedente {
  name: string
  surname: string
  luogoNascita: string
  dataNascita: string
  codiFisc: string
  email: string
  telefono: string
  indirizzo: {
    indirizzo: string
    cap: string
    stato: string
    provincia: string
    comune: string
    civico: string
  }
  flagOrganizzatore: boolean
  flagEnte: boolean
}

export interface Organizzatore {
  name?: string
  surname?: string
  ragioneSociale?: string
  luogoNascita?: string
  dataNascita?: string
  codiFisc: string
  piva?: string
  email: string
  telephoneNumber: string
  flagEnte: boolean
}
