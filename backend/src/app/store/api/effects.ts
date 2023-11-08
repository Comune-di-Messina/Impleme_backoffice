import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap, retryWhen } from 'rxjs/operators'
import { RoomBookingBookingsService } from 'src/app/services/api/room-bookings'
import { RoomsTypologiesService } from 'src/app/services/api'

import * as Reducers from 'src/app/store/reducers'
import * as ApiActions from './actions'

import { EntiService, RoomsCategoriesService } from 'src/app/services/api'

@Injectable()
export class ApiEffects implements OnInitEffects {
  constructor(
    private actions: Actions,

    private rxStore: Store<any>,
    private entiService: EntiService,
    private roomsCategoriesService: RoomsCategoriesService,
    private roomBookingBookingsService: RoomBookingBookingsService,
    private roomsTypologiesService: RoomsTypologiesService,
  ) {}

  @Effect()
  roomsCategories: Observable<any> = this.actions.pipe(
    ofType(ApiActions.ROOMS_CATEGORIES),
    map((action: ApiActions.RoomsCategories) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getApi)))),
    ),
    switchMap(([payload, settings]) => {
      return this.roomsCategoriesService.index().pipe(
        map(response => {
          if (response) {
            return new ApiActions.RoomsCategoriesSuccessful(response)
          }
          return new ApiActions.RoomsCategoriesUnsuccessful()
        }),
        catchError(error => {
          console.log('ROOMS CATEGORIES ERROR: ', error)
          return from([{ type: ApiActions.ROOMS_CATEGORIES_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  enti: Observable<any> = this.actions.pipe(
    ofType(ApiActions.ENTI),
    map((action: ApiActions.Enti) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getApi)))),
    ),
    switchMap(([payload, settings]) => {
      return this.entiService.index().pipe(
        map(response => {
          if (response) {
            return new ApiActions.EntiSuccessful(response)
          }
          return new ApiActions.EntiUnsuccessful()
        }),
        catchError(error => {
          console.log('ENTI ERROR: ', error)
          return from([{ type: ApiActions.ENTI_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  roomBookings: Observable<any> = this.actions.pipe(
    ofType(ApiActions.ROOM_BOOKINGS),
    map((action: ApiActions.RoomBookings) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getApi)))),
    ),
    switchMap(([payload, settings]) => {
      return this.roomBookingBookingsService.list().pipe(
        map(response => {
          if (response) {
            return new ApiActions.RoomBookingsSuccessful(response)
          }
          return new ApiActions.RoomBookingsUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: ApiActions.ROOM_BOOKINGS_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  @Effect()
  roomsTypologies: Observable<any> = this.actions.pipe(
    ofType(ApiActions.ROOMS_TYPOLOGIES),
    map((action: ApiActions.RoomsTypologies) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getApi)))),
    ),
    switchMap(([payload, settings]) => {
      return this.roomsTypologiesService.index().pipe(
        map(response => {
          if (response) {
            return new ApiActions.RoomsTypologiesSuccessful(response)
          }
          return new ApiActions.RoomsTypologiesUnsuccessful()
        }),
        catchError(error => {
          console.log('RoomBookings ERROR: ', error)
          return from([{ type: ApiActions.ROOMS_TYPOLOGIES_UNSUCCESSFUL }])
        }),
      )
    }),
  )

  ngrxOnInitEffects(): Action {
    return new ApiActions.NoAction()
  }
}
