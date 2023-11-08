import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { BookingsListComponent } from './list/list.component'
import { ClosedBookingsListComponent } from './closed/closed.component'

const routes: Routes = [
  {
    path: 'index',
    component: BookingsListComponent,
    data: { title: 'Tutte le prenotazioni' },
  },
  {
    path: 'closed',
    component: ClosedBookingsListComponent,
    data: { title: 'Prenotazioni lavorate' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class BookingsRouterModule {}
