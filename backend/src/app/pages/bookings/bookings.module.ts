import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { BookingsRouterModule } from './bookings-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'

// dashboard
import { BookingsListComponent } from './list/list.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ClosedBookingsListComponent } from './closed/closed.component'

const COMPONENTS = [BookingsListComponent, ClosedBookingsListComponent]

@NgModule({
  imports: [
    SharedModule,
    BookingsRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  declarations: [...COMPONENTS],
})
export class BookingsModule {}
