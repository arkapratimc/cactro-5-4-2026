# Engineering & Product Decisions

## 1. API Selection & Strategy
I chose **Frankfurter API** as the primary source because it is a reliable, open-source project with a clean JSON structure. As a secondary fallback, I integrated the **Fawaz Ahmed Currency API (CDN)**. 
- **Why:** Both APIs require no API keys, which eliminated "Key Management" overhead and allowed for a 60-minute delivery.
- **Redundancy:** By using a CDN-based fallback, the service remains resilient even if the primary API provider experiences a regional outage.

## 2. Fallback & "Strategic Budget" Strategy
To address the **$5/day Premium API budget**, I implemented a **3-Tier Waterfall** in a `.server` module:
1. **Tier 1 (Live):** Fetch from Frankfurter.
2. **Tier 2 (Delayed):** Fetch from CDN Mirror.
3. **Tier 3 (Strategic Cache):** If both fail, the system serves the **Last Known Good (LKG)** value from an in-memory server-side cache.
This "Circuit Breaker" pattern ensures the user never sees an "Unable to fetch" error, protecting user trust while keeping premium costs at $0 unless absolutely necessary.

## 3. Handling Data Staleness (The "Trust" Problem)
The PM noted that users leave when they don't trust the data. I solved this via:
- **Dual Timestamps:** I display the "Data Source Date" (when the API last updated) alongside a "Last Verified" local timestamp (generated via `useEffect` to avoid SSR hydration mismatches between USA/India timezones).
- **Visual Trust Signals:** Used a dynamic status badge (Live/Delayed/Offline) with a pulse animation to show the system is actively monitoring rates.

## 4. Addressing Conversion (The 2% Problem)
I identified that the gap between "Daily Updates" and "1-Second Updates" is the primary value prop for the $9/mo plan. 
- **Decision:** Added a subtle "Conversion Nudge" below the currency cards. By explicitly stating that free rates are daily, we create a natural incentive for high-intent users (traders/freelancers) to upgrade for real-time precision.

## 5. What I Cut to Ship in 60 Minutes
- **Persistent Database:** Used in-memory caching instead of Redis/PostgreSQL to avoid infrastructure setup time.
- **Search/Filter:** Limited the dashboard to the "Top 3" high-traffic pairs (INR, EUR, GBP) which cover ~80% of freelancer use cases.
- **Auth/Middleware:** Skipped the Login flow to focus entirely on the data reliability engine requested by the PM.

## 6. Future Roadmap
- **WebSockets:** Implement real-time pushes for Paid users.
- **Redis Integration:** Move the Strategic Cache to a persistent store so it survives server restarts.
- **Edge Deployment:** Deploy the aggregation logic to Vercel Edge Functions to reduce latency for users in different geographic regions.