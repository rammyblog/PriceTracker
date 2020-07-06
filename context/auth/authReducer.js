import * as types from "./authTypes"

const AuthReducer = (state, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true,
      }

    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
      }
    case types.GET_USER:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: false,
        errResponse: "",
      }

    case types.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      }
    case types.AUTH_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: "",
        token: null,
        data: null,
      }

    default:
      return state
  }
}

export default AuthReducer
