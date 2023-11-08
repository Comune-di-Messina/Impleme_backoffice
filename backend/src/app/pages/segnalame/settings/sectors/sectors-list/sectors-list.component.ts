import { Component, OnInit } from '@angular/core'
import { ManageSectorsService } from '../../../../../services/api/segnalame/management/manage-sectors.service'
import { Sector } from '../../../../../models/segnalame/sector'
import { NzModalService } from 'ng-zorro-antd'

@Component({
  selector: 'app-sectors-list',
  templateUrl: './sectors-list.component.html',
  styleUrls: ['./sectors-list.component.scss'],
})
export class SectorsListComponent implements OnInit {
  sectors: Sector[] = []
  itemsInPage: Sector[] = []
  listOfColumns = []

  constructor(private modal: NzModalService, private manageSectorsService: ManageSectorsService) {}

  ngOnInit(): void {
    this.getSectors()
  }

  getSectors() {
    this.manageSectorsService.getSectors(0, 0, 'asc').subscribe(result => {
      this.sectors = result
      this.listOfColumns = this.generateColumns()
      console.log(result, 'this.manageSectorsService.getSectors')
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
        name: 'Icon',
        noFilter: true,
      },
      {
        name: 'Nome',
        key: x => x.name,
        sortDefault: 'ascend',
      },
      {
        name: 'Description',
        key: x => x.description,
      },
      {
        name: 'Sottotitlo',
        key: x => x.subtitle,
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
