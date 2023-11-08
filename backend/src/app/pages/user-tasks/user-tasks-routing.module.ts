import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { DemandableComponent } from 'src/app/pages/user-tasks/demandable/index.component'
import { AssigneeComponent } from 'src/app/pages/user-tasks/assignee/index.component'
import { UpdateComponent } from 'src/app/pages/user-tasks/update/index.component'

const routes: Routes = [
  {
    path: 'demandable',
    component: DemandableComponent,
    data: { title: 'Lista tasks assegnabili' },
  },
  {
    path: 'assignee',
    component: AssigneeComponent,
    data: { title: 'Lista tasks assegnati' },
  },
  {
    path: 'update/:key/:roomBookingId',
    component: UpdateComponent,
    data: { title: 'Modifica task utente' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class UserTasksRouterModule {}
