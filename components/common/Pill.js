import React from "react"
import "./Pill.less"
function Pill({ text }) {
  return (
    <div className={`pill ${text === "Konga" ? "konga__pill" : null}`}>
      {text}
    </div>
  )
}

export default Pill
