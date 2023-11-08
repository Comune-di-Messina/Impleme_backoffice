import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { combineLatest, Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take, map, switchMap } from 'rxjs/operators'

import { ManageReportingsService } from '../../../../services/api/segnalame/management/manage-reportings.service'
import { ManageUsersService } from '../../../../services/api/segnalame/management/manage-users.service'

import { Reporting, ReportingStatus } from '../../../../models/segnalame/reporting'
import { User } from '../../../../models/segnalame/user'
import { ACLService } from 'src/app/services/acl'

export interface ReportingResponse {
  reporting: Reporting
  users: User[]
  statuses: ReportingStatus[]
}

@Injectable({
  providedIn: 'root',
})
export class ReportingResolverService implements Resolve<ReportingResponse> {
  constructor(
    private router: Router,
    private manageReportingsService: ManageReportingsService,
    private manageUsersService: ManageUsersService,
    private aclService: ACLService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ReportingResponse> | Observable<never> {
    const reportingId = route.paramMap.get('reportingId')

    return this.manageReportingsService.getReporting(parseInt(reportingId)).pipe(
      take(1),
      switchMap((reporting, index) => {
        return combineLatest([
          this.aclService.isRouteAuthorized('segnalame/users')
            ? this.manageUsersService.getUsers(0, 0)
            : of([]),
          this.manageReportingsService.getAllActiveStatuses(),
        ]).pipe(
          map(results => ({
            reporting: reporting,
            users: results[0],
            statuses: results[1],
          })),
        )
      }),
      mergeMap(response => {
        if (response.reporting) {
          return of(response)
        } else {
          // id not found
          this.router.navigate(['/segnalame/reportings'])
          return EMPTY
        }
      }),
    )
  }
}
