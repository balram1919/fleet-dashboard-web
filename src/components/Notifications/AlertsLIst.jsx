"use client";

import { useEffect, useState, useCallback } from "react";
import AlertCard from "./AlertCard";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getAlertAndNotification } from "@/lib/api/notificationService";

export default function AlertsList({ rows = [], tenantId, setSelectedLatLon, alerts, setAlerts }) {

    const [offset, setOffset] = useState(rows?.length);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;

    const fetchRows = useCallback(async () => {
        if (!tenantId) return;
        if (offset === 0 && rows?.length > 0) {
            setAlerts(rows)
            setOffset(rows?.length)
            return;
        }
        if (offset === 0) {
            return;
        }
        if (loading || !hasMore) return;

        setLoading(true);

        const res = await getAlertAndNotification(tenantId, limit, offset);

        if (!res?.rows?.length) {
            setHasMore(false);
            setLoading(false);
            return;
        }

        setAlerts((prev) => [...prev, ...res.rows]);

        if (res.rows.length < limit) setHasMore(false);

        setOffset((prev) => prev + limit);
        setLoading(false);
    }, [tenantId, offset, loading, hasMore, rows]);

    const loaderRef = useInfiniteScroll(fetchRows);

    const handelViewStatus = (data) => {
        setSelectedLatLon(data)
    }
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-xl font-semibold mb-4">Alert List</h1>

            {/* Filters Header */}
            <div className="flex gap-3 mb-4">
                <div className="px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm">
                    Active Alerts: 20
                </div>
                <div className="px-4 py-1 rounded-full bg-yellow-50 text-yellow-600 text-sm">
                    Critical: 5
                </div>
                <div className="px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm">
                    Awaiting Response: 2
                </div>
            </div>

            {/* Alert List */}
            <div className="max-h-[400px] overflow-y-auto space-y-4">
                {alerts.map((item, index) => (
                    <AlertCard key={index} item={item} handelViewStatus={handelViewStatus} />
                ))}
                {/* Infinite scroll loader */}
                <div ref={loaderRef} className="text-center py-4 text-gray-500">
                    {loading ? "Loading..." : ""}
                    {!hasMore && "No more alerts"}
                </div>
            </div>


        </div>
    );
}
