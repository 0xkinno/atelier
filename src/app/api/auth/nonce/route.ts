import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateNonce } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress } = body;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid walletAddress' }, { status: 400 });
    }

    const nonce = generateNonce();
    await db.saveNonce(walletAddress, nonce);

    return NextResponse.json({ nonce });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
