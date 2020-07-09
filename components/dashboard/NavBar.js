import { useState, useEffect, useContext } from "react"
import { Menu } from "antd"
import {
  SettingOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { AuthContext } from "../../context/auth/authContext"
import Router from "next/router"
import Link from "next/link"

export default function Navbar() {
  const [current, setcurrent] = useState("home")
  const { authReset } = useContext(AuthContext)

  const handleClick = (e) => {
    console.log(e.key)

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
    <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        onClick={handleClick}
        key="about"
        icon={<InfoCircleOutlined />}
      >
        <Link href="/about">
          <a>How To Use</a>
        </Link>
      </Menu.Item>
      <Menu.Item
        icon={<SettingOutlined />}
        title="Account Settings"
        disabled
      ></Menu.Item>
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
