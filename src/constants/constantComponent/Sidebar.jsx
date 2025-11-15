"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoSrc from "../../assests/FleetLogo.png"; // kept your path as requested
import { ViewWidth, ViewHeight } from "../resDiv";
import { usePathname, useRouter } from "next/navigation";

/* -----------------------------
   Global vars
----------------------------- */
const vars = {
  bgStart: "#010f42",
  bgEnd: "#020b3a",
  muted: "rgba(255, 255, 255, 0.45)",
  text: "rgba(255, 255, 255, 0.9)",
  accent: "#6d4cff",
};

/* -----------------------------
   Icon components
----------------------------- */
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect
      x="3"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="3"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="3"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="13"
      width="8"
      height="8"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 21s-6-5.33-6-9.5A6 6 0 0112 5a6 6 0 016 6.5C18 15.67 12 21 12 21z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="11" r="1.6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M15 17H9a3 3 0 01-3-3v-2a6 6 0 0112 0v2a3 3 0 01-3 3z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 21a2 2 0 002-2H10a2 2 0 002 2z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const IconCog = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M19 12v0a7 7 0 00-.2-1.7l1.6-1a.6.6 0 00.15-.8l-1.5-2.6a.6.6 0 00-.8-.2l-1.9 1a7 7 0 00-2.1-1.2l-.3-2.1a.6.6 0 00-.6-.5H10.5a.6.6 0 00-.6.5l-.3 2.1a7 7 0 00-2.1 1.2l-1.9-1a.6.6 0 00-.8.2L3 8.5a.6.6 0 00.15.8l1.6 1A7 7 0 004.5 12v0a7 7 0 00.2 1.7l-1.6 1a.6.6 0 00-.15.8l1.5 2.6a.6.6 0 00.8.2l1.9-1a7 7 0 002.1 1.2l.3 2.1a.6.6 0 00.6.5h2.4a.6.6 0 00.6-.5l.3-2.1a7 7 0 002.1-1.2l1.9 1a.6.6 0 00.8-.2l1.5-2.6a.6.6 0 00-.15-.8l-1.6-1A7 7 0 0019 12z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5.5 19a7 7 0 0113 0" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const IconDroplet = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 3s5 5.5 5 9.5a5 5 0 11-10 0C7 8.5 12 3 12 3z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const IconReport = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect
      x="4"
      y="3"
      width="16"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 7h8M8 11h8M8 15h5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);
const IconGeo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"
      stroke="currentColor"
      strokeWidth="1.1"
    />
  </svg>
);
const IconCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* -----------------------------
   Menu Items
----------------------------- */
const menuItems = [
  { id: "overview", label: "Overview", Icon: IconGrid, route: "/dashboard", },
  { id: "gps", label: "GPS Tracking", Icon: IconPin, route: "/dashboard/gps-tracking", },
  { id: "alerts", label: "Alert/Notification", Icon: IconBell, route: "/dashboard/alert-notification", },
  { id: "maintenance", label: "Vehicle Maintenance", Icon: IconCog },
  { id: "drivers", label: "Driver Management", Icon: IconUser },
  { id: "fuel", label: "Fuel Usage", Icon: IconDroplet },
  { id: "past", label: "Past Data & Report", Icon: IconReport },
  { id: "geo", label: "Geo-fencing", Icon: IconGeo },
  { id: "panic", label: "Panic Button/SOS Alert", Icon: IconCircle },
];

