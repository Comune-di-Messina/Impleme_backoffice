import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RoomsTypologiesService } from 'src/app/services/api'
import { Location } from '@angular/common'

@Component({
  selector: 'struttura-tipologia-create',
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
export class CreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private roomsTypologiesService: RoomsTypologiesService,
    private location: Location,
  ) {}

  validateForm: FormGroup
  errorSave: null

  saveModel() {
    this.errorSave = null

    const model = {}
    for (var i in this.validateForm.controls) {
      model[i] = this.validateForm.controls[i].value
    }

    // console.log('saveModel', this.validateForm, model);

    this.roomsTypologiesService.create(model).subscribe(
      data => {
        this.location.back()
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      tipo: [null, [Validators.required]],
    })
  }
}
