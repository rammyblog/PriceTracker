import React, { createContext, useReducer, useEffect, useCallback } from "react"
import AuthReducer from "./authReducer"
import axios from "axios"
import * as types from "./authTypes"
import priceTrackerApi from "../../api/apiUtils"

const initialAuthState = {
  loading: false,
  token: "",
  error: false,
  data: "",
  errResponse: "",
}

export const AuthContext = createContext(initialAuthState)

export const AuthProvider = ({ children }) => {
  const BASE_AUTH_URL = process.env.API_BASE_URL + "api/"
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState)

  const localStorageTest = () => {
    let hasLocalStorage = false
    console.log(localStorage)

    if (localStorage) {
      try {
        const x = "testStorage"
        localStorage.setItem(x, x)
        localStorage.removeItem(x)
        hasLocalStorage = true
      } catch (e) {
        hasLocalStorage = false
      }
    }
    return hasLocalStorage
  }

  const loginUser = useCallback(
    async (userData) => {
      if (localStorageTest()) {
        try {
          dispatch({
            type: types.AUTH_START,
          })

          let res = await priceTrackerApi.post(`api/login/`, userData)

          const token = res.data.key
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
          localStorage.setItem("priceTrackerToken", token)
          localStorage.setItem("expirationDate", expirationDate)

          dispatch({
            type: types.AUTH_SUCCESS,
            payload: res.data,
          })
        } catch (error) {
          console.log({ error })
          dispatch({
            type: types.AUTH_FAILURE,
            payload: error.response
              ? error.response.data.error_msg
              : "An error occured",
          })
        }
      } else {
        dispatch({
          type: types.AUTH_FAILURE,
          payload:
            "Your browser doesn't support a particular feature, If you are on Safari, ensure you are not using private mode",
        })
      }
    },
    [dispatch]
  )

  const registerUser = useCallback(
    async (userData) => {
      if (localStorageTest()) {
        try {
          dispatch({
            type: types.AUTH_START,
          })

          let res = await axios.post(`${BASE_AUTH_URL}register/`, userData)

          const token = res.data.key
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
          localStorage.setItem("priceTrackerToken", token)
          localStorage.setItem("expirationDate", expirationDate)

          dispatch({
            type: types.AUTH_SUCCESS,
            payload: res.data,
          })
        } catch (error) {
          dispatch({
            type: types.AUTH_FAILURE,
            payload: error.response
              ? error.response.data.error_msg
              : "An error occured",
          })
        }
      } else {
        dispatch({
          type: types.AUTH_FAILURE,
          payload:
            "Your browser doesn't support a particular feature, If you are on Safari, ensure you are not using private mode",
        })
      }
    },
    [dispatch]
  )

  const authReset = () =>
    dispatch({
      type: types.AUTH_RESET,
    })

  const getUser = useCallback(async () => {
    try {
      dispatch({
        type: types.AUTH_START,
      })

      let res = await priceTrackerApi.get(`api/user/`)

      dispatch({
        type: types.GET_USER,
        payload: res.data,
      })
    } catch (error) {
      dispatch({
        type: types.AUTH_FAILURE,
        payload: error.response
          ? error.response.data.error_msg
          : "An error occured",
      })
    }
  }, [dispatch])

  return (
    <AuthContext.Provider
      value={{
        state,
        loginUser,
        authReset,
        registerUser,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
