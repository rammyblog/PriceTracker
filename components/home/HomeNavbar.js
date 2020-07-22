import React, { useState, useEffect } from "react"
import "./HomeNavbarStyled.less"
import { InfoCircleOutlined, LogoutOutlined } from "@ant-design/icons"
import Link from "next/link"
import Router from "next/router"

import { Menu, Button } from "antd"
function HomeNavbar() {
  const { SubMenu } = Menu
  const [current, setCurrent] = useState("home")
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("priceTrackerToken")
    if (token) {
      setAuth(true)
    }
  }, [])

  useEffect(() => {
    if (current === "logout") {
      logOut()
    }
  }, [current])

  const logOut = () => {
    localStorage.removeItem("priceTrackerToken")
    localStorage.removeItem("expirationDate")
    Router.push("/login")
    // authReset()
  }
  const handleClick = (e) => {
    setCurrent(e.key)
  }
  return (
    <div>
      <Menu
        theme="dark"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <p className="icon-header-text">pTracker</p>
        </Menu.Item>
        <Menu.Item
          className="nav-link"
          key="about"
          icon={<InfoCircleOutlined />}
        >
          <Link href="/about">
            <a>How To Use</a>
          </Link>
        </Menu.Item>
        {auth
          ? ["dashboard", "logout"].map((item) => (
              <Menu.Item className="nav-link" key={item}>
                <Link prefetch="false" href={`/${item}`}>
                  <a>{item}</a>
                </Link>
              </Menu.Item>
            ))
          : ["login", "register"].map((item) => (
              <Menu.Item className="nav-link" key={item}>
                <Link prefetch="false" href={`/${item}`}>
                  <a>{item}</a>
                </Link>
              </Menu.Item>
            ))

            // <Menu.Item className="nav-link" key="register">
            //   <Link href="/register">
            //     <a>
            //       <Button
            //         type="info"
            //         // size="large"
            //         className="button__custom"
            //       >
            //         Register
            //       </Button>
            //     </a>
            //   </Link>
            // </Menu.Item>
        }
      </Menu>
    </div>
  )
}

export default HomeNavbar
