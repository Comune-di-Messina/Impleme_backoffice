import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ACLService } from 'src/app/services/acl'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import { UserTasksService } from 'src/app/services/api/user-tasks'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import * as Reducers from 'src/app/store/reducers'
import { RoomsService } from 'src/app/services/api'
import * as Formatter from 'src/app/utils/formatters'
import { Subscription } from 'rxjs'

@Component({
  selector: 'user-tasks-assignee',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class AssigneeComponent implements OnInit {
  storeSubscription: Subscription
  listOfColumns = []
  taskList = []
  taskListInPage = []
  roomBookingList = []

  enti = []
  roomsPerEnte = {}
  scrollSize = '0px'

  constructor(
    private store: Store<any>,
    private roomBookingService: RoomBookingBookingsService,
    private roomsService: RoomsService,
    private router: Router,
    private userTaskService: UserTasksService,
    private aclService: ACLService,
  ) {
    this.storeSubscription = this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
      this.scrollSize = `${window.innerHeight - 480}px`

      this.loadRooms()
    })
  }

  ngOnInit() {
    this.loadAssigneeList()
    this.store.dispatch(new ApiActions.Enti())
    this.store.dispatch(new ApiActions.RoomBookings())
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
      task.roomBooking = this.roomBookingList.find(
        (rb: any) => rb.numeroPratica === task.variablesObj.idCaseFile,
      )
    }
    // console.log(this.taskList)
  }

  loadRooms() {
    if (this.roomBookingList && this.enti) {
      for (var i in this.roomBookingList) {
        this.roomsPerEnte[this.roomBookingList[i].ente] = []
      }
      for (var i in this.roomsPerEnte) {
        this.roomsPerEnte[i] = []
        this.loadRoomsPerEnte(i)
      }
      setTimeout(() => {
        this.listOfColumns = this.generateColumns()
      }, 10)
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

  loadAssigneeList() {
    this.roomBookingService.list().subscribe(data => {
      this.roomBookingList = data
      this.updateRoomBookingList()

      this.loadRooms()
    })

    this.userTaskService.assigneeList().subscribe(data => {
      this.taskList = data
      for (var i in this.taskList) {
        const task: any = this.taskList[i]
        task.variablesObj = JSON.parse(task.variables)
      }
      this.updateRoomBookingList()
    })
  }

  onUpdateModel(m) {
    // console.log(`/user-tasks/update/${m.key}/${m.variablesObj.idCaseFile}`)
    this.router.navigate([`/user-tasks/update/${m.key}/${m.variablesObj.idCaseFile}`])
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
}
