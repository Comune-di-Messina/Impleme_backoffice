import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

import {
  ManageInstitutesService,
  WebhookActions,
} from '../../../../../../../services/api/segnalame/management/manage-institutes.service'
import { ManageSectorsService } from '../../../../../../../services/api/segnalame/management/manage-sectors.service'
import { ManageSubsectorsService } from '../../../../../../../services/api/segnalame/management/manage-subsectors.service'
import { Institute } from '../../../../../../../models/segnalame/institute'
import { Sector, Subsector } from '../../../../../../../models/segnalame/sector'

@Component({
  selector: 'app-institute-subsectors',
  templateUrl: './institute-subsectors.component.html',
  styleUrls: ['./institute-subsectors.component.scss'],
})
export class InstituteSubsectorsComponent implements OnInit {
  @Input() sector: Sector
  @Input() institute: Institute
  subsectors: Subsector[] = []
  listData: Array<Subsector & { edit: boolean }> = []
  @Input() edit: boolean = false

  constructor(
    private manageInstitutesService: ManageInstitutesService,
    private manageSectorsService: ManageSectorsService,
    private manageSubsectorsService: ManageSubsectorsService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.getSubsectors()
  }

  getSubsectors() {
    this.manageInstitutesService
      .getInstituteSubsectorsList(this.institute.id, this.sector.id)
      .subscribe(result => {
        this.subsectors = result
        this.initTable()
        console.log(this.subsectors, 'this.manageInstitutesService.getInstituteSubsectorsList')
      })
  }

  initTable() {
    this.listData = this.subsectors.map(subsector => {
      return {
        ...subsector,
        edit: false,
      }
    })
  }

  // Create subsector
  async createSubsector(item: Subsector) {
    if (!item.name) return

    const subsector = await this.manageSubsectorsService.createSubsector(item).toPromise()
    this.manageInstitutesService
      .sendWebhookInstitute(this.institute.id, WebhookActions.update)
      .toPromise()

    this.msg.success('Sottosettore creato con successo')
    return subsector
  }

  async editSubsector(item: Subsector) {
    if (!item.name) return

    const subsector = await this.manageSubsectorsService.editSubsector(item).toPromise()
    this.manageInstitutesService
      .sendWebhookInstitute(this.institute.id, WebhookActions.update)
      .toPromise()

    this.msg.success('Sottosettore modificato con successo')
    return subsector
  }

  // Delete subsector
  deleteSubsector(subsectorId: number) {
    this.manageSubsectorsService.deleteSubsector(subsectorId).subscribe(result => {
      this.getSubsectors()
    })

    this.manageInstitutesService
      .sendWebhookInstitute(this.institute.id, WebhookActions.update)
      .toPromise()
  }

  addRow(): void {
    this.listData = [
      ...this.listData,
      {
        id: null,
        name: null,
        email: null,
        enabled: true,
        sectorId: this.sector.id,
        instituteId: this.institute.id,
        edit: true,
      },
    ]
  }

  startEdit(id: string): void {
    // console.log(id, 'startEdit');
  }

  stopEdit(subsector: any): void {
    // console.log(subsector, 'stopEdit');
  }

  async saveRow(subsector: Subsector & { edit: boolean }, index: number) {
    let response: Subsector = null
    if (subsector.id) {
      response = await this.editSubsector(subsector)
    } else {
      response = await this.createSubsector(subsector)
    }

    this.listData[index] = { ...response, edit: false }
    this.listData = [...this.listData]
  }

  async deleteRow(subsector: Subsector & { edit: boolean }, index: number) {
    if (subsector.id) {
      await this.manageSubsectorsService.deleteSubsector(subsector.id).toPromise()

      this.manageInstitutesService
        .sendWebhookInstitute(this.institute.id, WebhookActions.update)
        .toPromise()
    }

    this.listData.splice(index, 1)
    this.listData = [...this.listData]
    return
  }

  validateSector(subsector: Subsector) {
    if (subsector.name) {
      return true
    }

    return false
  }
}
