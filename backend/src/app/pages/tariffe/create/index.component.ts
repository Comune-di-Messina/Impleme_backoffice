import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { TariffeService } from 'src/app/services/api/tributi/tariffe'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'pagopa-tariffe-create',
  templateUrl: './index.component.html',
  styles: [
    `
      nz-date-picker ::ng-deep .ant-calendar-picker {
        width: 100%;
      }

      nz-date-picker,
      nz-time-picker {
        width: 100%;
      }
    `,
  ],
})
export class TariffeCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tariffeService: TariffeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  validateForm: FormGroup
  errorSave: null
  idTributo: null

  saveTributo() {
    this.errorSave = null

    const model = {
      ente: environment.ENTE_ID,
      idTributo: this.idTributo,
    }
    for (var i in this.validateForm.controls) {
      model[i] = this.validateForm.controls[i].value
    }

    // console.log('saveTariffa', this.validateForm, model);

    this.tariffeService.create(model).subscribe(
      data => {
        // console.log(data);
        this.router.navigate(['/tariffe/index', { idTributo: this.idTributo }])
      },
      error => {
        // console.log('error', error);
        if (error.error && error.error.message) {
          this.errorSave = error.error.message
        } else {
          this.errorSave = error.message
        }
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
    this.saveTributo()
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)
  parserEuro = (value: string) => value.replace(' €', '')

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      // console.log('routeParams', routeParams);
      this.idTributo = routeParams.idTributo
    })

    this.validateForm = this.fb.group({
      descrizione: [null, [Validators.required]],
      importoUnitario: [null, [Validators.required]],
      peg: [null, [Validators.required]],
      isImportoEditable: [null, [Validators.required]],
      isQuantitaEditable: [null, [Validators.required]],
      quantita: [null, [Validators.required]],
    })

    /*
    this.validateForm.controls['IDTributo'].setValue(999);
    this.validateForm.controls['NomeTributo'].setValue("Nome tributo");
    this.validateForm.controls['anno'].setValue(2020);
    this.validateForm.controls['dirittiSegreteria'].setValue(1);
    this.validateForm.controls['giorniScadenza'].setValue(30);
    this.validateForm.controls['pagaDirittiSegreteria'].setValue(1);
    this.validateForm.controls['DescrizioneTributo'].setValue("DescrizioneTributo");
    this.validateForm.controls['TipoTributo'].setValue("AA");
    this.validateForm.controls['descrizioneRT'].setValue("descrizioneRT");
    this.validateForm.controls['sottotipo'].setValue("AA");
    this.validateForm.controls['spontaneo'].setValue(1);
    */
  }
}
