'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import { Download, ExternalLink, ArrowLeft, ShoppingBag, Menu } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { Purchase } from '@/lib/db';

export default function BuyerPurchasesPage() {
  const { walletAddress } = useWallet();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMyPurchases() {
      setIsLoading(true);
      try {
        if (walletAddress) {
          const res = await fetch(`/api/purchases/me?buyerAddress=${encodeURIComponent(walletAddress)}`);
          if (res.ok) {
            const data = await res.json();
            setPurchases(data.purchases || []);
          }
        } else {
          setPurchases([]);
        }
      } catch (err) {
        console.error('Failed to fetch buyer purchases:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMyPurchases();
  }, [walletAddress]);

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Dashboard Offcanvas Sidebar Drawer */}
      <SidebarNav handle="mayastudio" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Dashboard Mobile Top Navigation Shell (☰ Menu Library) */}
      <div className="dashboard-mobile-header" style={{
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'rgba(247, 246, 242, 0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100, width: '100%'
      }}>
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
            display: 'flex', alignItems: 'center', gap: '8px', minHeight: '44px'
          }}
        >
          <Menu size={24} color="var(--text-primary)" />
          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Menu</span>
        </button>
        <span className="font-display" style={{ fontWeight: 700, fontSize: '1.15rem' }}>Library</span>
        <div style={{ width: '40px' }} />
      </div>

      <div className="container" style={{ maxWidth: '800px', paddingTop: '24px' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '24px' }} className="purchases-desktop-back">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '140px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/purchases_header_desk.jpg" alt="Purchases Library Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>MY DIGITAL LIBRARY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', marginBottom: '8px' }}>Purchased Digital Goods</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            All your on-chain verified downloads and signed receipts.
          </p>
        </div>

        {isLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            Loading your digital library...
          </div>
        ) : purchases.length === 0 ? (
          <div className="card" style={{ padding: '60px 24px', textAlign: 'center', borderRadius: '20px' }}>
            <ShoppingBag size={40} color="var(--text-tertiary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>You haven't purchased anything yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Browse creator storefronts on the Explore page and collect presets, templates, or guides.
            </p>
            <Link href="/explore" className="btn btn-lime" style={{ minHeight: '52px', padding: '12px 32px' }}>
              Explore Storefronts
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {purchases.map((item) => (
              <div key={item.txHash} className="card glow-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '20px' }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-olive)', marginBottom: '6px', fontWeight: 600 }}>
                    STOREFRONT: @{item.handle}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: 1.3 }}>{item.productTitle}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: 1.6 }} className="font-mono">
                    • Paid {item.amountNim ? `${item.amountNim.toLocaleString()} NIM` : `$${item.amountUsdt} USDT`}
                    <br />
                    • Purchased {new Date(item.verifiedAt).toLocaleDateString()}
                    <br />
                    • File Deliverable: 4.8 MB
                  </div>
                </div>

                {/* Stacked Vertical Action Buttons on Mobile */}
                <div className="purchases-actions-container" style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <a href={`https://raw.githubusercontent.com/nimiq/developer-center/main/README.md`} download target="_blank" rel="noreferrer" className="btn btn-lime" style={{ flex: 1, minHeight: '56px', fontSize: '0.95rem', justifyContent: 'center' }}>
                    <Download size={18} /> Download File
                  </a>
                  <a href={`https://nimiq.watch/#${item.txHash}`} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ flex: 1, minHeight: '56px', fontSize: '0.95rem', justifyContent: 'center' }}>
                    <ExternalLink size={18} /> Receipt
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .purchases-actions-container {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .purchases-actions-container .btn {
            width: 100% !important;
          }
          .dashboard-mobile-header {
            display: flex !important;
          }
          .purchases-desktop-back {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
