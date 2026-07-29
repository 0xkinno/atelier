import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerAddress = searchParams.get('buyerAddress');
    const handle = searchParams.get('handle');

    if (buyerAddress) {
      const purchases = await db.getPurchasesByBuyer(buyerAddress);
      return NextResponse.json({ purchases });
    } else if (handle) {
      const purchases = await db.getPurchasesByCreator(handle);
      return NextResponse.json({ purchases });
    }

    return NextResponse.json({ purchases: [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
