import React from "react"
import DashboardContextHOC from "../DashboardContextHOC"
import { Typography, Divider } from "antd"
const { Title, Paragraph, Text } = Typography
import "./About.less"

function AboutUs() {
  return (
    <div className="container about-setion">
      <Typography>
        <Title>What is pTracker</Title>
        <Paragraph>
          <Text strong>pTracker</Text> is an application that tracks prices of
          products on E-commerce websites(i.e. Jumia and Konga).
          {/* <Text strong>pTracker</Text> is an application that track prices of
          products on E-commerce websites, for now pTracker only supports Jumia
          and Konga. This application was built with 💓 by{" "}
          <a href="https://github.com/rammyblog">Onasanya Tunde</a> */}
        </Paragraph>
        <Paragraph>
          Tracking the price of a product can be very stressful because you have
          to keep checking almost every day until the product sells at your
          desired price. pTracker aims to bridge that gap by helping you track
          these products seamlessly. All you need to do is add the product on
          your dashboard. Then you will receive an email alert once the product
          sells at your desired price or lower.
        </Paragraph>
        <Title level={2}>How to Use pTracker</Title>
        <Paragraph>
          It is quite easy to use the application, All you need to do is to get
          the link of the product you want to track from the store, then add a
          new item in the dashboard. After successfully adding the product to
          your products catalogue, pTracker will automatically start tracking
          the product. Once pTracker tracks the desired price you want to buy
          for or lower, pTracker will send you an email urging you to buy.
        </Paragraph>

        <Title level={4}>The GIF below outlines the whole process.</Title>

        <div className="gif-container">
          <img
            src="./images/howToUse.gif"
            className="img-fluid"
            alt="my image"
          />
        </div>
      </Typography>

      <Title level={4}>
        For now, pTracker only supports Jumia and Konga. This application was
        built with 💓 by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/rammyblog"
        >
          Onasanya Tunde
        </a>{" "}
        .
      </Title>
    </div>
  )
}

export default DashboardContextHOC(AboutUs)
