import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { ReservationsService, RoomsCategoriesService, RoomsService } from 'src/app/services/api'
import * as ApiActions from 'src/app/store/api/actions'
import { select, Store } from '@ngrx/store'
import * as store from 'store'
import * as Reducers from 'src/app/store/reducers'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NuovaStruttura } from 'src/app/models/nuova-struttura'
import * as FormHelper from './form-helper'
import * as DateFns from 'date-fns'
import { DettaglioStruttura } from 'src/app/models/dettaglio-struttura'
import { v4 as uuid } from 'uuid'
import { ACLService } from 'src/app/services/acl'

const merge = require('deepmerge')

@Component({
  selector: 'struttura-form',
  templateUrl: './index.component.html',
})
export class FormComponent implements OnInit {
  @Input() roomId: string
  @Output() onSaveFormError = new EventEmitter<string[]>()
  @Output() onSaveFormSuccess = new EventEmitter<any>()
  @Output() canSendForm = new EventEmitter<boolean>()

  room: DettaglioStruttura

  categoryList: any[] = []

  validateForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private roomsCategoriesService: RoomsCategoriesService,
    private roomsService: RoomsService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private reservationsService: ReservationsService,
    private aclService: ACLService,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      aperture: this.fb.array([]),
      blocked: [null, []],
      capienza: [null, []],
      categoria: [null, []],
      catering: [null, []],
      comune: [null, [Validators.required]],
      condizioniUtilizzo: [null, [Validators.required]],
      eventi: this.fb.array([]),
      giorniAnticipo: [null, []],
      id: [uuid(), [Validators.required]],
      nome: [null, [Validators.required]],
      servizi: this.fb.array([]),
      tariffario: this.fb.array([]),
      terzeParti: [null, []],
      tipoStruttura: [null, [Validators.required]],
      riserve: this.fb.array([]),
    })

    this.validateForm.statusChanges.subscribe(data => {
      if (this.canSendForm) this.canSendForm.emit(data === 'VALID')
    })

    if (this.roomId) {
      this.loadModel()
    }
  }

  ngOnDestroy() {}

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

  get aperture() {
    return this.validateForm.get('aperture') as FormArray
  }
  get eventi() {
    return this.validateForm.get('eventi') as FormArray
  }
  get servizi() {
    return this.validateForm.get('servizi') as FormArray
  }
  get tariffario() {
    return this.validateForm.get('tariffario') as FormArray
  }
  get riserve() {
    return this.validateForm.get('riserve') as FormArray
  }

  loadModel() {
    const self = this

    this.roomsService.view(this.roomId).subscribe(data => {
      this.room = data

      self.validateForm.patchValue(data)

      // Aperture
      for (var i in data.aperture) {
        self.aperture.push(FormHelper.formGroupApertura(this.fb, data.aperture[i]))
      }

      // Eventi
      for (var i in data.eventi) {
        self.eventi.push(FormHelper.formGroupEvento(this.fb, data.eventi[i]))
      }

      // Servizi
      for (var i in data.servizi) {
        self.servizi.push(FormHelper.formGroupServizio(this.fb, data.servizi[i]))
      }

      // Tariffario
      for (var i in data.tariffario) {
        self.tariffario.push(FormHelper.formGroupTariffario(this.fb, data.tariffario[i]))
      }

      // Tariffario
      for (var i in data.riserve) {
        self.riserve.push(FormHelper.formGroupReservations(this.fb, data.riserve[i]))
      }
    })
  }

  getCategoryText(m) {
    const category = this.categoryList?.find(c => c.id == m.categoria)
    return category ? category.categoria : null
  }

  async saveStruttura() {
    const newModel = new NuovaStruttura()
    let invalid: number = 0
    for (var i in this.validateForm.controls) {
      if (this.validateForm.controls[i].status === 'INVALID') {
        invalid++
      }
      newModel[i] = this.validateForm.controls[i].value
    }

    if (invalid > 0) {
      //return
    }

    //newModel.id = uuid()

    const model = merge({}, newModel)

    for (var i in model.aperture) {
      if (model.aperture[i].oraDa)
        model.aperture[i].oraDa = DateFns.format(new Date(model.aperture[i].oraDa), 'kk:mm:ss')
      if (model.aperture[i].oraA)
        model.aperture[i].oraA = DateFns.format(new Date(model.aperture[i].oraA), 'kk:mm:ss')
    }

    if (model.terzeParti == null || model.terzeParti == undefined) model.terzeParti = false
    if (model.blocked == null || model.blocked == undefined) model.blocked = false
    if (model.catering == null || model.catering == undefined) model.catering = false
    if (model.giorniAnticipo == null || model.giorniAnticipo == undefined) model.giorniAnticipo = 0

    model.tariffario.forEach(tariffario => {
      if (!tariffario.flagInteraGiornata) {
        tariffario.costoInteraGiornata = undefined
        tariffario.flagInteraGiornata = false
      } else {
        tariffario.costoInteraGiornata = Number(tariffario.costoInteraGiornata)
        tariffario.flagInteraSettimana = false
      }
      if (!tariffario.flagInteraSettimana) {
        tariffario.costoSettimanale = undefined
        tariffario.flagInteraSettimana = false
      } else {
        tariffario.costoSettimanale = Number(tariffario.costoSettimanale)

        tariffario.costoOrario = undefined
        tariffario.flagInteraGiornata = false
      }
      tariffario.costoOrario = Number(tariffario.costoOrario)
      tariffario.costoFasce.forEach(costoFascia => {
        costoFascia.fasce.forEach(fascia => {
          if (fascia.oraDa) fascia.oraDa = DateFns.format(new Date(fascia.oraDa), 'kk:mm:ss')
          if (fascia.oraA) fascia.oraA = DateFns.format(new Date(fascia.oraA), 'kk:mm:ss')
        })
      })
      if (tariffario.flagInteraGiornata || tariffario.flagInteraSettimana) {
        tariffario.costoFasce = undefined
      }
    })

    for (var i in model.riserve) {
      if (model.riserve[i].giornoDa)
        model.riserve[i].giornoDa = DateFns.format(
          new Date(model.riserve[i].giornoDa),
          'yyyy-MM-dd',
        )
      if (model.riserve[i].oraDa)
        model.riserve[i].oraDa = DateFns.format(new Date(model.riserve[i].oraDa), 'kk:mm:ss')
      if (model.riserve[i].giornoA)
        model.riserve[i].giornoA = DateFns.format(new Date(model.riserve[i].giornoA), 'yyyy-MM-dd')
      if (model.riserve[i].oraA)
        model.riserve[i].oraA = DateFns.format(new Date(model.riserve[i].oraA), 'kk:mm:ss')
    }

    try {
      const apiMethod = this.roomId
        ? this.roomsService.update(model)
        : this.roomsService.create(model)
      const data = await apiMethod.toPromise()
      if (data) {
        await this.saveReservations(data, model.riserve)
      }
      // console.log('save struttura', data)

      if (this.onSaveFormSuccess) this.onSaveFormSuccess.emit(data)
    } catch (error) {
      console.log('error', error)
      // var errorSave = null
      // if (error.error && error.error.message) {
      //   errorSave = error.error.message
      // } else {
      //   errorSave = error.error.message
      // }
      if (this.onSaveFormError) {
        this.onSaveFormError.emit(error.error.errors)
      }
    }
  }

  async saveReservations(struttura, reservations) {
    for (var i in reservations) {
      const reservation = reservations[i]
      // console.log('saveReservation', reservation)
      if ('id' in reservation && reservation.id) {
        // await this.reservationsService.update(struttura.id, reservation).toPromise()
      } else {
        await this.reservationsService.create(struttura.id, reservation).toPromise()
      }
    }

    const reservationsToDelete = []
    struttura.riserve.filter(r1 => {
      const foundR = reservations.find(r2 => {
        return r1.id == r2.id
      })
      if (!foundR) {
        reservationsToDelete.push(r1)
      }
    })
    for (var i in reservationsToDelete) {
      const r = reservationsToDelete[i]
      await this.reservationsService.delete(struttura.id, r.id).toPromise()
    }

    // console.log('reservations to deleted', reservationsToDelete)
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }
    this.saveStruttura()
  }
}
