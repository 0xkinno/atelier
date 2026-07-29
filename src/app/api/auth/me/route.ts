import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('atelier_session')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = await db.getSession(token);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const profile = session.handle
      ? await db.getProfile(session.handle)
      : await db.getProfileByWallet(session.walletAddress);

    return NextResponse.json({
      authenticated: true,
      walletAddress: session.walletAddress,
      handle: profile?.handle || null,
      profile: profile || null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
