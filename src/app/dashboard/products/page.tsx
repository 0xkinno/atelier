'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import { Plus, Edit2, Trash2, ExternalLink, Menu } from 'lucide-react';

export default function ProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products] = useState([
    {
      id: '1',
      title: 'Minimalist Motion UI Kit 2026',
      priceUsd: 29,
      category: 'DESIGN',
      salesCount: 22,
      previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      title: 'Editorial Typography Masterclass',
      priceUsd: 49,
      category: 'EDUCATION',
      salesCount: 12,
      previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      title: 'Lightroom Color Presets - Autumn',
      priceUsd: 19,
      category: 'PHOTOGRAPHY',
      salesCount: 8,
      previewUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=400&q=80',
    },
  ]);

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <SidebarNav handle="mayastudio" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, padding: '24px 32px 120px 32px', overflowY: 'auto', width: '100%' }} className="dashboard-content-main">
        {/* Mobile Header Bar */}
        <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }} className="dashboard-mobile-header">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Menu size={24} color="var(--text-primary)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Menu</span>
          </button>
          <span className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Products</span>
        </div>

        {/* Top Header Title & Action Button Stacking Container */}
        <div className="mobile-stack-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>STOREFRONT CATALOG</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', lineHeight: 1.25 }}>Product Management</h1>
          </div>

          <button className="btn btn-lime btn-sm" style={{ alignSelf: 'flex-start', minWidth: '160px' }}>
            <Plus size={16} /> Add New Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {products.map((p) => (
            <div key={p.id} className="card glow-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '180px', backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
                  <img src={p.previewUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '10px', right: '10px',
                    backgroundColor: 'var(--bg-dark)', color: 'var(--accent-primary)',
                    padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600
                  }} className="font-mono">
                    ${p.priceUsd}
                  </span>
                </div>
                <div style={{ padding: '20px' }}>
                  <span className="eyebrow" style={{ color: 'var(--accent-moss)', fontSize: '0.68rem', marginBottom: '4px', display: 'block' }}>
                    {p.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: 1.3 }}>{p.title}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    {p.salesCount} sales • 4.8 MB
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '8px' }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
                  <Edit2 size={14} /> Edit
                </button>
                <button className="btn btn-ghost btn-sm" style={{ color: '#B91C1C' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .dashboard-content-main { padding: 16px 16px 120px 16px !important; }
          .dashboard-mobile-header { display: flex !important; }
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
