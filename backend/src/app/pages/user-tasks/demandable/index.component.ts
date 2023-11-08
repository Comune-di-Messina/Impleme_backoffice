import { Component, OnInit } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { ACLService } from 'src/app/services/acl'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import { UserTasksService } from 'src/app/services/api/user-tasks'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import * as Reducers from 'src/app/store/reducers'
import { RoomsService } from 'src/app/services/api'
import * as Formatter from 'src/app/utils/formatters'
import { RichiestaPrenotazione } from '../../../models/richiesta-prenotazione'
import { Subscription } from 'rxjs'

@Component({
  selector: 'user-tasks-demandable',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class DemandableComponent implements OnInit {
  storeSubscription: Subscription
  listOfColumns = []
  taskList = []
  taskListInPage = []
  roomBookingsList = []
  enti = []
  roomsPerEnte = {}
  scrollSize = '0px'

  searchForm = {
    id: null,
    numeroPratica: null,
  }

  searchFiltersVisible = {
    id: false,
    numeroPratica: false,
  }

  constructor(
    private store: Store<any>,
    private modal: NzModalService,
    private aclService: ACLService,
    private userTaskService: UserTasksService,
    private roomBookingService: RoomBookingBookingsService,
    private roomsService: RoomsService,
  ) {
    this.storeSubscription = this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
      this.scrollSize = `${window.innerHeight - 480}px`

      this.roomBookingsList = state.roomBookings
      // this.enti.forEach(ente => this.loadRoomsPerEnte(ente))
      this.loadRooms()
      this.loadDemandableList()
    })
  }

  ngOnInit() {
    this.store.dispatch(new ApiActions.RoomBookings())
    this.store.dispatch(new ApiActions.Enti())
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe()
  }

  getAclService() {
    return this.aclService
  }

  updateRoomBookingList() {
    for (var i in this.taskList) {
      const task: any = this.taskList[i]
      task.roomBooking = this.roomBookingsList.find(
        (rb: any) => rb.numeroPratica === task.variables.idCaseFile,
      )
    }
    // console.log(this.taskList)
  }

  loadRooms() {
    if (this.roomBookingsList) {
      for (var i in this.roomBookingsList) {
        this.roomsPerEnte[this.roomBookingsList[i].ente] = []
      }
      for (var i in this.roomsPerEnte) {
        this.roomsPerEnte[i] = []
        this.loadRoomsPerEnte(i)
      }
      // setTimeout(() => {
      //   this.listOfColumns = this.generateColumns()
      // }, 10)
    }
  }

  getRoomNome(roomBooking) {
    if (roomBooking) {
      const ente = roomBooking.ente as string
      const room = this.roomsPerEnte[ente]?.find(r => r.id === roomBooking.roomId)
      return room ? room.nome : roomBooking.roomId
    } else {
      return roomBooking.roomId
    }
  }

  getEnteNome(codice) {
    if (this.enti) {
      const ente = this.enti.find(ente => ente.codice === codice)
      return ente ? ente.descrizione : codice
    } else {
      return codice
    }
  }

  loadRoomsPerEnte(ente) {
    this.roomsService.index(ente).subscribe(data => {
      this.roomsPerEnte[ente] = data
    })
  }

  loadDemandableList() {
    this.userTaskService.demandableList().subscribe(data => {
      this.taskList = []
      data.forEach((task: any) => {
        if (this.roomBookingsList) {
          const booking = this.roomBookingsList.find(
            (booking: RichiestaPrenotazione) =>
              booking.numeroPratica === JSON.parse(task.variables).idCaseFile,
          )
          if (booking) {
            const newTask = { ...task, booking: booking }
            this.taskList.push(newTask)
          }
        }
      })
    })
  }

  claimTask(task, cb) {
    this.userTaskService.claim(task.key).subscribe(data => {
      cb()
    })
  }

  onClaim(m) {
    this.modal.confirm({
      nzTitle: 'Confermi di voler prendere in carico questa prenotazione?',
      nzCancelText: 'Annulla',
      nzOnOk: () => {
        this.claimTask(m, () => {
          this.loadDemandableList()
        })
      },
    })
  }

  generateColumns() {
    const headers = [
      {
        name: 'id',
        key: x => x.roomBooking?.id,
      },
      {
        name: 'Numero pratica',
        key: x => x.roomBooking?.numeroPratica,
      },
      {
        name: 'Data pren.',
        key: x => x.roomBooking?.dataPrenotazione,
      },
      {
        name: 'Tit. evento',
        key: x => x.roomBooking?.titoloEvento,
      },
      {
        name: 'Desc. evento',
        key: x => x.roomBooking?.descrizioneEvento || '',
      },
      {
        name: 'Sala',
        key: x => x.roomBooking?.nome,
      },
      {
        name: 'Giorno Da',
        key: x => Formatter.asDate(x.roomBooking?.giornoDa),
      },
      {
        name: 'Giorno A',
        key: x => Formatter.asDate(x.roomBooking?.giornoA),
      },
      {
        name: 'Ora Da',
        key: x => x.roomBooking?.oraDa,
      },
      {
        name: 'Ora A',
        key: x => x.roomBooking?.oraA,
      },
      {
        name: 'Importo',
        key: x => Formatter.asCurrency(x.roomBooking?.importo),
      },
      {
        name: 'Importo servizi',
        key: x => Formatter.asCurrency(x.roomBooking?.importoServizi),
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
            sortFn: (a, b) => {
              return header
                .key(a)
                .toString()
                .localeCompare(header.key(b).toString())
            },
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            listOfFilter: Array.from(
              this.taskList
                .map(x => {
                  return { text: header.key(x), value: header.key(x) }
                })
                .reduce((m, t) => m.set(t.value, t), new Map())
                .values(),
            ).sort((a, b) => (a.text.toString() > b.text.toString() ? 1 : -1)),
            filterFn: (list: string[], item) => {
              return list.some(value => {
                return (
                  header
                    .key(item)
                    .toString()
                    .indexOf(value.toString()) !== -1
                )
              })
            },
          }
        : { name: header.name }
    })
  }

  onCurrentPageDataChange(taskListInPage) {
    this.taskListInPage = taskListInPage
  }

  resetSearch(value?: string): void {
    if (value) {
      this.searchForm[value] = null
    } else {
      this.searchForm = {
        id: null,
        numeroPratica: null,
      }
    }
  }

  search(): any[] {
    let taskListInPage = Object.assign([], this.taskList)
    this.searchFiltersVisible = {
      id: false,
      numeroPratica: false,
    }
    if (this.searchForm.id) {
      taskListInPage = taskListInPage.filter((task: any) => {
        return task.booking.id.toString().indexOf(this.searchForm.id.toString()) !== -1
      })
    }

    if (this.searchForm.numeroPratica) {
      taskListInPage = taskListInPage.filter((task: any) => {
        return task.booking.numeroPratica.indexOf(this.searchForm.numeroPratica) !== -1
      })
    }
    return taskListInPage
  }

  sortNumeroPratica = (a, b) => a.booking.numeroPratica.localeCompare(b.booking.numeroPratica)
  sortID = (a, b) => {
    if (a.booking.id > b.booking.id) {
      return 1
    } else if (a.booking.id < b.booking.id) {
      return -1
    } else {
      return 0
    }
  }

  getDateFormat(date: string) {
    return Formatter.asDate(date)
  }
}
