import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { combineLatest, Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take, map, switchMap } from 'rxjs/operators'
import { Pratica, TipologiaPratica, TaskDomain } from '../../../../models/passi-carrabili/pratiche'
import { Institute } from '../../../../models/institute'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'

export interface PraticaResponse {
  pratica: Pratica
  praticaAssignee: TaskDomain
  tipologia: TipologiaPratica
  institute: Institute
}

@Injectable({
  providedIn: 'root',
})
export class CaseFileResolverService implements Resolve<PraticaResponse> {
  constructor(
    private router: Router,
    private praticheService: ManagePraticheService,
    private entiService: EntiService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PraticaResponse> | Observable<never> {
    const praticaId = route.paramMap.get('praticaId')

    return this.praticheService.getCaseFile(praticaId).pipe(
      take(1),
      switchMap((pratica, index) => {
        return combineLatest([
          this.praticheService.getTypes(),
          this.entiService.index(),
          this.praticheService.getAssigneeList(),
        ]).pipe(
          map(results => ({
            pratica: pratica,
            praticaAssignee: results[2]?.find(
              (item: TaskDomain, i: number) => item.variables.idCaseFile === pratica.idCaseFile,
            ),
            tipologia: results[0]?.find((item, i) => item.codice === pratica.tributo),
            institute: results[1]?.find(
              (item: Institute, i: number) => item.codice === pratica.ente,
            ),
          })),
        )
      }),
      mergeMap(response => {
        if (response.pratica) {
          return of(response)
        } else {
          // id not found
          this.router.navigate(['/passi-carrabili/casefiles'])
          return EMPTY
        }
      }),
    )
  }
}
