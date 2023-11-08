import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AttributiService } from 'src/app/services/api/tributi/attributi'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'pagopa-attributi-create',
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
export class AttributiCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private attributiService: AttributiService,
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

    this.attributiService.create(model).subscribe(
      data => {
        // console.log(data);
        this.router.navigate(['/attributi/index', { idTributo: this.idTributo }])
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

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      // console.log('routeParams', routeParams);
      this.idTributo = routeParams.idTributo
    })

    this.validateForm = this.fb.group({
      campo: [null, [Validators.required]],
      editabile: [null, [Validators.required]],
      obbligatorio: [null, [Validators.required]],
      ripetibile: [null, [Validators.required]],
      tipoDato: [null, [Validators.required]],
      causaleTemplate: [null, [Validators.required]],
      jsonKey: [null, [Validators.required]],
      lookup: [null, [Validators.required]],
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
