import * as ZeeBeeActions from './actions'
import { ZeeBeeAssigneeListSuccess, ZeeBeeClaimRequest, ZeeBeeCompleteRequest } from './actions'

export const initialState: object = {
  demandable_list: [],
  assignee_list: [],
  task_to_claim: '',
  task_to_complete: '',
  loading: false,
}

export function reducer(state = initialState, action: ZeeBeeActions.Actions): object {
  switch (action.type) {
    case ZeeBeeActions.ZEEBEE_NOACTION:
    case ZeeBeeActions.ZEEBEE_DEMANDABLE_LIST_REQUEST:
    case ZeeBeeActions.ZEEBEE_ASSIGNEE_LIST_REQUEST:
      return state
    case ZeeBeeActions.ZEEBEE_DEMANDABLE_LIST_LOADING:
    case ZeeBeeActions.ZEEBEE_ASSIGNEE_LIST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case ZeeBeeActions.ZEEBEE_DEMANDABLE_LIST_SUCCESS:
      return {
        ...state,
        demandable_list: [...(action as ZeeBeeActions.ZeeBeeAssigneeListSuccess).payload],
        loading: false,
      }
    case ZeeBeeActions.ZEEBEE_DEMANDABLE_LIST_FAIL:
    case ZeeBeeActions.ZEEBEE_ASSIGNEE_LIST_FAIL:
      return {
        ...state,
        loading: false,
      }
    case ZeeBeeActions.ZEEBEE_ASSIGNEE_LIST_SUCCESS:
      return {
        ...state,
        assignee_list: [...(action as ZeeBeeAssigneeListSuccess).payload],
        loading: false,
      }
    case ZeeBeeActions.ZEEBEE_CLAIM_REQUEST:
      return {
        ...state,
        loading: true,
        task_to_claim: (action as ZeeBeeClaimRequest).payload,
      }
    case ZeeBeeActions.ZEEBEE_CLAIM_SUCCESS:
    case ZeeBeeActions.ZEEBEE_CLAIM_FAIL:
      return {
        ...state,
        loading: false,
        task_to_claim: '',
      }
    case ZeeBeeActions.ZEEBEE_COMPLETE_REQUEST:
      return {
        ...state,
        loading: true,
        task_to_complete: (action as ZeeBeeCompleteRequest).payload,
      }
    case ZeeBeeActions.ZEEBEE_COMPLETE_SUCCESS:
    case ZeeBeeActions.ZEEBEE_COMPLETE_FAIL:
      return {
        ...state,
        loading: false,
        task_to_complete: '',
      }
    default:
      return state
  }
}

export const getZeeBeeUserTasks = (state: any) => state
