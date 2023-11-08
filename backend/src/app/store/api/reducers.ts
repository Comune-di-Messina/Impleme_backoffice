import * as ApiActions from './actions'

export const initialState: object = {
  roomsCategories: null,
  enti: null,
  roomBookings: null,
  roomsTypologies: null,
  loading: false,
}

export function reducer(state = initialState, action: ApiActions.Actions): object {
  switch (action.type) {
    case ApiActions.ROOMS_TYPOLOGIES:
    case ApiActions.ROOMS_CATEGORIES:
    case ApiActions.ENTI:
    case ApiActions.ROOM_BOOKINGS:
      return {
        ...state,
        loading: true,
      }
    case ApiActions.ROOMS_CATEGORIES_SUCCESSFUL:
      return {
        ...state,
        roomsCategories: action.payload,
        loading: false,
      }
    case ApiActions.ENTI_SUCCESSFUL:
      return {
        ...state,
        enti: action.payload,
        loading: false,
      }
    case ApiActions.ROOM_BOOKINGS_SUCCESSFUL:
      return {
        ...state,
        roomBookings: action.payload,
        loading: false,
      }
    case ApiActions.ROOMS_TYPOLOGIES_SUCCESSFUL:
      return {
        ...state,
        roomsTypologies: action.payload,
        loading: false,
      }
    case ApiActions.ROOMS_CATEGORIES_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case ApiActions.ENTI_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case ApiActions.ROOM_BOOKINGS_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case ApiActions.ROOMS_TYPOLOGIES_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export const getApi = (state: any) => state
