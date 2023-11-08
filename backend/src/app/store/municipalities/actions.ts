import { Action } from '@ngrx/store'

const municipalities_base = '[Municipalities]'
export const MUNICIPALITIES_NOACTION = `${municipalities_base} No action`
export const MUNICIPALITIES_REQUEST = `${municipalities_base} Request municipalities`
export const MUNICIPALITIES_LOADING = `${municipalities_base} Loading municipalities`
export const MUNICIPALITIES_SUCCESSFUL = `${municipalities_base} Success loading municipalities`
export const MUNICIPALITIES_UNSUCCESSFUL = `${municipalities_base} Fail loading municipalities`

export class MunicipalitiesNoAction implements Action {
  readonly type = MUNICIPALITIES_NOACTION
  constructor() {}
}

export class MunicipalitiesRequest implements Action {
  readonly type = MUNICIPALITIES_REQUEST
  constructor() {}
}

export class MunicipalitiesLoading implements Action {
  readonly type = MUNICIPALITIES_LOADING
  constructor() {}
}

export class MunicipalitiesSuccessful implements Action {
  readonly type = MUNICIPALITIES_SUCCESSFUL
  constructor(public payload: any) {}
}

export class MunicipalitiesUnsuccessful implements Action {
  readonly type = MUNICIPALITIES_UNSUCCESSFUL
  constructor() {}
}

export type Actions =
  | MunicipalitiesNoAction
  | MunicipalitiesRequest
  | MunicipalitiesLoading
  | MunicipalitiesSuccessful
  | MunicipalitiesUnsuccessful
