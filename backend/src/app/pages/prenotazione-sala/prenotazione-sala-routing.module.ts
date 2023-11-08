import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { PrenotazioneSalaIndexComponent } from 'src/app/pages/prenotazione-sala/index/index.component'
import { PrenotazioneSalaViewComponent } from 'src/app/pages/prenotazione-sala/view/view.component'
import { PrenotazioneSalaRevocaComponent } from 'src/app/pages/prenotazione-sala/revoca/revoca.component'

const routes: Routes = [
  {
    path: 'index',
    component: PrenotazioneSalaIndexComponent,
    data: { title: 'Lista prenotazioni' },
  },
  {
    path: 'view/:numeroPratica',
    component: PrenotazioneSalaViewComponent,
    data: { title: 'Vedi prenotazione' },
  },
  {
    path: 'revoca/:numeroPratica',
    component: PrenotazioneSalaRevocaComponent,
    data: { title: 'Revoca prenotazione' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PrenotazioneSalaRouterModule {}
