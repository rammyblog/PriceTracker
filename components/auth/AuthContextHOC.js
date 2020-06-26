import React, { useContext } from "react"
import { AuthProvider } from "../../context/auth/authContext"
import "./authStyle.less"
import { AuthContext } from "../../context/auth/authContext"

import { Alert } from "antd"

export default function AuthContextHOC(Component) {
  return function authHoc(props) {
    return (
      <AuthProvider>
      
        <Component {...props} />
      </AuthProvider>
    )
  }
}
