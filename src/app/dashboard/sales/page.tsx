'use client';

import { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import { Download, TrendingUp, DollarSign } from 'lucide-react';

export default function SalesPage() {
  const [periodFilter, setPeriodFilter] = useState<'today' | '7d' | '30d' | 'all'>('all');

  const [sales] = useState([
    { id: '1', product: 'Minimalist Motion UI Kit 2026', buyer: 'NQ82 1192 4812 0019 9921', amountNim: '16,111 NIM', amountUsd: '$29.00', chain: 'NIMIQ', date: '2026-07-28 18:42', tx: '0x8f93...4a21' },
    { id: '2', product: 'Editorial Typography Masterclass', buyer: '0x3f1c998240a1b2c8', amountNim: '-', amountUsd: '$49.00 USDT', chain: 'POLYGON', date: '2026-07-28 15:10', tx: '0x12a4...8811' },
    { id: '3', product: 'Lightroom Color Presets - Autumn', buyer: 'NQ14 0092 1142 8810 3381', amountNim: '11,111 NIM', amountUsd: '$19.00', chain: 'NIMIQ', date: '2026-07-27 11:05', tx: '0x77c2...9010' },
  ]);

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Product,Buyer,Amount,Chain,Date,TxHash"]
        .concat(sales.map(s => `"${s.product}","${s.buyer}","${s.amountUsd}","${s.chain}","${s.date}","${s.tx}"`))
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
      <SidebarNav handle="mayastudio" />

      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        {/* Landscape Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '160px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }}>
          <img src="/images/dashboard_header_desk.jpg" alt="Sales Analytics Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '100px', marginBottom: '10px' }}>
              <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>ANALYTICS & REVENUE</span>
            </div>
            <h1 style={{ fontSize: '2.2rem' }}>Sales History</h1>
          </div>

          <button onClick={exportCSV} className="btn btn-ghost">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* 3 Summary Stat Cards with Glow Hover */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">TOTAL REVENUE</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2rem', fontWeight: 600 }}>$1,210.00 USD</div>
          </div>
          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">NIM RECEIVED</span>
              <TrendingUp size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-olive)' }}>18,500 NIM</div>
          </div>
          <div className="card glow-hover" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="eyebrow">USDT RECEIVED</span>
              <DollarSign size={18} color="var(--accent-olive)" />
            </div>
            <div className="font-display" style={{ fontSize: '2rem', fontWeight: 600 }}>120 USDT</div>
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
                backgroundColor: periodFilter === filter ? 'var(--accent-primary)' : 'var(--bg-card)',
                color: periodFilter === filter ? 'var(--text-on-accent)' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                padding: '6px 16px'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sales Table */}
        <div className="card" style={{ padding: '32px' }}>
          {sales.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No sales recorded yet. Share your storefront link to get started!</p>
              <a href="/dashboard/share" className="btn btn-lime btn-sm">Go to Share Kit</a>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ padding: '12px', color: 'var(--text-tertiary)' }} className="font-mono">PRODUCT</th>
                  <th style={{ padding: '12px', color: 'var(--text-tertiary)' }} className="font-mono">BUYER ADDRESS</th>
                  <th style={{ padding: '12px', color: 'var(--text-tertiary)' }} className="font-mono">AMOUNT</th>
                  <th style={{ padding: '12px', color: 'var(--text-tertiary)' }} className="font-mono">CHAIN</th>
                  <th style={{ padding: '12px', color: 'var(--text-tertiary)' }} className="font-mono">DATE</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 600 }}>{s.product}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }} className="font-mono">{s.buyer}</td>
                    <td style={{ padding: '16px 12px', fontWeight: 600, color: 'var(--accent-olive)' }}>{s.amountUsd}</td>
                    <td style={{ padding: '16px 12px', fontSize: '0.8rem' }} className="font-mono">{s.chain}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-tertiary)' }}>{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
