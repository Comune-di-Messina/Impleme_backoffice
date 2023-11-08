import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as ApiActions from 'src/app/store/api/actions'
import * as Reducers from 'src/app/store/reducers'
import * as DateFns from 'date-fns'
import { EntiService, PagomeService } from 'src/app/services/api'
import { saveAs } from 'file-saver'
import { environment } from '../../../../environments/environment'

const merge = require('deepmerge')

@Component({
  selector: 'report-pagamenti-download-csv',
  templateUrl: './download-csv.component.html',
  styleUrls: ['./download-csv.component.scss'],
})
export class DownloadCsvComponent implements OnInit {
  categoryList: any[] = []

  validateForm: FormGroup

  saveFormError: String

  enti = []
  tributi = []

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private pagomeService: PagomeService,
    private entiService: EntiService,
  ) {
    this.store.pipe(select(Reducers.getApi)).subscribe(state => {
      this.enti = state.enti
    })
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      ente: [null, [Validators.required]],
      dataInizio: [null, []],
      dataFine: [null, []],
      idTributo: [null, []],
    })

    this.store.dispatch(new ApiActions.Enti())

    this.validateForm.get('ente').valueChanges.subscribe(val => {
      const ente = this.enti.find(e => e.id == val)
      if (ente) {
        this.loadTributi(ente)
      }
    })
  }

  ngOnDestroy() {}

  loadTributi(ente) {
    this.entiService.tributi(ente.codice).subscribe(data => {
      // console.log(data)
      this.tributi = data
    })
  }

  get enteOptions() {
    const options = this.enti
      ? this.enti.map(rc => {
          return {
            label: rc.descrizione,
            value: rc.id,
          }
        })
      : []

    return options
  }

  get idTributoOptions() {
    const options = this.tributi
      ? this.tributi.map(rc => {
          return {
            label: rc.DescrizioneTributo,
            value: rc.IDTributo,
          }
        })
      : []

    return options
  }

  async downloadCsv() {
    const formModel = {}

    for (var i in this.validateForm.controls) {
      formModel[i] = this.validateForm.controls[i].value
    }

    const model = merge({}, formModel)

    if (model.dataInizio) {
      model.dataInizio = DateFns.format(new Date(model.dataInizio), 'dd/MM/yyyy')
    }
    if (model.dataFine) {
      model.dataFine = DateFns.format(new Date(model.dataFine), 'dd/MM/yyyy')
    }

    //console.log(model);

    this.pagomeService
      .getReportPagamento(environment.ENTE_ID, model.idTributo, model.dataInizio, model.dataFine)
      .subscribe(res => {
        const blob = new Blob([res], { type: 'application/octet-stream' })
        const fileName = environment.REPORT_CSV_FILENAME
        saveAs(blob, fileName)
      })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }
    this.downloadCsv()
  }
}
