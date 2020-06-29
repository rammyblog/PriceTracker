import * as types from "./trackerTypes"

export const initalTrackerState = {
  loading: false,
  data: null,
  error: false,
  errResponse: null,
}

export const TrackerReducer = (state, action) => {
  switch (action.type) {
    case types.TRACKER_START:
      return {
        ...state,
        loading: true,
      }

    case types.TRACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }

    case types.TRACKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      }
    case types.TRACKER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: "",
      }

    default:
      return state
  }
}