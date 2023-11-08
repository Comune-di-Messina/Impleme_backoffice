import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message'

import { EntiService } from '../../../services/api/enti/index'
import { ManageOfficesService } from '../../../services/api/prenota-ufficio/manage-offices.service'
import { Office } from '../../../models/prenota-ufficio/office'
import { Institute } from '../../../models/institute'

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
})
export class OfficesComponent implements OnInit {
  pageTitle: string
  pageSubtitle: string
  institutes: Institute[]
  offices: Office[] = []
  municipalityId: string

  constructor(
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private entiService: EntiService,
    private officesServices: ManageOfficesService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { pageTitle: string; pageSubtitle: string; isNew: boolean }) => {
        this.pageTitle = data.pageTitle
        this.pageSubtitle = data.pageSubtitle
      },
    )

    this.entiService.index().subscribe(result => {
      this.institutes = result
    })

    this.route.params.subscribe(params => {
      if (params.municipalityId) {
        this.municipalityId = params.municipalityId
        this.getOffices()
      }
    })
  }

  getOffices() {
    this.officesServices.getOffices({ municipalityId: this.municipalityId }).subscribe(results => {
      this.offices = results
    })
  }

  async deleteRow(office: Office, index: number) {
    await this.officesServices.deleteOffice(this.municipalityId, office.id).toPromise()
    this.msg.success('Ufficio rimosso con successo')
    this.getOffices()
    return
  }
}
