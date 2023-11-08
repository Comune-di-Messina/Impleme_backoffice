import { Action } from '@ngrx/store'

export const BOOKINGS_NOACTION = '[Bookings] No action'
export const BOOKINGS_REQUEST = '[Bookings] Request bookings'
export const BOOKINGS_LOADING = '[Bookings] Loading bookings'
export const BOOKINGS_SUCCESSFUL = '[Bookings] Successful bookings'
export const BOOKINGS_UNSUCCESSFUL = '[Bookings] Unsuccessful bookings'
export const STATES_REQUEST = '[Bookings] Request states'
export const STATES_LOADING = '[Bookings] Loading states'
export const STATES_SUCCESSFUL = '[Bookings] Successful states'
export const STATES_UNSUCCESSFUL = '[Bookings] Unsuccessful states'

export class BookingsNoAction implements Action {
  readonly type = BOOKINGS_NOACTION
  constructor() {}
}

export class BookingsRequest implements Action {
  readonly type = BOOKINGS_REQUEST
  constructor() {}
}

export class BookingsLoading implements Action {
  readonly type = BOOKINGS_LOADING
  constructor() {}
}

export class BookingsSuccessful implements Action {
  readonly type = BOOKINGS_SUCCESSFUL
  constructor(public payload: any) {}
}

export class BookingsUnsuccessful implements Action {
  readonly type = BOOKINGS_UNSUCCESSFUL
  constructor() {}
}

export class StatesRequest implements Action {
  readonly type = STATES_REQUEST
  constructor() {}
}

export class StatesLoading implements Action {
  readonly type = STATES_LOADING
  constructor() {}
}

export class StatesSuccessful implements Action {
  readonly type = STATES_SUCCESSFUL
  constructor(public payload: any) {}
}

export class StatesUnsuccessful implements Action {
  readonly type = STATES_UNSUCCESSFUL
  constructor() {}
}

export type Actions =
  | BookingsNoAction
  | BookingsRequest
  | BookingsLoading
  | BookingsSuccessful
  | BookingsUnsuccessful
  | StatesRequest
  | StatesLoading
  | StatesSuccessful
  | StatesUnsuccessful
