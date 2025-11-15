import { ViewHeight, ViewWidth } from "@/constants/resDiv";
import MapComponent from "./MapComponent";
import styles from "./MapOverview.module.css";

const MapOverview = () => {
  return (
    <div className={styles.mapContainer}>
      <MapComponent />
    </div>
  );
};

export default MapOverview;
