import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'
import { OrderByPipe } from './pipes/order-by.pipe'
import { ReservationIdPipe } from './pipes/reservation-id.pipe'

// basic acl
import { ACLComponent } from 'src/app/components/cleanui/system/ACL/acl.component'

// antd components module
import { AntdModule } from 'src/app/antd.module'
import { AclRouteComponent } from './components/cleanui/system/ACL/acl-route/acl-route.component'

const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule]

@NgModule({
  imports: [...MODULES],
  declarations: [ACLComponent, OrderByPipe, ReservationIdPipe, AclRouteComponent],
  exports: [...MODULES, OrderByPipe, ReservationIdPipe, AclRouteComponent],
})
export class SharedModule {}
