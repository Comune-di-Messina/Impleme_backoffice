import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { TariffeCreateComponent } from './create/index.component'
import { TariffeIndexComponent } from './index/index.component'
import { APP_ROUTING_ACL } from 'src/app/app-routing-acl'

const routes: Routes = [
  {
    path: 'index',
    component: TariffeIndexComponent,
    data: { title: 'Lista tariffe' },
  },
  {
    path: 'create',
    component: TariffeCreateComponent,
    data: { title: 'Crea tariffa' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class TariffeRouterModule {}
