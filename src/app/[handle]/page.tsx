'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PublicStorefrontPage() {
  const [profile] = useState({
    handle: 'mayastudio',
    displayName: 'Maya Lin Studio',
    bio: 'Minimalist motion designer & photographer crafting high-quality UI kits, Lightroom presets, and typography masterclasses.',
    accentColor: '#D4E157',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  });

  const [products] = useState([
    {
      id: 'maya-preset-01',
      title: 'Minimalist Motion UI Kit 2026',
      category: 'DESIGN',
      priceUsd: 29.00,
      previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      description: 'A complete collection of smooth, physics-based UI components, micro-animations, and CSS token definitions.',
      fileSize: '4.8 MB',
    },
    {
      id: 'maya-preset-02',
      title: 'Editorial Typography Masterclass',
      category: 'EDUCATION',
      priceUsd: 49.00,
      previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      description: 'Learn how to construct magazine-quality web layouts using Swiss grids, Playfair Display, and subtle micro-interactions.',
      fileSize: '1.2 GB',
    },
    {
      id: 'maya-preset-03',
      title: 'Lightroom Presets - Autumn Golden Hour',
      category: 'PHOTOGRAPHY',
      priceUsd: 19.00,
      previewUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      description: '12 warm, filmic Lightroom desktop & mobile DNG presets tuned for golden hour photography.',
      fileSize: '85 MB',
    },
  ]);

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Decorative Top Banner with Pattern and Gradient Fade-Out */}
      <div style={{
        height: '160px',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: profile.accentColor,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url('/images/banner_pattern_overlay.jpg')",
          backgroundSize: '360px',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '24px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-on-accent)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Atelier
          </Link>
        </div>
      </div>

      {/* Creator Profile Header (Sits cleanly on Ivory background) */}
      <div className="container" style={{ marginTop: '-40px', marginBottom: '48px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
          <img
            src={profile.avatarUrl}
            alt={profile.displayName}
            style={{
              width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover',
              border: '4px solid #FFFFFF', boxShadow: 'var(--shadow-lg)', backgroundColor: '#FFFFFF'
            }}
          />
          <div>
            <h1 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '4px', color: 'var(--text-primary)' }}>
              {profile.displayName}
            </h1>
            <div className="font-mono" style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
              @{profile.handle} • 3 PRODUCTS
            </div>
            <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
              {profile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Storefront Products Grid */}
      <div className="container">
        <h2 style={{ fontSize: '1.8rem', marginBottom: '32px' }}>Digital Goods & Downloads</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/${profile.handle}/${p.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="card glow-hover" style={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ position: 'relative', height: '200px', backgroundColor: 'var(--bg-secondary)' }}>
                    <img src={p.previewUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      backgroundColor: 'var(--bg-dark)', color: 'var(--accent-primary)',
                      padding: '6px 14px', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 600
                    }} className="font-mono">
                      ${p.priceUsd.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <span className="eyebrow" style={{ color: 'var(--accent-moss)', marginBottom: '6px', display: 'block' }}>
                      {p.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {p.description}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    {p.fileSize}
                  </span>
                  <span className="btn btn-lime btn-sm">
                    View & Buy <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
