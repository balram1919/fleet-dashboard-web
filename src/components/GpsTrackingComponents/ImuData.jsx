import React, { useEffect, useState } from "react";
import styles from "./ImuData.module.css";
import DateTimeBox from "../DateTimeBox";
import SplineChart from "../Chart/splineChart";
import DateRangePicker from "../DateTimeBox";
import moment from "moment";
import { getTelemetry } from "@/lib/api/gpsTrackingService";
import { exportToCsv } from "@/lib/constants";

const ImuData = ({ gpsData = [], tenantId, vinId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [speedAccData, setSpeedAccData] = useState([])
  // ---- Use real timestamps as x-axis labels ----

  useEffect(() => {

    setSpeedAccData(gpsData)
  }, [gpsData])
  const times = speedAccData?.map((d) => new Date(d._time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  const pitchData = speedAccData?.map((d) => d.pitch);
  const rollData = speedAccData?.map((d) => d.roll);
  const yawData = speedAccData?.map((d) => d.yaw);
  return (
    <div className={styles.imuDataContainer}>
      <div className={styles.imuDataHeader}>
        <h1 className={styles.imuDataTitle}>IMU Data</h1>
        <div className={styles.imuDataHeaderRight}>
          <DateRangePicker

            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onRangeSelected={async (start, end) => {
              try {
                const isoStartDate = moment(start).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
                const isoEndDate = moment(end).utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
                const response = await getTelemetry(tenantId, vinId, isoStartDate, isoEndDate);
                setSpeedAccData(response?.rows);
              } catch (error) { }
              // or toast.success("Date range selected")
              // or API call
            }}
          />
          <button className={styles.imuDataExportBtn} onClick={() => {
            exportToCsv('IMU-Data', speedAccData)

          }}>Export Data</button>
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
