import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { UsersRoutingModule } from './users-routing.module'
import { UsersListComponent } from './users-list/users-list.component'
import { UserComponent } from './user/user.component'

@NgModule({
  declarations: [UsersListComponent, UserComponent],
  imports: [SharedModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class UsersModule {}
