import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { combineLatest, Observable, of, EMPTY } from 'rxjs'
import { mergeMap, take, map, switchMap, find } from 'rxjs/operators'
import { Pratica, TipologiaPratica, TaskDomain } from '../../../../models/passi-carrabili/pratiche'
import { Institute } from '../../../../models/institute'
import { EntiService } from '../../../../services/api/enti/index'
import { ManagePraticheService } from 'src/app/services/api/passi-carrabili/manage-pratiche.service'

@Injectable({
  providedIn: 'root',
})
export class TypeUpdateResolverService implements Resolve<TipologiaPratica> {
  constructor(
    private router: Router,
    private praticheService: ManagePraticheService,
    private entiService: EntiService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<TipologiaPratica> | Observable<never> {
    const typeId = route.paramMap.get('typeId')

    return this.praticheService.getTypes().pipe(
      map((items, idx) => {
        return items.find(type => type.id == typeId)
      }),
      mergeMap(response => {
        if (response) {
          return of(response)
        } else {
          // id not found
          this.router.navigate(['/passi-carrabili/types/index'])
          return EMPTY
        }
      }),
    )
  }
}
