import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'
import { TipologiaPratica } from '../../../../models/passi-carrabili/pratiche'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
})
export class TypeComponent implements OnInit {
  validateForm: FormGroup
  imageUpload: string
  errorSave: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private managePraticheService: ManagePraticheService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      codice: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      importo: [null, [Validators.required, Validators.min(1)]],
      descrizione: [null],
      libero: [null],
      note: [null],
    })
  }

  onImageChanged(files: File[]) {
    if (files[0]) {
      const isLt1M = files[0].size! / 1024 / 1024 < 1
      if (!isLt1M) {
        this.msg.error('Dimensione del file non accettato. Max 1MB.')
        return
      }

      this.getBase64(files[0], (img: string) => {
        this.imageUpload = img
      })
    }
  }

  saveModel() {
    this.errorSave = null

    const model: TipologiaPratica = {
      codice: this.validateForm.controls['codice'].value,
      nome: this.validateForm.controls['nome'].value,
      importo: this.validateForm.controls['importo'].value,
      descrizione: this.validateForm.controls['descrizione'].value,
      img: this.imageUpload ? this.imageUpload.split(',')[1] : null,
      libero: this.validateForm.controls['libero'].value,
      note: this.validateForm.controls['note'].value,
    }

    console.log('saveModel', this.validateForm, model)

    this.managePraticheService.createType(model).subscribe(
      data => {
        this.msg.success('Tipologia creata con successo')
        this.router.navigate(['/passi-carrabili/types/index'])
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
    this.saveModel()
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result!.toString()))
    reader.readAsDataURL(img)
  }
}
