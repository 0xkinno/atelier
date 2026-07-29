import { NextResponse } from 'next/server';
import { generatePriceQuote } from '@/lib/quote';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId') || 'demo';
    const priceUsd = parseFloat(searchParams.get('priceUsd') || '29.00');

    const quote = await generatePriceQuote(productId, priceUsd);
    return NextResponse.json({ quote });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
