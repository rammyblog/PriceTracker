import React from "react"
import { Button } from "antd"
import "./LandingHeader.less"
import Link from "next/link"

function LandingHeader() {
  return (
    <div className="header__container">
      <div className="half__width">
        <p className="heading-text">
          Get products on your favourite Online store at your desired price.
        </p>
        <p className="heading-subtext">
          Keeping up with product prices online can be very tedious😫. But With
          pTracker, you can track those products without having to worry. As
          soon as the product sells at the desired price you chose, we will
          notify you with an email alert.
        </p>

        <a href="/dashboard">
          <Button
            type="primary"
            size="large"
            className="button__custom get__started__btn"
          >
            Get Started
          </Button>
        </a>

        <Link href="/about">
          <a>
            <Button size="large" className="button__custom" type="info">
              Learn More
            </Button>
          </a>
        </Link>
      </div>
      <div className="half__width image-col">
        <img
          className="  animate__animated animate__bounce  animate__slower"
          src="./images/stock.svg"
          alt="price discounts"
        />
      </div>
    </div>
  )
}

export default LandingHeader
