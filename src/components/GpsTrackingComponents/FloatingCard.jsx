import React, { useState, useEffect } from "react";

import { useMap } from "react-leaflet";


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

export default FloatingCard