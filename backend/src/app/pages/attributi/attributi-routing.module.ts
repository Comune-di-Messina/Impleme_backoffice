import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { AttributiCreateComponent } from './create/index.component'
import { AttributiIndexComponent } from './index/index.component'

const routes: Routes = [
  {
    path: 'index',
    component: AttributiIndexComponent,
    data: { title: 'Lista attributi' },
  },
  {
    path: 'create',
    component: AttributiCreateComponent,
    data: { title: 'Crea attributo' },
  },

]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class TariffeRouterModule {}
