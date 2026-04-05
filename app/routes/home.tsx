import { getReliableRates } from "../utils/rates.server";
import type { Route } from "./+types/home";
import styles from "./home.module.css";
import { useState, useEffect } from "react";

export async function loader() {
  const data = await getReliableRates();
  return {
    ...data,
    fetchedAt: new Date().toISOString(), // The 'Now' timestamp for the browser
  };
}

export function meta() {
  return [
    { title: "USD to INR | Real-Time Forex Tracker" },
    
  ];
}


export default function CurrencyDashboard({ loaderData }: Route.ComponentProps) {
  const { rates, source, lastUpdated, fetchedAt, isPremium } = loaderData;
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    setLocalTime(new Date(fetchedAt).toLocaleTimeString());
  }, [fetchedAt]);

  // UI status logic
  const badgeStyle = isPremium ? styles.statusDelayed : styles.statusLive;

  return (
    <div className={styles.container}>
      <div className={`${styles.statusBadge} ${badgeStyle}`}>
        {isPremium ? "⚠️ " : "● "} 
        {source} | Data from: {lastUpdated.split('T')[0]}
      </div>
      
      <p className={styles.clientTime}>Last verified at: {localTime || "--:--"}</p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span>USD/INR</span>
          <div className={styles.rateValue}>₹{rates.inr.toFixed(2)}</div>
        </div>
      </div>
      {/* The Subtle Conversion Nudge */}
<section className={styles.upgradeSection}>
  <p>Rates are updated daily for free users.</p>
  <a href="/upgrade" className={styles.upgradeLink}>
    Get 1-second real-time updates →
  </a>
</section>
    </div>
  );
}