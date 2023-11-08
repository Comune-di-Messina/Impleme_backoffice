import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BsmModule } from 'src/app/components/bsm/bsm.module'

import { TypesRoutingModule } from './types-routing.module'
import { TypesComponent } from './types/types.component'
import { TypeComponent } from './type/type.component'
import { TypeUpdateComponent } from './type-update/type-update.component'

@NgModule({
  declarations: [TypesComponent, TypeComponent, TypeUpdateComponent],
  imports: [SharedModule, TypesRoutingModule, FormsModule, ReactiveFormsModule, BsmModule],
})
export class TypesModule {}
