import React from "react";
import styles from "./ImuData.module.css";
import DateTimeBox from "../DateTimeBox";
import SplineChart from "../Chart/splineChart";

const SpeedAccData = ({ gpsData }) => {
  // ---- Use real timestamps as x-axis labels ----
  const timestamps = gpsData.map((d) =>
    new Date(d._time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  // ---- Extract series data ----
  const acclData = gpsData.map((d) => d.accl);
  const speedData = gpsData.map((d) => d.speed);
  return (
    <div className={styles.imuDataContainer}>
      {/* Header */}
      <div className={styles.imuDataHeader}>
        <h1 className={styles.imuDataTitle}>Speed & Acceleration Data</h1>

        <div className={styles.imuDataHeaderRight}>
          <DateTimeBox date="6 Nov 2025" time="11:31 am" />
          <button className={styles.imuDataExportBtn}>Export Data</button>
        </div>
      </div>

      <SplineChart categories={timestamps} series={[
        {
          name: "Accl",
          data: acclData,
          color: "#10B981",
        },
        {
          name: "speed",
          data: speedData,
          color: "#F59E0B",
        },
      ]} />
    </div>
  );
};


export default SpeedAccData;
