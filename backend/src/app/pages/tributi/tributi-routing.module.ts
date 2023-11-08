import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { TributiCreateComponent } from './create/index.component'
import { TributiIndexComponent } from './index/index.component'

const routes: Routes = [
  {
    path: 'index',
    component: TributiIndexComponent,
    data: { title: 'Lista tributi' },
  },
  {
    path: 'create',
    component: TributiCreateComponent,
    data: { title: 'Crea tributo' },
  },

]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class TributiRouterModule {}
