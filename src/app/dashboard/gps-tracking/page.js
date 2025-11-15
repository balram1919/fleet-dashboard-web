"use client";
import React, { useEffect, useState } from "react";
import styles from "./GpsTracking.module.css";
import BikeStatus from "@/components/GpsTrackingComponents/BikeStatus";
import ImuData from "@/components/GpsTrackingComponents/ImuData";
import SpeedAccData from "@/components/GpsTrackingComponents/SpeedAccData";
import { getTelemetry, getVinNumber } from "@/lib/api/gpsTrackingService";
import MapComponent from "@/components/GpsTrackingComponents/MapComponent";
const gpsData = [
    {
        lat: 11.591528,
        lon: 104.86425,
        speed: 13.5,
        accl: 0.783,
        pitch: 1.6,
        roll: -170,
        yaw: 189,
        eds: 0,
        lock: 0,
        ign: 0,
        _time: "2025-11-03T01:44:27Z",
    },
    {
        lat: 11.555174,
        lon: 104.917526,
        speed: 0,
        accl: 0.134,
        pitch: -2.8,
        roll: -1.9,
        yaw: -148,
        eds: 0,
        lock: 0,
        ign: 0,
        _time: "2025-11-11T01:05:13Z",
    },
    {
        lat: 11.568912,
        lon: 104.903451,
        speed: 22.4,
        accl: 0.452,
        pitch: 0.4,
        roll: -5.1,
        yaw: 121,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T04:22:10Z",
    },
    {
        lat: 11.574288,
        lon: 104.889774,
        speed: 48.2,
        accl: 1.042,
        pitch: -1.2,
        roll: 2.3,
        yaw: 214,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T05:10:55Z",
    },
    {
        lat: 11.563512,
        lon: 104.928341,
        speed: 17.3,
        accl: 0.334,
        pitch: 1.1,
        roll: -3.2,
        yaw: 305,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T06:44:05Z",
    },
    {
        lat: 11.547113,
        lon: 104.918642,
        speed: 0,
        accl: 0.085,
        pitch: -0.7,
        roll: 1.5,
        yaw: 44,
        eds: 0,
        lock: 0,
        ign: 0,
        _time: "2025-11-12T07:12:44Z",
    },
    {
        lat: 11.559842,
        lon: 104.883524,
        speed: 35.9,
        accl: 0.932,
        pitch: 2.1,
        roll: -4.7,
        yaw: 175,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T08:25:40Z",
    },
    {
        lat: 11.582101,
        lon: 104.901872,
        speed: 11.7,
        accl: 0.247,
        pitch: -3.4,
        roll: 0.8,
        yaw: 97,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T09:55:33Z",
    },
    {
        lat: 11.553422,
        lon: 104.895264,
        speed: 56.1,
        accl: 1.241,
        pitch: 0.5,
        roll: -1.1,
        yaw: 260,
        eds: 0,
        lock: 1,
        ign: 1,
        _time: "2025-11-12T10:40:22Z",
    },
    {
        lat: 11.565724,
        lon: 104.932015,
        speed: 0,
        accl: 0.112,
        pitch: -2.0,
        roll: 3.8,
        yaw: 12,
        eds: 0,
        lock: 0,
        ign: 0,
        _time: "2025-11-12T12:14:50Z",
    }
];
const GpsTracking = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [vinOption, setVinOption] = useState(null)
    const [telemetry, setTelemetry] = useState(null)
    const fatchApis = async () => {
        try {
            setIsLoading(true)
            const res = await getVinNumber()
            setVinOption(res)
            const response = await getTelemetry()
            console.log(res, "res");
            setTelemetry(response?.rows)
            console.log(res, response, "res");

        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fatchApis()
    }, [])
    return (
        <>{/* Row 1 */}
            <div className={styles.row}>
                <div className={styles.mapContainer}>
                    <MapComponent gpsData={gpsData} />
                </div>

                <BikeStatus />
            </div>

            {/* Row 2 */}
            <div className={styles.row}>
                <ImuData gpsData={gpsData} />

                <SpeedAccData gpsData={gpsData} />
            </div></>
    );
};

export default GpsTracking;
