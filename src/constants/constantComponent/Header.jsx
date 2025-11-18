"use client";

import React, { useState, useRef, useEffect } from "react";
// Assuming these imports are necessary for component functionality
// and that ViewHeight/ViewWidth are wrappers around responsive units
import { ViewHeight, ViewWidth } from "../resDiv";
import styles from "./Header.module.css"; // Import the CSS Module
import { usePathname, useRouter } from "next/navigation";

/**
 * Header.jsx
 * Fixed size: 1591 × 83 px
 */

const menuItems = [
  { id: "overview", label: "Overview", route: "/dashboard", },
  { id: "gps", label: "GPS Tracking", route: "/dashboard/gps-tracking", },
  { id: "alerts", label: "Alert/Notification", route: "/dashboard/alert-notification", },
  { id: "maintenance", label: "Vehicle Maintenance", },
  { id: "drivers", label: "Driver Management", route : "/dashboard/driver-management" },
  { id: "fuel", label: "Fuel Usage", },
  { id: "past", label: "Past Data & Report", },
  { id: "geo", label: "Geo-fencing", },
  { id: "panic", label: "Panic Button/SOS Alert", },
];
export default function Header({
  user,
  breadcrumb = "Pages / Dashboard",
  onSearch,
  avatar,
  userName = "John Smith",
  userStatus = "Active User",
}) {
  const route = useRouter()
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target))
        setUserOpen(false);
    }
    document.addEventListener("mousedown", handleDocClick);
    return () => document.removeEventListener("mousedown", handleDocClick);
  }, []);

  // NOTE: For ViewWidth(11) and ViewWidth(22) to work in CSS Modules,
  // you must define CSS Custom Properties (variables) in your global styles,
  // or pass the calculated values via the style prop as I've done below
  // for the title and breadcrumb elements.

  return (
    <header
      aria-label="Page header"
      className={styles.header} // Apply main header style
    >
      {/* Left: breadcrumb + title */}
      <div className={styles.leftSection}>
        <span
          className={styles.breadcrumb}
          // The ViewWidth usage needs to stay inline or be handled by global CSS variables
          style={{ fontSize: ViewWidth(11) }}
        >
          {breadcrumb}
        </span>
        <h1
          className={styles.title}
          // The ViewWidth usage needs to stay inline or be handled by global CSS variables
          style={{ fontSize: ViewWidth(22) }}
        >
          {menuItems?.find((item) => item.route === pathname)?.label}
        </h1>
      </div>

      {/* Center: Search bar */}
      <div className={styles.centerSection}>
        <div role="search" className={styles.searchContainer}>
          {/* Search icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.searchIcon}
          >
            <path
              d="M21 21l-4.35-4.35"
              stroke="#475569"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="5"
              stroke="#475569"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          <input
            type="search"
            value={q}
            onChange={(e) => {
              const val = e.target.value;
              setQ(val);
              if (typeof onSearch === "function") onSearch(val);
            }}
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        {/* Right side: notification + user */}
        <div className={styles.rightSection}>
          {/* Notification button */}
          <div ref={notifRef} className={styles.notifWrapper}>
            <button
              onClick={() => {
                route.push("/dashboard/alert-notification")
                setNotifOpen((s) => !s)
              }
              }
              className={styles.notifButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 17H9a3 3 0 01-3-3v-2a6 6 0 0112 0v2a3 3 0 01-3 3z"
                  stroke="#0b1b4d"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21a2 2 0 002-2H10a2 2 0 002 2z"
                  stroke="#0b1b4d"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Red dot */}
            <span className={styles.notifDot} />
            {/* Notification Dropdown content (if notifOpen is true) would go here */}
          </div>

          {/* User section */}
          <div
            ref={userRef}
            className={styles.userSection}
            onClick={() => setUserOpen((s) => !s)} // Added click handler to open/close user dropdown
          >
            <div className={styles.userAvatarContainer}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="User avatar"
                  className={styles.userAvatarImage}
                />
              ) : (
                <div className={styles.userAvatarFallback}>
                  {user?.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.fullName}</span>
              <span className={styles.userStatus}>{userStatus}</span>
            </div>

            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9l6 6 6-6"
                stroke="#0b1b4d"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* User Dropdown content (if userOpen is true) would go here */}
          </div>
        </div>
      </div>
    </header>
  );
}
