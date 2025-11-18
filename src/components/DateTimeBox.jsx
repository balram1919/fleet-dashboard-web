"use client";

import React, { useRef } from "react";
import styles from "../components/GpsTrackingComponents/ImuData.module.css";
import moment from "moment";

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#707EAE"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
  </svg>
);

export default function DateRangePicker({
  startDate = "",
  endDate = "",
  onStartDateChange,
  onEndDateChange,
}) {
  const startRef = useRef(null);
  const endRef = useRef(null);

  return (
    <div className={styles.imuDataDateTime}>
      {/* Start Date */}
      <span
        style={{ cursor: "pointer" }}
        onClick={() => startRef.current.showPicker()}
      >
        <CalendarIcon />
      </span>

      <input
        type="date"
        ref={startRef}
        value={startDate || ""}
        onChange={(e) => onStartDateChange(e.target.value)}
        className={styles.hiddenInput}
      />

      <span style={{ color: "#303235" }}>
        {!!startDate ? moment(startDate).format("DD MMM YY") : "Start Date"}
      </span>

      <span className={styles.imuDataSeparator}>—</span>

      {/* End Date */}
      <span
        style={{ cursor: "pointer" }}
        onClick={() => endRef.current.showPicker()}
      >
        <CalendarIcon />
      </span>

      <input
        type="date"
        ref={endRef}
        value={endDate || ""}
        onChange={(e) => onEndDateChange(e.target.value)}
        className={styles.hiddenInput}
      />

      <span style={{ color: "#303235" }}>
        {!!endDate ? moment(endDate).format("DD MMM YY") : "End Date"}
      </span>
    </div>
  );
}
