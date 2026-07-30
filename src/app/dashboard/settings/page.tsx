'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useWallet } from '@/context/WalletContext';
import { Save, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { handle: contextHandle } = useWallet();
  const handle = contextHandle || 'mayastudio';
  const [displayName, setDisplayName] = useState('Maya Lin Studio');
  const [bio, setBio] = useState('Minimalist motion designer & photographer crafting UI kits...');
  const [accentColor, setAccentColor] = useState('#D4E157');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }, 600);
  };

  return (
    <DashboardLayout title="Settings" handle={handle}>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '100px', marginBottom: '8px' }}>
          <span className="eyebrow" style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>STOREFRONT SETTINGS</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>Storefront & Profile Settings</h1>
      </div>

      <div style={{ maxWidth: '640px' }}>
        {/* Frosted Glass Settings Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-lg)',
          padding: '28px',
          marginBottom: '28px'
        }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '100px', border: '1px solid var(--border-medium)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Storefront Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-medium)', fontSize: '0.9rem', backgroundColor: '#FFFFFF' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Theme Accent</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['#D4E157', '#4A5D23', '#6B7F3A', '#3B82F6', '#EC4899'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setAccentColor(c)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c,
                      border: accentColor === c ? '3px solid var(--bg-dark)' : '1px solid var(--border-medium)',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-lime" style={{ marginTop: '12px', minHeight: '52px', justifyContent: 'center' }}>
              <Save size={16} /> {isSaving ? 'Saving...' : savedSuccess ? 'Saved!' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Danger Zone Card */}
        <div className="card" style={{ padding: '28px', border: '1px solid #FCA5A5', borderRadius: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <AlertTriangle size={20} color="#DC2626" />
            <h3 style={{ fontSize: '1.15rem', color: '#991B1B' }}>Danger Zone: Delete Storefront</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
            Deleting your storefront will unpublish all active products and tombstone your handle. This action is irreversible.
          </p>
          <button className="btn btn-ghost" style={{ borderColor: '#FCA5A5', color: '#DC2626', minHeight: '48px' }}>
            Delete Storefront & Tombstone Handle
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
