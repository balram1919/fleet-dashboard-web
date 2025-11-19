"use client";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getAlertAndNotification } from "@/lib/api/notificationService";
import moment from "moment";
import { useState, useCallback } from "react";
import styles from "./AccidentTable.module.css";
import { exportToCsv } from "@/lib/constants";

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
      <div
        className={styles.mapContainerHeader}
        style={{ padding: "0px", marginBottom: "15px" }}
      >
        <p>Past Accidents</p>
        <div style={{ marginLeft: "auto" }}>
          <button className={styles.bikeStatusExportBtn}> + New</button>
        </div>
        <button className={styles.bikeStatusExportBtn} onClick={() => {
          exportToCsv("past-accidents", accident);
        }}>Export Data</button>
      </div>
      <div className="max-h-[400px] overflow-y-auto border border-t-0 rounded-b-lg">
        <table className="w-full text-sm">
          <thead style={{ color: "#2B3674", textAlign: "left" }}>
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">
                <div className="flex items-center gap-2">
                  <span>Type</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M3.59993 1.40002H12.3999C13.1333 1.40002 13.7333 2.00002 13.7333 2.73336V4.20002C13.7333 4.73336 13.3999 5.40002 13.0666 5.73336L10.1999 8.26669C9.79993 8.60002 9.53327 9.26669 9.53327 9.80002V12.6667C9.53327 13.0667 9.2666 13.6 8.93327 13.8L7.99994 14.4C7.13327 14.9334 5.93327 14.3334 5.93327 13.2667V9.73336C5.93327 9.26669 5.6666 8.66669 5.39994 8.33336L2.8666 5.66669C2.53327 5.33336 2.2666 4.73336 2.2666 4.33336V2.80002C2.2666 2.00002 2.8666 1.40002 3.59993 1.40002Z"
                      stroke="#2B3674"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.28667 1.40002L4 6.66669"
                      stroke="#2B3674"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </th>
              <th className="p-2">
                <div className="flex items-center gap-2">
                  <span>Severity</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="cursor-pointer"
                  >
                    <path
                      d="M3.59993 1.40002H12.3999C13.1333 1.40002 13.7333 2.00002 13.7333 2.73336V4.20002C13.7333 4.73336 13.3999 5.40002 13.0666 5.73336L10.1999 8.26669C9.79993 8.60002 9.53327 9.26669 9.53327 9.80002V12.6667C9.53327 13.0667 9.2666 13.6 8.93327 13.8L7.99994 14.4C7.13327 14.9334 5.93327 14.3334 5.93327 13.2667V9.73336C5.93327 9.26669 5.6666 8.66669 5.39994 8.33336L2.8666 5.66669C2.53327 5.33336 2.2666 4.73336 2.2666 4.33336V2.80002C2.2666 2.00002 2.8666 1.40002 3.59993 1.40002Z"
                      stroke="#2B3674"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.28667 1.40002L4 6.66669"
                      stroke="#2B3674"
                      stroke-width="1.2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </th>
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

                <td className="p-2 max-w-xs">{item.body}</td>

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
