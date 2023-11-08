import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as Reducers from 'src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import { RoomsService } from 'src/app/services/api'
import { NzModalService } from 'ng-zorro-antd'
import { ACLService } from 'src/app/services/acl'
import { APP_ROUTING_ACL } from 'src/app/app-routing-acl'
import * as Formatter from 'src/app/utils/formatters'
import { RichiestaPrenotazione } from '../../../models/richiesta-prenotazione'
import { Subscription } from 'rxjs'
import * as BookingsActions from '../../../store/bookings/actions'
import * as MunicipalitiesActions from '../../../store/municipalities/actions'
import * as RoomsActions from '../../../store/rooms/actions'

@Component({
  selector: 'app-closed-bookings-list',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.scss'],
})
export class ClosedBookingsListComponent implements OnInit {
  bookingsStoreSubscription: Subscription
  roomsStoreSubscription: Subscription
  municipalitiesStoreSubscription: Subscription
  bookings_closed = []
  stati = []
  enti = []
  rooms = []
  scrollSize = '0px'
  loading = false
  loadingRooms = false
  loadingBookings = false
  loadingEnti = false
  searchForm = {
    id: null,
    numeroPratica: null,
    ente: null,
    roomId: null,
    dataPrenotazioneRange: [],
    giornoDaRange: [],
    giornoARange: [],
    stato: null,
  }

  searchFiltersVisible = {
    id: false,
    numeroPratica: false,
    ente: false,
    roomId: false,
    dataPrenotazioneRange: false,
    giornoDaRange: false,
    giornoARange: false,
    stato: false,
  }

