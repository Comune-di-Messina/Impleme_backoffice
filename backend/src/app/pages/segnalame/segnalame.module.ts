import { NgModule } from '@angular/core'
// import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { ReactiveFormsModule } from '@angular/forms'

import { SegnalameRoutingModule } from './segnalame-routing.module'

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    SegnalameRoutingModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
})
export class SegnalameModule {}
