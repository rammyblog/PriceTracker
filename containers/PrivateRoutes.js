import React, { useState, useEffect } from "react"
import Router from "next/router"

export const PrivateRoute = (Component) => {
  return function Auth() {
    const [isAuthorized, setIsAuthorized] = useState(false)
    useEffect(() => {
      localStorage.getItem("priceTrackerToken")
        ? setIsAuthorized(true)
        : Router.push("/login")
    }, [])
    return isAuthorized && <Component />
  }
}
