import * as MunicipalitiesActions from './actions'

export const initialState: object = {
  enti: [],
  loading: false,
}

export function reducer(state = initialState, action: MunicipalitiesActions.Actions): object {
  switch (action.type) {
    case MunicipalitiesActions.MUNICIPALITIES_REQUEST:
      return state
    case MunicipalitiesActions.MUNICIPALITIES_LOADING:
      return {
        ...state,
        loading: true,
      }
    case MunicipalitiesActions.MUNICIPALITIES_SUCCESSFUL:
      return {
        ...state,
        enti: (action as MunicipalitiesActions.MunicipalitiesSuccessful).payload,
        loading: false,
      }
    case MunicipalitiesActions.MUNICIPALITIES_UNSUCCESSFUL:
      return {
        ...state,
        loading: false,
      }
    case MunicipalitiesActions.MUNICIPALITIES_NOACTION:
      return state
    default:
      return state
  }
}

export const getMunicipalities = (state: any) => state
