import React from "react"
import { AuthProvider } from "../../context/auth/authContext"
import "./authStyle.less"

export default function AuthContextHOC(Component) {
  return function authHoc(props) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    )
  }
}
