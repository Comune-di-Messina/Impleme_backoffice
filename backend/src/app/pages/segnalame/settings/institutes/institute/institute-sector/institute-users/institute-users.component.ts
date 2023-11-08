import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer'

import { ManageSectorsService } from '../../../../../../../services/api/segnalame/management/manage-sectors.service'
import { ManageUsersService } from '../../../../../../../services/api/segnalame/management/manage-users.service'
import { Sector } from '../../../../../../../models/segnalame/sector'
import { User } from '../../../../../../../models/segnalame/user'

@Component({
  selector: 'app-institute-users',
  templateUrl: './institute-users.component.html',
  styleUrls: ['./institute-users.component.scss'],
})
export class InstituteUsersComponent implements OnInit {
  list: TransferItem[] = []
  disabled = false

  @Input() sector: Sector
  @Input() edit: boolean = false
  assignedUsers: User[] = []
  availableUsers: User[] = []

  constructor(
    private manageSectorsService: ManageSectorsService,
    private manageUsersService: ManageUsersService,
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers() {
    this.availableUsers = await this.manageUsersService.getUsers(0).toPromise()
    this.assignedUsers = await this.manageSectorsService
      .getAssignedUsers(this.sector.id)
      .toPromise()
    this.initList()
  }

  initList() {
    this.list = this.availableUsers.reduce((acc: TransferItem[], user) => {
      const item: TransferItem = {
        key: user.id,
        title: `[${user.id}] ${user.firstName} ${user.lastName}`,
        description: `[${user.id}] ${user.firstName} ${user.lastName}`,
        direction: this.assignedUsers.some(el => el.id === user.id) ? 'right' : 'left',
      }
      acc = [...acc, item]
      return acc
    }, [])
  }

  filterOption(inputValue: string, item: TransferItem): boolean {
    console.log(item, 'filterOption')
    return item.title.indexOf(inputValue) > -1
  }

  change(ret: TransferSelectChange): void {
    console.log('nzChange', ret)

    const assignIds = []
    const removeIds = []
    ret.list.forEach(element => {
      if (element.direction === 'left') {
        removeIds.push(element.key)
      } else if (element.direction === 'right') {
        assignIds.push(element.key)
      }
    })

    if (assignIds.length) {
      this.manageSectorsService.assignUsers(this.sector.id, assignIds).subscribe(result => {
        console.log(result, 'this.manageSectorsService.assignUsers')
      })
    }

    if (removeIds.length) {
      this.manageSectorsService.removeUsers(this.sector.id, removeIds).subscribe(result => {
        console.log(result, 'this.manageSectorsService.removeUsers')
      })
    }
  }
}
