import React from "react"
import DashboardContextHOC from "../DashboardContextHOC"
import { Typography, Divider } from "antd"
import "./About.less"
const { Title, Paragraph, Text } = Typography

function AboutUs() {
  return (
    <div className="container">
      <Typography>
        <Title>What is pTracker</Title>
        <Paragraph>
          <Text strong>pTracker</Text> is an application that track prices of
          products on E-commerce websites, for now pTracker only supports Jumia
          and Konga. This application was built with 💓 by{" "}
          <a href="https://github.com/rammyblog">Onasanya Tunde</a>
        </Paragraph>
        <h2></h2>
        <p></p>
        <p></p>
        <Title level={2}>How to Use pTracker</Title>
        <Paragraph>
          It is quite easy to use the application, All you need to do is to get
          the URL of the product you want to track from the store, then add a
          new item in the dashboard. After successfully adding the product to
          your catalog, pTracker starts tracking the product. Once pTracker
          track the tracking price you tracking for, It will send you and email
          urging you to buy
        </Paragraph>

        {/* <Paragraph></Paragraph> */}

        <div className="gif-container">
          <img
            src="./images/howToUse.gif"
            className="img-fluid"
            alt="my image"
          />
        </div>
      </Typography>
    </div>
  )
}

export default DashboardContextHOC(AboutUs)
