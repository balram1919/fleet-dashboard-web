const { useEffect } = require("react");
import { useMap } from "react-leaflet";


export default function GoToSelected({ selectedLatLon }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLatLon && selectedLatLon.lat && selectedLatLon.lon) {
      map.setView([selectedLatLon.lat, selectedLatLon.lon], 16);
    }
  }, [selectedLatLon, map]);

  return null;
}