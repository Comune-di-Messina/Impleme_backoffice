import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { ReactiveFormsModule } from '@angular/forms'

import { PrenotaUfficioRoutingModule } from './prenota-ufficio-routing.module'
import { ServicesComponent } from './services/services.component'
import { ServiceTypesComponent } from './services/service-types/service-types.component'
import { PublicServicesComponent } from './services/public-services/public-services.component'
import { PublicServiceComponent } from './services/public-service/public-service.component'

@NgModule({
  declarations: [
    ServicesComponent,
    ServiceTypesComponent,
    PublicServicesComponent,
    PublicServiceComponent,
  ],
  imports: [
    SharedModule,
    PrenotaUfficioRoutingModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
})
export class PrenotaUfficioModule {}
