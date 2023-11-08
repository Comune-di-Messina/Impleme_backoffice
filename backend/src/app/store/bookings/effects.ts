import { Injectable } from '@angular/core'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import { BookingsService } from 'src/app/services/bookings/BookingsService'

import * as Reducers from 'src/app/store/reducers'
import * as BookingsActions from './actions'

@Injectable()
export class BookingEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private bookingsService: BookingsService,
  ) {}

  @Effect()
  requestBookings: Observable<any> = this.actions.pipe(
    ofType(BookingsActions.BOOKINGS_REQUEST),
    map((action: BookingsActions.BookingsRequest) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getBookings)))),
    ),
    switchMap(([payload, settings]) => from([{ type: BookingsActions.BOOKINGS_LOADING }])),
  )

  @Effect()
  loadingBookings: Observable<any> = this.actions.pipe(
    ofType(BookingsActions.BOOKINGS_LOADING),
    map((action: BookingsActions.BookingsLoading) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getBookings)))),
    ),
    switchMap(([payload, settings]) => {
      return this.bookingsService.list().pipe(
        map(response => {
          if (response) {
            return new BookingsActions.BookingsSuccessful(response)
          }
          return new BookingsActions.BookingsUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: BookingsActions.BOOKINGS_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  loadStates: Observable<any> = this.actions.pipe(
    ofType(BookingsActions.STATES_LOADING),
    map((action: BookingsActions.StatesLoading) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getBookings)))),
    ),
    switchMap(([payload, settings]) => {
      return this.bookingsService.states().pipe(
        map(response => {
          if (response) {
            return new BookingsActions.StatesSuccessful(response)
          }
          return new BookingsActions.StatesUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: BookingsActions.BOOKINGS_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  ngrxOnInitEffects(): Action {
    return new BookingsActions.BookingsNoAction()
  }
}
