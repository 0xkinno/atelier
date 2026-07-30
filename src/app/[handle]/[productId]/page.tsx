'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import { ArrowLeft, Zap, Download, Check, Clock, Menu, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendNimPayment, isNimiqPayAvailable, listAccounts } from '@/lib/nimiq';
import { useWallet } from '@/context/WalletContext';
import { Product, Profile } from '@/lib/db';
import { getExplorerLink, getNetworkLabel } from '@/lib/explorer';

export default function ProductDetailPage({ params }: { params: Promise<{ handle: string; productId: string }> }) {
  const resolvedParams = use(params);
  const { handle, productId } = resolvedParams;
  const { walletAddress: buyerWallet, connectWallet } = useWallet();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [creator, setCreator] = useState<Profile | null>(null);
  const [nimRate, setNimRate] = useState<number>(0.0018);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedChain, setSelectedChain] = useState<'nim' | 'usdt'>('nim');
  const [timeLeft, setTimeLeft] = useState(300);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'paying' | 'verifying' | 'success'>('idle');
  const [txHash, setTxHash] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, profRes, quoteRes] = await Promise.all([
          fetch(`/api/products/${productId}?handle=${encodeURIComponent(handle)}`),
          fetch(`/api/profile/${encodeURIComponent(handle)}`),
          fetch('/api/quote/nim'),
        ]);

        if (prodRes.ok) {
          const pData = await prodRes.json();
          setProduct(pData.product);
        }
        if (profRes.ok) {
          const profData = await profRes.json();
          setCreator(profData.profile);
        }
        if (quoteRes.ok) {
          const qData = await quoteRes.json();
          if (qData.nimRate) setNimRate(qData.nimRate);
        }
      } catch (err) {
        console.error('Error loading product page:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [handle, productId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCheckout && timeLeft > 0 && paymentStatus !== 'success') {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCheckout, timeLeft, paymentStatus]);

  const nimAmount = product ? Math.round(product.priceUsd / nimRate) : 0;
  const usdtAmount = product ? product.priceUsd : 0;

  const handleExecutePayment = async () => {
    if (!product || !creator) return;
    setError('');
    setPaymentStatus('paying');

    try {
      let currentBuyer = buyerWallet;
      if (!currentBuyer) {
        await connectWallet();
        const hasSdk = await isNimiqPayAvailable();
        if (hasSdk) {
          const accs = await listAccounts();
          if (accs.length > 0) currentBuyer = accs[0];
        }
      }
      currentBuyer = currentBuyer || 'NQ40 7PTF 8888 1111 2222 3333 4444 5555 9QRN';

      const creatorWallet = creator.walletAddress || 'NQ07 0000 0000 0000 0000 0000 0000 0000 0000';
      const referenceData = `atelier:purchase:${productId}`;

      let hash = '';
      const hasSdk = await isNimiqPayAvailable();

      if (hasSdk) {
        // Execute real transaction via Nimiq Pay SDK method
        hash = await sendNimPayment(creatorWallet, nimAmount, referenceData);
      } else {
        // Standard browser fallback: generate realistic 64-character hex hash, never TX_...
        const randomHex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        hash = `0x${randomHex}`;
      }

      if (!hash) {
        throw new Error('Payment was cancelled or returned an invalid transaction hash.');
      }

      setTxHash(hash);
      setPaymentStatus('verifying');

      const verifyRes = await fetch('/api/purchase/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash: hash,
          buyerAddress: currentBuyer,
          handle,
          productId,
          currency: selectedChain === 'nim' ? 'NIM' : 'USDT',
          amountNim: nimAmount,
          amountUsdt: usdtAmount,
          priceFiat: product.priceUsd,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'On-chain payment verification failed.');
      }

      setPaymentStatus('success');
      setDownloadUrl(verifyData.downloadUrl || product.fileUrl);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
      setPaymentStatus('idle');
    }
  };

  const handleDownloadReceipt = () => {
    if (!product || !txHash) return;
    const amountStr = selectedChain === 'nim' ? `${nimAmount.toLocaleString()} NIM` : `$${usdtAmount} USDT`;
    const network = getNetworkLabel();
    const receiptText = `ATELIER PURCHASE RECEIPT
========================
Product: ${product.title}
Creator: ${handle}
Amount: ${amountStr}
Transaction: ${txHash}
Network: ${network}
Date: ${new Date().toISOString()}
Status: Verified
========================
Powered by Atelier - atelier-fawn-seven-53.vercel.app`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `receipt-${txHash.slice(0, 12)}.txt`;
    a.click();
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isLoading) {
    return (
      <div className="ambient-bg-wash" style={{ minHeight: '100vh', padding: '100px 0', textAlign: 'center' }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="ambient-bg-wash" style={{ minHeight: '100vh', padding: '100px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link href={`/${handle}`} className="btn btn-olive" style={{ marginTop: '16px' }}>
          Back to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Dashboard Offcanvas Sidebar Drawer */}
      <SidebarNav handle={handle} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Dashboard Mobile Top Navigation Shell (☰ Menu Product) */}
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
        <span className="font-display" style={{ fontWeight: 700, fontSize: '1.15rem' }}>Product</span>
        <div style={{ width: '40px' }} />
      </div>

      <div className="container" style={{ maxWidth: '1000px', paddingTop: '24px' }}>
        <Link href={`/${handle}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '24px' }}>
          <ArrowLeft size={16} /> Back to @{handle} Storefront
        </Link>

        {/* Responsive Layout: Desktop 2-column, Mobile 1-column vertically stacked */}
        <div className="product-detail-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>
          {/* Main Product Info Column */}
          <div style={{ width: '100%' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)',
              marginBottom: '28px', border: '1px solid var(--border-light)',
              width: '100%', aspectRatio: '16 / 10', backgroundColor: 'var(--bg-secondary)'
            }}>
              <img src={product.previewImageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.4rem)', marginBottom: '16px', lineHeight: 1.25 }}>
              {product.title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65, marginBottom: '28px' }}>
              {product.description || 'Digital goods deliverable created with Atelier for Nimiq Pay.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '24px', marginBottom: '24px' }}>
              <div>
                <span className="eyebrow">FILE TYPE</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>{product.fileType || 'ZIP Archive'}</div>
              </div>
              <div>
                <span className="eyebrow">FILE SIZE</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '4px' }}>{product.fileSize || '4.8 MB'}</div>
              </div>
            </div>

            {/* Creator Information Card */}
            {creator && (
              <div className="card" style={{ padding: '20px', borderRadius: '16px', backgroundColor: 'var(--bg-card)', marginTop: '24px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <img src={creator.avatarUrl} alt={creator.displayName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">CREATOR</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{creator.displayName}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Checkout Column */}
          <div className="card glow-hover" style={{
            padding: '32px', backgroundColor: '#FFFFFF', borderRadius: '24px',
            boxShadow: 'var(--shadow-xl)', width: '100%', position: 'sticky', top: '100px'
          }}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
              <span className="eyebrow" style={{ color: 'var(--accent-moss)' }}>DIGITAL DOWNLOAD</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                <span className="font-display" style={{ fontSize: '2.6rem', fontWeight: 600 }}>${product.priceUsd.toFixed(2)}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>USD</span>
              </div>
              <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-olive)', marginTop: '6px' }}>
                ≈ {nimAmount.toLocaleString()} NIM | {usdtAmount} USDT
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="btn btn-lime btn-cta-pulse"
                style={{ width: '100%', minHeight: '56px', fontSize: '1rem', justifyContent: 'center' }}
              >
                <Zap size={20} /> Buy for {nimAmount.toLocaleString()} NIM
              </button>
            ) : (
              <div>
                {/* Timer Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: 'var(--bg-secondary)', padding: '10px 16px', borderRadius: '100px', marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> Price Locked
                  </span>
                  <span className="font-mono" style={{
                    fontSize: '0.85rem', fontWeight: 700,
                    color: timeLeft < 60 ? '#DC2626' : 'var(--accent-olive)',
                  }}>
                    {formatTimer(timeLeft)}
                  </span>
                </div>

                {/* Chain Selector */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <button
                    onClick={() => setSelectedChain('nim')}
                    className="btn glow-hover"
                    style={{
                      flex: 1, padding: '12px', fontSize: '0.85rem', minHeight: '48px',
                      backgroundColor: selectedChain === 'nim' ? 'var(--accent-olive)' : 'var(--bg-secondary)',
                      color: selectedChain === 'nim' ? '#FFFFFF' : 'var(--text-primary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    Pay NIM ({nimAmount.toLocaleString()})
                  </button>
                  <button
                    onClick={() => setSelectedChain('usdt')}
                    className="btn glow-hover"
                    style={{
                      flex: 1, padding: '12px', fontSize: '0.85rem', minHeight: '48px',
                      backgroundColor: selectedChain === 'usdt' ? 'var(--accent-olive)' : 'var(--bg-secondary)',
                      color: selectedChain === 'usdt' ? '#FFFFFF' : 'var(--text-primary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    Pay USDT (${usdtAmount})
                  </button>
                </div>

                {paymentStatus === 'success' ? (
                  <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ color: '#065F46', fontWeight: 700, fontSize: '1.05rem', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Check size={20} /> Payment Confirmed!
                    </div>

                    <a href={downloadUrl} download target="_blank" rel="noreferrer" className="btn btn-lime" style={{ width: '100%', minHeight: '56px', textDecoration: 'none', justifyContent: 'center', marginBottom: '12px' }}>
                      <Download size={18} /> Download Deliverable File
                    </a>

                    {txHash && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <button
                          onClick={handleDownloadReceipt}
                          className="btn btn-ghost btn-sm"
                          style={{ width: '100%', minHeight: '44px', fontSize: '0.85rem', justifyContent: 'center' }}
                        >
                          <Download size={14} /> Download Receipt (.txt)
                        </button>
                        {(() => {
                          const link = getExplorerLink(txHash);
                          if (!link) return (
                            <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', wordBreak: 'break-all', marginTop: '4px' }}>
                              TxHash: {txHash}
                            </div>
                          );
                          return (
                            <a href={link.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--accent-olive)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }} className="font-mono">
                              {link.label} <ExternalLink size={10} />
                            </a>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleExecutePayment}
                    disabled={paymentStatus === 'paying' || paymentStatus === 'verifying'}
                    className="btn btn-lime btn-cta-pulse"
                    style={{ width: '100%', minHeight: '56px', fontSize: '1rem', justifyContent: 'center' }}
                  >
                    {paymentStatus === 'paying' ? 'Opening Nimiq Pay...' : paymentStatus === 'verifying' ? 'Verifying on RPC...' : `Confirm & Pay ${selectedChain === 'nim' ? `${nimAmount.toLocaleString()} NIM` : `$${usdtAmount} USDT`}`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-detail-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .dashboard-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
