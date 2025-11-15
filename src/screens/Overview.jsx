import React from "react";
import { ViewHeight, ViewWidth } from "@/constants/resDiv";
import TotalCard from "@/components/OverviewComponents/TotalCard";
import ActiveCard from "@/components/OverviewComponents/ActiveCard";
import AlertCard from "@/components/OverviewComponents/AlertCard";
import UsersCard from "@/components/OverviewComponents/UsersCard";
import TripsCard from "@/components/OverviewComponents/TripsCard";
import SummaryCard from "@/components/OverviewComponents/Summary";
import ActiveBikes from "@/components/OverviewComponents/ActiveBikes";
import DailyTraffic from "@/components/OverviewComponents/DailyTraffic";
import AnalyticsCard from "@/components/OverviewComponents/AnalyticsCard";
import AccidentHome from "@/components/OverviewComponents/AccidentHome";
import MaintainCard from "@/components/OverviewComponents/MaintainCard";
import TamperedCard from "@/components/OverviewComponents/TamperedCard";
import FleetBar from "@/constants/constantComponent/FleetBar";
import Sidebar from "@/constants/constantComponent/Sidebar";

const Overview = () => {
  return (<></>
    // <div
    //   style={{
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     height: ViewHeight(1080),
    //     width: ViewWidth(1920),
    //     overflow: "hidden",
    //     display: "flex",
    //     flexDirection: "row", // stack vertically
    //     alignItems: "center", // center horizontally
    //     justifyContent: "center", // center vertically
    //     backgroundColor: "#F4F7FE",
    //     zIndex: 9999,
    //     color: "#fff",
    //     textAlign: "center",
    //   }}
    // >
    //   <div
    //     style={{
    //       height: ViewHeight(1080),
    //       width: ViewWidth(276),
    //       backgroundColor: "#010F42",
    //     }}
    //   >

    //   </div>
    //   <div style={{ height: ViewHeight(1080), width: ViewWidth(1644) }}>
    //     <div
    //       style={{
    //         height: ViewHeight(83),
    //         width: ViewWidth(1591),
    //         background: "#FFFFFF", // optional readable card
    //         marginTop: ViewHeight(16),
    //         marginLeft: ViewHeight(24),
    //         borderRadius: ViewWidth(14),
    //         boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    //       }}
    //     ></div>

    //     <div
    //       style={{
    //         display: "flex", // Add display:flex to align cards horizontally
    //         flexDirection: "row",
    //         marginTop: ViewHeight(16),
    //         marginLeft: ViewWidth(24),
    //       }}
    //     >
    //       <div style={{}}>
    //         <TotalCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewWidth(24),
    //         }}
    //       >
    //         <ActiveCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <AlertCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <UsersCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <TripsCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <SummaryCard />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         display: "flex", // Add display:flex to align cards horizontally
    //         flexDirection: "row",
    //         marginTop: ViewHeight(16),
    //         marginLeft: ViewWidth(24),
    //       }}
    //     >
    //       <div style={{}}>
    //         <ActiveBikes />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewWidth(24),
    //         }}
    //       >
    //         <DailyTraffic />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <AnalyticsCard />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         display: "flex", // Add display:flex to align cards horizontally
    //         flexDirection: "row",
    //         marginTop: ViewHeight(16),
    //         marginLeft: ViewWidth(24),
    //       }}
    //     >
    //       <div style={{}}>
    //         <AccidentHome />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewWidth(24),
    //         }}
    //       >
    //         <MaintainCard />
    //       </div>
    //       <div
    //         style={{
    //           marginLeft: ViewHeight(24),
    //         }}
    //       >
    //         <TamperedCard />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Overview;
