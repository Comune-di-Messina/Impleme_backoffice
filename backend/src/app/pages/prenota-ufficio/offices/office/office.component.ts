import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { ManageOfficesService } from '../../../../services/api/prenota-ufficio/manage-offices.service'
import { Office } from '../../../../models/prenota-ufficio/office'

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent implements OnInit {
  pageTitle: string
  pageSubtitle: string
  office: Office
  officeId: string
  municipalityId: string
  isNew: boolean = true

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private officesServices: ManageOfficesService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { pageTitle: string; pageSubtitle: string; isNew: boolean }) => {
        this.pageTitle = data.pageTitle
        this.pageSubtitle = data.pageSubtitle
        this.isNew = data.isNew
      },
    )

    this.route.params.subscribe(params => {
      if (params.municipalityId) {
        this.municipalityId = params.municipalityId
      }

      if (params.officeId) {
        this.officeId = params.officeId
        this.getOffice()
      }
    })
  }

  getOffice() {
    this.officesServices.getOffice(this.municipalityId, this.officeId).subscribe(result => {
      this.office = result
      this.pageTitle = this.office.name
      console.log(result, 'Office')
    })
  }

  onCreateOffice(office: Office) {
    this.office = office
    this.router.navigate([
      '/prenota-ufficio/offices/municipality/' + this.municipalityId + '/office/' + office.id,
    ])
  }

  onChangeOffice(office: Office) {
    this.office = office
    this.pageTitle = this.office.name
    console.log(office, 'onChangeOffice')
  }
}
