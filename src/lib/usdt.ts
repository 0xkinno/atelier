import { encodeFunctionData, parseUnits, formatUnits } from 'viem';

export const POLYGON_USDT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
export const POLYGON_CHAIN_ID_HEX = '0x89'; // 137 in decimal

export function isEthereumAvailable(): boolean {
  return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
}

export async function requestEvmAccounts(): Promise<string[]> {
  if (!isEthereumAvailable()) {
    throw new Error('EVM provider (window.ethereum) is not available.');
  }
  const accounts = await (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  });
  return accounts as string[];
}

export async function switchToPolygon(): Promise<void> {
  if (!isEthereumAvailable()) return;
  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: POLYGON_CHAIN_ID_HEX }],
    });
  } catch (err: any) {
    console.warn('Could not switch to Polygon network:', err?.message || err);
  }
}

export async function getUsdtBalance(userAddress: string): Promise<string> {
  if (!isEthereumAvailable()) return '0';
  try {
    const data = encodeFunctionData({
      abi: [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        },
      ],
      functionName: 'balanceOf',
      args: [userAddress as `0x${string}`],
    });

    const rawBalance = await (window as any).ethereum.request({
      method: 'eth_call',
      params: [{ to: POLYGON_USDT_ADDRESS, data }, 'latest'],
    });

    if (!rawBalance || rawBalance === '0x') return '0';
    return formatUnits(BigInt(rawBalance), 6); // USDT has 6 decimals
  } catch (err) {
    console.error('Error fetching USDT balance:', err);
    return '0';
  }
}

export async function sendUsdtPayment(
  recipientEvmAddress: string,
  usdtAmount: number
): Promise<string> {
  if (!isEthereumAvailable()) {
    throw new Error('EVM provider is not available in your wallet.');
  }

  await switchToPolygon();

  const accounts = await requestEvmAccounts();
  const fromAddress = accounts[0];

  const data = encodeFunctionData({
    abi: [
      {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
      },
    ],
    functionName: 'transfer',
    args: [
      recipientEvmAddress as `0x${string}`,
      parseUnits(usdtAmount.toString(), 6), // 6 decimals for USDT
    ],
  });

  const txHash = await (window as any).ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: fromAddress,
        to: POLYGON_USDT_ADDRESS, // Contract address, NOT recipient directly
        data,
        value: '0x0',
      },
    ],
  });

  return txHash as string;
}

export async function checkEvmTxReceipt(txHash: string): Promise<any> {
  if (!isEthereumAvailable()) return null;
  return await (window as any).ethereum.request({
    method: 'eth_getTransactionReceipt',
    params: [txHash],
  });
}
