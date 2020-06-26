import React, { createContext, useReducer, useEffect, useCallback } from "react"
import AuthReducer from "./authReducer"
import axios from "axios"
import * as types from "./authTypes"

const initialAuthState = {
  loading: false,
  token: "",
  error: false,
  errResponse: "",
}

export const AuthContext = createContext(initialAuthState)

export const AuthProvider = ({ children }) => {
  const BASE_AUTH_URL = process.env.API_BASE_URL + "api/"
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState)

  const loginUser = useCallback(
    async (userData) => {
      try {
        dispatch({
          type: types.AUTH_START,
        })

        let res = await axios.post(`${BASE_AUTH_URL}login/`, userData)
        console.log(res.data)
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
        localStorage.setItem("priceTrackerToken", token)
        localStorage.setItem("expirationDate", expirationDate)

        dispatch({
          type: types.AUTH_SUCCESS,
          payload: res.data,
        })
      } catch (e) {
        dispatch({
          type: types.AUTH_FAILURE,
          payload: e.response.data.non_field_errors || "An error occured",
        })
        console.log(e.response.data.non_field_errors)
      }
    },
    [dispatch]
  )

  //   useEffect(() => {
  //     loginUser("NG")
  //   }, [fetchStats])

  return (
    <AuthContext.Provider
      value={{
        state,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
