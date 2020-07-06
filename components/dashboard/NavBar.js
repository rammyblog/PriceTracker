import { useState, useEffect, useContext } from "react"
import { Menu } from "antd"
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { AuthContext } from "../../context/auth/authContext"
import Router from "next/router"

const { SubMenu } = Menu

export default function Navbar() {
  const [current, setcurrent] = useState("home")
  const { authReset } = useContext(AuthContext)

  const handleClick = (e) => {
    setcurrent(e.key)
    // this.setState({ current: e.key })
  }

  const logOut = () => {
    localStorage.removeItem("priceTrackerToken")
    localStorage.removeItem("expirationDate")
    Router.push("/login")
    // authReset()
  }

  useEffect(() => {
    if (current === "logout") {
      logOut()
    }
  }, [current])

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="about" icon={<InfoCircleOutlined />}>
        How To Use
      </Menu.Item>
      <SubMenu icon={<SettingOutlined />} title="Account Settings">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="setting:1">Option 1</Menu.Item>
          <Menu.Item key="setting:2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="setting:3">Option 3</Menu.Item>
          <Menu.Item key="setting:4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item key="github" icon={<GithubOutlined />}>
        <a
          href="https://github.com/rammyblog/PriceTracker"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </Menu.Item>
      <Menu.Item
        style={{ float: "right" }}
        key="logout"
        icon={<LogoutOutlined />}
      >
        Log out
      </Menu.Item>
    </Menu>
  )
}
