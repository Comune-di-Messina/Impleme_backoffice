import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import * as Reducers from 'src/app/store/reducers'
import * as DateFns from 'date-fns'
import { EntiService, PagomeService } from 'src/app/services/api'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import { ActivatedRoute, Router } from '@angular/router'

const merge = require('deepmerge')

@Component({
  selector: 'prenotazione-sala-revoca',
  templateUrl: './revoca.component.html',
  styleUrls: ['./revoca.component.scss'],
})
export class PrenotazioneSalaRevocaComponent implements OnInit {
  numeroPratica: string

  validateForm: FormGroup

  saveFormError: String

  subRoute: any = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>,
    private roomBookingService: RoomBookingBookingsService,
    private entiService: EntiService,
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      motivo: [null, [Validators.required]],
    })

    this.subRoute = this.route.params.subscribe(params => {
      this.numeroPratica = params.numeroPratica
    })
  }

  ngOnDestroy() {}

  deleteModel() {
    const motivo = this.validateForm.get('motivo').value

    this.roomBookingService.delete(this.numeroPratica, motivo).subscribe(
      data => {
        this.router.navigate(['/prenotazione-sala/index'])
      },
      error => {
        // console.log('error', error)
        this.saveFormError = error.error.message
      },
    )
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }
    this.deleteModel()
  }
}
