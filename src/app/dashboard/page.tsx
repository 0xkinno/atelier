'use client';

import { useState } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import {
  Package, TrendingUp, DollarSign, ExternalLink, Plus, Share2, Settings
} from 'lucide-react';

export default function DashboardPage() {
  const [profile] = useState({
    handle: 'mayastudio',
    displayName: 'Maya Lin Studio',
    walletAddress: 'NQ07 4444 8888 1111 2222',
  });

  const [stats] = useState({
    totalSales: 42,
    nimEarned: 18500,
    usdtEarned: 120,
    usdEquivalent: 1210,
    activeProducts: 3,
  });

  const [recentSales] = useState([
    { id: '1', product: 'Minimalist Motion UI Kit 2026', buyer: 'NQ82...9921', amount: '16,111 NIM', date: '2 hours ago', tx: '0x8f93...4a21' },
    { id: '2', product: 'Editorial Typography Masterclass', buyer: '0x3f...12c8', amount: '49 USDT', date: '5 hours ago', tx: '0x12a4...8811' },
    { id: '3', product: 'Lightroom Color Presets - Autumn', buyer: 'NQ14...3381', amount: '11,111 NIM', date: '1 day ago', tx: '0x77c2...9010' },
  ]);

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Navigation */}
      <SidebarNav handle={profile.handle} />

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {/* Landscape Header Image */}
        <div style={{
          width: '100%', maxHeight: '180px', height: '180px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/dashboard_header_desk.jpg" alt="Dashboard Desk Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '100px', marginBottom: '10px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>CREATOR DASHBOARD</span>
            </div>
            <h1 style={{ fontSize: '2.2rem' }}>Welcome back, {profile.displayName}</h1>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/dashboard/products" className="btn btn-lime btn-sm">
              <Plus size={16} /> Add Product
            </Link>
            <Link href={`/${profile.handle}`} target="_blank" className="btn btn-ghost btn-sm">
              <ExternalLink size={16} /> View Storefront
            </Link>
          </div>
        </div>

        {/* Tab Navigation with Lime Active Underline */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-light)', marginBottom: '32px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '3px solid #D4E157', fontWeight: 600, color: 'var(--accent-olive)', fontSize: '0.92rem' }}>
            Overview
          </Link>
          <Link href="/dashboard/products" className="glow-hover" style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Products ({stats.activeProducts})
          </Link>
          <Link href="/dashboard/sales" className="glow-hover" style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Sales History
          </Link>
          <Link href="/dashboard/share" className="glow-hover" style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Share & Badges
          </Link>
          <Link href="/dashboard/settings" className="glow-hover" style={{ textDecoration: 'none', padding: '12px 0', borderBottom: '3px solid transparent', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Settings
          </Link>
        </div>

        {/* 4 Stat Cards with Glow Hover */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="eyebrow">TOTAL SALES</span>
              <TrendingUp size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 600 }}>
              {stats.totalSales}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">+12 this week</div>
          </div>

          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="eyebrow">NIM EARNED</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 600, color: 'var(--accent-olive)' }}>
              {stats.nimEarned.toLocaleString()} <small style={{ fontSize: '0.9rem' }}>NIM</small>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">~$333.00 USD</div>
          </div>

          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="eyebrow">USDT EARNED</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 600 }}>
              ${stats.usdtEarned} <small style={{ fontSize: '0.9rem' }}>USDT</small>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">Polygon EVM</div>
          </div>

          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="eyebrow">ACTIVE PRODUCTS</span>
              <Package size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 600 }}>
              {stats.activeProducts}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">Published</div>
          </div>
        </div>

        {/* Recent Sales Table */}
        <div className="card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>Recent Sales</h3>
            <Link href="/dashboard/sales" style={{ fontSize: '0.85rem', color: 'var(--accent-olive)', textDecoration: 'none', fontWeight: 600 }}>
              View all sales &rarr;
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">PRODUCT</th>
                <th style={{ padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">BUYER</th>
                <th style={{ padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">AMOUNT</th>
                <th style={{ padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">DATE</th>
                <th style={{ padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }} className="font-mono">TX HASH</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background-color 150ms' }}>
                  <td style={{ padding: '16px 12px', fontWeight: 600 }}>{sale.product}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }} className="font-mono">{sale.buyer}</td>
                  <td style={{ padding: '16px 12px', fontWeight: 600, color: 'var(--accent-olive)' }}>{sale.amount}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-tertiary)' }}>{sale.date}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-tertiary)' }} className="font-mono">{sale.tx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
