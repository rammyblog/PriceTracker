import React from "react"
import { Card } from "antd"
import Pill from "../../common/Pill"
import ItemPriceInfo from "./ItemPriceInfo"
import { formatTime } from "../../utlis"
import CardEdit from "./CardEdit"
import "./WelcomeCard.less"

export default function ItemCard({ data }) {
  const formatStore = (storeArc) => {
    if (storeArc === "JM") {
      return "Jumia"
    }

    return "Konga"
  }
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
            <a
              className="welcome-text"
              target="_blank"
              rel="noopener noreferrer"
              href={url}
            >
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
          <ItemPriceInfo
            data={{ number: requested_price, text: "Desired Price" }}
          />
          <ItemPriceInfo
            data={{ number: last_price, text: "Last Price Updated" }}
          />
          {/* 
          {cardBoxInfo.map((data, idx) => (
            <>
              <ItemPriceInfo text={data.text} number={} key={idx} />
            </>
          ))} */}
        </div>

        <p className="ant-statistic-title">
          Updated: {formatTime(new Date(updated_at).getTime())}
        </p>
        <div style={{ display: "flex" }}>
          <Pill text={formatStore(store)} />
          <CardEdit id={id} mode="edit" />
        </div>
      </Card>
    </div>
  )
}
