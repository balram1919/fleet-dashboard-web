"use client";

import Header from "@/constants/constantComponent/Header";
import Sidebar from "@/constants/constantComponent/Sidebar";
import styles from "./gps-tracking/GpsTracking.module.css";
import { UserProvider, useUser } from "@/context/UserContext";
import Loading from "@/components/Loading";

function DashboardContent({ children }) {
  const { user, loading } = useUser();



  return (
    <div className={styles.container}>
      {loading && <Loading fullScreen />}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <Header user={user} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
