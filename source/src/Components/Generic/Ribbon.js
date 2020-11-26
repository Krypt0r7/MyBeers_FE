import React from 'react'

export default ({ text }) =>
{
  const styles = {
    top: 25,
    right: -60,
    transform: "rotate(37deg)",
    backgroundColor: "#4A8FE7",
    color: "#fff",
    position: "absolute",
    textAlign: "center",
    width: "220px",
    padding: "12px",
    fontWeight: "bold",
    fontSize: "1.2em"
  }

  return (
    <div style={styles}>{text}</div>
  )
}