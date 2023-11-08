import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { ReservationsRoutingModule } from './reservations-routing.module'
import { ReservationsComponent } from './reservations/reservations.component'
import { ReservationComponent } from './reservation/reservation.component'

@NgModule({
  declarations: [ReservationsComponent, ReservationComponent],
  imports: [SharedModule, ReservationsRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class ReservationsModule {}
