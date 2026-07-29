import { NextResponse } from 'next/server';
import { db, Profile } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { handle, walletAddress, displayName, bio, avatarUrl, accentColor } = body;

    if (!handle || !walletAddress || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanHandle = handle.trim().toLowerCase();

    if (!/^[a-z0-9_]{3,24}$/.test(cleanHandle)) {
      return NextResponse.json({
        error: 'Handle must be 3-24 characters long and contain only lowercase letters, numbers, or underscores.',
      }, { status: 400 });
    }

    const available = await db.isHandleAvailable(cleanHandle);
    if (!available) {
      return NextResponse.json({ error: 'This handle is already taken or reserved.' }, { status: 400 });
    }

    const profile: Profile = {
      handle: cleanHandle,
      walletAddress,
      displayName: displayName.trim(),
      bio: (bio || '').trim(),
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      accentColor: accentColor || '#D4E157',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      productCount: 0,
      totalSales: 0,
      totalNimEarned: 0,
      totalUsdtEarned: 0,
    };

    await db.saveProfile(profile);

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
