'use client';

import { useState, useEffect } from 'react';
import SidebarNav from '@/components/SidebarNav';
import { useWallet } from '@/context/WalletContext';
import { Download, TrendingUp, DollarSign, Menu } from 'lucide-react';
import { Purchase } from '@/lib/db';

export default function SalesPage() {
  const { handle: contextHandle } = useWallet();
  const handle = contextHandle || 'mayastudio';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sales, setSales] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState<'today' | '7d' | '30d' | 'all'>('all');

  const demoSales = [
    { txHash: '0x8f93...4a21', buyerAddress: 'NQ82 1192 4812 0019 9921', handle: 'mayastudio', productId: 'maya-preset-01', productTitle: 'Minimalist Motion UI Kit 2026', amountNim: 16111, amountUsdt: 0, priceFiat: 29, currency: 'NIM' as const, chain: 'Nimiq', verifiedAt: '2026-07-28T18:42:00Z' },
    { txHash: '0x12a4...8811', buyerAddress: '0x3f1c998240a1b2c8', handle: 'mayastudio', productId: 'maya-preset-02', productTitle: 'Editorial Typography Masterclass', amountNim: 0, amountUsdt: 49, priceFiat: 49, currency: 'USDT' as const, chain: 'Polygon', verifiedAt: '2026-07-28T15:10:00Z' },
  ];

  useEffect(() => {
    async function fetchSalesHistory() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/purchases/me?handle=${encodeURIComponent(handle)}`);
        if (res.ok) {
          const data = await res.json();
          setSales(data.purchases || []);
        }
      } catch (err) {
        console.error('Failed to fetch creator sales history:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSalesHistory();
  }, [handle]);

  const displaySales = sales.length > 0 ? sales : demoSales;
  const isDemo = sales.length === 0;

  const totalNim = displaySales.reduce((acc, s) => acc + (s.amountNim || 0), 0);
  const totalUsdt = displaySales.reduce((acc, s) => acc + (s.amountUsdt || 0), 0);

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Product,Buyer,Amount,Chain,Date,TxHash"]
        .concat(displaySales.map(s => `"${s.productTitle}","${s.buyerAddress}","${s.amountNim ? `${s.amountNim} NIM` : `$${s.amountUsdt} USDT`}","${s.chain}","${new Date(s.verifiedAt).toLocaleDateString()}","${s.txHash}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `atelier_sales_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav handle={handle} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div style={{ flex: 1, padding: '24px 32px 120px 32px', overflowY: 'auto' }} className="dashboard-content-main">
        {/* Mobile Header Bar */}
        <div style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }} className="dashboard-mobile-header">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Menu size={24} color="var(--text-primary)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Menu</span>
          </button>
          <span className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem' }}>Sales History</span>
        </div>

        {/* Landscape Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '140px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/dashboard_header_desk.jpg" alt="Sales Analytics Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="layout-stack-header" style={{ marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '6px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>ANALYTICS & REVENUE</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>Sales History</h1>
          </div>

          <button onClick={exportCSV} className="btn btn-ghost btn-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid-three-col" style={{ gap: '20px', marginBottom: '28px' }}>
          <div className="card glow-hover" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">TOTAL SALES</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
              {displaySales.length}
            </div>
          </div>
          <div className="card glow-hover" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">NIM RECEIVED</span>
              <TrendingUp size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--accent-olive)' }}>
              {totalNim.toLocaleString()} NIM
            </div>
          </div>
          <div className="card glow-hover" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">USDT RECEIVED</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
              ${totalUsdt} USDT
            </div>
          </div>
        </div>

        {/* Period Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {(['today', '7d', '30d', 'all'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setPeriodFilter(filter)}
              className="btn btn-sm"
              style={{
                backgroundColor: periodFilter === filter ? 'var(--accent-olive)' : 'var(--bg-card)',
                color: periodFilter === filter ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                padding: '6px 14px'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sales Table */}
        <div className="card" style={{ padding: '24px' }}>
          {isDemo && (
            <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              These are sample transactions. Real sales will appear here when buyers purchase your products.
            </div>
          )}

          <div className="layout-table-wrapper">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem', minWidth: '500px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)' }} className="font-mono">PRODUCT</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)' }} className="font-mono">BUYER ADDRESS</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)' }} className="font-mono">AMOUNT</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)' }} className="font-mono">CHAIN</th>
                  <th style={{ padding: '10px', color: 'var(--text-tertiary)' }} className="font-mono">DATE</th>
                </tr>
              </thead>
              <tbody>
                {displaySales.map((s) => (
                  <tr key={s.txHash} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px 10px', fontWeight: 600 }}>{s.productTitle}</td>
                    <td style={{ padding: '14px 10px', color: 'var(--text-secondary)' }} className="font-mono">{s.buyerAddress}</td>
                    <td style={{ padding: '14px 10px', fontWeight: 600, color: 'var(--accent-olive)' }}>
                      {s.amountNim ? `${s.amountNim.toLocaleString()} NIM` : `$${s.amountUsdt} USDT`}
                    </td>
                    <td style={{ padding: '14px 10px', fontSize: '0.8rem' }} className="font-mono">{s.chain}</td>
                    <td style={{ padding: '14px 10px', color: 'var(--text-tertiary)' }}>{new Date(s.verifiedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
