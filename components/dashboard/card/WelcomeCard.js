import { Skeleton, Switch, Card, Avatar } from "antd"
import "./WelcomeCard.less"
const { Meta } = Card

import React from "react"
import WelcomeCardInfo from "./WelcomeCardInfo"
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
          <p className="welcome-text">Welcome, Fana</p>
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

        <Meta title="Card title" description="This is the description" />
      </Card>
    </div>
  )
}
