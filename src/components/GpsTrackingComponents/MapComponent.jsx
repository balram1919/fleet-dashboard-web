"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(m => m.Polyline), { ssr: false });
const useMap = dynamic(() => import("react-leaflet").then(m => m.useMap), { ssr: false });

import "../GpsTrackingComponents/leaflet.css";
import MapControls from "./MapControls";
import GoToSelected from "./GoToSelected";
import FloatingCard from "./FloatingCard";

// Fix Leaflet icons for Next.js
let blueIcon, redIcon;
if (typeof window !== "undefined") {
  const L = require("leaflet");

  blueIcon = new L.Icon({
    iconUrl: "/marker-blue.png",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  redIcon = new L.Icon({
    iconUrl: "/marker-red.png",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}
// Component to update card position when map moves


export default function MapComponent({ gpsData = [], selectedLatLon = false, polyline = true }) {

  if (!gpsData || gpsData.length === 0) {
    return <div>No GPS data available</div>;
  }
  const coords = gpsData?.map((i) => [i.lat, i.lon]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        center={coords?.[0] || [0, 0]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GoToSelected selectedLatLon={selectedLatLon} />

        {polyline && <Polyline positions={coords ?? [[0, 0], [0, 0]]} color="#7b4fff" weight={4} />}

        {gpsData?.map((item, i) => (
          <Marker
            key={i}
            position={[item.lat, item.lon]}
            icon={selectedIndex === i ? redIcon : blueIcon}
            eventHandlers={{
              click: () => setSelectedIndex(i),
            }}
          />
        ))}
        <MapControls
          onLocate={(map) => {
            if (!navigator.geolocation) return alert("GPS not supported");

            navigator.geolocation.getCurrentPosition((pos) => {
              const { latitude, longitude } = pos.coords;
              map.setView([latitude, longitude], 16);
            });
          }}
        />
        {/* Floating Info Card linked to selected marker */}
        {selectedIndex !== null && (
          <FloatingCard
            point={gpsData?.[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </MapContainer>
    </div>
  );
}
