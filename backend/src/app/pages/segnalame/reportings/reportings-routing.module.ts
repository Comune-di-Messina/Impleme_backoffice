import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReportingsListComponent } from './reportings-list/reportings-list.component'
import { ReportingComponent } from './reporting/reporting.component'
import { ReportingResolverService } from './reporting/reporting-resolver.service'

const routes: Routes = [
  {
    path: '',
    component: ReportingsListComponent,
    data: { title: 'Lista Segnalazioni' },
  },
  {
    path: 'view/:reportingId',
    component: ReportingComponent,
    resolve: { reportingResponse: ReportingResolverService },
    data: {
      title: 'Segnalazione',
      pageTitle: 'Segnalazione',
      pageSubtitle: 'Testo di prova',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportingsRoutingModule {}
