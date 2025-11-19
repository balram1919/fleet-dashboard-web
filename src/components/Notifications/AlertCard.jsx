"use client";

import styles from "./AlertCard.module.css";

export default function AlertCard({ item, handelViewStatus }) {
  const date = new Date(item.startTime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const severityColor = {
    Confirmed: styles.confirmed,
    High: styles.high,
    Medium: styles.medium,
    Low: styles.low,
    Waiting: styles.waiting,
  };

  const statusColor = {
    Confirmed: styles.confirmed,
    Waiting: styles.waiting,
    Resolved: styles.resolved,
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>User/Bike ID</span>
        <div className={styles.timeInfo}>
          <span>
            Time : <span className={styles.value}>{formattedTime}</span>
          </span>
          <span className={styles.separator}>|</span>
          <span>
            Date : <span className={styles.value}>{formattedDate}</span>
          </span>
        </div>
      </div>

      <div className={styles.userName}>
        {item.asset?.name || "Unknown User"}
      </div>

      <div className={styles.statusRow}>
        <span className={styles.statusLabel}>Status :</span>
        <span
          className={`${styles.statusValue} ${
            statusColor[item.status] || styles.default
          }`}
        >
          {item.status}
        </span>

        <span className={styles.separator}>|</span>

        <span className={styles.statusLabel}>Severity :</span>
        <span
          className={`${styles.severityValue} ${
            severityColor[item.severity] || styles.default
          }`}
        >
          {item.severity}
        </span>
      </div>
      <div className={styles.alertCardFooter}>
        <div className={styles.location} style={{ margin: "0px" }}>
          <span className={styles.statusLabel}> Location : </span>
          <span className={styles.locationValue}>
            {item?.extra?.geoLocationData?.formatted ||
              "Location not available"}
          </span>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.viewButton}
            onClick={() => {
              handelViewStatus({
                lon: item?.extra?.geoLocationData?.geometry?.lng,
                lat: item?.extra?.geoLocationData?.geometry?.lat,
              });
            }}
          >
            View Status
          </button>
        </div>
      </div>
    </div>
  );
}
