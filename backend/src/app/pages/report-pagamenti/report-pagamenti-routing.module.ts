import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { DownloadCsvComponent } from 'src/app/pages/report-pagamenti/download-csv/download-csv.component'

const routes: Routes = [
  {
    path: 'download-csv',
    component: DownloadCsvComponent,
    data: { title: 'Scarica report CSV' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ReportPagamentiRouterModule {}
