import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InstitutesListComponent } from './institutes-list/institutes-list.component'
import { InstituteComponent } from './institute/institute.component'
import { InstituteSectorComponent } from './institute/institute-sector/institute-sector.component'
import { InstituteResolverService } from './institute/institute-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: InstitutesListComponent,
    data: {
      title: 'Lista Enti',
      pageTitle: 'Lista Enti',
      pageSubtitle: null,
    },
  },
  {
    path: 'create',
    component: InstituteComponent,
    data: {
      title: 'Crea Ente',
      pageTitle: 'Crea Ente',
      pageSubtitle: null,
      edit: true,
      isNew: true,
    },
  },
  {
    path: 'view/:instituteId',
    component: InstituteComponent,
    data: {
      title: 'Vedi Ente',
      pageTitle: 'Vedi Ente',
      pageSubtitle: null,
      edit: false,
      isNew: false,
    },
  },
  {
    path: 'edit/:instituteId/sector/create',
    component: InstituteSectorComponent,
    resolve: { institute: InstituteResolverService },
    data: {
      title: 'Crea Categoria',
      pageTitle: 'Crea Categoria',
      pageSubtitle: null,
      edit: true,
      isNew: true,
    },
  },
  {
    path: 'view/:instituteId/sector/view/:sectorId',
    component: InstituteSectorComponent,
    resolve: { institute: InstituteResolverService },
    data: {
      title: 'Vedi Categoria',
      pageTitle: 'Vedi Categoria',
      pageSubtitle: null,
      edit: false,
      isNew: false,
    },
  },
  {
    path: 'edit/:instituteId/sector/edit/:sectorId',
    component: InstituteSectorComponent,
    resolve: { institute: InstituteResolverService },
    data: {
      title: 'Modifica Categoria',
      pageTitle: 'Modifica Categoria',
      pageSubtitle: null,
      edit: true,
      isNew: false,
    },
  },
  {
    path: 'edit/:instituteId',
    component: InstituteComponent,
    data: {
      title: 'Modifica Ente',
      pageTitle: 'Modifica Ente',
      pageSubtitle: null,
      edit: true,
      isNew: false,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutesRoutingModule {}
