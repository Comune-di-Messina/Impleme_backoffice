import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { CaseFilesRoutingModule } from './case-files-routing.module'
import { CaseFilesComponent } from './case-files/case-files.component'
import { CaseFileComponent } from './case-file/case-file.component'
import { CaseFilesDemandableComponent } from './case-files-demandable/case-files-demandable.component'
import { CaseFilesAssigneeComponent } from './case-files-assignee/case-files-assignee.component'

@NgModule({
  declarations: [
    CaseFilesComponent,
    CaseFileComponent,
    CaseFilesDemandableComponent,
    CaseFilesAssigneeComponent,
  ],
  imports: [SharedModule, CaseFilesRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class CaseFilesModule {}