/* -----------------------------
   Sidebar (all styles inline) - adjusted so all menus fit
   Parent aside size is unchanged per your request
----------------------------- */
export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [hovered, setHovered] = useState(null);
  const route = useRouter()
  useEffect(() => setActive(pathname), [pathname]);


  // smaller button sizes + tighter spacing so more items fit without changing parent height
  const getButtonStyle = (id) => {
    const isActive = id === active;
    const isHover = id === hovered;

    const base = {
      display: "flex",
      alignItems: "center",
      gap: 10, // reduced gap
      width: "100%",
      padding: "8px 10px", // reduced vertical padding
      borderRadius: 8,
      border: "none",
      background: "transparent",
      color: vars.muted,
      cursor: "pointer",
      transition: "all 140ms ease",
      textAlign: "left",
      position: "relative",
      fontSize: 13, // slightly smaller font
      lineHeight: 1,
      letterSpacing: "0.1px",
      outline: "none",
      boxSizing: "border-box",
      minHeight: 34, // reduced min height
    };

    if (isActive) {
      Object.assign(base, {
        background: "linear-gradient(90deg, #ffffff 0%, #f8f8ff 100%)",
        boxShadow: "0 6px 18px rgba(6, 16, 50, 0.18)",
        color: "#061033",
        paddingLeft: 20,
      });
    } else if (isHover) {
      base.color = vars.text;
    }

    return base;
  };

  const getIconWrapStyle = (id) => {
    const base = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: ViewWidth ? ViewWidth(20) : 20, // slightly smaller
      height: ViewHeight ? ViewHeight(20) : 20,
      borderRadius: 6,
      background: "rgba(255,255,255,0.02)",
      color: vars.muted,
      flexShrink: 0,
    };
    if (id === active) base.color = "#061033";
    else if (id === hovered) base.color = "#e7e7ff";
    return base;
  };

  const getLabelStyle = (id) => {
    const base = {
      color: vars.muted,
      fontFamily: "PoppinsSemiBold, Inter, system-ui, sans-serif",
      fontSize: 13,
      marginLeft: 6,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
    if (id === active) base.color = "#061033";
    else if (id === hovered) base.color = "#e7e7ff";
    return base;
  };

  // Parent container (unchanged size)
  const asideStyle = {
    width: ViewWidth ? ViewWidth(276) : 276,
    // height: ViewHeight ? ViewHeight(585) : 585,
    boxSizing: "border-box",
    padding: "12px 12px", // reduced padding to free vertical space
    background: `linear-gradient(180deg, ${vars.bgStart} 0%, ${vars.bgEnd} 100%)`,
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    // overflow: "hidden",
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: vars.text,
    overflow: "auto",
  };

  const brandStyle = {
    paddingBottom: 8, // reduced
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    marginBottom: 6,
  };

  const logoWrapStyle = {
    display: "flex",
    alignItems: "center",
    gap: 8,
  };

  // Nav takes remaining area and can scroll (kept)
  const navStyle = {
    marginTop: 8,
    flex: "1 1 auto",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    paddingRight: 6,
  };

  const menuStyle = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 6, // tighter gap so more items fit
  };

  const menuItemStyle = { display: "block" };

  return (
    <aside aria-label="Main navigation">
      <div style={brandStyle}>
        <div style={logoWrapStyle}>
          {/* reduced logo size so more vertical room */}
          <Image
            src={logoSrc}
            alt="SI Fleet Management"
            width={ViewWidth ? ViewWidth(140) : 140}
            height={ViewHeight ? ViewHeight(34) : 34}
            priority={true}
          />
        </div>
      </div>

      <nav style={navStyle}>
        <ul style={menuStyle}>
          {menuItems.map((item) => {
            const isActive = item.route === active;
            return (
              <li key={item.id} style={menuItemStyle}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(item.route);
                    route.push(item?.route)
                  }}
                  onMouseEnter={() => setHovered(item.route)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(item.route)}
                  onBlur={() => setHovered(null)}
                  style={getButtonStyle(item.route)}
                >
                  {isActive && (
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: -6,
                        top: 6,
                        bottom: 6,
                        width: 6,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        background: vars.accent,
                        boxShadow: "0 3px 8px rgba(109, 76, 255, 0.28)",
                      }}
                    />
                  )}

                  <span style={getIconWrapStyle(item.route)}>
                    <item.Icon />
                  </span>

                  <span style={getLabelStyle(item.route)}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* tiny bottom spacer */}
      <div style={{ height: 6 }} />
    </aside>
  );
}
