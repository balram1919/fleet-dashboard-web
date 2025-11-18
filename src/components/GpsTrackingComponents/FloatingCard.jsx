import React, { useState, useEffect, useCallback } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function FloatingCard({ point, onClose }) {
  const map = useMap();
  const [pos, setPos] = useState(null);

  const updatePosition = useCallback(() => {
    if (!point) return;
    const latlng = L.latLng(point.lat, point.lon);
    const pixel = map.latLngToContainerPoint(latlng);
    setPos({ x: pixel.x, y: pixel.y });
  }, [point, map]);

  useEffect(() => {
    if (!point) return;
    updatePosition();

    map.on("move", updatePosition);
    map.on("zoom", updatePosition);

    return () => {
      map.off("move", updatePosition);
      map.off("zoom", updatePosition);
    };
  }, [point, map, updatePosition]);

  if (!pos || !point) return null;

  return (
    <div style={{ ...styles.card, left: pos.x + 20, top: pos.y - 80 }}>
      {/* Close Button */}
      <button onClick={onClose} style={styles.closeBtn}>
        ✕
      </button>

      {/* User Info */}
      <div style={styles.userSection}>
        <img src="/user.jpg" width={45} height={45} style={styles.userImg} />
        <div>
          <div style={styles.label}>User Name</div>
          <div style={styles.value}>John Doe</div>
        </div>
      </div>

      {/* Date & Time */}
      <div style={styles.row}>
        <p style={styles.text}>
          <span style={styles.label}>Date:</span>{" "}
          {new Date(point._time).toLocaleDateString()}
        </p>
        <div style={styles.separator} />
        <p style={styles.text}>
          <span style={styles.label}>Time:</span>{" "}
          {new Date(point._time).toLocaleTimeString()}
        </p>
      </div>

      {/* Pitch Roll Yaw */}
      <div style={styles.row}>
        <p style={styles.text}>
          <span style={styles.label}>Pitch:</span> {point.pitch}
        </p>
        <div style={styles.separator} />
        <p style={styles.text}>
          <span style={styles.label}>Roll:</span> {point.roll}
        </p>
        <div style={styles.separator} />
        <p style={styles.text}>
          <span style={styles.label}>Yaw:</span> {point.yaw}
        </p>
      </div>

      {/* Speed Accel */}
      <div style={styles.rowNoBorder}>
        <p style={styles.text}>
          <span style={styles.label}>Speed:</span> {point.speed}
        </p>
        <div style={styles.separator} />
        <p style={styles.text}>
          <span style={styles.label}>Accel:</span> {point.accl}
        </p>
      </div>
    </div>
  );
}

export default FloatingCard;

/* ------------------ CSS Styles ------------------ */
const styles = {
  card: {
    position: "absolute",
    width: "260px",
    padding: "15px",
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0px 10px 40px rgba(67, 70, 83, 0.25)",
    zIndex: 1000,
    fontFamily: 'Roboto, "Roboto Fallback", sans-serif',
    color: "#2B3674",
  },

  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "transparent",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },

  userSection: {
    display: "flex",
    gap: "10px",
    paddingBottom: "7px",
    alignItems: "center",
    borderBottom: "1px solid #D4D7E3",
  },

  userImg: {
    borderRadius: "50%",
  },

  row: {
    borderBottom: "1px solid #D4D7E3",
    padding: "5px 0px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  rowNoBorder: {
    padding: "5px 0px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  text: {
    fontSize: "12px",
    fontWeight: 500,
    margin: 0,
  },

  label: {
    color: "#707EAE",
  },

  value: {
    fontSize: "14px",
    color: "#2B3674",
  },

  separator: {
    height: "15px",
    width: "2px",
    background: "#D4D7E3",
  },
};
