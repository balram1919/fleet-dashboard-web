import { useMap } from "react-leaflet";
import { useEffect } from "react";

const MapControls = ({ onLocate }) => {
  const map = useMap();

  return (
    <div style={styles.container}>
      <button style={styles.btn} onClick={() => map.zoomIn()}>+</button>
      <button style={styles.btn} onClick={() => map.zoomOut()}>-</button>

      <button style={styles.locateBtn} onClick={() => onLocate(map)}>
        📍
      </button>
    </div>
  );
};

export default MapControls;

const styles = {
  container: {
    position: "absolute",
    bottom: "25px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 9999,
  },
  btn: {
    width: "38px",
    height: "38px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "20px",
    background: "#fff",
    cursor: "pointer",
  },
  locateBtn: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    fontSize: "20px",
  },
};
