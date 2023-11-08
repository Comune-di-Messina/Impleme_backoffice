import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'casefiles',
    loadChildren: () => import('./case-files/case-files.module').then(m => m.CaseFilesModule),
  },
  {
    path: 'types',
    loadChildren: () => import('./types/types.module').then(m => m.TypesModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassiCarrabiliRoutingModule {}
