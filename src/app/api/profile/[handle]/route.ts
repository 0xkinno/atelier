import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const profile = await db.getProfile(handle);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const profile = await db.getProfile(handle);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const body = await req.json();
    const { displayName, bio, avatarUrl, accentColor } = body;

    if (displayName) profile.displayName = displayName.trim();
    if (bio !== undefined) profile.bio = bio.trim();
    if (avatarUrl) profile.avatarUrl = avatarUrl;
    if (accentColor) profile.accentColor = accentColor;
    profile.updatedAt = new Date().toISOString();

    await db.saveProfile(profile);

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    await db.deleteProfile(handle);
    return NextResponse.json({ success: true, message: 'Storefront deleted and handle tombstoned.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
