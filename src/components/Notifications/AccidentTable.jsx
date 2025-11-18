"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getAlertAndNotification } from "@/lib/api/notificationService";
import moment from "moment";
import { useState, useCallback } from "react";
import styles from "./AccidentTable.module.css";

export default function AccidentTable({ rows = [], tenantId }) {
  const [accident, setAccident] = useState(rows);
  const [offset, setOffset] = useState(rows?.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  const fetchRows = useCallback(async () => {
    if (!tenantId) return;
    // debugger
    if (offset === 0 && rows?.length > 0) {
      setAccident(rows);
      setOffset(rows?.length);
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

    setAccident((prev) => [...prev, ...res.rows]);

    if (res.rows.length < limit) setHasMore(false);

    setOffset((prev) => prev + limit);
    setLoading(false);
  }, [tenantId, offset, loading, hasMore, rows]);

  const loaderRef = useInfiniteScroll(fetchRows);

  return (
    <div className={styles.AccidentTableBG}>
      {/* Scrollable body */}
      <div className="max-h-[400px] overflow-y-auto border border-t-0 rounded-b-lg">
        <table className="w-full text-sm">
          <thead style={{ color: "#2B3674", textAlign: "left" }}>
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Type</th>
              <th className="p-2">Severity</th>
              <th className="p-2">Location</th>
              <th className="p-2">Title</th>
              <th className="p-2">Message</th>
              <th className="p-2">Date</th>
              <th className="p-2">Start Time</th>
              <th className="p-2">End Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {accident.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2">James Smith</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.severity}</td>

                <td className="p-2">
                  {item.extra?.geoLocationData?.formatted || "N/A"}
                </td>

                <td className="p-2">{item.title}</td>

                <td className="p-2 truncate max-w-xs">{item.body}</td>

                <td className="p-2">
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </td>

                <td className="p-2">{moment(item.startTime).format("LT")}</td>

                <td className="p-2">{moment(item.endTime).format("LT")}</td>

                <td className="p-2 text-green-600">{item.status}</td>
              </tr>
            ))}

            <tr>
              <td ref={loaderRef} colSpan="10" className="text-center py-4">
                {loading && "Loading..."}
                {!hasMore && "No more records."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
