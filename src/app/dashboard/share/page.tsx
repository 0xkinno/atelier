'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useWallet } from '@/context/WalletContext';
import { Copy, Check, QrCode, Code, Share2 } from 'lucide-react';
import QRCode from 'qrcode';

export default function ShareKitPage() {
  const { handle: contextHandle } = useWallet();
  const handle = contextHandle || 'mayastudio';
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const storefrontUrl = typeof window !== 'undefined' ? `${window.location.origin}/${handle}` : `https://atelier.app/${handle}`;
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

  const handleDownloadPoster = async () => {
    try {
      setIsDownloading(true);
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 600, 800);

      // Brand Accent Top Line
      ctx.fillStyle = '#4A5D23';
      ctx.fillRect(0, 0, 600, 16);

      ctx.fillStyle = '#1A1C16';
      ctx.font = '700 28px Playfair Display, Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scan to visit my Atelier', 300, 90);

      const qrDataUrl = await QRCode.toDataURL(storefrontUrl, { width: 400, margin: 2, color: { dark: '#1A1C16', light: '#FFFFFF' } });
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 100, 140, 400, 400);

        ctx.fillStyle = '#4A5D23';
        ctx.font = '600 18px JetBrains Mono, monospace';
        ctx.fillText(`@${handle}`, 300, 590);

        ctx.fillStyle = '#8A8D82';
        ctx.font = '14px JetBrains Mono, monospace';
        ctx.fillText(storefrontUrl, 300, 630);

        ctx.fillStyle = '#E8E7E2';
        ctx.fillRect(100, 680, 400, 1);

        ctx.fillStyle = '#5A5D52';
        ctx.font = '13px Inter, sans-serif';
        ctx.fillText('Powered by Nimiq Pay • 0% Platform Fees', 300, 720);

        canvas.toBlob((blob) => {
          if (!blob) return;
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `atelier-${handle}-qr.png`;
          a.click();
          setIsDownloading(false);
        });
      };
      img.src = qrDataUrl;
    } catch (err) {
      console.error('Failed to generate poster:', err);
      setIsDownloading(false);
    }
  };

  return (
    <DashboardLayout title="Share Kit" handle={handle}>
      {/* Landscape Header Image */}
      <div style={{
        width: '100%', maxHeight: '160px', height: '140px', borderRadius: '16px', overflow: 'hidden',
        marginBottom: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
      }} className="img-hover">
        <img src="/images/share_kit_header.jpg" alt="Share Kit Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
          <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>DISTRIBUTION & PROMOTION</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>Share Kit & Social Badges</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Tools to promote your digital storefront across X, Telegram, GitHub, and print.</p>
      </div>

      <div className="grid-two-col" style={{ gap: '24px' }}>
        {/* Section 1: Storefront URL */}
        <div className="card glow-hover" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Share2 size={22} color="var(--accent-olive)" />
            <h3 style={{ fontSize: '1.25rem' }}>Storefront Direct Link</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Your permanent, non-custodial digital store link for your social bio.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              readOnly
              value={storefrontUrl}
              className="font-mono"
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.85rem', backgroundColor: 'var(--bg-secondary)', minWidth: '200px' }}
            />
            <button onClick={() => copyToClipboard(storefrontUrl, 'url')} className="btn btn-olive btn-sm" style={{ minHeight: '44px' }}>
              {copiedUrl ? <Check size={16} /> : <Copy size={16} />} {copiedUrl ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Section 2: QR Poster Generator */}
        <div className="card glow-hover" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <QrCode size={22} color="var(--accent-olive)" />
            <h3 style={{ fontSize: '1.25rem' }}>Nimiq Pay QR Poster</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Download a high-resolution printable QR code poster for physical events or overlay graphics.
          </p>
          <button onClick={handleDownloadPoster} disabled={isDownloading} className="btn btn-lime btn-sm" style={{ minHeight: '44px' }}>
            {isDownloading ? 'Generating PNG...' : 'Download Printable Poster (.PNG)'}
          </button>
        </div>

        {/* Section 3: Embeddable GitHub README Badge */}
        <div className="card glow-hover" style={{ padding: '28px', gridColumn: '1 / -1', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Code size={22} color="var(--accent-olive)" />
            <h3 style={{ fontSize: '1.25rem' }}>GitHub README Dynamic Badge</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Embed a live-updating SVG badge in your GitHub repository README showing your store status and product count.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="text"
              readOnly
              value={badgeMarkdown}
              className="font-mono"
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.82rem', backgroundColor: 'var(--bg-secondary)', minWidth: '240px' }}
            />
            <button onClick={() => copyToClipboard(badgeMarkdown, 'badge')} className="btn btn-olive btn-sm" style={{ minHeight: '44px' }}>
              {copiedBadge ? <Check size={16} /> : <Copy size={16} />} {copiedBadge ? 'Copied' : 'Copy Badge'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
