import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UsersListComponent } from './users-list/users-list.component'
import { UserComponent } from './user/user.component'

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    data: { title: 'Lista Utenti' },
  },
  {
    path: 'view/:userId',
    component: UserComponent,
    data: {
      title: 'Vedi Utente',
      pageTitle: 'Vedi Utente',
      pageSubtitle: 'Testo di prova',
      edit: false,
      isNew: false,
    },
  },
  /*
  {
    path: 'edit/:userId',
    component: UserComponent,
    data: {
      title: 'Modifica Utente',
      pageTitle: 'Modifica Utente',
      pageSubtitle: 'Testo di prova',
      edit: true,
      isNew: false,
    },
  },
  */
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
