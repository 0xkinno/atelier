'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { Profile, Product } from '@/lib/db';

export default function PublicStorefrontPage({ params }: { params: Promise<{ handle: string }> }) {
  const resolvedParams = use(params);
  const handle = resolvedParams.handle;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorefront() {
      setIsLoading(true);
      try {
        const [profRes, prodRes] = await Promise.all([
          fetch(`/api/profile/${encodeURIComponent(handle)}`),
          fetch(`/api/products?handle=${encodeURIComponent(handle)}`),
        ]);

        if (profRes.ok) {
          const profData = await profRes.json();
          setProfile(profData.profile);
        }
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          setProducts(prodData.products || []);
        }
      } catch (err) {
        console.error('Failed to load public storefront:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStorefront();
  }, [handle]);

  if (isLoading) {
    return (
      <DashboardLayout title="Storefront" handle={handle}>
        <div style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Loading storefront...
        </div>
      </DashboardLayout>
    );
  }

  const activeProfile = profile || {
    handle,
    displayName: handle,
    bio: 'Creator on Atelier.',
    accentColor: '#D4E157',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    productCount: products.length,
  };

  return (
    <DashboardLayout title="Storefront" handle={handle}>
      {/* Decorative Top Banner */}
      <div style={{
        height: '140px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundColor: activeProfile.accentColor || '#D4E157',
        marginBottom: '20px'
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

        <div style={{ position: 'relative', zIndex: 10, padding: '16px 20px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', color: '#1A1C16', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, padding: '6px 12px', backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: '100px' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Creator Profile Header */}
      <div style={{ marginBottom: '32px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
          <img
            src={activeProfile.avatarUrl}
            alt={activeProfile.displayName}
            style={{
              width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover',
              border: '4px solid #FFFFFF', boxShadow: 'var(--shadow-lg)', backgroundColor: '#FFFFFF',
              marginTop: '-30px'
            }}
          />
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', marginBottom: '4px', color: 'var(--text-primary)' }}>
              {activeProfile.displayName}
            </h1>
            <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
              @{activeProfile.handle} • {products.length} PRODUCTS
            </div>
            <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              {activeProfile.bio}
            </p>
          </div>
        </div>
      </div>

      {/* Storefront Products Feed Section */}
      <div>
        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', marginBottom: '20px' }}>Digital Goods & Downloads</h2>

        {products.length === 0 ? (
          <div className="card" style={{ padding: '60px 20px', textAlign: 'center', borderRadius: '20px' }}>
            <Package size={40} color="var(--text-tertiary)" style={{ marginBottom: '12px' }} />
            <h3>No digital products available yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Check back soon for new releases from @{handle}.</p>
          </div>
        ) : (
          <div className="storefront-feed-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {products.map((p) => (
              <div key={p.id} className="card glow-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '20px' }}>
                <div>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                    <img src={p.previewImageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      backgroundColor: 'var(--bg-dark)', color: 'var(--accent-primary)',
                      padding: '6px 14px', borderRadius: '100px', fontSize: '0.88rem', fontWeight: 700
                    }} className="font-mono">
                      ${p.priceUsd.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <span className="eyebrow" style={{ color: 'var(--accent-moss)', marginBottom: '6px', display: 'block', fontSize: '0.72rem' }}>
                      {p.category}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', lineHeight: 1.35 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {p.description}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    Deliverable Size: {p.fileSize || '4.8 MB'}
                  </div>
                  <Link
                    href={`/${handle}/${p.id}`}
                    className="btn btn-lime"
                    style={{ width: '100%', minHeight: '52px', fontSize: '0.95rem', justifyContent: 'center' }}
                  >
                    View & Buy <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .storefront-feed-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
