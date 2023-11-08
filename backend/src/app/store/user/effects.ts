import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap, tap } from 'rxjs/operators'
import { NzNotificationService } from 'ng-zorro-antd'

import * as UserActions from './actions'
import { AuthService } from '../../services/auth/auth.service'
import { getUserState } from '../reducers'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private rxStore: Store,
    private notification: NzNotificationService,
    private authService: AuthService,
  ) {}

  @Effect()
  loadCurrentAccount: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT),
    switchMap(profile => of(new UserActions.LoadCurrentAccountSuccessful(profile))),
  )
  @Effect()
  loadCurrentAccountSuccessful: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT_SUCCESSFUL),
    switchMap(() => of(new UserActions.LoginSuccessful())),
  )
  @Effect()
  loginSuccessful: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGIN_SUCCESSFUL),
    switchMap(() => {
      this.router.navigateByUrl('/dashboard')
      return of(new UserActions.NoAction())
    }),
  )
  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGOUT),
    tap(() => this.router.navigateByUrl('/auth/login')),
  )
  @Effect()
  tokenReceived: Observable<any> = this.actions.pipe(
    ofType(UserActions.TOKEN_RECEIVED),
    withLatestFrom(this.rxStore.select(getUserState)),
    switchMap(([, user]) => {
      console.log(user)
      if (!user.login) {
        this.authService.loadUserProfile()
      }
      return of(new UserActions.NoAction())
    }),
  )

  ngrxOnInitEffects(): Action {
    return { type: UserActions.EMPTY_ACTION }
  }
}
