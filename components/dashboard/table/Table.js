import React, { useState, useContext } from "react"
import { TrackerContext } from "../../../context/tracker/trackerContext"
import DataTable from "react-data-table-component"
import "./DataTable.less"
import styled, { keyframes } from "styled-components"

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  /* animation: stretch 1.5s ease-out 0s alternate infinite none running; */
  transform: translateZ(0);
  border-top: 2px solid #1f59bc;
  border-right: 2px solid #1f59bc;
  border-bottom: 2px solid #1f59bc;
  border-left: 4px solid #1f59bb;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`
const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    <Spinner />
    <div>Doing some background work...</div>
  </div>
)
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