  constructor(
    private roomsService: RoomsService,
    private router: Router,
    private store: Store<any>,
    private modal: NzModalService,
    private aclService: ACLService,
  ) {
    this.bookingsStoreSubscription = this.store
      .pipe(select(Reducers.getBookings))
      .subscribe(state => {
        this.scrollSize = `${window.innerHeight - 480}px`
        this.bookings_closed = state.bookings_closed
        this.stati = state.stati.filter(x => x.id >= 5) // Solo stati chiusi, di qua
        this.loadingBookings = state.loading
      })
    this.municipalitiesStoreSubscription = this.store
      .pipe(select(Reducers.getMunicipalities))
      .subscribe(state => {
        this.loadingEnti = state.loading
        this.enti = state.enti
      })
    this.roomsStoreSubscription = this.store.pipe(select(Reducers.getRooms)).subscribe(state => {
      this.loadingRooms = state.loading
      this.rooms = state.rooms
    })
  }
  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new BookingsActions.StatesLoading())
      this.store.dispatch(new BookingsActions.BookingsLoading())
      this.store.dispatch(new MunicipalitiesActions.MunicipalitiesLoading())
      this.store.dispatch(new RoomsActions.RoomsRequestAll())
    }, 100)
  }

  ngOnDestroy() {
    this.bookingsStoreSubscription.unsubscribe()
    this.municipalitiesStoreSubscription.unsubscribe()
  }

  revocabile(booking) {
    return (
      this.aclService.checkUserRole(APP_ROUTING_ACL['prenotazione-sala/revoca']) &&
      booking.stato === 5
    )
  }

  get stateLoading() {
    return this.loadingRooms || this.loadingBookings || this.loadingEnti || this.loading
  }

  getStati() {
    return this.stati
  }

  getEnti() {
    return this.enti
  }

  getRooms() {
    return this.rooms
  }

  getRoomNome(roomId) {
    const room = this.rooms.find(room => room.id === roomId)
    return room ? room.nome : roomId
  }

  getEnteDescrizione(codiceEnte) {
    const ente = this.enti?.find(e => e.codice === codiceEnte)
    return ente ? ente.descrizione : codiceEnte
  }

  getStatoName(stato) {
    const y = this.stati.find(x => x.id === stato)
    return y ? y.stato : stato
  }

  getStatusColor(statusId: number) {
    switch (statusId) {
      case 1: // Richiesta Pagamento
      case 2: // Richiesta Documentazione
      case 3: // Inserita
        return 'gold'
      case 4: // In lavorazione
        return 'blue'
      case 5:
        // Validata
        return 'green'
      case 6: // Respinta
      case 7: // Annullata
      case 8: // Revocata
        return 'volcano'
      default:
        return 'blue'
    }
  }

  onViewModel(m) {
    // console.log([`/prenotazione-sala/view/${m.numeroPratica}`])
    this.router.navigate([`/prenotazione-sala/view/${m.numeroPratica}`])
  }

  onDeleteModel(m) {
    this.router.navigate([`/prenotazione-sala/revoca/${m.numeroPratica}`])
  }

  onDataPrenotazioneRangeChange(event) {
    this.searchForm.dataPrenotazioneRange = event
  }

  onGiornoDaRangeChange(event) {
    this.searchForm.giornoDaRange = event
  }

  onGiornoARangeChange(event) {
    this.searchForm.giornoARange = event
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
        dataPrenotazioneRange: [],
        giornoDaRange: [],
        giornoARange: [],
        stato: null,
      }
    }
  }

  search(): any[] {
    this.loading = true
    let roomBookingsInPage = Object.assign([], this.bookings_closed)
    this.searchFiltersVisible = {
      id: false,
      numeroPratica: false,
      ente: false,
      roomId: false,
      dataPrenotazioneRange: false,
      giornoDaRange: false,
      giornoARange: false,
      stato: false,
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

    if (this.searchForm.stato) {
      roomBookingsInPage = roomBookingsInPage.filter(
        (booking: RichiestaPrenotazione) => booking.stato === this.searchForm.stato,
      )
    }

    if (this.searchForm.roomId) {
      roomBookingsInPage = roomBookingsInPage.filter(
        (booking: RichiestaPrenotazione) => booking.roomId === this.searchForm.roomId,
      )
    }

    if (this.searchForm.ente) {
      roomBookingsInPage = roomBookingsInPage.filter((booking: RichiestaPrenotazione) => {
        const room = this.rooms.find(room => room.id === booking.roomId)
        return room.comune === this.searchForm.ente
      })
    }

    if (this.searchForm.dataPrenotazioneRange.length) {
      roomBookingsInPage = roomBookingsInPage.filter((booking: RichiestaPrenotazione) => {
        const dataPrenotazione = new Date(booking.dataPrenotazione)
        return (
          dataPrenotazione >= this.searchForm.dataPrenotazioneRange[0] &&
          dataPrenotazione <= this.searchForm.dataPrenotazioneRange[1]
        )
      })
    }

    if (this.searchForm.giornoDaRange.length) {
      roomBookingsInPage = roomBookingsInPage.filter((booking: RichiestaPrenotazione) => {
        const lowerLimit = (this.searchForm.giornoDaRange[0] as Date).setHours(0, 0, 0, 0)
        const upperLimit = (this.searchForm.giornoDaRange[1] as Date).setHours(23, 59, 59, 999)
        const giornoDa = Date.parse(booking.giornoDa)
        return giornoDa >= lowerLimit && giornoDa <= upperLimit
      })
    }

    if (this.searchForm.giornoARange.length) {
      roomBookingsInPage = roomBookingsInPage.filter((booking: RichiestaPrenotazione) => {
        const giornoA = Date.parse(booking.dataPrenotazione)
        const lowerLimit = (this.searchForm.giornoARange[0] as Date).setHours(0, 0, 0, 0)
        const upperLimit = (this.searchForm.giornoARange[1] as Date).setHours(23, 59, 59, 999)
        return giornoA >= lowerLimit && giornoA <= upperLimit
      })
    }
    this.loading = false
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
  formatCurrency = (value: number) => Formatter.asCurrency(value)
}
