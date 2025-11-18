"use client";

import MapComponent from "@/components/GpsTrackingComponents/MapComponent";
import { useUser } from "@/context/UserContext";
import { getDashbaordMapData } from "@/lib/api/dashboardService";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, setLoading } = useUser();
  const [telemetry, setTelemetry] = useState(null)
  const fatchApis = async () => {
    try {
      setLoading(true)
      const response = await getDashbaordMapData(user?.tenants[0]?.tenantId)
      setTelemetry(response?.rows)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user?.tenants[0]?.tenantId) {
      fatchApis()
    }
  }, [user])

  return (
    <div className="min-h-screen">

      {/* TOP SMALL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="card">Total Bikes</div>
        <div className="card">Active Bikes</div>
        <div className="card">Total Alerts</div>
        <div className="card">Total Users</div>
        <div className="card">Total Trips</div>
        <button className="card bg-pink-500 text-white">Export Summary</button>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Left – Line chart placeholder */}
        <div className="col-span-2 card h-[300px]">
          <div className="font-semibold mb-2">Active vs Inactive Bikes</div>
          <div className="w-full h-full bg-gray-100 rounded-md" />
        </div>

        {/* Right – Analytics donut */}
        <div className="card h-[300px]">
          <div className="font-semibold mb-2">Analytics</div>
          <div className="w-full h-full bg-gray-100 rounded-md" />
        </div>
      </div>

      {/* MAP + VEHICLE INFO + STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map */}
        <div className="col-span-2 card h-[380px]">
          <div className="font-semibold mb-2">Accident Map</div>
          <MapComponent gpsData={telemetry?.map((data) => data?.telemetry)?.flat()} polyline={false}/>

          {/* <div className="w-full h-full bg-gray-100 rounded-md" ></div> */}
        </div>

        {/* Right side column */}
        <div className="space-y-6">

          {/* Vehicle Maintenance */}
          <div className="card h-[180px]">
            <div className="font-semibold mb-2">Vehicle Maintenance</div>
            <div className="w-full h-full bg-gray-100 rounded-md" />
          </div>

          {/* Site Target / Another Line Chart */}
          <div className="card h-[180px]">
            <div className="font-semibold mb-2">Site Target</div>
            <div className="w-full h-full bg-gray-100 rounded-md" />
          </div>

        </div>
      </div>
    </div>
  );
}
