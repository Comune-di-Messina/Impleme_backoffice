import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take } from 'rxjs/operators'

import { ManageInstitutesService } from '../../../../../services/api/segnalame/management/manage-institutes.service'
import { Institute } from '../../../../../models/segnalame/institute'

@Injectable({
  providedIn: 'root',
})
export class InstituteResolverService implements Resolve<Institute> {
  constructor(private router: Router, private manageInstitutesService: ManageInstitutesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Institute> | Observable<never> {
    const instituteId = route.paramMap.get('instituteId')

    return this.manageInstitutesService.getInstitute(parseInt(instituteId)).pipe(
      take(1),
      mergeMap(response => {
        if (response) {
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
