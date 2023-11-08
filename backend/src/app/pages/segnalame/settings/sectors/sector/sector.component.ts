import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageSectorsService } from '../../../../../services/api/segnalame/management/manage-sectors.service'
import { ManageUsersService } from '../../../../../services/api/segnalame/management/manage-users.service'
import { Sector } from '../../../../../models/segnalame/sector'
import { User } from '../../../../../models/segnalame/user'

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit {
  isNew: boolean = false
  edit: boolean = false
  pageTitle: string
  pageSubtitle: string
  sectorId: any
  sector: Sector = {} as Sector
  assignedUsers: any
  availableUsers: User[] = []
  iconUpload: File
  imageUpload: File

  validateForm: FormGroup
  errorSave

  constructor(
    private route: ActivatedRoute,
    private manageSectorsService: ManageSectorsService,
    private manageUsersService: ManageUsersService,
    private fb: FormBuilder,
    private location: Location,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.edit = data.edit
      this.isNew = data.isNew
      this.pageTitle = data.pageTitle
      this.pageSubtitle = data.pageSubtitle

      if (data.isNew) {
        this.sector.enabled = true
      }
    })

    this.route.params.subscribe(params => {
      if (params.sectorId) {
        this.sectorId = params.sectorId
        this.manageSectorsService.getSector(this.sectorId).subscribe(result => {
          this.sector = result
          this.initForm()
          this.getAssignedUsers()
          this.getUsers()
        })
      }
    })

    this.initForm()
  }

  getUsers() {
    this.manageUsersService.getUsers(0).subscribe(result => {
      this.availableUsers = result
      console.log(this.availableUsers, 'this.availableUsers')
    })
  }

  getAssignedUsers() {
    this.manageSectorsService.getAssignedUsers(this.sectorId).subscribe(result => {
      console.log(result, 'this.manageSectorsService.getAssignedUsers')
    })
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: [this.sector?.name, [Validators.required]],
      subtitle: [this.sector?.subtitle, []],
      email: [this.sector?.email, []],
      description: [this.sector?.description, []],
      type: [this.sector?.type, []],
      enabled: [this.sector?.enabled, []],
    })
  }

  onIconChanged(files: File[]) {
    this.iconUpload = files[0] ?? null

    if (files[0]) {
      const isLt1M = files[0].size! / 1024 / 1024 < 1
      if (!isLt1M) {
        this.msg.error('Dimensione del file non accettato. Max 1MB.')
        return
      }
      this.getBase64(files[0], (img: string) => {
        this.sector.iconPath = img
      })
    }
  }

  onImageChanged(files: File[]) {
    this.imageUpload = files[0] ?? null

    if (files[0]) {
      const isLt1M = files[0].size! / 1024 / 1024 < 1
      if (!isLt1M) {
        this.msg.error('Dimensione del file non accettato. Max 1MB.')
        return
      }
      this.getBase64(files[0], (img: string) => {
        this.sector.imagePath = img
      })
    }
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
      this.sector[i] = this.validateForm.controls[i].value
    }

    if (this.isNew) {
      this.manageSectorsService.createSector(this.sector).subscribe(result => {
        this.sector = result
        this.processImages()
      })
    } else {
      this.manageSectorsService.editSector(this.sector).subscribe(result => {
        this.sector = result
        this.processImages()
      })
    }
  }

  private async processImages() {
    if (this.iconUpload) {
      const processIcon = await this.manageSectorsService
        .uploadIcon(this.sector.id, this.iconUpload)
        .toPromise()
        .catch(error => {
          this.msg.error("Impossibile fare l'upload dell'icona")
          throw new Error("Impossibile fare l'upload dell'icona")
        })
    }

    if (this.imageUpload) {
      const processImage = await this.manageSectorsService
        .uploadImage(this.sector.id, this.imageUpload)
        .toPromise()
        .catch(error => {
          this.msg.error("Impossibile fare l'upload dell'immagine")
          throw new Error("Impossibile fare l'upload dell'immagine")
        })
    }

    this.location.back()
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result!.toString()))
    reader.readAsDataURL(img)
  }
}
