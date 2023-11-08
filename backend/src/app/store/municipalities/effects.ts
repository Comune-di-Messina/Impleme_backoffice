import { Injectable } from '@angular/core'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import { MunicipalitiesService } from 'src/app/services/municipalities/MunicipalitiesService'

import * as Reducers from 'src/app/store/reducers'
import * as MunicipalitiesActions from './actions'

@Injectable()
export class MunicipalitiesEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private municipalitiesService: MunicipalitiesService,
  ) {}

  @Effect()
  requestMunicipalities: Observable<any> = this.actions.pipe(
    ofType(MunicipalitiesActions.MUNICIPALITIES_REQUEST),
    map((action: MunicipalitiesActions.MunicipalitiesRequest) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getMunicipalities)))),
    ),
    switchMap(([payload, settings]) =>
      from([{ type: MunicipalitiesActions.MUNICIPALITIES_LOADING }]),
    ),
  )

  @Effect()
  loadingMunicipalities: Observable<any> = this.actions.pipe(
    ofType(MunicipalitiesActions.MUNICIPALITIES_LOADING),
    map((action: MunicipalitiesActions.MunicipalitiesLoading) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getMunicipalities)))),
    ),
    switchMap(([payload, settings]) => {
      return this.municipalitiesService.list().pipe(
        map(response => {
          if (response) {
            return new MunicipalitiesActions.MunicipalitiesSuccessful(response)
          }
          return new MunicipalitiesActions.MunicipalitiesUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: MunicipalitiesActions.MUNICIPALITIES_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  ngrxOnInitEffects(): Action {
    return new MunicipalitiesActions.MunicipalitiesNoAction()
  }
}
