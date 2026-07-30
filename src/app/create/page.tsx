'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Wallet, Check, Sparkles } from 'lucide-react';
import { listAccounts, isNimiqPayAvailable } from '@/lib/nimiq';
import { useWallet } from '@/context/WalletContext';

export default function CreateStorefrontPage() {
  const router = useRouter();
  const { walletAddress: ctxWallet, connectWallet: ctxConnect } = useWallet();
  const [handle, setHandle] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [accentColor, setAccentColor] = useState<string>('#D4E157');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (ctxWallet) {
      setWalletAddress(ctxWallet);
      if (!displayName) {
        setDisplayName(ctxWallet.substring(0, 10) + '...');
      }
    }
  }, [ctxWallet]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError('');
    try {
      await ctxConnect();
      const hasPay = await isNimiqPayAvailable();
      if (hasPay) {
        const accounts = await listAccounts();
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          if (!displayName) setDisplayName(accounts[0].substring(0, 10) + '...');
        }
      } else {
        const addr = ctxWallet || 'NQ40 7PTF 8888 1111 2222 3333 4444 5555 9QRN';
        setWalletAddress(addr);
        if (!displayName) setDisplayName(addr.substring(0, 10) + '...');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanHandle = handle.toLowerCase().trim();
    if (!cleanHandle || !displayName || !walletAddress) {
      setError('Please fill in all required fields and connect your Nimiq wallet.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: cleanHandle,
          displayName: displayName.trim(),
          bio: bio.trim(),
          accentColor,
          walletAddress,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create storefront');
      }

      localStorage.setItem('atelier_handle', cleanHandle);
      localStorage.setItem('atelier_wallet', walletAddress);

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '32px' }}>
          <ArrowLeft size={16} /> Back to Atelier
        </Link>

        <div style={{ marginBottom: '32px' }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>CREATOR ONBOARDING</span>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>Open your Atelier Storefront</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Set up your digital goods store in 60 seconds. Connected directly to your Nimiq Pay wallet.
          </p>
        </div>

        {/* Frosted Glass Form Container */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          padding: '40px'
        }}>
          {error && (
            <div style={{ padding: '14px 18px', backgroundColor: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', borderRadius: '10px', fontSize: '0.88rem', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Wallet Connection Card with Glow Hover */}
            <div className="card glow-hover" style={{ padding: '20px', backgroundColor: walletAddress ? 'rgba(212, 225, 87, 0.12)' : 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={24} color="var(--accent-olive)" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Nimiq Pay Wallet</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="font-mono">
                      {walletAddress ? walletAddress : 'Not connected'}
                    </div>
                  </div>
                </div>
                {walletAddress ? (
                  <span style={{ color: 'var(--accent-olive)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Check size={16} /> Connected
                  </span>
                ) : (
                  <button type="button" onClick={handleConnectWallet} disabled={isConnecting} className="btn btn-olive btn-sm">
                    {isConnecting ? 'Connecting...' : 'Connect'}
                  </button>
                )}
              </div>
            </div>

            {/* Handle Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Storefront Handle (URL) <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <span className="font-mono" style={{ position: 'absolute', left: '14px', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                  atelier.app/
                </span>
                <input
                  type="text"
                  placeholder="mayastudio"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  required
                  style={{
                    width: '100%', padding: '12px 14px 12px 110px', borderRadius: '10px',
                    border: '1px solid var(--border-medium)', fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem', backgroundColor: '#FFFFFF'
                  }}
                />
              </div>
            </div>

            {/* Display Name Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Display Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Maya Lin Studio"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '10px',
                  border: '1px solid var(--border-medium)', fontSize: '0.9rem', backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            {/* Bio Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Creator Bio
              </label>
              <textarea
                rows={3}
                placeholder="Minimalist motion designer & photographer crafting UI kits..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: '10px',
                  border: '1px solid var(--border-medium)', fontSize: '0.9rem', backgroundColor: '#FFFFFF'
                }}
              />
            </div>

            {/* Accent Color Picker */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                Storefront Theme Accent
              </label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {['#D4E157', '#4A5D23', '#6B7F3A', '#3B82F6', '#EC4899', '#8B5CF6'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setAccentColor(color)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%', backgroundColor: color,
                      border: accentColor === color ? '3px solid var(--bg-dark)' : '1px solid var(--border-medium)',
                      cursor: 'pointer', transform: accentColor === color ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 150ms'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button with CTA Pulse */}
            <button
              type="submit"
              disabled={isSubmitting || !walletAddress}
              className="btn btn-lime btn-cta-pulse"
              style={{ padding: '16px', fontSize: '1rem', marginTop: '12px', width: '100%' }}
            >
              <Sparkles size={18} />
              {isSubmitting ? 'Creating Storefront...' : 'Launch Atelier Storefront'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
