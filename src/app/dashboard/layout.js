"use client";
import Header from "@/constants/constantComponent/Header";
import Sidebar from "@/constants/constantComponent/Sidebar";
import styles from "./gps-tracking/GpsTracking.module.css";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api/userService";
import { getAccessToken } from "@/lib/auth/tokens";
import { useRouter } from "next/navigation";


export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null)
  useEffect(() => {
    const token = getAccessToken()
    if (!token) router.push("/login");
  }, []);
  const fatchUserProfile = async () => {
    try {
      const res = await getProfile()
      console.log(res, "res");
      setUser(res)
    } catch (error) {
      setUser(null)
    }
  }
  useEffect(() => {
    fatchUserProfile()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <div className="">
            <Header user={user}/>
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
