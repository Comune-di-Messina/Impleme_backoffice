import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { ReportPagamentiRouterModule } from './report-pagamenti-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ReactiveFormsModule } from '@angular/forms'

// dashboard
import { DownloadCsvComponent } from 'src/app/pages/report-pagamenti/download-csv/download-csv.component'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

const COMPONENTS = [DownloadCsvComponent]

@NgModule({
  imports: [
    SharedModule,
    ReportPagamentiRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class ReportPagamentiModule {}
