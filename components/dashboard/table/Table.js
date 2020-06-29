import React, { useState, useContext } from "react"
import { TrackerContext } from "../../../context/tracker/trackerContext"
import DataTable from "react-data-table-component"
import "./DataTable.less"
import CustomLoader from "../../common/CustomLoader"

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
      minWidth: "3rem",
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
  ]

  return (
    <>
      {itemData ? (
        <DataTable
          title="Your product catalog"
          columns={columns}
          data={itemData}
          responsive={true}
          // overflowY={false}
        />
      ) : (
        <CustomLoader />
      )}
    </>
  )
}
export default DataTables
