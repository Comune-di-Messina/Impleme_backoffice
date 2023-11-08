import { Action } from '@ngrx/store'

const base = '[ZeeBee Usertask]'
export const ZEEBEE_NOACTION = `${base} No action`

export const ZEEBEE_DEMANDABLE_LIST_REQUEST = `${base} Request demandable list`
export const ZEEBEE_DEMANDABLE_LIST_LOADING = `${base} Loading demandable list`
export const ZEEBEE_DEMANDABLE_LIST_SUCCESS = `${base} Storing demandable list`
export const ZEEBEE_DEMANDABLE_LIST_FAIL = `${base} Demandable list failed`

export const ZEEBEE_ASSIGNEE_LIST_REQUEST = `${base} Request assignee list`
export const ZEEBEE_ASSIGNEE_LIST_LOADING = `${base} Loading assignee list`
export const ZEEBEE_ASSIGNEE_LIST_SUCCESS = `${base} Storing assignee list`
export const ZEEBEE_ASSIGNEE_LIST_FAIL = `${base} Assignee list failed`

export const ZEEBEE_CLAIM_REQUEST = `${base} Request claim of task`
export const ZEEBEE_CLAIM_SUCCESS = `${base} Task claimed`
export const ZEEBEE_CLAIM_FAIL = `${base} Task not claimed`

export const ZEEBEE_COMPLETE_REQUEST = `${base} Request complete of task`
export const ZEEBEE_COMPLETE_SUCCESS = `${base} Task completed`
export const ZEEBEE_COMPLETE_FAIL = `${base} Task not completed`

export class ZeeBeeNoAction implements Action {
  readonly type = ZEEBEE_NOACTION
  public constructor() {}
}

export class ZeeBeeDemandableListRequest implements Action {
  readonly type = ZEEBEE_DEMANDABLE_LIST_REQUEST
  public constructor() {}
}

export class ZeeBeeDemandableListLoading implements Action {
  readonly type = ZEEBEE_DEMANDABLE_LIST_LOADING
  public constructor() {}
}

export class ZeeBeeDemandableListSuccess implements Action {
  readonly type = ZEEBEE_DEMANDABLE_LIST_SUCCESS
  public constructor(public payload: any) {}
}

export class ZeeBeeDemandableListFail implements Action {
  readonly type = ZEEBEE_DEMANDABLE_LIST_FAIL
  public constructor() {}
}

export class ZeeBeeAssigneeListRequest implements Action {
  readonly type = ZEEBEE_ASSIGNEE_LIST_REQUEST
  public constructor() {}
}

export class ZeeBeeAssigneeListLoading implements Action {
  readonly type = ZEEBEE_ASSIGNEE_LIST_LOADING
  public constructor() {}
}

export class ZeeBeeAssigneeListSuccess implements Action {
  readonly type = ZEEBEE_ASSIGNEE_LIST_SUCCESS
  public constructor(public payload: any) {}
}

export class ZeeBeeAssigneeListFail implements Action {
  readonly type = ZEEBEE_ASSIGNEE_LIST_FAIL
  public constructor() {}
}

export class ZeeBeeClaimRequest implements Action {
  readonly type = ZEEBEE_CLAIM_REQUEST
  public constructor(public payload: any) {}
}

export class ZeeBeeClaimSuccess implements Action {
  readonly type = ZEEBEE_CLAIM_SUCCESS
  public constructor(public payload: any) {}
}

export class ZeeBeeClaimFail implements Action {
  readonly type = ZEEBEE_CLAIM_FAIL
  public constructor() {}
}

export class ZeeBeeCompleteRequest implements Action {
  readonly type = ZEEBEE_COMPLETE_REQUEST
  public constructor(public payload: any) {}
}

export class ZeeBeeCompleteSuccess implements Action {
  readonly type = ZEEBEE_COMPLETE_SUCCESS
  public constructor() {}
}

export class ZeeBeeCompleteFail implements Action {
  readonly type = ZEEBEE_COMPLETE_FAIL
  public constructor() {}
}

export type Actions =
  | ZeeBeeNoAction
  | ZeeBeeAssigneeListFail
  | ZeeBeeAssigneeListLoading
  | ZeeBeeAssigneeListRequest
  | ZeeBeeAssigneeListSuccess
  | ZeeBeeDemandableListRequest
  | ZeeBeeDemandableListLoading
  | ZeeBeeDemandableListSuccess
  | ZeeBeeDemandableListFail
  | ZeeBeeClaimRequest
  | ZeeBeeClaimSuccess
  | ZeeBeeClaimFail
  | ZeeBeeCompleteRequest
  | ZeeBeeCompleteSuccess
  | ZeeBeeCompleteFail
