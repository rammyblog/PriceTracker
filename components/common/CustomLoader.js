import React from "react"
import "./Loader.less"
import Spinner from "./Spinner"

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

export default CustomLoader
