import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// index
import { IndexComponent } from './index/index.component'
// tipologia/*
import * as Tipologia from './tipologia'
// categoria/*
import * as Categoria from './categoria'
import { CreateComponent } from './create/index.component'
import { UpdateComponent } from './update/index.component'
import { PreviewComponent } from './details/index.component'

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: { title: 'Lista strutture' },
  },
  {
    path: 'create',
    component: CreateComponent,
    data: { title: 'Crea struttura' },
  },
  {
    path: 'details/:roomId',
    component: PreviewComponent,
    data: { title: 'Dettaglio struttura' },
  },
  {
    path: 'update/:roomId',
    component: UpdateComponent,
    data: { title: 'Modifica struttura' },
  },
  {
    path: 'tipologia/index',
    component: Tipologia.IndexComponent,
    data: { title: 'Lista tipologie strutture' },
  },
  {
    path: 'tipologia/create',
    component: Tipologia.CreateComponent,
    data: { title: 'Crea tipologia struttura' },
  },
  {
    path: 'categoria/index',
    component: Categoria.IndexComponent,
    data: { title: 'Lista categorie strutture' },
  },
  {
    path: 'categoria/create',
    component: Categoria.CreateComponent,
    data: { title: 'Crea categorie struttura' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class StrutturaRouterModule {}
