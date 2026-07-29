'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, ExternalLink, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function BuyerPurchasesPage() {
  const [purchases] = useState([
    {
      id: 'pur-1',
      title: 'Minimalist Motion UI Kit 2026',
      creatorHandle: 'mayastudio',
      creatorName: 'Maya Lin Studio',
      downloadUrl: '#',
      fileSize: '4.8 MB',
      txHash: '0x8f93...4a21',
      date: '2026-07-28',
      amount: '$29.00',
    },
  ]);

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', padding: '40px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '160px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/purchases_header_desk.jpg" alt="Purchases Library Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>MY DIGITAL LIBRARY</span>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>Purchased Digital Goods</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            All your on-chain verified downloads and signed receipts.
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="card" style={{ padding: '60px 40px', textAlign: 'center' }}>
            <ShoppingBag size={40} color="var(--text-tertiary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Your digital library is empty</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Discover creator storefronts and find something amazing.
            </p>
            <Link href="/explore" className="btn btn-lime">
              Explore Storefronts
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {purchases.map((item) => (
              <div key={item.id} className="card glow-hover" style={{ padding: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-olive)', marginBottom: '4px' }}>
                    STOREFRONT: @{item.creatorHandle}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    Paid {item.amount} • Purchased {item.date} • {item.fileSize}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <a href={item.downloadUrl} className="btn btn-lime btn-sm">
                    <Download size={16} /> Download File
                  </a>
                  <a href={`https://explorer.nimiq.com`} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                    <ExternalLink size={16} /> Receipt
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
