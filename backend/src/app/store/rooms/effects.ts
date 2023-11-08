import { Injectable } from '@angular/core'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap, tap } from 'rxjs/operators'

import * as Reducers from 'src/app/store/reducers'
import * as RoomsActions from './actions'
import { RoomsService } from '../../services/rooms'

@Injectable()
export class RoomsEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private roomsService: RoomsService,
  ) {}

  @Effect()
  requestAllRooms: Observable<any> = this.actions.pipe(
    ofType(RoomsActions.ROOMS_REQUEST_ALL),
    map((action: RoomsActions.RoomsRequestAll) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getRooms)))),
    ),
    switchMap(() => from([{ type: RoomsActions.ROOMS_LOADING_ALL }])),
  )

  @Effect()
  loadingAllRooms: Observable<any> = this.actions.pipe(
    ofType(RoomsActions.ROOMS_LOADING_ALL),
    map((action: RoomsActions.RoomsLoadingAll) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getRooms)))),
    ),
    switchMap(([payload, settings]) => {
      return this.roomsService.list('SIF07').pipe(
        map(response => {
          if (response) {
            return new RoomsActions.RoomsSuccessfulAll(response)
          }
          return new RoomsActions.RoomsUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: RoomsActions.ROOMS_UNSUCCESSFUL }])
        }),
      )
    }),
  )
  ngrxOnInitEffects(): Action {
    return new RoomsActions.RoomsNoAction()
  }
}
