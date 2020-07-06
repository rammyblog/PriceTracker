import React from "react"
import { Statistic } from "antd"

function ItemPriceInfo({ data }) {
  const { text, number } = data
  return (
    <>
      <Statistic title={text} value={number} prefix={"₦"} />
    </>
  )
}

export default ItemPriceInfo
