import { Component, OnInit, Input } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'

import {
  ManageInstitutesService,
  WebhookActions,
} from '../../../../../../services/api/segnalame/management/manage-institutes.service'
import { ManageSectorsService } from '../../../../../../services/api/segnalame/management/manage-sectors.service'
import { Institute } from '../../../../../../models/segnalame/institute'
import { Sector } from '../../../../../../models/segnalame/sector'

@Component({
  selector: 'app-institute-sectors',
  templateUrl: './institute-sectors.component.html',
  styleUrls: ['./institute-sectors.component.scss'],
})
export class InstituteSectorsComponent implements OnInit {
  @Input() institute: Institute
  @Input() edit: boolean = false
  sectors: Sector[] = []
  itemsInPage: Sector[] = []
  listOfColumns = []

  constructor(
    private modal: NzModalService,
    private manageInstitutesService: ManageInstitutesService,
    private manageSectorsService: ManageSectorsService,
  ) {}

  ngOnInit(): void {
    this.getSectors()
  }

  getSectors() {
    this.manageInstitutesService.getInstituteSectorsList(this.institute.id).subscribe(result => {
      this.sectors = result
      this.listOfColumns = this.generateColumns()
      console.log(this.sectors, 'this.sectors')
    })
  }

  onDeleteModel(sector: Sector) {
    this.modal.confirm({
      nzTitle: 'Sicuro di voler eliminare questa voce?',
      nzOkText: 'Si',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.manageSectorsService.deleteSector(sector.id).subscribe(result => {
          this.getSectors()
          this.manageInstitutesService
            .sendWebhookInstitute(this.institute.id, WebhookActions.delete)
            .toPromise()
        })
      },
      nzCancelText: 'No',
    })
  }

  onCurrentPageDataChange(itemsInPage) {
    this.itemsInPage = itemsInPage
  }

  generateColumns() {
    const headers = [
      {
        name: 'Icona',
        noFilter: true,
      },
      {
        name: 'Nome',
        key: x => x.name,
        sortDefault: 'ascend',
      },
      {
        name: 'Descrizione',
        key: x => x.description,
        width: '25%',
      },
      {
        name: 'Sottotitlo',
        key: x => x.subtitle,
        width: '25%',
      },
      {
        name: 'Email',
        key: x => x.email,
      },
      {
        name: 'Attivato',
        key: x => x.enabled,
      },
      {
        name: 'Azioni',
        noFilter: true,
      },
    ]
    return headers.map(header => {
      return !header.noFilter
        ? {
            name: header.name,
            sortOrder: header.sortDefault ?? null,
            sortFn: (a, b) => header.key(a).localeCompare(header.key(b)),
            sortDirections: ['ascend', 'descend', null],
            filterMultiple: true,
            width: header.width ?? null,
            listOfFilter: Array.from(
              this.sectors
                .map(x => {
                  return { text: header.key(x), value: header.key(x) }
                })
                .reduce((m, t) => m.set(t.value, t), new Map())
                .values(),
            ),
            filterFn: (list: string[], item) =>
              list.some(value => header.key(item).indexOf(value) !== -1),
          }
        : { name: header.name }
    })
  }
}
