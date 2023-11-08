import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReservationsComponent } from './reservations/reservations.component'
import { ReservationComponent } from './reservation/reservation.component'
import { ReservationResolverService } from './reservation/reservation-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: ReservationsComponent,
    data: { title: 'Lista Prenotazioni' },
  },
  {
    path: 'view/:reservationId',
    component: ReservationComponent,
    resolve: { reservation: ReservationResolverService },
    data: {
      title: 'Prenotazione',
      pageTitle: 'Prenotazione',
      pageSubtitle: 'Testo di prova',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsRoutingModule {}
