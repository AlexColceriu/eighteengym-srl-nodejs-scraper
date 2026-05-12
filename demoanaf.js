/**
 * ANAF API Integration Module
 * 
 * PURPOSE: Provides interface to Romania's ANAF (National Agency for Fiscal Administration)
 * for company validation. Used to verify company existence, activity status, and get
 * official company details like registered name, address, and CIF.
 * 
 * API Endpoints:
 * - Search: https://demoanaf.ro/api/search?q=<brand>
 * - Company Details: https://demoanaf.ro/api/company/<cif>
 */

import fetch from "node-fetch";

const ANAF_API_URL = "https://demoanaf.ro/api/company/";
const ANAF_SEARCH_URL = "https://demoanaf.ro/api/search";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches company details from ANAF API by CIF
 */
export async function getCompanyFromANAF(cif) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const url = `${ANAF_API_URL}${cif}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      if (!res.ok) {
        lastError = new Error(`ANAF API error: ${res.status}`);
        if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS);
        continue;
      }

      const json = await res.json();

      if (json.success === false) {
        lastError = new Error(json.error?.message || "ANAF returned error");
        if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS);
        continue;
      }

      return json.data || null;
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS);
    }
  }

  throw lastError || new Error("ANAF API failed after retries");
}

/**
 * Fetches company from ANAF with fallback to cached data
 */
export async function getCompanyFromANAFWithFallback(cif, cachedData = null) {
  try {
    return await getCompanyFromANAF(cif);
  } catch (err) {
    console.log(`\n ANF API unavailable: ${err.message}`);
    if (cachedData) {
      console.log("Using cached company data as fallback");
      return cachedData;
    }
    throw err;
  }
}

/**
 * Searches for companies by brand name in ANAF database
 */
export async function searchCompany(brandName) {
  const url = `${ANAF_SEARCH_URL}?q=${encodeURIComponent(brandName)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  if (!res.ok) {
    throw new Error(`ANAF search error: ${res.status}`);
  }

  const json = await res.json();
  return json.data || [];
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("demoanaf.js")) {
  const args = process.argv.slice(2);

  if (args[0] === "search") {
    const brand = args[1] || "EIGHTEENGYM";
    console.log(`=== Searching for: ${brand} ===\n`);

    searchCompany(brand)
      .then(results => {
        console.log(`Found ${results.length} results:\n`);
        results.forEach((c, i) => {
          console.log(`${i+1}. ${c.name} (CIF: ${c.cui}) - ${c.statusLabel || 'N/A'}`);
        });
      })
      .catch(err => {
        console.error("Error:", err.message);
        process.exit(1);
      });
  } else {
    const cif = args[0] || "9829933";
    console.log(`=== Testing ANAF API for CIF: ${cif} ===\n`);

    getCompanyFromANAF(cif)
      .then(data => {
        console.log("Company data:");
        console.log(JSON.stringify(data, null, 2));
      })
      .catch(err => {
        console.error("Error:", err.message);
        process.exit(1);
      });
  }
}
