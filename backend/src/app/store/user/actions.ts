import { Action } from '@ngrx/store'

export const NO_ACTION = '[User] No action'
export const LOGIN = '[User] Login'
export const LOGIN_SUCCESSFUL = '[User] Login Succesful'
export const LOGIN_UNSUCCESSFUL = '[User] Login Unsuccesful'
export const LOAD_CURRENT_ACCOUNT = '[User] Load Current Account'
export const LOAD_CURRENT_ACCOUNT_SUCCESSFUL = '[User] Load Current Account Succesful'
export const LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL = '[User] Load Current Account Unsuccesful'
export const LOGOUT = '[User] Logout'
export const FLUSH_USER = '[User] Flush User'
export const EMPTY_ACTION = '[User] Empty Action'
export const TOKEN_RECEIVED = '[User] Token Received'

export class NoAction implements Action {
  readonly type = NO_ACTION
  constructor() {}
}

export class Login implements Action {
  readonly type = LOGIN
  constructor(public payload: any) {}
}

export class LoginSuccessful implements Action {
  readonly type = LOGIN_SUCCESSFUL
  constructor() {}
}

export class LoginUnsuccessful implements Action {
  readonly type = LOGIN_UNSUCCESSFUL
  constructor() {}
}
export class TokenReceived implements Action {
  readonly type = TOKEN_RECEIVED
  constructor() {}
}
export class LoadCurrentAccount implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT
  constructor(public payload: { role: string[]; login: string; email: string }) {}
}

export class LoadCurrentAccountSuccessful implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT_SUCCESSFUL
  constructor(public payload: { role: string[]; login: string; email: string }) {}
}

export class LoadCurrentAccountUnsuccessful implements Action {
  readonly type = LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL
  constructor() {}
}

export class Logout implements Action {
  readonly type = LOGOUT
  constructor() {}
}

export class FlushUser implements Action {
  readonly type = FLUSH_USER
  constructor() {}
}

export class EmptyAction implements Action {
  readonly type = EMPTY_ACTION
  constructor() {}
}

export type Actions =
  | Login
  | LoginSuccessful
  | LoginUnsuccessful
  | LoadCurrentAccount
  | LoadCurrentAccountSuccessful
  | LoadCurrentAccountUnsuccessful
  | Logout
  | FlushUser
  | EmptyAction
  | NoAction
  | TokenReceived
