import React from "react";

export default function StatusCard({ title, value, unit = "", isStatus = false }) {

  let className = "status-card";

  if (isStatus) {
    className += ` ${value?.toLowerCase()}`;
  }

  return (
    <div className={className}>
      <h2>{value}{!isStatus && unit}</h2>
      <p>{title}</p>
    </div>
  );
}
