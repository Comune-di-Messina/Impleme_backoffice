import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TipologiaPratica } from '../../../../models/passi-carrabili/pratiche'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-type-update',
  templateUrl: './type-update.component.html',
  styleUrls: ['./type-update.component.scss'],
})
export class TypeUpdateComponent implements OnInit {
  tipologia: TipologiaPratica
  isEditable: boolean = false
  validateForm: FormGroup
  imageUpload: string
  errorSave: string
  successMessage: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private managePraticheService: ManagePraticheService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { tipologiaResponse: TipologiaPratica; edit: boolean }) => {
      this.tipologia = data.tipologiaResponse
      this.isEditable = data.edit

      this.validateForm = this.fb.group({
        codice: [this.tipologia.codice, [Validators.required]],
        nome: [this.tipologia.nome, [Validators.required]],
        importo: [this.tipologia.importo, [Validators.required, Validators.min(1)]],
        descrizione: [this.tipologia.descrizione],
        libero: [this.tipologia.libero],
        note: [this.tipologia.note],
      })

      console.log(
        {
          edit: data.edit,
          tipologia: this.tipologia,
        },
        'Get data',
      )
    })
  }

  onImageChanged(files: File[]) {
    if (files[0]) {
      const isLt1M = files[0].size! / 1024 / 1024 < 1
      if (!isLt1M) {
        ;(this.errorSave = 'Si è verificato un errore'),
          'Dimensione del file non accettato. Max 1MB.'
        return
      }

      this.getBase64(files[0], (img: string) => {
        this.imageUpload = img
      })
    }
  }

  saveModel() {
    this.errorSave = null
    if (!this.isEditable) {
      return
    }

    const model: TipologiaPratica = {
      id: this.tipologia.id,
      codice: this.validateForm.controls['codice'].value,
      nome: this.validateForm.controls['nome'].value,
      importo: this.validateForm.controls['importo'].value,
      descrizione: this.validateForm.controls['descrizione'].value,
      img: this.imageUpload ? this.imageUpload.split(',')[1] : this.tipologia.img,
      libero: this.validateForm.controls['libero'].value,
      note: this.validateForm.controls['note'].value,
    }

    this.managePraticheService.editType(model).subscribe(
      data => {
        this.msg.success('Tipologia modificata con successo')
        this.tipologia = data
      },
      error => {
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
    this.saveModel()
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result!.toString()))
    reader.readAsDataURL(img)
  }
}
