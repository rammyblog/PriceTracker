import React from "react"
import { numberWithCommas } from "../../utlis"

function WelcomeCardInfo({ data }) {
  const { number, text, variant } = data
  const colorVariant = {
    primary: "#0050AF",
    success: "#00D67D",
    info: "#323643",
  }

  return (
    <div
      style={{
        width: 192,
        height: 79,
        background: "#F9FAFC",
        borderRadius: 5,
        letterSpacing: "0.01em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "1rem",
        marginBottom: "1rem",
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontSize: 36,
          lineHeight: "40px",
          color: colorVariant[variant],
          fontWeight: 600,
          marginRight: "1rem",
        }}
      >
        {numberWithCommas(number)}
      </span>
      <span
        style={{
          fontSize: "18px",
          lineHeight: "20px",

          color: "#9DA8B6",
        }}
      >
        {text}
      </span>
    </div>
  )
}

export default WelcomeCardInfo
