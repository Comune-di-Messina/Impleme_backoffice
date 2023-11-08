import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { TariffeRouterModule } from './attributi-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'

// dashboard
import { AttributiCreateComponent } from './create/index.component'
import { AttributiIndexComponent } from './index/index.component'

import { ReactiveFormsModule } from '@angular/forms';
import { BsmModule } from 'src/app/components/bsm/bsm.module'

const COMPONENTS = [
  AttributiCreateComponent,
  AttributiIndexComponent,
]

@NgModule({
  imports: [
    SharedModule,
    TariffeRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class AttributiModule {}
