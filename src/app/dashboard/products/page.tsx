'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useWallet } from '@/context/WalletContext';
import { Plus, Edit2, Trash2, ExternalLink, X, Package } from 'lucide-react';
import { Product } from '@/lib/db';

export default function ProductsPage() {
  const { handle: contextHandle } = useWallet();
  const handle = contextHandle || 'mayastudio';
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Design');
  const [priceUsd, setPriceUsd] = useState('29.00');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?handle=${encodeURIComponent(handle)}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [handle]);

  const openAddModal = () => {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setCategory('Design');
    setPriceUsd('29.00');
    setPreviewImageUrl('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80');
    setFileUrl('https://raw.githubusercontent.com/nimiq/developer-center/main/README.md');
    setError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(p);
    setTitle(p.title);
    setDescription(p.description);
    setCategory(p.category);
    setPriceUsd(p.priceUsd.toString());
    setPreviewImageUrl(p.previewImageUrl);
    setFileUrl(p.fileUrl);
    setError('');
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to archive "${p.title}"?`)) return;

    try {
      const res = await fetch(`/api/products/${p.id}?handle=${encodeURIComponent(handle)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceUsd) {
      setError('Please fill in product title and price.');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const isEdit = !!editingProduct;
      const url = isEdit ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle,
          title,
          description,
          category,
          priceUsd: parseFloat(priceUsd),
          previewImageUrl,
          fileUrl,
          fileSize: '4.8 MB',
          fileType: 'Digital Assets',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save product');

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout title="Products" handle={handle}>
      {/* Top Header Title & Action Button Stacking Container */}
      <div className="layout-stack-header" style={{ marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>STOREFRONT CATALOG</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', lineHeight: 1.25 }}>Product Management</h1>
        </div>

        <button onClick={openAddModal} className="btn btn-lime btn-sm" style={{ alignSelf: 'flex-start', minWidth: '160px', minHeight: '48px' }}>
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Loading / Empty States */}
      {isLoading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
          Loading storefront products...
        </div>
      ) : products.length === 0 ? (
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Package size={40} color="var(--accent-olive)" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '8px' }}>No products in your catalog yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Add your first preset, template, or guide to start receiving NIM.
          </p>
          <button onClick={openAddModal} className="btn btn-olive" style={{ minHeight: '48px' }}>
            <Plus size={16} /> Add First Product
          </button>
        </div>
      ) : (
        /* Products Feed Grid (Single column on mobile) */
        <div className="products-catalog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {products.map((p) => (
            <div key={p.id} className="card glow-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '20px' }}>
              <div>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <img src={p.previewImageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', lineHeight: 1.35 }}>{p.title}</h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    {p.salesCount || 0} sales • {p.fileSize || '4.8 MB'}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px 20px', display: 'flex', gap: '8px' }}>
                <button onClick={(e) => openEditModal(p, e)} className="btn btn-ghost btn-sm" style={{ flex: 1, minHeight: '44px' }}>
                  <Edit2 size={14} /> Edit
                </button>
                <Link href={`/${handle}/${p.id}`} target="_blank" className="btn btn-ghost btn-sm" style={{ padding: '8px', minHeight: '44px' }}>
                  <ExternalLink size={14} />
                </Link>
                <button onClick={(e) => handleDeleteProduct(p, e)} className="btn btn-ghost btn-sm" style={{ color: '#B91C1C', padding: '8px', minHeight: '44px' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '540px', padding: '32px', backgroundColor: '#FFFFFF', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.4rem' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="var(--text-secondary)" />
              </button>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Minimalist Motion UI Kit 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.9rem', backgroundColor: '#FFF' }}
                  >
                    <option value="Design">Design</option>
                    <option value="Photography">Photography</option>
                    <option value="Audio">Audio</option>
                    <option value="Code">Code</option>
                    <option value="Education">Education</option>
                    <option value="Video">Video</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Price (USD) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="29.00"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what buyers receive..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Preview Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={previewImageUrl}
                  onChange={(e) => setPreviewImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>Deliverable File URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-medium)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="btn btn-olive" style={{ flex: 1 }}>
                  {isSaving ? 'Saving...' : editingProduct ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .products-catalog-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
