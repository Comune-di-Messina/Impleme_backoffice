import { Component, OnInit, Input, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NzModalService } from 'ng-zorro-antd'
import { RoomsCategoriesService, RoomsService } from 'src/app/services/api'
import { Store } from '@ngrx/store'
import { FormBuilder } from '@angular/forms'
import { FormComponent } from '../form/index.component'
import { ACLService } from 'src/app/services/acl'
@Component({
  selector: 'struttura-update',
  templateUrl: './index.component.html',
})
export class UpdateComponent implements OnInit {
  @Input() roomId: string

  @ViewChild('strutturaForm') strutturaForm: FormComponent

  subRoute: any = null
  saveFormError: string = null
  saveFormSuccess: boolean = null
  isFormValid: boolean = false

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private roomsCategoriesService: RoomsCategoriesService,
    private roomsService: RoomsService,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private aclService: ACLService,
  ) {}

  ngOnInit() {
    this.subRoute = this.route.params.subscribe(params => {
      this.roomId = params.roomId
    })
  }

  ngOnDestroy() {}

  checkRoute(route): boolean {
    return this.aclService.checkRoute(route)
  }

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
    console.log('onSaveFormSuccess')
    this.saveFormSuccess = true
    setTimeout(() => {
      this.router.navigate(['/struttura/index'])
    }, 1500)
  }
}
