import { Component, OnInit, Input } from '@angular/core'
import { ACLService } from '../../../../../services/acl/index'

@Component({
  selector: 'app-acl-route',
  template: `
    <ng-content *ngIf="isAuthorized"></ng-content>
  `,
})
export class AclRouteComponent implements OnInit {
  @Input() route: string
  isAuthorized: boolean = false

  constructor(private aclService: ACLService) {}

  ngOnInit(): void {
    this.isAuthorized = this.aclService.isRouteAuthorized(this.route)
  }
}
