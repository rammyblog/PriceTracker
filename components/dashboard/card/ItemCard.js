import React from "react"
import { Card } from "antd"
import Pill from "../../common/Pill"
import "./WelcomeCard.less"
import ItemPriceInfo from "./ItemPriceInfo"
import { formatTime } from "../../utlis"
import CardEdit from "./CardEdit"
const cardBoxInfo = [
  { number: 5000333, text: "Requested Price", variant: "primary" },
  { number: 200033, text: "Last Price Updated", variant: "success" },
  //   { number: 333333, text: "Ghost Users", variant: "info" },
]
export default function ItemCard({ data }) {
  const {
    id,
    title,
    url,
    requested_price,
    last_price,
    store,
    updated_at,
    created_at,
  } = data
  //   id2
  // title"Slim Regular Jeans For Men - Blue"
  // url"https://www.konga.com/product/slim-regular-jeans-for-men-blue-3538616"
  // requested_price5000
  // last_price"5000"
  // discount_price"DISCOUNT! The price is 5000"
  // store"KO"
  // created_at"2020-06-25T16:44:52.718404Z"
  // updated_at"2020-06-25T17:16:05.888514Z"
  // owner1
  return (
    <div className="single-card-container">
      <Card>
        <div className="card-user-info-container">
          <div className="welcome__details__pill">
            <a className="welcome-text" href={url}>
              {title}
            </a>
            <CardEdit id={id} mode="delete" />
          </div>

          {/* <span className="welcome-text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </span> */}
        </div>

        <div className="price-card-container">
          {cardBoxInfo.map((data, idx) => (
            <>
              <ItemPriceInfo data={data} key={idx} />
            </>
          ))}
        </div>

        <p className="ant-statistic-title">
          Updated: {formatTime(new Date(updated_at).getTime())}
        </p>
        <div style={{ display: "flex" }}>
          <Pill text={"Jumia"} />
          <CardEdit id={id} mode="edit" />
        </div>
      </Card>
    </div>
  )
}
