import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { combineLatest, Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take, map, switchMap } from 'rxjs/operators'
import { TipologiaPratica } from '../../../../models/passi-carrabili/pratiche'
import { Institute } from '../../../../models/institute'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'

export interface TipologieResponse {
  tipologie: TipologiaPratica[]
  institutes: Institute[]
}

@Injectable({
  providedIn: 'root',
})
export class TypesResolverService implements Resolve<TipologieResponse> {
  constructor(private praticheService: ManagePraticheService, private entiService: EntiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<TipologieResponse> | Observable<never> {
    return this.praticheService.getTypes().pipe(
      take(1),
      switchMap((tipologie, index) => {
        return combineLatest([this.entiService.index()]).pipe(
          map(results => ({
            tipologie: tipologie,
            institutes: results[0],
          })),
        )
      }),
      mergeMap(response => {
        return of(response)
      }),
    )
  }
}
