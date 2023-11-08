import { Injectable } from '@angular/core'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { from, Observable, of } from 'rxjs'
import * as ZeeBeeUserTasksActions from './actions'
import { catchError, concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'
import * as Reducers from '../reducers'
import { ZeeBeeUserTasksService } from '../../services/ZeeBee/user-controller'
import { fromArray } from 'rxjs/internal/observable/fromArray'

@Injectable()
export class ZeeBeeUserTasksEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private rxStore: Store<any>,
    private zeebeeUserTasks: ZeeBeeUserTasksService,
  ) {}

  @Effect()
  demandableListRequested: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_DEMANDABLE_LIST_REQUEST),
    tap(action => {
      console.log(action)
      return new ZeeBeeUserTasksActions.ZeeBeeDemandableListLoading()
    }),
  )

  @Effect()
  demandableListLoading: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_DEMANDABLE_LIST_LOADING),
    tap(action => this.zeebeeUserTasks.demandableList()),
    map(response => {
      if (response) {
        return new ZeeBeeUserTasksActions.ZeeBeeDemandableListSuccess(response)
      } else {
        return new ZeeBeeUserTasksActions.ZeeBeeDemandableListFail()
      }
    }),
  )

  @Effect()
  assigneeListRequested: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_REQUEST),
    switchMap(() => from([{ type: ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_LOADING }])),
  )

  @Effect()
  assigneeListLoading: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_LOADING),
    tap(action => {
      this.zeebeeUserTasks.assigneeList().subscribe(response => {
        if (response) {
          return from([
            { type: ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_SUCCESS, payload: response },
          ])
        } else {
          return from([{ type: ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_FAIL }])
        }
      })
    }),
  )

  @Effect()
  claimTaskRequested: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_CLAIM_REQUEST),
    map((action: ZeeBeeUserTasksActions.ZeeBeeClaimRequest) => action.payload),
    tap(payload => console.log(payload)),
    switchMap(payload => this.zeebeeUserTasks.claim(payload.taskId)),
    map(response => {
      if (response) {
        return from([{ type: ZeeBeeUserTasksActions.ZEEBEE_CLAIM_SUCCESS }])
      } else {
        return from([{ type: ZeeBeeUserTasksActions.ZEEBEE_CLAIM_FAIL }])
      }
    }),
  )

  @Effect()
  claimTaskSuccess: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_CLAIM_SUCCESS),
    tap(() => from([{ type: ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_REQUEST }])),
  )

  @Effect()
  completeTaskRequested: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_COMPLETE_REQUEST),
    map((action: ZeeBeeUserTasksActions.ZeeBeeCompleteRequest) => action.payload),
    switchMap(payload =>
      this.zeebeeUserTasks.complete(
        payload.taskId,
        payload.evaluation,
        payload.amount,
        payload.message,
      ),
    ),
    map(response => {
      if (response) {
        return from([{ type: ZeeBeeUserTasksActions.ZEEBEE_COMPLETE_SUCCESS }])
      } else {
        return from([{ type: ZeeBeeUserTasksActions.ZEEBEE_COMPLETE_FAIL }])
      }
    }),
  )

  @Effect()
  completeTaskSuccess: Observable<any> = this.actions.pipe(
    ofType(ZeeBeeUserTasksActions.ZEEBEE_COMPLETE_SUCCESS),
    tap(() => from([{ type: ZeeBeeUserTasksActions.ZEEBEE_ASSIGNEE_LIST_REQUEST }])),
  )

  ngrxOnInitEffects(): Action {
    return new ZeeBeeUserTasksActions.ZeeBeeNoAction()
  }
}
