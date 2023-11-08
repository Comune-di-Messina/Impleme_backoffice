import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TributiService } from 'src/app/services/api/tributi/tributi'
import { ActivatedRoute, Router } from '@angular/router'
import { v4 as uuid } from 'uuid'
import { format } from 'date-fns'

@Component({
  selector: 'pagopa-tributi-create',
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
export class TributiCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tributiService: TributiService,
    private router: Router,
  ) {}

  validateForm: FormGroup
  errorSave: null
  errorMessage: string = null
  successMessage: string = null

  saveTributo() {
    this.errorSave = null

    const model = {}
    for (var i in this.validateForm.controls) {
      if (i === 'DataAttivazione' && this.validateForm.controls[i].value) {
        model[i] = format(this.validateForm.controls[i].value, 'yyyy-MM-dd HH:mm:00')
      } else {
        model[i] = this.validateForm.controls[i].value
      }
    }

    this.tributiService.create(model).subscribe(
      data => {
        this.successMessage =
          'Tributo creato con successo. Verrai adesso rimandato sulla lista dei tributi'
        window.scrollTo(0, 0)
        setTimeout(() => {
          this.router.navigate(['/tributi/index'])
        }, 1500)
      },
      error => {
        const errors = error.error.errors
        if (typeof errors !== 'undefined' && Array.isArray(errors)) {
          this.errorMessage = errors.join('<br />')
        } else {
          this.errorMessage =
            'Non è stato possibile creare il tributo. Controllare i campi inseriti o riprovare in seguito.'
        }
        window.scrollTo(0, 0)
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
    this.validateForm = this.fb.group({
      // IDTributo: [null],
      DescrizioneTributo: [''],
      NomeTributo: ['', [Validators.required]],
      TipoTributo: [''],
      anno: [0, [Validators.required]],
      DataAttivazione: [this.topOfTheHour(new Date()), Validators.required],
      descrizioneRT: [''],
      giorniScadenza: [0, [Validators.required]],
      pagaDirittiSegreteria: [false, [Validators.required]],
      sottotipo: [''],
      spontaneo: [false],
      validazione: [false, [Validators.required]],
    })

    // this.validateForm.controls['IDTributo'].setValue(999)
  }

  get currentYear() {
    return new Date().getFullYear()
  }

  topOfTheHour(date: Date): Date {
    date.setSeconds(0)
    if (date.getMinutes() != 0 && date.getMinutes() != 30) date.setMinutes(0)
    return date
  }

  formatterEuro = (value: number) => (value ? `${value} €` : `0.00 €`)
  parserEuro = (value: string) => value.replace(' €', '')
}
