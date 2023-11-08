import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { TributiRouterModule } from './tributi-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'

// dashboard
import { TributiIndexComponent } from 'src/app/pages/tributi/index/index.component'
import { TributiCreateComponent } from './create/index.component'

import { ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

const COMPONENTS = [TributiIndexComponent, TributiCreateComponent]

@NgModule({
  imports: [
    SharedModule,
    TributiRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class TributiModule {}
