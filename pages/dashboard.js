import React from "react"
import DashboardLayout from "../components/dashboard/dashboard"
import { PrivateRoute } from "../containers/PrivateRoutes"

function dashboard() {
  return (
    <div>
      <DashboardLayout />
    </div>
  )
}

export default PrivateRoute(dashboard)
