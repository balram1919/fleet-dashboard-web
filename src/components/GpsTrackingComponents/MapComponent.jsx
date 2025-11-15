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
function FloatingCard({ point, onClose }) {
  const map = useMap();
  const [pos, setPos] = useState(null);

  const updatePosition = () => {
    if (!point) return;
    const latlng = L.latLng(point.lat, point.lon);
    const pixel = map.latLngToContainerPoint(latlng);
    setPos({ x: pixel.x, y: pixel.y });
  };

  useEffect(() => {
    updatePosition();
    map.on("move", updatePosition);
    map.on("zoom", updatePosition);

    return () => {
      map.off("move", updatePosition);
      map.off("zoom", updatePosition);
    };
  }, [point]);

  if (!pos) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x + 20, // card offset from marker
        top: pos.y - 80,
        width: "260px",
        padding: "18px",
        background: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <img
          src="/user.jpg"
          width={45}
          height={45}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <strong>User Name</strong>
          <br />
          <small>John Doe</small>
        </div>
      </div>

      <p><b>Date:</b> {new Date(point._time).toLocaleDateString()}</p>
      <p><b>Time:</b> {new Date(point._time).toLocaleTimeString()}</p>
      <p><b>Lat:</b> {point.lat.toFixed(5)}</p>
      <p><b>Lon:</b> {point.lon.toFixed(5)}</p>
      <p><b>Speed:</b> {point.speed}</p>
      <p><b>Pitch:</b> {point.pitch} | <b>Roll:</b> {point.roll} | <b>Yaw:</b> {point.yaw}</p>
      <p><b>Accel:</b> {point.accl}</p>
    </div>
  );
}

export default function MapComponent({ gpsData }) {
  const coords = gpsData.map((i) => [i.lat, i.lon]);

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MapContainer
        center={coords[0]}
        zoom={13}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline positions={coords} color="#7b4fff" weight={4} />

        {gpsData.map((item, i) => (
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
          onLocate={() => {
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
            point={gpsData[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </MapContainer>
    </div>
  );
}
