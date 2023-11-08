import { Component, OnInit } from '@angular/core'
import { ManageUsersService } from '../../../../../services/api/segnalame/management/manage-users.service'
import { User } from '../../../../../models/segnalame/user'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = []
  itemsInPage: User[] = []
  listOfColumns = []

  constructor(private manageUsersService: ManageUsersService) {}

  ngOnInit(): void {
    this.manageUsersService.getUsers(0, 0).subscribe(result => {
      this.users = result
      this.listOfColumns = this.generateColumns()
      console.log(result, 'this.manageUsersService.getUsers')
    })
  }

  onPreviewModel() {}

  onUpdateModel() {}

  onCurrentPageDataChange(itemsInPage) {
    this.itemsInPage = itemsInPage
  }

  generateColumns() {
    const headers = [
      {
        name: 'Login',
        key: x => x.login,
      },
      {
        name: 'Nome',
        key: x => x.firstName,
        sortDefault: 'ascend',
      },
      {
        name: 'Cognome',
        key: x => x.lastName,
        sortDefault: 'ascend',
      },
      {
        name: 'Email',
        key: x => x.email,
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
              this.users
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
