import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { OfficesComponent } from './offices.component'
import { OfficeComponent } from './office/office.component'

const routes: Routes = [
  {
    path: '',
    component: OfficesComponent,
    data: {
      title: 'Lista Comuni',
      pageTitle: 'Lista Comuni',
    },
  },
  {
    path: 'municipality/:municipalityId',
    component: OfficesComponent,
    data: {
      title: 'Lista Uffici',
      pageTitle: 'Lista Uffici',
    },
  },
  {
    path: 'municipality/:municipalityId/office/create',
    component: OfficeComponent,
    data: {
      title: 'Crea Ufficio',
      pageTitle: 'Crea Ufficio',
      pageSubtitle: null,
      isNew: true,
    },
  },
  {
    path: 'municipality/:municipalityId/office/:officeId',
    component: OfficeComponent,
    data: {
      title: 'Ufficio',
      pageTitle: 'Ufficio',
      pageSubtitle: null,
      isNew: false,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficesRoutingModule {}
