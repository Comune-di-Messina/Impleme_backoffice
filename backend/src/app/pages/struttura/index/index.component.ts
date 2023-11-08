import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { EntiService, RoomsCategoriesService, RoomsService } from 'src/app/services/api'
import * as ApiActions from 'src/app/store/api/actions'
import { select, Store } from '@ngrx/store'
import { environment } from 'src/environments/environment'
import * as Reducers from 'src/app/store/reducers'
import { ACLService } from 'src/app/services/acl'
import * as Formatter from '../../../utils/formatters'

@Component({
  selector: 'struttura-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  listOfColumns = []
  rooms: any[] = null
  roomsInPage = []
  isLoadingRooms: boolean
  subRoute: any = null
  scrollSize = '0px'
  successMessage = null
  errorMessage = null
  categories: any[] = []
  enti: any[] = []

  constructor(
    private store: Store<any>,
    private aclService: ACLService,
    private roomsService: RoomsService,
    private entiService: EntiService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
  ) {
    this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.categories = state.roomsCategories
      this.enti = state.enti
      this.scrollSize = `${window.innerHeight - 480}px`
    })
  }

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.store.dispatch(new ApiActions.RoomsCategories())
      this.store.dispatch(new ApiActions.Enti())
      this.loadRooms()
    })
  }

  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe()
    }
    this.subRoute = null
  }

  getAclService() {
    return this.aclService
  }

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  loadRooms() {
    this.isLoadingRooms = true

    this.roomsService.index(environment.ENTE_ID).subscribe(data => {
      this.isLoadingRooms = false
      this.rooms = data
      this.listOfColumns = this.generateColumns()
    })
  }

  getCategoryText(m) {
    const category = this.categories?.find(c => c.id === m.categoria)
    return category ? category.categoria : null
  }

  getEnteText(m) {
    const ente = this.enti?.find(c => c.codice === m)
    return ente ? ente.descrizione : null
  }

  onPreviewModel(m) {
    // console.log(`/struttura/preview/${m.id}`)
    this.router.navigate([`/struttura/details/${m.id}`])
  }

  onUpdateModel(m) {
    // console.log(`/struttura/update/${m.id}`)
    this.router.navigate([`/struttura/update/${m.id}`])
  }

  onCreateModel() {
    this.router.navigate(['/struttura/create'])
  }

  deleteModel(m) {
    this.roomsService.delete(m.id).subscribe(
      data => {
        this.successMessage = 'Struttura eliminata con successo. Ricarico la lista delle strutture'
        this.errorMessage = null
        setTimeout(() => {
          this.loadRooms()
        })
      },
      error => {
        this.errorMessage = error.error.message.replace('&ograve;', 'ò')
        this.successMessage = null
        setTimeout(() => {
          this.loadRooms()
        })
      },
    )
  }

  onDeleteModel(m) {
    this.modal.confirm({
      nzTitle: 'Sicuro di voler eliminare questa voce?',
      nzOkText: 'Si',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.deleteModel(m)
      },
      nzCancelText: 'No',
    })
  }

  generateColumns() {
    const headers = [
      {
        name: 'Nome',
        key: x => x.nome,
      },
      // {
      //   name: 'Categoria',
      //   key: x => this.getCategoryText(x),
      // },
      {
        name: 'Comune',
        key: x => this.getEnteText(x.comune),
      },
      // {
      //   name: 'Aperture',
      //   noFilter: true,
      // },
      // {
      //   name: 'Servizi',
      //   noFilter: true,
      // },
      {
        name: 'Azioni',
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
              this.rooms
                .map(x => {
                  return { text: header.key(x), value: header.key(x) }
                })
                .reduce((m, t) => m.set(t.value, t), new Map())
                .values(),
            ),
            filterFn: (list: string[], item) =>
              list.some(value => header.key(item).indexOf(value) !== -1),
          }
        : { name: header.name }
    })
  }

  onCurrentPageDataChange(roomsInPage) {
    this.roomsInPage = roomsInPage
  }
}
