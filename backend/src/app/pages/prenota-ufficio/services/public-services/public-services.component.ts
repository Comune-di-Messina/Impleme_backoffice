import { Component, OnInit } from '@angular/core'

import { ManagePublicServicesService } from '../../../../services/api/prenota-ufficio/manage-public-services.service'
import { PublicService } from '../../../../models/prenota-ufficio/public-service'

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: ['./public-services.component.scss'],
})
export class PublicServicesComponent implements OnInit {
  services: PublicService[] = []

  constructor(private publicServicesService: ManagePublicServicesService) {}

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
    this.publicServicesService.getPublicServices().subscribe(results => {
      this.services = results
    })
  }

  async deleteRow(service: PublicService, index: number) {
    if (service.id) {
      await this.publicServicesService.deletePublicService(service.id).toPromise()
    }

    this.services.splice(index, 1)
    this.services = [...this.services]
    return
  }
}
