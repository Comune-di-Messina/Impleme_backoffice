import { Component, OnInit } from '@angular/core'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import { Router } from '@angular/router'
import * as Reducers from 'src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import { RoomsService } from 'src/app/services/api'
import { NzModalService } from 'ng-zorro-antd'
import { ACLService } from 'src/app/services/acl'
import { APP_ROUTING_ACL } from 'src/app/app-routing-acl'
import * as Formatter from 'src/app/utils/formatters'
import { RichiestaPrenotazione } from '../../../models/richiesta-prenotazione'
import { Subscription } from 'rxjs'
import { environment } from '../../../../environments/environment'

declare var require: any
@Component({
  selector: 'prenotazione-sala-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class PrenotazioneSalaIndexComponent implements OnInit {
  storeSubscription: Subscription
  listOfColumns = []
  roomBookings = []
  // roomBookingsInPage = []
  enti = []
  roomsPerEnte = {}
  scrollSize = '0px'
  loading = false

  searchForm = {
    id: null,
    numeroPratica: null,
    ente: null,
    roomId: null,
  }

  searchFiltersVisible = {
    id: false,
    numeroPratica: false,
    ente: null,
    roomId: null,
  }

  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private store: Store<any>,
    private modal: NzModalService,
    private aclService: ACLService,
  ) {
    console.log('require room bookings')
    this.storeSubscription = this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
      this.roomBookings = state.roomBookings
      this.loading = state.loading
      // this.roomBookingsInPage = Object.assign([], state.roomBookings)
      this.scrollSize = `${window.innerHeight - 480}px`

      if (this.roomBookings && this.enti) {
        this.roomBookings = Object.assign(
          {},
          this.roomBookings.filter(x => x.stato === 5),
        )
        for (var i in this.roomBookings) {
          this.roomsPerEnte[this.roomBookings[i].ente] = []
        }
        for (var i in this.roomsPerEnte) {
          this.roomsPerEnte[i] = []
          this.loadRoomsPerEnte(i)
        }
        this.resetSearch()
        // setTimeout(() => {
        //   // this.listOfColumns = this.generateColumns()
        //   this.resetSearch()
        // }, 10)
      }
    })
  }
  ngOnInit() {
    this.store.dispatch(new ApiActions.RoomBookings())
    this.store.dispatch(new ApiActions.Enti())
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe()
  }

  loadRoomsPerEnte(ente) {
    this.roomsService.index(ente).subscribe(data => {
      this.roomsPerEnte[ente] = data
    })
  }

  generateColumns() {
    const headers = [
      {
        name: 'Numero pratica',
        key: x => x.numeroPratica,
      },
      {
        name: 'Data pren.',
        key: x => Formatter.asDate(x.dataPrenotazione),
      },
      {
        name: 'Tit. evento',
        key: x => x.titoloEvento,
      },
      {
        name: 'Desc. evento',
        key: x => x.descrizioneEvento || '',
      },
      {
        name: 'Ente',
        key: x => this.getEnteDescrizione(x),
      },
      {
        name: 'Sala',
        key: x => x.nome,
      },
      {
        name: 'Giorno Da',
        key: x => Formatter.asDate(x.giornoDa),
      },
      {
        name: 'Giorno A',
        key: x => Formatter.asDate(x.giornoA),
      },
      {
        name: 'Ora Da',
        key: x => x.oraDa,
      },
      {
        name: 'Ora A',
        key: x => x.oraA,
      },
      {
        name: 'Importo',
        key: x => Formatter.asCurrency(x.importo),
      },
      {
        name: 'Importo servizi',
        key: x => Formatter.asCurrency(x.importoServizi),
      },
      {
        name: 'Azioni',
        key: () => 'azioni',
        noFilter: true,
      },
    ]
    return headers.map(header => {
      return !header.noFilter
        ? {
            name: header.name,
            sortOrder: null,
            sortFn: (a, b) => header.key(a).localeCompare(header.key(b)),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: Array.from(
              this.roomBookings
                .map(x => {
                  return { text: header.key(x), value: header.key(x) }
                })
                .reduce((m, t) => m.set(t.value, t), new Map())
                .values(),
            ).sort((a, b) => (a.text.toString() > b.text.toString() ? 1 : -1)),
            filterFn: (list: string[], item) =>
              list.some(value => header.key(item).indexOf(value) !== -1),
          }
        : { name: header.name }
    })
  }

  revocabile(booking) {
    return (
      this.aclService.checkUserRole(APP_ROUTING_ACL['prenotazione-sala/revoca']) &&
      booking.stato === 5
    )
  }
  get stateLoading() {
    return this.loading
  }

  getEnti() {
    return this.enti
  }

  // getAllRooms(ente) {
  //   (this.roomsPerEnte[ente] as any[])?.map(room => ({roomId: room.roomId, nome: room.nome}))
  // }

  getRoomNome(roomBooking) {
    const ente = roomBooking.ente
    let room = null
    if (ente in this.roomsPerEnte) {
      room = this.roomsPerEnte[ente].find(r => r.id === roomBooking.roomId)
    }
    return room ? room.nome : null
  }

  getEnteDescrizione(roomBooking) {
    const ente = this.enti?.find(e => e.codice === roomBooking.ente)
    return ente ? ente.descrizione : roomBooking.ente
  }

  onViewModel(m) {
    // console.log([`/prenotazione-sala/view/${m.numeroPratica}`])
    this.router.navigate([`/prenotazione-sala/view/${m.numeroPratica}`])
  }

  onDeleteModel(m) {
    this.router.navigate([`/prenotazione-sala/revoca/${m.numeroPratica}`])
  }

  resetSearch(value?: string): void {
    if (value) {
      this.searchForm[value] = null
    } else {
      this.searchForm = {
        id: null,
        numeroPratica: null,
        ente: null,
        roomId: null,
      }
    }
  }

  search(): any[] {
    let roomBookingsInPage = Object.assign([], this.roomBookings).filter(x => x.stato === 5)
    this.searchFiltersVisible = {
      id: false,
      numeroPratica: false,
      ente: false,
      roomId: false,
    }
    if (this.searchForm.id) {
      roomBookingsInPage = roomBookingsInPage.filter(
        (booking: RichiestaPrenotazione) => booking.id.indexOf(this.searchForm.id) !== -1,
      )
    }

    if (this.searchForm.numeroPratica) {
      roomBookingsInPage = roomBookingsInPage.filter(
        (booking: RichiestaPrenotazione) =>
          booking.numeroPratica.indexOf(this.searchForm.numeroPratica) !== -1,
      )
    }

    if (this.searchForm.roomId) {
      roomBookingsInPage = roomBookingsInPage.filter(
        (booking: RichiestaPrenotazione) => booking.roomId === this.searchForm.roomId,
      )
    }

    if (this.searchForm.ente && this.roomsPerEnte) {
      const roomList = (Object.entries(this.roomsPerEnte).map(
        (value, index) => value,
      )[0][1] as any[]).map(x => x.id)
      console.log(roomList)
      // roomBookingsInPage = roomBookingsInPage.filter((booking: RichiestaPrenotazione) => {
      //   return roomList.find((room: any) => room.roomId === booking.roomId)
      // })
    }
    return roomBookingsInPage
  }

  sortNumeroPratica = (a, b) => a.numeroPratica.localeCompare(b.numeroPratica)
  sortNumbers = (a, b) => {
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
    return 0
  }

  sortByDataPrenotazione = (a: any, b: any) => {
    if (a.dataPrenotazione > b.dataPrenotazione) {
      return 1
    } else if (a.dataPrenotazione < b.dataPrenotazione) {
      return -1
    }
    return 0
  }

  getDateFormat = (date: string) => Formatter.asDate(date)
}
