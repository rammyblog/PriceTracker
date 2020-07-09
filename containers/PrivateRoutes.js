import React, { useState, useEffect, useContext } from "react"
import Router from "next/router"

export const PrivateRoute = (Component) => {
  return function Auth() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const checkAuthTimeout = (expirationTime) => {
      return () => {
        setTimeout(() => {
          setIsAuthorized(false)
        }, expirationTime * 1000)
      }
    }
    const checkAuth = () => {
      const token = localStorage.getItem("priceTrackerToken")
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (!token) {
        localStorage.removeItem("priceTrackerToken")
        localStorage.removeItem("expirationDate")
        return false
      }
      if (expirationDate <= new Date()) {
        localStorage.removeItem("priceTrackerToken")
        localStorage.removeItem("expirationDate")
        return false
      }
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
      return true
    }
    useEffect(() => {
      checkAuth() ? setIsAuthorized(true) : Router.push("/login")
    }, [])
    return isAuthorized && <Component />
  }
}
