import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { EntiService, RoomsCategoriesService, RoomsService } from 'src/app/services/api'
import * as ApiActions from 'src/app/store/api/actions'
import { select, Store } from '@ngrx/store'
import { environment } from '../../../../environments/environment'
import { Subscription } from 'rxjs'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'struttura-preview',
  templateUrl: './index.component.html',
})
export class PreviewComponent implements OnInit {
  @Input() roomId: string
  storeSubscription: Subscription
  subRoute: any = null
  room: any = null
  enti: any[]
  tipologieStrutture: any[]
  categorieStrutture: any[]

  constructor(
    private store: Store<any>,
    private roomsCategoriesService: RoomsCategoriesService,
    private roomsService: RoomsService,
    private entiService: EntiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.store.dispatch(new ApiActions.RoomsCategories())
    this.store.dispatch(new ApiActions.RoomsTypologies())
    this.store.dispatch(new ApiActions.Enti())
    this.subRoute = this.route.params.subscribe(params => {
      this.roomId = params.roomId
      this.roomsService.view(this.roomId).subscribe(data => {
        this.room = data
        this.room.tariffario = this.room.tariffario.map(tariffa => ({
          ...tariffa,
          showCostiFascia: false,
        }))
        this.room.comune = this.enti.find(ente => ente.codice === this.room.comune).descrizione
        console.log(this.categorieStrutture)
        // categoria; tipoStruttura
        this.room.categoria = this.categorieStrutture.find(
          categoria => categoria.id === this.room.categoria,
        ).categoria
        this.room.tipoStruttura = this.tipologieStrutture.find(
          tipo => tipo.id === this.room.tipoStruttura,
        ).tipo
      })
    })
    this.storeSubscription = this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
      this.categorieStrutture = state.roomsCategories
      this.tipologieStrutture = state.roomsTypologies
    })
  }

  get aperture() {
    return this.room.aperture
  }

  getCostoFascia(idEvento: number): any[] {
    return this.room.tariffario.find(riga => riga.id === idEvento).costoFasce
  }

  get drupalBaseUrl() {
    return environment.DRUPAL_BASEURL
  }

  toggleCostiFasce(idEvento) {
    const tariffa = this.room.tariffario.find(riga => riga.id === idEvento)
    tariffa.showCostiFasce = !tariffa.showCostiFasce
  }

  toggleFasce(idEvento, giorno) {
    const fascia = this.room.tariffario
      .find(riga => riga.id === idEvento)
      .costoFasce.find(riga => riga.giorno === giorno)
    console.log(fascia)
    fascia.showFasce = !fascia.showFasce
    console.log(fascia)
  }

  get infoBase() {
    if (this.room) {
      return {
        id: this.room.id,
        nome: this.room.nome,
        comune: this.room.comune,
        tipoStruttura: this.room.tipoStruttura,
        categoria: this.room.categoria,
        giorniAnticipo: this.room.giorniAnticipo,
        catering: this.room.catering,
        terzeParti: this.room.terzeParti,
        blocked: this.room.blocked,
        capienza: this.room.capienza,
      }
    } else {
      return {}
    }
  }

  get riserve() {
    return this.room.riserve
  }

  get servizi() {
    return this.room.servizi
  }

  get tariffario() {
    return this.room.tariffario
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)

  generateCostoFasciaHeader(eventoId) {
    const costoFascia = this.getCostoFascia(eventoId)
    return costoFascia.map(fascia => fascia.giorno)
  }
  ngOnDestroy() {}
}
