import { Component, OnInit } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

import { ManageServiceTypesService } from '../../../../services/api/prenota-ufficio/manage-service-types.service'
import { ServiceType } from '../../../../models/prenota-ufficio/service-type'

@Component({
  selector: 'app-service-types',
  templateUrl: './service-types.component.html',
  styleUrls: ['./service-types.component.scss'],
})
export class ServiceTypesComponent implements OnInit {
  services: ServiceType[] = []
  listData: Array<ServiceType & { edit: boolean }> = []

  constructor(
    private serviceTypesService: ManageServiceTypesService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
    this.serviceTypesService.getServiceTypes().subscribe(results => {
      this.services = results
      this.initTable()
    })
  }

  initTable() {
    this.listData = this.services.map(service => {
      return {
        ...service,
        edit: false,
      }
    })
  }

  startEdit(id: string): void {
    // console.log(id, 'startEdit');
  }

  stopEdit(service: any): void {
    // console.log(subsector, 'stopEdit');
  }

  addRow(): void {
    this.listData = [
      ...this.listData,
      {
        id: null,
        name: null,
        edit: true,
      },
    ]
  }

  // Create Service
  async createService(item: ServiceType) {
    if (!item.name) return

    const subsector = await this.serviceTypesService.createServiceType(item.name).toPromise()

    this.msg.success('Tipologia creata con successo')
    return subsector
  }

  async editService(item: ServiceType) {
    if (!item.name) return

    const service = await this.serviceTypesService.editServiceType(item.id, item.name).toPromise()

    this.msg.success('Tipologia modificata con successo')
    return service
  }

  // Delete Service
  deleteService(serviceId: string) {
    this.serviceTypesService.deleteServiceType(serviceId).subscribe(result => {
      this.getServices()
    })
  }

  async saveRow(service: ServiceType & { edit: boolean }, index: number) {
    let response: ServiceType = null
    if (service.id) {
      response = await this.editService(service)
    } else {
      response = await this.createService(service)
    }

    this.listData[index] = { ...response, edit: false }
    this.listData = [...this.listData]
  }

  async deleteRow(service: ServiceType & { edit: boolean }, index: number) {
    if (service.id) {
      await this.serviceTypesService.deleteServiceType(service.id).toPromise()
    }

    this.listData.splice(index, 1)
    this.listData = [...this.listData]
    return
  }

  validateService(service: ServiceType) {
    if (service.name) {
      return true
    }

    return false
  }
}
