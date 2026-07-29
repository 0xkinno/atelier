'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Zap, Download, Check, Sparkles, Clock, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductDetailPage() {
  const [product] = useState({
    id: 'maya-preset-01',
    title: 'Minimalist Motion UI Kit 2026',
    category: 'DESIGN',
    priceUsd: 29.00,
    priceNim: 16111,
    priceUsdt: 29.00,
    previewUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'A complete collection of smooth, physics-based UI components, micro-animations, and CSS token definitions designed for Next.js and modern web applications. Includes fully customizable Figma variables, React 19 hooks, and zero-dependency animation utilities.',
    fileSize: '4.8 MB',
    fileType: '.ZIP Archive',
    creatorHandle: 'mayastudio',
    creatorName: 'Maya Lin Studio',
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedChain, setSelectedChain] = useState<'nim' | 'usdt'>('nim');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [downloadKey, setDownloadKey] = useState<string>('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCheckout && timeLeft > 0 && paymentStatus !== 'success') {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCheckout, timeLeft, paymentStatus]);

  const handleSimulatePayment = () => {
    setPaymentStatus('verifying');
    setTimeout(() => {
      setPaymentStatus('success');
      setDownloadKey('atk_99812401827491');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', padding: '40px 0 120px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <Link href={`/${product.creatorHandle}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> Back to @{product.creatorHandle} Storefront
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Left Column: Product Image & Details */}
          <div>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', marginBottom: '32px', border: '1px solid var(--border-light)' }}>
              <img src={product.previewUrl} alt={product.title} style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }} />
            </div>

            <h1 className="font-display" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
              {product.title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
              {product.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
              <div>
                <span className="eyebrow">FILE TYPE</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{product.fileType}</div>
              </div>
              <div>
                <span className="eyebrow">FILE SIZE</span>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{product.fileSize}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Card */}
          <div className="card glow-hover" style={{ padding: '36px', backgroundColor: '#FFFFFF', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', position: 'sticky', top: '100px' }}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '20px', marginBottom: '24px' }}>
              <span className="eyebrow" style={{ color: 'var(--accent-moss)' }}>DIGITAL DOWNLOAD</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
                <span className="font-display" style={{ fontSize: '2.6rem', fontWeight: 600 }}>${product.priceUsd.toFixed(2)}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>USD</span>
              </div>
              <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--accent-olive)', marginTop: '4px' }}>
                ≈ {product.priceNim.toLocaleString()} NIM | {product.priceUsdt} USDT
              </div>
            </div>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="btn btn-lime btn-cta-pulse"
                style={{ width: '100%', padding: '16px', fontSize: '1rem' }}
              >
                <Zap size={18} /> Instant Crypto Checkout
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
                    animation: timeLeft < 60 ? 'pulse 1s infinite' : 'none'
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
                      flex: 1, padding: '10px', fontSize: '0.85rem',
                      backgroundColor: selectedChain === 'nim' ? 'var(--accent-olive)' : 'var(--bg-secondary)',
                      color: selectedChain === 'nim' ? '#FFFFFF' : 'var(--text-primary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    Pay NIM ({product.priceNim.toLocaleString()})
                  </button>
                  <button
                    onClick={() => setSelectedChain('usdt')}
                    className="btn glow-hover"
                    style={{
                      flex: 1, padding: '10px', fontSize: '0.85rem',
                      backgroundColor: selectedChain === 'usdt' ? 'var(--accent-olive)' : 'var(--bg-secondary)',
                      color: selectedChain === 'usdt' ? '#FFFFFF' : 'var(--text-primary)',
                      border: '1px solid var(--border-medium)'
                    }}
                  >
                    Pay USDT (${product.priceUsdt})
                  </button>
                </div>

                {/* Frosted Glass QR Display Card */}
                <div style={{
                  backgroundColor: 'rgba(247, 246, 242, 0.85)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  border: '1px solid var(--border-light)',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'inline-block', padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '12px' }}>
                    <QrCode size={140} color="var(--bg-dark)" />
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }} className="font-mono">
                    Scan with Nimiq Pay App
                  </div>
                </div>

                {paymentStatus === 'success' ? (
                  <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ color: '#065F46', fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Check size={18} /> Payment Confirmed!
                    </div>
                    <button className="btn btn-lime btn-sm" style={{ width: '100%', marginTop: '8px' }}>
                      <Download size={16} /> Download File (.ZIP)
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSimulatePayment}
                    disabled={paymentStatus === 'verifying'}
                    className="btn btn-lime btn-cta-pulse"
                    style={{ width: '100%', padding: '14px' }}
                  >
                    {paymentStatus === 'verifying' ? 'Verifying on Nimiq RPC...' : 'Simulate Payment Verification'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
