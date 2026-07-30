'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useWallet } from '@/context/WalletContext';
import { Package, TrendingUp, DollarSign, ExternalLink, Plus } from 'lucide-react';
import { Profile, Purchase } from '@/lib/db';

export default function DashboardPage() {
  const router = useRouter();
  const { walletAddress, isConnected, isLoading: isWalletLoading } = useWallet();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [sales, setSales] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      if (isWalletLoading) return;

      const currentWallet = walletAddress || localStorage.getItem('atelier_wallet');
      const currentHandle = localStorage.getItem('atelier_handle');

      try {
        let prof: Profile | null = null;
        if (currentWallet) {
          const res = await fetch(`/api/profile/wallet/${encodeURIComponent(currentWallet)}`);
          if (res.ok) {
            const data = await res.json();
            prof = data.profile;
          }
        }

        if (!prof && currentHandle) {
          const res = await fetch(`/api/profile/${encodeURIComponent(currentHandle)}`);
          if (res.ok) {
            const data = await res.json();
            prof = data.profile;
          }
        }

        if (prof) {
          setProfile(prof);
          const purchasesRes = await fetch(`/api/purchases/me?handle=${encodeURIComponent(prof.handle)}`);
          if (purchasesRes.ok) {
            const pData = await purchasesRes.json();
            setSales(pData.purchases || []);
          }
        } else {
          setProfile({
            handle: 'mayastudio',
            walletAddress: currentWallet || 'NQ07 4444 8888 1111 2222',
            displayName: 'Maya Lin Studio',
            bio: 'Digital artist & UI motion designer.',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            accentColor: '#D4E157',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            productCount: 3,
            totalSales: 42,
            totalNimEarned: 18500,
            totalUsdtEarned: 120,
          });
        }
      } catch (err) {
        console.error('Failed to load dashboard profile:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, [walletAddress, isWalletLoading]);

  const activeHandle = profile?.handle || 'mayastudio';

  return (
    <DashboardLayout title="Overview" handle={activeHandle}>
      {/* Landscape Header Image */}
      <div style={{
        width: '100%', maxHeight: '160px', height: '140px', borderRadius: '16px', overflow: 'hidden',
        marginBottom: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
      }} className="img-hover">
        <img src="/images/dashboard_header_desk.jpg" alt="Dashboard Desk Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Top Header Title & Actions */}
      <div className="layout-stack-header" style={{ marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '6px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>CREATOR DASHBOARD</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', lineHeight: 1.25 }}>
            Welcome back, {profile?.displayName || 'Creator'}
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/dashboard/products" className="btn btn-lime btn-sm" style={{ minHeight: '44px' }}>
            <Plus size={16} /> Add Product
          </Link>
          <Link href={`/${activeHandle}`} target="_blank" className="btn btn-ghost btn-sm" style={{ minHeight: '44px' }}>
            <ExternalLink size={16} /> View Store
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="layout-tabs-scroll" style={{ marginBottom: '28px' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', padding: '10px 0', borderBottom: '3px solid #D4E157', fontWeight: 600, color: 'var(--accent-olive)', fontSize: '0.88rem' }}>
          Overview
        </Link>
        <Link href="/dashboard/products" className="glow-hover" style={{ textDecoration: 'none', padding: '10px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Products ({profile?.productCount || 0})
        </Link>
        <Link href="/dashboard/sales" className="glow-hover" style={{ textDecoration: 'none', padding: '10px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Sales History
        </Link>
        <Link href="/dashboard/share" className="glow-hover" style={{ textDecoration: 'none', padding: '10px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Share & Badges
        </Link>
        <Link href="/dashboard/settings" className="glow-hover" style={{ textDecoration: 'none', padding: '10px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Settings
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid-stats" style={{ marginBottom: '32px' }}>
        <div className="card glow-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow">TOTAL SALES</span>
            <TrendingUp size={16} color="var(--accent-olive)" />
          </div>
          <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
            {profile?.totalSales || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }} className="font-mono">Verified sales</div>
        </div>

        <div className="card glow-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow">NIM EARNED</span>
            <DollarSign size={16} color="var(--accent-olive)" />
          </div>
          <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-olive)' }}>
            {(profile?.totalNimEarned || 0).toLocaleString()} <small style={{ fontSize: '0.8rem' }}>NIM</small>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }} className="font-mono">Direct wallet</div>
        </div>

        <div className="card glow-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow">USDT EARNED</span>
            <DollarSign size={16} color="var(--accent-olive)" />
          </div>
          <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
            ${profile?.totalUsdtEarned || 0} <small style={{ fontSize: '0.8rem' }}>USDT</small>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }} className="font-mono">Polygon EVM</div>
        </div>

        <div className="card glow-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span className="eyebrow">ACTIVE PRODUCTS</span>
            <Package size={16} color="var(--accent-olive)" />
          </div>
          <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
            {profile?.productCount || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }} className="font-mono">Published</div>
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem' }}>Recent Sales</h3>
          <Link href="/dashboard/sales" style={{ fontSize: '0.82rem', color: 'var(--accent-olive)', textDecoration: 'none', fontWeight: 600 }}>
            View all &rarr;
          </Link>
        </div>

        {sales.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            These are sample transactions. Real sales will appear here when buyers purchase your products.
          </div>
        ) : (
          <div className="layout-table-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', minWidth: '500px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">PRODUCT</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">BUYER</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">AMOUNT</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">DATE</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.txHash} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 10px', fontWeight: 600 }}>{sale.productTitle}</td>
                    <td style={{ padding: '14px 10px', color: 'var(--text-secondary)' }} className="font-mono">{sale.buyerAddress}</td>
                    <td style={{ padding: '14px 10px', fontWeight: 600, color: 'var(--accent-olive)' }}>
                      {sale.amountNim ? `${sale.amountNim.toLocaleString()} NIM` : `$${sale.amountUsdt} USDT`}
                    </td>
                    <td style={{ padding: '14px 10px', color: 'var(--text-tertiary)' }}>{new Date(sale.verifiedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
