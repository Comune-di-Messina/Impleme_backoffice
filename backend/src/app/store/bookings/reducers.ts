import * as BookingsActions from './actions'

export const initialState: object = {
  bookings_open: [],
  bookings_confirmed: [],
  bookings_closed: [],
  bookings_demandable: [],
  stati: [],
  loading: false,
}

export function reducer(state = initialState, action: BookingsActions.Actions): object {
  switch (action.type) {
    case BookingsActions.STATES_REQUEST:
    case BookingsActions.BOOKINGS_REQUEST:
      return {
        ...state,
      }
    case BookingsActions.STATES_LOADING:
    case BookingsActions.BOOKINGS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case BookingsActions.STATES_SUCCESSFUL:
    case BookingsActions.BOOKINGS_SUCCESSFUL:
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    case BookingsActions.STATES_UNSUCCESSFUL:
    case BookingsActions.BOOKINGS_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case BookingsActions.BOOKINGS_NOACTION:
    default:
      return state
  }
}

export const getBookings = (state: any) => state
