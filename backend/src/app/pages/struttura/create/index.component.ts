import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { RoomsCategoriesService, RoomsService } from 'src/app/services/api'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { FormComponent } from '../form/index.component'
@Component({
  selector: 'struttura-create',
  templateUrl: './index.component.html',
})
export class CreateComponent implements OnInit {
  @ViewChild('strutturaForm') strutturaForm: FormComponent

  saveFormError: string[] = null
  isFormValid: boolean = false

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private roomsCategoriesService: RoomsCategoriesService,
    private roomsService: RoomsService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  submitForm() {
    this.saveFormError = null
    this.strutturaForm.submitForm()
  }

  canSendForm(isValid) {
    this.isFormValid = isValid || true
  }

  onSaveFormError(event) {
    this.saveFormError = event
  }

  onSaveFormSuccess(event) {
    // console.log('onSaveFormSuccess')
    setTimeout(() => {
      this.router.navigate(['/struttura/index'])
    }, 1500)
  }
}
