import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { InstitutesRoutingModule } from './institutes-routing.module'
import { InstituteComponent } from './institute/institute.component'
import { InstitutesListComponent } from './institutes-list/institutes-list.component'
import { InstituteSectorsComponent } from './institute/institute-sectors/institute-sectors.component'
import { InstituteSectorComponent } from './institute/institute-sector/institute-sector.component'
import { InstituteSubsectorsComponent } from './institute/institute-sector/institute-subsectors/institute-subsectors.component'
import { InstituteUsersComponent } from './institute/institute-sector/institute-users/institute-users.component'

@NgModule({
  declarations: [
    InstituteComponent,
    InstitutesListComponent,
    InstituteSectorsComponent,
    InstituteSectorComponent,
    InstituteSubsectorsComponent,
    InstituteUsersComponent,
  ],
  imports: [SharedModule, InstitutesRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class InstitutesModule {}
