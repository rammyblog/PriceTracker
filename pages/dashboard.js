import React from "react"
import DashboardLayout from "../components/dashboard/dashboard"
import { PrivateRoute } from "../containers/PrivateRoutes"
import Head from 'next/head'

function dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard | pTracker</title>
        </Head>
      <DashboardLayout />
    </div>
  )
}

export default PrivateRoute(dashboard)
