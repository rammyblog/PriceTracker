import React from "react"
import { TrackerProvider } from "../../context/tracker/trackerContext"

function DashboardContextHOC(Component) {
  return function DashboardHoc(props) {
    return (
      <TrackerProvider>
        <Component {...props} />
      </TrackerProvider>
    )
  }
}

export default DashboardContextHOC
