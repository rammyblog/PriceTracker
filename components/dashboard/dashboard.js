import React, { useEffect, useContext } from "react"
import { Layout, Menu } from "antd"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"

import "./dashboardStyle.less"
import EditableTable from "./table/DataTable"
import DashboardContextHOC from "./DashboardContextHOC"
import DataTables from "./table/Table"
import WelcomeCard from "./card/WelcomeCard"
import ItemCard from "./card/ItemCard"
import CreateItemButton from "./itemForm/ItemFormButton"
import { AuthContext } from "../../context/auth/authContext"

function DashboardLayout() {
  const { getUser, state } = useContext(AuthContext)
  const { data } = state
  // console.log(getUser)

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <WelcomeCard data={data} />
        {/* <ItemCard /> */}
        <CreateItemButton />
        <DataTables />
      </div>
    </>
  )
}

export default DashboardContextHOC(DashboardLayout)
