import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ServicesComponent } from './services/services.component'
import { PublicServiceComponent } from './services/public-service/public-service.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'reservations',
    loadChildren: () =>
      import('./reservations/reservations.module').then(m => m.ReservationsModule),
  },
  {
    path: 'offices',
    loadChildren: () => import('./offices/offices.module').then(m => m.OfficesModule),
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Servizi',
      pageTitle: 'Servizi',
      pageSubtitle: null,
    },
  },
  {
    path: 'public-service/create',
    component: PublicServiceComponent,
    data: {
      title: 'Crea Servizio pubblico',
      pageTitle: 'Crea Servizio pubblico',
      pageSubtitle: null,
      isNew: true,
    },
  },
  {
    path: 'public-service/edit/:serviceId',
    component: PublicServiceComponent,
    data: {
      title: 'Modifica Servizio pubblico',
      pageTitle: 'Modifica Servizio pubblico',
      pageSubtitle: null,
      isNew: false,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrenotaUfficioRoutingModule {}
