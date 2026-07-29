import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const profile = await db.getProfile(handle);
    const count = profile?.productCount || 0;
    const name = profile?.displayName || handle;

    const svg = `
<svg width="220" height="36" viewBox="0 0 220 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="220" height="36" rx="8" fill="#2C3319"/>
  <rect x="1" y="1" width="218" height="34" rx="7" stroke="#D4E157" stroke-opacity="0.3" stroke-width="1"/>
  <text x="14" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#F7F6F2">
    ${name}
  </text>
  <rect x="150" y="8" width="58" height="20" rx="10" fill="#D4E157"/>
  <text x="179" y="22" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#2C3319" text-anchor="middle">
    ${count} GOODS
  </text>
</svg>
    `.trim();

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (err: any) {
    return new NextResponse('<svg width="100" height="20"></svg>', {
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }
}
