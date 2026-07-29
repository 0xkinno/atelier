'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  const [products] = useState([
    {
      id: 'maya-preset-01',
      title: 'Minimalist Motion UI Kit 2026',
      category: 'DESIGN',
      priceUsd: 29.00,
      previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
      salesCount: 28,
      fileSize: '4.8 MB',
    },
    {
      id: 'maya-preset-02',
      title: 'Editorial Typography Masterclass',
      category: 'EDUCATION',
      priceUsd: 49.00,
      previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      salesCount: 14,
      fileSize: '1.2 GB',
    },
    {
      id: 'maya-preset-03',
      title: 'Lightroom Presets - Autumn Golden Hour',
      category: 'PHOTOGRAPHY',
      priceUsd: 19.00,
      previewUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
      salesCount: 36,
      fileSize: '85 MB',
    },
  ]);

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav handle="mayastudio" />

      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {/* Landscape Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '160px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }}>
          <img src="/images/dashboard_header_desk.jpg" alt="Products Desk Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '100px', marginBottom: '10px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>STOREFRONT CATALOG</span>
            </div>
            <h1 style={{ fontSize: '2.2rem' }}>Product Management</h1>
          </div>

          <button className="btn btn-lime">
            <Plus size={18} /> Add New Product
          </button>
        </div>

        {/* Product Cards Grid with Glow Hover */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {products.map((product) => (
            <div key={product.id} className="card glow-hover" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '180px', backgroundColor: 'var(--bg-secondary)' }}>
                <img src={product.previewUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  backgroundColor: 'var(--bg-dark)', color: 'var(--accent-primary)',
                  padding: '4px 12px', borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600
                }} className="font-mono">
                  ${product.priceUsd.toFixed(2)}
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <div className="eyebrow" style={{ color: 'var(--accent-moss)', marginBottom: '6px' }}>
                  {product.category}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', lineHeight: 1.3 }}>
                  {product.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    {product.salesCount} sales • {product.fileSize}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: 'transparent', cursor: 'pointer' }}>
                      <Edit2 size={16} color="var(--text-secondary)" />
                    </button>
                    <button style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: 'transparent', cursor: 'pointer' }}>
                      <Trash2 size={16} color="#DC2626" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
