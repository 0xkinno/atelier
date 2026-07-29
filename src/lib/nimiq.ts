import { init } from '@nimiq/mini-app-sdk';

export type NimiqSDK = Awaited<ReturnType<typeof init>>;

let sdkInstance: NimiqSDK | null = null;
let initPromise: Promise<NimiqSDK | null> | null = null;

export async function getNimiqSDK(): Promise<NimiqSDK | null> {
  if (typeof window === 'undefined') return null;
  if (sdkInstance) return sdkInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      // 10 second timeout as instructed in Appendix A
      const sdk = await init({ timeout: 10_000 });
      sdkInstance = sdk;
      return sdk;
    } catch (err) {
      console.warn('Nimiq Pay SDK initialization timed out or running in browser mode:', err);
      return null;
    }
  })();

  return initPromise;
}

export async function isNimiqPayAvailable(): Promise<boolean> {
  const sdk = await getNimiqSDK();
  return sdk !== null;
}

/**
 * List the user's Nimiq wallet addresses.
 */
export async function listAccounts(): Promise<string[]> {
  const sdk = await getNimiqSDK();
  if (!sdk) {
    throw new Error('Nimiq Pay container is not available.');
  }

  const result = await sdk.listAccounts();
  const errorMsg = getProviderErrorMessage(result);
  if (errorMsg) throw new Error(errorMsg);

  return result as string[];
}

/**
 * Sign a nonce or message with the user's Nimiq key.
 */
export async function signMessage(message: string): Promise<{ publicKey: string; signature: string }> {
  const sdk = await getNimiqSDK();
  if (!sdk) {
    throw new Error('Nimiq Pay container is not available.');
  }

  const result = await sdk.sign(message);
  const errorMsg = getProviderErrorMessage(result);
  if (errorMsg) throw new Error(errorMsg);

  return result as { publicKey: string; signature: string };
}

/**
 * Send NIM payment to a recipient address with attached data.
 */
export async function sendNimPayment(
  recipient: string,
  nimAmount: number,
  data: string = ''
): Promise<string> {
  const sdk = await getNimiqSDK();
  if (!sdk) {
    throw new Error('Nimiq Pay container is not available.');
  }

  // Convert NIM to Luna (1 NIM = 100,000 Luna)
  const lunaValue = Math.round(nimAmount * 100_000);

  const txHash = await sdk.sendBasicTransactionWithData({
    recipient,
    value: lunaValue,
    data,
  });

  const errorMsg = getProviderErrorMessage(txHash);
  if (errorMsg) throw new Error(errorMsg);

  return txHash as string;
}

/**
 * Get current block height of Nimiq blockchain.
 */
export async function getBlockNumber(): Promise<number> {
  const sdk = await getNimiqSDK();
  if (!sdk) return 0;
  try {
    return await sdk.getBlockNumber();
  } catch {
    return 0;
  }
}

/**
 * Check if Nimiq consensus is established.
 */
export async function isConsensusEstablished(): Promise<boolean> {
  const sdk = await getNimiqSDK();
  if (!sdk) return false;
  try {
    return await sdk.isConsensusEstablished();
  } catch {
    return false;
  }
}

function getProviderErrorMessage(value: unknown): string | null {
  if (typeof value !== 'object' || value === null || !('error' in value)) {
    return null;
  }
  const maybeError = (value as { error?: { message?: unknown } }).error;
  if (maybeError && typeof maybeError.message === 'string') {
    return maybeError.message;
  }
  return 'Provider request failed.';
}
