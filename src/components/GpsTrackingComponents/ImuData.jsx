import React from "react";
import styles from "./ImuData.module.css";
import DateTimeBox from "../DateTimeBox";
import SplineChart from "../Chart/splineChart";

const ImuData = ({ gpsData }) => {
  const times = gpsData.map((d) => new Date(d._time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const pitchData = gpsData.map((d) => d.pitch);
  const rollData = gpsData.map((d) => d.roll);
  const yawData = gpsData.map((d) => d.yaw);
  return (
    <div className={styles.imuDataContainer}>
      <div className={styles.imuDataHeader}>
        <h1 className={styles.imuDataTitle}>IMU Data</h1>
        <div className={styles.imuDataHeaderRight}>
          <DateTimeBox date="6 Nov 2025" time="11:31 am" />
          <button className={styles.imuDataExportBtn}>Export Data</button>
        </div>
      </div>
      <SplineChart categories={times} series={[
        { name: "Pitch", data: pitchData, color: "#10B981" },
        { name: "Roll", data: rollData, color: "#F59E0B" },
        { name: "Yaw", data: yawData, color: "#3B82F6" }
      ]} />
    </div>
  );
};

export default ImuData;
