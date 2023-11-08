import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageInstitutesService } from '../../../../../../services/api/segnalame/management/manage-institutes.service'
import { ManageSectorsService } from '../../../../../../services/api/segnalame/management/manage-sectors.service'
import { ManageUsersService } from '../../../../../../services/api/segnalame/management/manage-users.service'
import { Sector } from '../../../../../../models/segnalame/sector'
import { Institute } from '../../../../../../models/segnalame/institute'
import { User } from '../../../../../../models/segnalame/user'

@Component({
  selector: 'app-institute-sector',
  templateUrl: './institute-sector.component.html',
  styleUrls: ['./institute-sector.component.scss'],
})
export class InstituteSectorComponent implements OnInit {
  isLoading: boolean = false
  isNew: boolean = false
  edit: boolean = false
  pageTitle: string
  pageSubtitle: string

  institute: Institute
  sector: Sector = {} as Sector
  assignedUsers: User[] = []
  availableUsers: User[] = []
  iconUpload: File
  imageUpload: File

  validateForm: FormGroup
  errorSave

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageInstitutesService: ManageInstitutesService,
    private manageSectorsService: ManageSectorsService,
    private manageUsersService: ManageUsersService,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {
        institute: Institute
        isNew: boolean
        edit: boolean
        pageTitle: string
        pageSubtitle: string
      }) => {
        this.institute = data.institute
        this.isNew = data.isNew
        this.edit = data.edit
        this.pageTitle = data.pageTitle
        this.pageSubtitle = data.pageSubtitle
      },
    )

    this.route.params.subscribe(params => {
      if (params.sectorId) {
        this.getSector(params.sectorId)
      }
    })

    this.initForm()
  }

  async getSector(sectorId: number) {
    this.sector = await this.manageSectorsService.getSector(sectorId).toPromise()
    this.initForm()
    this.getAssignedUsers()
    this.getUsers()
  }

  getUsers() {
    this.manageUsersService.getUsers(0).subscribe(result => {
      this.availableUsers = result
      console.log(this.availableUsers, 'this.availableUsers')
    })
  }

  getAssignedUsers() {
    this.manageSectorsService.getAssignedUsers(this.sector.id).subscribe(result => {
      this.assignedUsers = result
    })
  }

  initForm() {
    this.validateForm = this.fb.group({
      name: [this.sector?.name, [Validators.required]],
      subtitle: [this.sector?.subtitle, []],
      email: [this.sector?.email, []],
      description: [this.sector?.description, []],
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

  async submitForm() {
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
      // console.log(i, this.validateForm.controls[i].value, 'this.validateForm.controls[i].value')
      this.sector[i] = this.validateForm.controls[i].value
    }

    this.isLoading = true
    if (this.isNew) {
      this.sector = await this.manageSectorsService
        .createSector(this.sector)
        .toPromise()
        .catch(error => {
          this.msg.error("Errore durante l'invio dei dati")
          throw new Error("Errore durante l'invio dei dati")
        })
    } else {
      this.sector = await this.manageSectorsService
        .editSector(this.sector)
        .toPromise()
        .catch(error => {
          this.msg.error("Errore durante l'invio dei dati")
          throw new Error("Errore durante l'invio dei dati")
        })
    }

    await this.processImages()
    await this.assignToInstitute()

    this.sector = await this.manageSectorsService.getSector(this.sector.id).toPromise()
    this.isLoading = false

    this.msg.success('Operazione completata con successo')
    if (this.isNew) {
      this.router.navigate([
        '/segnalame/settings/institutes/edit/' +
          this.institute.id +
          '/sector/edit/' +
          this.sector.id,
      ])
    }
  }

  async assignToInstitute() {
    return await this.manageInstitutesService
      .associateSectors(this.institute.id, [this.sector.id])
      .toPromise()
      .catch(error => {
        this.msg.error("Non è stato possibile assegnare questo settore all'ente selezionato")
        throw new Error("Non è stato possibile assegnare questo settore all'ente selezionato")
      })
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
  }

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result!.toString()))
    reader.readAsDataURL(img)
  }
}
