import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { ReactiveFormsModule } from '@angular/forms'

import { OfficesRoutingModule } from './offices-routing.module'
import { OfficesComponent } from './offices.component'
import { OfficeComponent } from './office/office.component'
import { OfficeDetailsComponent } from './office/office-details/office-details.component'
import { OfficeCountersComponent } from './office/office-counters/office-counters.component'
import { OfficeTimeslotsComponent } from './office/office-timeslots/office-timeslots.component'
import { OfficeDaysComponent } from './office/office-days/office-days.component'

@NgModule({
  declarations: [
    OfficesComponent,
    OfficeComponent,
    OfficeDetailsComponent,
    OfficeCountersComponent,
    OfficeTimeslotsComponent,
    OfficeDaysComponent,
  ],
  imports: [
    SharedModule,
    OfficesRoutingModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
})
export class OfficesModule {}
