import React from "react"
import { TrackerProvider } from "../../context/tracker/trackerContext"
import Navbar from "./NavBar"
import { AuthProvider } from "../../context/auth/authContext"

function DashboardContextHOC(Component) {
  return function DashboardHoc(props) {
    return (
      <AuthProvider>
        <TrackerProvider>
          <Navbar />
          <Component {...props} />
        </TrackerProvider>
      </AuthProvider>
    )
  }
}

export default DashboardContextHOC
