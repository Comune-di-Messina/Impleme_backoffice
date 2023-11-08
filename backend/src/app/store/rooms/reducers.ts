import * as RoomsActions from './actions'

export const initialState: object = {
  rooms: [],
  loading: false,
}

export function reducer(state = initialState, action: RoomsActions.Actions): object {
  switch (action.type) {
    case RoomsActions.ROOMS_REQUEST_ALL:
      return state
    // case RoomsActions.ROOMS_REQUEST_SINGLE:
    //   return state
    // case RoomsActions.ROOMS_LOADING_SINGLE:
    //   return {
    //     ...state,
    //     loading: true,
    //   }
    case RoomsActions.ROOMS_LOADING_ALL:
      return {
        ...state,
        loading: true,
      }
    case RoomsActions.ROOMS_SUCCESSFUL_ALL:
      return {
        ...state,
        rooms: [...(action as RoomsActions.RoomsSuccessfulAll).payload],
        loading: false,
      }
    // case RoomsActions.ROOMS_SUCCESSFUL_SINGLE:
    //   return {
    //     loading: false,
    //   }
    case RoomsActions.ROOMS_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case RoomsActions.ROOMS_NOACTION:
      return state
    default:
      return state
  }
}

export const getRooms = (state: any) => state
