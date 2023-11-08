import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TypesComponent } from './types/types.component'
import { TypesResolverService } from './types/types-resolver.service'
import { TypeComponent } from './type/type.component'
import { TypeUpdateComponent } from './type-update/type-update.component'
import { TypeUpdateResolverService } from './type-update/type-update-resolver.service'

const routes: Routes = [
  {
    path: 'index',
    component: TypesComponent,
    resolve: { tipologieResponse: TypesResolverService },
    data: { title: 'Tutte le tipologie' },
  },
  {
    path: 'create',
    component: TypeComponent,
    data: { title: 'Crea tipologia' },
  },
  {
    path: 'view/:typeId',
    component: TypeUpdateComponent,
    resolve: { tipologiaResponse: TypeUpdateResolverService },
    data: { title: 'Visualizza tipologia', edit: false },
  },
  {
    path: 'edit/:typeId',
    component: TypeUpdateComponent,
    resolve: { tipologiaResponse: TypeUpdateResolverService },
    data: { title: 'Modifica tipologia', edit: true },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypesRoutingModule {}
