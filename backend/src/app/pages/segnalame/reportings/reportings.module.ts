import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { GoogleMapsModule } from '@angular/google-maps'

import { ReportingsRoutingModule } from './reportings-routing.module'
import { ReportingsListComponent } from './reportings-list/reportings-list.component'
import { ReportingComponent } from './reporting/reporting.component'

@NgModule({
  declarations: [ReportingsListComponent, ReportingComponent],
  imports: [
    SharedModule,
    GoogleMapsModule,
    ReportingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
})
export class ReportingsModule {}
