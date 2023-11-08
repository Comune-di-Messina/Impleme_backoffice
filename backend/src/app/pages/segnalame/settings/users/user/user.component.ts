import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageUsersService } from '../../../../../services/api/segnalame/management/manage-users.service'
import { User } from '../../../../../models/segnalame/user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  edit: boolean = false
  pageTitle: string
  pageSubtitle: string
  userId: any
  user: User = {} as User

  validateForm: FormGroup
  errorSave

  constructor(
    private route: ActivatedRoute,
    private manageUsersService: ManageUsersService,
    private fb: FormBuilder,
    private location: Location,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.edit = data.edit
      this.pageTitle = data.pageTitle
      this.pageSubtitle = data.pageSubtitle
    })

    this.route.params.subscribe(params => {
      if (params.userId) {
        this.userId = params.userId
        this.manageUsersService.getUser(this.userId).subscribe(result => {
          this.user = result
          this.initForm()
        })
      }
    })

    this.initForm()
  }

  initForm() {
    this.validateForm = this.fb.group({
      login: [
        {
          value: this.user?.login,
          disabled: true,
        },
        [],
      ],
      firstName: [this.user?.firstName, []],
      lastName: [this.user?.lastName, []],
      email: [this.user?.email, []],
      activated: [this.user?.activated, []],
    })
  }

  submitForm() {
    this.errorSave = null

    if (!this.edit) {
      return
    }

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty()
        this.validateForm.controls[i].updateValueAndValidity()
      }
    }

    for (var i in this.validateForm.controls) {
      console.log(i, this.validateForm.controls[i].value, 'this.validateForm.controls[i].value')
      this.user[i] = this.validateForm.controls[i].value
    }

    this.manageUsersService.editUser(this.user).subscribe(result => {
      this.user = result
      this.location.back()
    })
  }
}
