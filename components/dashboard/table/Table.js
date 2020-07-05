import React, { useState, useContext } from "react"
import { TrackerContext } from "../../../context/tracker/trackerContext"
import DataTable from "react-data-table-component"
import "./DataTable.less"
import CustomLoader from "../../common/CustomLoader"

import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import ItemCard from "../card/ItemCard"

const CustomTitle = ({ data, row }) => (
  <>
    <div className="title-url-row">
      <a href={row.url}>{row.title}</a>
    </div>
  </>
)

function DataTables() {
  const { state } = useContext(TrackerContext)
  const { data: itemData } = state

  // const itemData = [
  //   {
  //     id: 2,
  //     title: "Slim Regular Jeans For Men - Blue",
  //     url:
  //       "https://www.konga.com/product/slim-regular-jeans-for-men-blue-3538616",
  //     requested_price: 5000,
  //     last_price: "5000",
  //     discount_price: "DISCOUNT! The price is 5000",
  //     store: "KO",
  //     created_at: "2020-06-25T16:44:52.718404Z",
  //     updated_at: "2020-06-25T17:16:05.888514Z",
  //     owner: 1,
  //   },
  //   {
  //     id: 3,
  //     title: "Oraimo COMPACT 10000mAh Ultra Slim Fast Charging Power Bank ",
  //     url:
  //       "https://www.jumia.com.ng/oraimo-compact-10000mah-ultra-slim-fast-charging-power-bank-42974768.html",
  //     requested_price: 0,
  //     last_price: "3,480",
  //     discount_price: "",
  //     store: "JM",
  //     created_at: "2020-06-29T20:55:09.493363Z",
  //     updated_at: "2020-06-29T20:55:09.493426Z",
  //     owner: 1,
  //   },
  // ]

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
      // wrap: true,
      minWidth: "5rem",
      cell: (row) => <CustomTitle row={row} />,
    },

    {
      name: "Requested price",
      selector: "requested_price",
      wrap: true,
    },
    {
      name: "Retrieved price",
      selector: "last_price",
      wrap: true,
    },
    // {
    //   cell: (row) => <CustomModificationActions row={row} />,
    //   ignoreRowClick: true,
    //   button: true,
    //   wrap: true,
    //   selector: "id",
    // },
  ]

  return (
    <>
      {itemData ? (
        // <DataTable
        //   title="Your product catalog"
        //   columns={columns}
        //   data={itemData}
        //   responsive={true}
        //   // overflowY={false}
        // />
        itemData.map((data, idx) => <ItemCard key={idx} data={data} />)
      ) : (
        <CustomLoader />
      )}
    </>
  )
}
export default DataTables
