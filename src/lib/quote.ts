import { PriceQuote } from './db';

let cachedRates: { nimUsd: number; usdtUsd: number; timestamp: number } | null = null;
const CACHE_TTL_MS = 30_000; // 30 seconds cache

/**
 * Fetch live fiat exchange rates for NIM and USDT from CoinGecko API.
 * Uses fallback rates if CoinGecko is unreachable.
 */
export async function getLiveRates(): Promise<{ nimUsd: number; usdtUsd: number }> {
  const now = Date.now();
  if (cachedRates && now - cachedRates.timestamp < CACHE_TTL_MS) {
    return { nimUsd: cachedRates.nimUsd, usdtUsd: cachedRates.usdtUsd };
  }

  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=nimiq-2,tether&vs_currencies=usd', {
      next: { revalidate: 30 },
    });
    const data = await res.json();

    const nimUsd = data['nimiq-2']?.usd || 0.0018; // Fallback rate ~$0.0018 / NIM
    const usdtUsd = data['tether']?.usd || 1.0;

    cachedRates = { nimUsd, usdtUsd, timestamp: now };
    return { nimUsd, usdtUsd };
  } catch (err) {
    console.warn('CoinGecko API unreachable, using fallback rates:', err);
    const fallback = { nimUsd: 0.0018, usdtUsd: 1.0, timestamp: now };
    cachedRates = fallback;
    return fallback;
  }
}

/**
 * Create a 5-minute locked price quote for a product.
 */
export async function generatePriceQuote(productId: string, priceUsd: number): Promise<PriceQuote> {
  const rates = await getLiveRates();
  const nimAmount = Math.ceil(priceUsd / rates.nimUsd);
  const usdtAmount = Math.round(priceUsd * 100) / 100;
  const now = Date.now();

  return {
    id: `quote_${Math.random().toString(36).substring(2, 10)}`,
    productId,
    priceUsd,
    nimAmount,
    usdtAmount,
    nimRate: rates.nimUsd,
    usdtRate: rates.usdtUsd,
    createdAt: now,
    expiresAt: now + 5 * 60 * 1000, // 5 minutes validity
  };
}
