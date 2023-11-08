import { Action } from '@ngrx/store'

export const NO_ACTION = '[API Generic] No action'
export const ROOMS_CATEGORIES = '[Rooms] Categories'
export const ROOMS_CATEGORIES_SUCCESSFUL = '[Rooms] Categories Succesful'
export const ROOMS_CATEGORIES_UNSUCCESSFUL = '[Rooms] Categories Unsuccesful'

export const ENTI = '[Enti] List'
export const ENTI_SUCCESSFUL = '[Enti] List Succesful'
export const ENTI_UNSUCCESSFUL = '[Enti] List Unsuccesful'

export const ROOM_BOOKINGS = '[Room] Bookings'
export const ROOM_BOOKINGS_SUCCESSFUL = '[Room] Bookings Succesful'
export const ROOM_BOOKINGS_UNSUCCESSFUL = '[Room] Bookings Unsuccesful'

export const ROOMS_TYPOLOGIES = '[Rooms] Typologies'
export const ROOMS_TYPOLOGIES_SUCCESSFUL = '[Rooms] Typologies Succesful'
export const ROOMS_TYPOLOGIES_UNSUCCESSFUL = '[Rooms] Typologies Unsuccesful'

export class NoAction implements Action {
  readonly type = NO_ACTION
  constructor() {}
}

export class RoomsCategories implements Action {
  readonly type = ROOMS_CATEGORIES
  constructor() {}
}

export class RoomsCategoriesSuccessful implements Action {
  readonly type = ROOMS_CATEGORIES_SUCCESSFUL
  constructor(public payload: any) {}
}

export class RoomsCategoriesUnsuccessful implements Action {
  readonly type = ROOMS_CATEGORIES_UNSUCCESSFUL
  constructor() {}
}

export class Enti implements Action {
  readonly type = ENTI
  constructor() {}
}

export class EntiSuccessful implements Action {
  readonly type = ENTI_SUCCESSFUL
  constructor(public payload: any) {}
}

export class EntiUnsuccessful implements Action {
  readonly type = ENTI_UNSUCCESSFUL
  constructor() {}
}

export class RoomBookings implements Action {
  readonly type = ROOM_BOOKINGS
  constructor() {}
}

export class RoomBookingsSuccessful implements Action {
  readonly type = ROOM_BOOKINGS_SUCCESSFUL
  constructor(public payload: any) {}
}

export class RoomBookingsUnsuccessful implements Action {
  readonly type = ROOM_BOOKINGS_UNSUCCESSFUL
  constructor() {}
}

export class RoomsTypologies implements Action {
  readonly type = ROOMS_TYPOLOGIES
  constructor() {}
}

export class RoomsTypologiesSuccessful implements Action {
  readonly type = ROOMS_TYPOLOGIES_SUCCESSFUL
  constructor(public payload: any) {}
}

export class RoomsTypologiesUnsuccessful implements Action {
  readonly type = ROOMS_TYPOLOGIES_UNSUCCESSFUL
  constructor() {}
}

export type Actions =
  | RoomsCategories
  | RoomsCategoriesSuccessful
  | RoomsCategoriesUnsuccessful
  | Enti
  | EntiSuccessful
  | EntiUnsuccessful
  | RoomBookings
  | RoomBookingsSuccessful
  | RoomBookingsUnsuccessful
  | RoomsTypologies
  | RoomsTypologiesSuccessful
  | RoomsTypologiesUnsuccessful
  | NoAction
