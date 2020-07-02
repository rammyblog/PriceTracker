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
