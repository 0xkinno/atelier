'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { Download, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { Purchase } from '@/lib/db';

export default function BuyerPurchasesPage() {
  const { walletAddress } = useWallet();
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

  const handleDownloadReceipt = (item: Purchase) => {
    const amountStr = item.amountNim ? `${item.amountNim.toLocaleString()} NIM` : `$${item.amountUsdt} USDT`;
    const receiptText = `ATELIER PURCHASE RECEIPT
Product: ${item.productTitle}
Creator: ${item.handle}
Amount: ${amountStr}
Transaction: ${item.txHash}
Date: ${item.verifiedAt || new Date().toISOString()}
Explorer: https://nimiq.watch/#${item.txHash}
Status: Verified on Nimiq blockchain`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `receipt-${item.txHash.slice(0, 12)}.txt`;
    a.click();
  };

  return (
    <DashboardLayout title="Library" handle="mayastudio">
      <div style={{ maxWidth: '800px' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', marginBottom: '20px' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        {/* Header Image */}
        <div style={{
          width: '100%', maxHeight: '160px', height: '140px', borderRadius: '16px', overflow: 'hidden',
          marginBottom: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)'
        }} className="img-hover">
          <img src="/images/purchases_header_desk.jpg" alt="Purchases Library Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>MY DIGITAL LIBRARY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', marginBottom: '8px' }}>Purchased Digital Goods</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
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
                    • TxHash: {item.txHash}
                  </div>
                </div>

                <div className="purchases-actions-container" style={{ display: 'flex', gap: '12px', width: '100%' }}>
                  <a href={`https://raw.githubusercontent.com/nimiq/developer-center/main/README.md`} download target="_blank" rel="noreferrer" className="btn btn-lime" style={{ flex: 1, minHeight: '52px', fontSize: '0.95rem', justifyContent: 'center' }}>
                    <Download size={18} /> Download File
                  </a>
                  <button onClick={() => handleDownloadReceipt(item)} className="btn btn-ghost" style={{ flex: 1, minHeight: '52px', fontSize: '0.95rem', justifyContent: 'center' }}>
                    <Download size={18} /> Receipt (.txt)
                  </button>
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
        }
      `}</style>
    </DashboardLayout>
  );
}
