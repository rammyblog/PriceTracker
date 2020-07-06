import React from "react"
import { TrackerProvider } from "../../context/tracker/trackerContext"
import Navbar from "./NavBar"

function DashboardContextHOC(Component) {
  return function DashboardHoc(props) {
    return (
      <TrackerProvider>
        <Navbar />
        <Component {...props} />
      </TrackerProvider>
    )
  }
}

export default DashboardContextHOC
