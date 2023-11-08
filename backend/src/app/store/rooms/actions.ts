import { Action } from '@ngrx/store'

const base = '[Rooms]'
export const ROOMS_NOACTION = `${base} No action`
export const ROOMS_REQUEST_ALL = `${base} Request bookings`
export const ROOMS_LOADING_ALL = `${base} Loading bookings`
export const ROOMS_SUCCESSFUL_ALL = `${base} Successful bookings`
// export const ROOMS_REQUEST_SINGLE = `${base} Request bookings`
// export const ROOMS_LOADING_SINGLE = `${base} Loading bookings`
// export const ROOMS_SUCCESSFUL_SINGLE = `${base} Successful bookings`
export const ROOMS_UNSUCCESSFUL = `${base} Unsuccessful bookings`

export class RoomsNoAction implements Action {
  readonly type = ROOMS_NOACTION
  constructor() {}
}

export class RoomsRequestAll implements Action {
  readonly type = ROOMS_REQUEST_ALL
  constructor() {}
}

export class RoomsLoadingAll implements Action {
  readonly type = ROOMS_LOADING_ALL
  constructor() {}
}

export class RoomsSuccessfulAll implements Action {
  readonly type = ROOMS_SUCCESSFUL_ALL
  constructor(public payload: any) {}
}

export class RoomsUnsuccessful implements Action {
  readonly type = ROOMS_UNSUCCESSFUL
  constructor() {}
}

// export class RoomsRequestSingle implements Action {
//   readonly type = ROOMS_REQUEST_SINGLE
//   constructor(public payload: any) {}
// }
//
// export class RoomsLoadingSingle implements Action {
//   readonly type = ROOMS_LOADING_SINGLE
//   constructor(public payload: any) {}
// }
//
// export class RoomsSuccessfulSingle implements Action {
//   readonly type = ROOMS_SUCCESSFUL_SINGLE
//   constructor(public payload: any) {}
// }

export type Actions =
  | RoomsNoAction
  | RoomsRequestAll
  | RoomsLoadingAll
  | RoomsSuccessfulAll
  | RoomsUnsuccessful
// | RoomsRequestSingle
// | RoomsLoadingSingle
// | RoomsSuccessfulSingle
