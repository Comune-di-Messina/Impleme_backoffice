import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'struttura-create-tab-info-base',
  templateUrl: './tab-info-base.component.html',
  styleUrls: ['./tab-info-base.component.scss'],
})
export class TabInfoBaseComponent implements OnInit {
  @Input() validateForm: FormGroup

  enti = []
  roomsCategories = []
  roomsTypologies = []
  isPreview = false

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
      this.roomsCategories = state.roomsCategories
      this.roomsTypologies = state.roomsTypologies
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new ApiActions.RoomsCategories())
    this.store.dispatch(new ApiActions.RoomsTypologies())
    this.store.dispatch(new ApiActions.Enti())
  }

  get categoriaOptions() {
    const options = this.roomsCategories
      ? this.roomsCategories.map(rc => {
          return {
            label: rc.categoria,
            value: rc.id,
          }
        })
      : []

    return options
  }

  get tipologiaOptions() {
    const options = this.roomsTypologies
      ? this.roomsTypologies.map(rc => {
          return {
            label: rc.tipo,
            value: rc.id,
          }
        })
      : []

    return options
  }

  get comuneOptions() {
    const options = this.enti
      ? this.enti.map(rc => {
          return {
            label: rc.descrizione,
            value: rc.codice,
          }
        })
      : []

    return options
  }
}
