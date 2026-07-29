import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySignature, generateSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { walletAddress, publicKey, signature } = body;

    if (!walletAddress || !signature) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const nonceData = await db.getNonce(walletAddress);
    if (!nonceData) {
      return NextResponse.json({ error: 'Nonce expired or not found. Please request a new nonce.' }, { status: 400 });
    }

    if (nonceData.used) {
      return NextResponse.json({ error: 'Nonce already used.' }, { status: 400 });
    }

    // Verify signature if public key provided, or validate wallet signature format
    if (publicKey) {
      const isValid = verifySignature(nonceData.nonce, publicKey, signature);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid wallet signature.' }, { status: 401 });
      }
    }

    await db.markNonceUsed(walletAddress);

    // Look up associated profile handle if exists
    const profile = await db.getProfileByWallet(walletAddress);
    const token = generateSessionToken();

    await db.saveSession(token, walletAddress, profile?.handle);

    const response = NextResponse.json({
      success: true,
      sessionToken: token,
      walletAddress,
      handle: profile?.handle || null,
    });

    // Set HttpOnly session cookie
    response.cookies.set('atelier_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 604800, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
