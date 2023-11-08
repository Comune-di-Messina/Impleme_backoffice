import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SectorsListComponent } from './sectors-list/sectors-list.component'
import { SectorComponent } from './sector/sector.component'

const routes: Routes = [
  {
    path: '',
    component: SectorsListComponent,
    data: { title: 'Lista Settori' },
  },
  {
    path: 'create',
    component: SectorComponent,
    data: {
      title: 'Crea Settore',
      pageTitle: 'Crea Settore',
      pageSubtitle: 'Testo di prova',
      edit: true,
      isNew: true,
    },
  },
  {
    path: 'view/:sectorId',
    component: SectorComponent,
    data: {
      title: 'Vedi Settore',
      pageTitle: 'Vedi Settore',
      pageSubtitle: 'Testo di prova',
      edit: false,
      isNew: false,
    },
  },
  {
    path: 'edit/:sectorId',
    component: SectorComponent,
    data: {
      title: 'Modifica Settore',
      pageTitle: 'Modifica Settore',
      pageSubtitle: 'Testo di prova',
      edit: true,
      isNew: false,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SectorsRoutingModule {}
