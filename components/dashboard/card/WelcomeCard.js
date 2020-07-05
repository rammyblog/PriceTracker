import { Skeleton, Switch, Card, Avatar } from "antd"
import "./WelcomeCard.less"
import React from "react"
import WelcomeCardInfo from "./WelcomeCardInfo"
import { LogoutOutlined } from "@ant-design/icons"
import Pill from "../../common/Pill"
const cardBoxInfo = [
  { number: 33, text: "Total Users", variant: "primary" },
  { number: 33, text: "Active Users", variant: "success" },
  { number: 33, text: "Ghost Users", variant: "info" },
]
export default function WelcomeCard() {
  return (
    <div>
      <Card>
        <div className="card-user-info-container">
          <div className="welcome__details__pill">
            <p className="welcome-text">Welcome, Fana</p>
            <Pill text={"Tracker Info"} />
            <LogoutOutlined />
          </div>

          <span className="welcome-text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </span>
        </div>

        <div className="info-card">
          {cardBoxInfo.map((data, idx) => (
            <WelcomeCardInfo data={data} key={idx} />
          ))}
        </div>
      </Card>
    </div>
  )
}
