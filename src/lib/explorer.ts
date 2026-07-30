/**
 * Shared explorer link utility.
 * Returns { url, label } or null when no link should be shown.
 */

function isTestnet(): boolean {
  // Client-side check
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_NETWORK === 'testnet';
  }
  // Server-side check
  const rpcUrl = process.env.NIMIQ_RPC_URL || '';
  return rpcUrl.toLowerCase().includes('test') || process.env.NEXT_PUBLIC_NETWORK === 'testnet';
}

export function getExplorerLink(txHash: string): { url: string; label: string } | null {
  if (!txHash) return null;

  // Testnet → no explorer link
  if (isTestnet()) return null;

  // EVM / Polygon hash (starts with 0x)
  if (txHash.startsWith('0x')) {
    return {
      url: `https://polygonscan.com/tx/${txHash}`,
      label: 'View on PolygonScan',
    };
  }

  // Real Nimiq hash — 64 hex characters
  const isHex64 = /^[0-9a-fA-F]{64}$/.test(txHash);
  if (isHex64) {
    return {
      url: `https://nimiq.watch/#${txHash}`,
      label: 'View on Nimiq Watch',
    };
  }

  // Unrecognised format → no link
  return null;
}

export function getNetworkLabel(): string {
  return isTestnet() ? 'Testnet' : 'Mainnet';
}
