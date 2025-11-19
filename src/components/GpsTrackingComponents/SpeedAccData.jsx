import React, { useEffect, useState } from "react";
import styles from "./ImuData.module.css";
import DateTimeBox from "../DateTimeBox";
import SplineChart from "../Chart/splineChart";
import DateRangePicker from "../DateTimeBox";
import { getTelemetry } from "@/lib/api/gpsTrackingService";
import moment from "moment";

const SpeedAccData = ({ gpsData = [], tenantId, vinId }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [speedAccData, setSpeedAccData] = useState([])
  // ---- Use real timestamps as x-axis labels ----

  useEffect(() => {

    setSpeedAccData(gpsData)
  }, [gpsData])
  const timestamps = speedAccData?.map((d) =>
    new Date(d._time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  // ---- Extract series data ----
  const acclData = speedAccData?.map((d) => d.accl);
  const speedData = speedAccData?.map((d) => d.speed);
  return (
    <div className={styles.imuDataContainer}>
      {/* Header */}
      <div className={styles.imuDataHeader}>
        <h1 className={styles.imuDataTitle}>Speed & Acceleration Data</h1>

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
