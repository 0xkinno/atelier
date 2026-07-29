'use client';

import { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import { Copy, Check, QrCode, Code, Share2 } from 'lucide-react';

export default function ShareKitPage() {
  const [handle] = useState('mayastudio');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);

  const storefrontUrl = `https://atelier.app/${handle}`;
  const badgeMarkdown = `[![Atelier Storefront](https://atelier.app/api/badge/${handle})](${storefrontUrl})`;

  const copyToClipboard = (text: string, type: 'url' | 'badge') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedBadge(true);
      setTimeout(() => setCopiedBadge(false), 2000);
    }
  };

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav handle={handle} />

      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {/* Landscape Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '160px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/share_kit_header.jpg" alt="Share Kit Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '100px', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>DISTRIBUTION & PROMOTION</span>
          </div>
          <h1 style={{ fontSize: '2.2rem' }}>Share Kit & Social Badges</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Tools to promote your digital storefront across X, Telegram, GitHub, and print.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Section 1: Storefront URL */}
          <div className="card glow-hover" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Share2 size={22} color="var(--accent-olive)" />
              <h3 style={{ fontSize: '1.25rem' }}>Storefront Direct Link</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Your permanent, non-custodial digital store link for your social bio.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={storefrontUrl}
                className="font-mono"
                style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.85rem', backgroundColor: 'var(--bg-secondary)' }}
              />
              <button onClick={() => copyToClipboard(storefrontUrl, 'url')} className="btn btn-olive btn-sm">
                {copiedUrl ? <Check size={16} /> : <Copy size={16} />} {copiedUrl ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Section 2: QR Poster Generator */}
          <div className="card glow-hover" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <QrCode size={22} color="var(--accent-olive)" />
              <h3 style={{ fontSize: '1.25rem' }}>Nimiq Pay QR Poster</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Download a high-resolution printable QR code poster for physical events or overlay graphics.
            </p>
            <button className="btn btn-lime btn-sm">
              Download Printable Poster (.PNG)
            </button>
          </div>

          {/* Section 3: Embeddable GitHub README Badge */}
          <div className="card glow-hover" style={{ padding: '32px', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Code size={22} color="var(--accent-olive)" />
              <h3 style={{ fontSize: '1.25rem' }}>GitHub README Dynamic Badge</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Embed a live-updating SVG badge in your GitHub repository README showing your store status and product count.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={badgeMarkdown}
                className="font-mono"
                style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.82rem', backgroundColor: 'var(--bg-secondary)' }}
              />
              <button onClick={() => copyToClipboard(badgeMarkdown, 'badge')} className="btn btn-olive btn-sm">
                {copiedBadge ? <Check size={16} /> : <Copy size={16} />} {copiedBadge ? 'Copied' : 'Copy Badge'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
