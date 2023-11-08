import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { switchMap, map } from 'rxjs/operators'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import { APP_ROUTING_ACL } from 'src/app/app-routing-acl'

@Injectable()
export class ACLService {
  role: string[] | string

  constructor(private store: Store<any>) {
    this.store
      .pipe(
        select(Reducers.getUser),
        switchMap(state => {
          return of(state.role)
        }),
        map(roles => {
          if (Array.isArray(roles)) {
            return roles.map((role, i) => {
              return role.replace(/(.*)gruppo /g, '')
            })
          }

          return roles.replace(/(.*)gruppo /g, '')
        }),
      )
      .subscribe(role => {
        this.role = role
      })
  }

  checkUserRole(rolesToCheck: string[]): boolean {
    let retVal = false
    if (Array.isArray(this.role)) {
      retVal = rolesToCheck.reduce((acc, curr) => {
        return acc || this.role.includes(curr)
      }, false)
    } else {
      retVal = rolesToCheck.includes(this.role)
    }

    return retVal
  }

  checkRoute(route): boolean {
    let retVal = false

    if (route in APP_ROUTING_ACL) {
      retVal = this.checkUserRole(APP_ROUTING_ACL[route])
    }

    return retVal
  }

  /**
   * Return false if route is not in APP_ROUTING_ACL
   * @param route
   * @returns boolean
   */
  isRouteAuthorized(route: string): boolean {
    if (route in APP_ROUTING_ACL) {
      return this.checkUserRole(APP_ROUTING_ACL[route])
    }

    return false
  }
}
