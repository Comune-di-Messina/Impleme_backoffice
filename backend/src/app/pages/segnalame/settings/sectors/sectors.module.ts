import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { SectorsRoutingModule } from './sectors-routing.module'
import { SectorsListComponent } from './sectors-list/sectors-list.component'
import { SectorComponent } from './sector/sector.component'

@NgModule({
  declarations: [SectorsListComponent, SectorComponent],
  imports: [SharedModule, SectorsRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class SectorsModule {}
