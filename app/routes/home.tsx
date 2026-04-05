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
    { title: "USD to INR, EUR and GBP | Real-Time Forex Tracker" },
    
  ];
}


export default function CurrencyDashboard({ loaderData }: Route.ComponentProps) {
  const { rates, source, lastUpdated, fetchedAt, isPremium } = loaderData;
  const [localTime, setLocalTime] = useState("");

  const pairs = [
  { label: "USD / INR", value: rates.inr, symbol: "₹" },
  { label: "USD / EUR", value: rates.eur, symbol: "€" },
  { label: "USD / GBP", value: rates.gbp, symbol: "£" },
];

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
        {pairs.map((pair) => (
      <div key={pair.label} className={styles.card}>
        <span>{pair.label}</span>
        <div className={styles.rateValue}>{pair.symbol}{pair.value.toFixed(2)}</div>
      </div>
    ))}
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