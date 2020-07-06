import { Skeleton, Switch, Card, Avatar } from "antd"
import "./WelcomeCard.less"
import React from "react"
import WelcomeCardInfo from "./WelcomeCardInfo"
import Pill from "../../common/Pill"
const cardBoxInfo = [
  { number: 33, text: "Total Users", variant: "primary" },
  { number: 33, text: "Active Users", variant: "success" },
  { number: 33, text: "Ghost Users", variant: "info" },
]

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
export default function WelcomeCard({ data }) {
  const { email, first_name, username } = data
  return (
    <div>
      <Card>
        <div className="card-user-info-container">
          <div className="welcome__details__pill">
            <p className="welcome-text">Welcome, {toTitleCase(username)} </p>
            <Pill text={"Tracker Info"} />
          </div>

          <span className="welcome-text-muted">
            Welcome to pTracker, Easy way to track products online
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
