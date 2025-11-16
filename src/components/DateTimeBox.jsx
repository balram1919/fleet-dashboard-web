"use client";

import React, { useRef } from "react";
import styles from "../components/GpsTrackingComponents/ImuData.module.css";
import moment from "moment";

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export default function DateTimeBox({ date = "", time = "", onDateChange, onTimeChange }) {
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleDateSelect = (e) => {
    onDateChange(e.target.value);

    setTimeout(() => {
      timeRef.current?.showPicker();
    }, 150);
  };

  return (
    <div className={styles.imuDataDateTime}>
      <span onClick={() => dateRef.current.showPicker()} style={{ cursor: "pointer" }}>
        <CalendarIcon />
      </span>

      <input
        type="date"
        ref={dateRef}
        value={date || ""}
        onChange={handleDateSelect}
        className={styles.hiddenInput}
      />

      <span>{!!date ? moment(date).format("DD MMM YY") : "--/--/----"}</span>

      <span className={styles.imuDataSeparator}>|</span>

      <span>{time || "--:--"}</span>

      <input
        type="time"
        ref={timeRef}
        value={time || ""}
        onChange={(e) => onTimeChange(e.target.value)}
        className={styles.hiddenInput}
      />

      <span onClick={() => timeRef.current.showPicker()} style={{ cursor: "pointer" }}>
        <ClockIcon />
      </span>
    </div>
  );
}
