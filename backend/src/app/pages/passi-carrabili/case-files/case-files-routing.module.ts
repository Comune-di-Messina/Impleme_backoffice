import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { CaseFilesResolverService } from './case-files/case-files-resolver.service'
import { CaseFilesAssigneeResolverService } from './case-files-assignee/case-files-assignee-resolver.service'
import { CaseFilesDemandableResolverService } from './case-files-demandable/case-files-demandable-resolver.service'
import { CaseFileResolverService } from './case-file/case-file-resolver.service'
import { CaseFilesComponent } from './case-files/case-files.component'
import { CaseFilesDemandableComponent } from './case-files-demandable/case-files-demandable.component'
import { CaseFilesAssigneeComponent } from './case-files-assignee/case-files-assignee.component'
import { CaseFileComponent } from './case-file/case-file.component'

const routes: Routes = [
  {
    path: 'index',
    component: CaseFilesComponent,
    resolve: { praticheResponse: CaseFilesResolverService },
    data: { title: 'Tutte le richieste' },
  },
  {
    path: 'demandable',
    component: CaseFilesDemandableComponent,
    resolve: { praticheResponse: CaseFilesDemandableResolverService },
    data: { title: 'Richieste da prendere in carico' },
  },
  {
    path: 'assignee',
    component: CaseFilesAssigneeComponent,
    resolve: { praticheResponse: CaseFilesAssigneeResolverService },
    data: { title: 'Richieste prese in carico' },
  },
  {
    path: 'view/:praticaId',
    component: CaseFileComponent,
    resolve: { praticaResponse: CaseFileResolverService },
    data: {
      title: 'Visualizza richiesta',
      pageTitle: 'Visualizza richiesta',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseFilesRoutingModule {}
