import React from 'react';
import { ImageResponse } from '@vercel/og';
import { db } from '@/lib/db';

export const runtime = 'edge';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  try {
    const { handle } = await params;
    const profile = await db.getProfile(handle);

    const displayName = profile?.displayName || handle;
    const bio = profile?.bio || 'Digital storefront powered by Atelier and Nimiq Pay.';
    const productCount = profile?.productCount || 0;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#2C3319',
            padding: '60px',
            color: '#F7F6F2',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#D4E157',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2C3319',
                fontSize: '24px',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              A
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.02em' }}>
              Atelier — Storefront
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '18px', color: '#D4E157', textTransform: 'uppercase', letterSpacing: '2px' }}>
              @{handle}
            </span>
            <h1 style={{ fontSize: '56px', fontWeight: 'normal', margin: 0 }}>
              {displayName}
            </h1>
            <p style={{ fontSize: '24px', color: '#B8BBA8', maxWidth: '800px', margin: 0 }}>
              {bio}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
            <span style={{ fontSize: '20px', color: '#D4E157' }}>
              {productCount} Digital Products Available
            </span>
            <span style={{ fontSize: '18px', color: '#B8BBA8' }}>
              0% Fees • Instant NIM Payments
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
    return new Response(`Failed to generate OG image`, { status: 500 });
  }
}
