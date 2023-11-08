import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { PrenotazioneSalaRouterModule } from './prenotazione-sala-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'

// dashboard
import { PrenotazioneSalaIndexComponent } from 'src/app/pages/prenotazione-sala/index/index.component'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { PrenotazioneSalaViewComponent } from './view/view.component'
import { PrenotazioneSalaRevocaComponent } from './revoca/revoca.component'
import { ReactiveFormsModule } from '@angular/forms'

const COMPONENTS = [
  PrenotazioneSalaIndexComponent,
  PrenotazioneSalaViewComponent,
  PrenotazioneSalaRevocaComponent,
]

@NgModule({
  imports: [
    SharedModule,
    PrenotazioneSalaRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class PrenotazioneSalaModule {}
