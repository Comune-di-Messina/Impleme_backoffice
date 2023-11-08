import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { UserTasksRouterModule } from './user-tasks-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'
import { ChartistModule } from 'ng-chartist'
import { NgApexchartsModule } from 'ng-apexcharts'
import { BsmModule } from 'src/app/components/bsm/bsm.module'
import { ReactiveFormsModule } from '@angular/forms'

// dashboard
import { DemandableComponent } from 'src/app/pages/user-tasks/demandable/index.component'
import { AssigneeComponent } from 'src/app/pages/user-tasks/assignee/index.component'
import { UpdateComponent } from 'src/app/pages/user-tasks/update/index.component'
import { FormComponent } from 'src/app/pages/user-tasks/form/index.component'

const COMPONENTS = [DemandableComponent, AssigneeComponent, UpdateComponent, FormComponent]

@NgModule({
  imports: [
    SharedModule,
    UserTasksRouterModule,
    WidgetsComponentsModule,
    FormsModule,
    ChartistModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    BsmModule,
  ],
  declarations: [...COMPONENTS],
})
export class UserTasksModule {}
