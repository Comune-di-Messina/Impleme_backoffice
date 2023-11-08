import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store'
import { environment } from 'src/environments/environment'
import * as fromRouter from '@ngrx/router-store'
import * as fromSettings from './settings/reducers'
import * as fromUser from './user/reducers'
import * as fromApi from './api/reducers'
import * as fromBookings from './bookings/reducers'
import * as fromRooms from './rooms/reducers'
import * as fromMunicipalities from './municipalities/reducers'
import * as fromZeeBeeUserTasks from './user-tasks/reducers'

export const reducers: ActionReducerMap<any> = {
  router: fromRouter.routerReducer,
  settings: fromSettings.reducer,
  user: fromUser.reducer,
  api: fromApi.reducer,
  bookings: fromBookings.reducer,
  rooms: fromRooms.reducer,
  municipalities: fromMunicipalities.reducer,
  zeeBeeUserTasks: fromZeeBeeUserTasks.reducer,
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    const result = reducer(state, action)
    // console.groupCollapsed(action.type)
    // console.log('prev state', state)
    console.log('action', action)
    console.log('next state', result)
    // console.groupEnd()
    return result
  }
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : []

export const getSettingsState = createFeatureSelector<any>('settings')
export const getSettings = createSelector(getSettingsState, fromSettings.getSettings)

export const getUserState = createFeatureSelector<any>('user')
export const getUser = createSelector(getUserState, fromUser.getUser)

export const getApiState = createFeatureSelector<any>('api')
export const getApi = createSelector(getApiState, fromApi.getApi)

export const getBookingsState = createFeatureSelector<any>('bookings')
export const getBookings = createSelector(getBookingsState, fromBookings.getBookings)

export const getRoomsState = createFeatureSelector<any>('rooms')
export const getRooms = createSelector(getRoomsState, fromRooms.getRooms)

export const getMunicipalitiesState = createFeatureSelector<any>('municipalities')
export const getMunicipalities = createSelector(
  getMunicipalitiesState,
  fromMunicipalities.getMunicipalities,
)

export const getZeeBeeUserTasksState = createFeatureSelector<any>('user-tasks')
export const getZeeBeeUserTasks = createSelector(
  getZeeBeeUserTasksState,
  fromZeeBeeUserTasks.getZeeBeeUserTasks,
)
