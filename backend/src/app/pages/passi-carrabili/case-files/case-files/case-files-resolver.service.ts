import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { combineLatest, Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take, map, switchMap } from 'rxjs/operators'
import { Pratica, TipologiaPratica, TaskDomain } from '../../../../models/passi-carrabili/pratiche'
import { Institute } from '../../../../models/institute'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'

export interface PraticheResponse {
  institutes: Institute[]
  tipologie: TipologiaPratica[]
  pratiche: Pratica[]
  praticheDemandable: TaskDomain[]
}

@Injectable({
  providedIn: 'root',
})
export class CaseFilesResolverService implements Resolve<PraticheResponse> {
  constructor(
    private router: Router,
    private praticheService: ManagePraticheService,
    private entiService: EntiService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PraticheResponse> | Observable<never> {
    return this.praticheService.getCaseFiles().pipe(
      take(1),
      switchMap((pratiche, index) => {
        return combineLatest([
          this.praticheService.getTypes(),
          this.entiService.index(),
          this.praticheService.getDemandableList(),
        ]).pipe(
          map(results => ({
            pratiche: pratiche,
            tipologie: results[0],
            institutes: results[1],
            praticheDemandable: results[2],
          })),
        )
      }),
      mergeMap(response => {
        return of(response)
      }),
    )
  }
}
