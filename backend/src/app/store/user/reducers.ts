import * as UserActions from './actions'

export const initialState: object = {
  role: [''],
  login: '',
  email: '',
  authorized: false,
  loading: false,
}

export function reducer(state = initialState, action: UserActions.Actions): object {
  switch (action.type) {
    case UserActions.LOGIN:
      return {
        ...state,
        authorized: false,
      }
    case UserActions.LOGIN_SUCCESSFUL:
      return {
        ...state,
        authorized: true,
      }
    case UserActions.TOKEN_RECEIVED:
      return {
        ...state,
        loading: false,
      }
    case UserActions.LOAD_CURRENT_ACCOUNT_SUCCESSFUL:
      return {
        ...state,
        ...action.payload,
        loading: false,
        authorized: true,
      }
    case UserActions.LOGIN_UNSUCCESSFUL:
    case UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
        authorized: false,
      }
    case UserActions.FLUSH_USER:
    case UserActions.LOGOUT:
      return {
        role: '',
        login: '',
        email: '',
        authorized: false,
        loading: false,
      }
    case UserActions.EMPTY_ACTION:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export const getUser = (state: any) => state
