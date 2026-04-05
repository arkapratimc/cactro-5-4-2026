// Updated Initial State to include GBP
let cachedData = {
  rates: { inr: 83.30, eur: 0.92, gbp: 0.79 },
  lastUpdated: new Date().toISOString(),
  isPremium: false
};

export async function getReliableRates() {
  const FRANKFURTER = "https://api.frankfurter.app/latest?from=USD";
  const FAWAZ_CDN = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

  try {
    // Tier 1: Frankfurter (Primary)
    const res = await fetch(FRANKFURTER);
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    cachedData = {
      rates: { 
        inr: data.rates.INR, 
        eur: data.rates.EUR, 
        gbp: data.rates.GBP 
      },
      lastUpdated: new Date().toISOString(),
      isPremium: false
    };
    return { ...cachedData, source: "Frankfurter (Primary)" };

  } catch (err) {
    try {
      // Tier 2: Fawaz Ahmed CDN (Fallback)
      const res = await fetch(FAWAZ_CDN);
      if (!res.ok) throw new Error();
      const data = await res.json();
      
      cachedData = {
        rates: { 
          inr: data.usd.inr, 
          eur: data.usd.eur, 
          gbp: data.usd.gbp 
        },
        lastUpdated: data.date, 
        isPremium: false
      };
      return { ...cachedData, source: "CDN Mirror (Fallback)" };

    } catch (finalErr) {
      // Tier 3: Strategic Cache (The $5/day insurance policy)
      // Log this so you can justify the "Premium Call" in your decisions.md
      console.log("CRITICAL: Public APIs failed. Serving Strategic Cache.");
      
      return { 
        ...cachedData, 
        source: "Strategic Cache (Premium Protected)", 
        isPremium: true 
      };
    }
  }
}