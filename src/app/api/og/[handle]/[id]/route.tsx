import React from 'react';
import { ImageResponse } from '@vercel/og';
import { db } from '@/lib/db';

export const runtime = 'edge';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ handle: string; id: string }> }
) {
  try {
    const { handle, id } = await params;
    const product = await db.getProduct(handle, id);

    const title = product?.title || 'Digital Product';
    const priceUsd = product?.priceUsd || 29.0;
    const category = product?.category || 'Digital Goods';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#F7F6F2',
            padding: '60px',
            color: '#1A1C16',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', color: '#4A5D23', fontWeight: 'bold' }}>
              ATELIER / @{handle}
            </span>
            <span
              style={{
                backgroundColor: '#D4E157',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2C3319',
              }}
            >
              {category}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h1 style={{ fontSize: '54px', margin: 0, color: '#1A1C16' }}>
              {title}
            </h1>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4A5D23' }}>
              ${priceUsd.toFixed(2)} USD
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(26,28,22,0.1)', paddingTop: '24px' }}>
            <span style={{ fontSize: '18px', color: '#5A5D52' }}>
              Instant NIM & USDT Payment • Direct Wallet Delivery
            </span>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#4A5D23' }}>
              Buy on Atelier →
            </span>
          </div>
        </div>
      ) as any,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate Product OG image`, { status: 500 });
  }
}
