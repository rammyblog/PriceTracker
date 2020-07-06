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
      {/* <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              nav 4
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <WelcomeCard />
              <CreateItemButton />
              <DataTables />
            </div>
          </Content>
        </Layout>
      </Layout> */}

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
