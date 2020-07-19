import React, { useState } from "react"
import { Menu, Button } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import "./HomeNavbarStyled.less"
import Link from "next/link"

function HomeNavbar() {
  const [current, setCurrent] = useState('home')

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

        <Menu.Item className="nav-link" key="login">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>

        <Menu.Item className="nav-link" key="register">
          <Link href="/register">
            <a>
              <Button
                type="info"
                // size="large"
                className="button__custom"
              >
                Register
              </Button>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default HomeNavbar
