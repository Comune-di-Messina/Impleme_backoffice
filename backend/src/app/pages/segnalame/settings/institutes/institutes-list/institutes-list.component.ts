import { Component, OnInit } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { ManageInstitutesService } from '../../../../../services/api/segnalame/management/manage-institutes.service'
import { Institute } from '../../../../../models/segnalame/institute'

@Component({
  selector: 'app-institutes-list',
  templateUrl: './institutes-list.component.html',
  styleUrls: ['./institutes-list.component.scss'],
})
export class InstitutesListComponent implements OnInit {
  institutes: Institute[] = []
  itemsInPage: Institute[] = []
  listOfColumns = []
  successMessage = null
  errorMessage = null

  constructor(
    private modal: NzModalService,
    private manageInstitutesService: ManageInstitutesService,
  ) {}

  ngOnInit(): void {
    this.getInstitutes()
  }

  clearMessages = () => {
    this.successMessage = null
    this.errorMessage = null
  }

  getInstitutes() {
    this.manageInstitutesService.getList().subscribe(result => {
      this.institutes = result
      this.listOfColumns = this.generateColumns()
    })
  }

  onDeleteModel(institute: Institute) {
    this.modal.confirm({
      nzTitle: 'Sicuro di voler eliminare questa voce?',
      nzOkText: 'Si',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.manageInstitutesService.deleteInstitute(institute.id).subscribe(
          result => {
            this.successMessage = 'Ente eliminato correttamente'
            this.getInstitutes()
          },
          error => {
            console.log(error)
            this.errorMessage = error.error
          },
        )
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
        name: 'Nome',
        key: x => x.name,
        sortDefault: 'ascend',
      },
      {
        name: 'Email',
        key: x => x.email,
      },
      {
        name: 'Tipo',
        key: x => x.type,
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
              this.institutes
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
