'use client';

import { useState } from 'react';
import SidebarNav from '@/components/SidebarNav';
import { Save, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [handle, setHandle] = useState('mayastudio');
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
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav handle={handle} />

      <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'var(--bg-secondary)', padding: '6px 14px', borderRadius: '100px', marginBottom: '10px' }}>
            <span className="eyebrow" style={{ color: 'var(--text-secondary)' }}>STOREFRONT SETTINGS</span>
          </div>
          <h1 style={{ fontSize: '2.2rem' }}>Storefront & Profile Settings</h1>
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
            padding: '36px',
            marginBottom: '32px'
          }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '100px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>Storefront Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-medium)', fontSize: '0.9rem' }}
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
                        width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c,
                        border: accentColor === c ? '3px solid var(--bg-dark)' : '1px solid var(--border-medium)',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-lime" style={{ marginTop: '12px' }}>
                <Save size={16} /> {isSaving ? 'Saving...' : savedSuccess ? 'Saved!' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Danger Zone Card with Red Hover Accent */}
          <div className="card" style={{ padding: '32px', border: '1px solid #FCA5A5', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <AlertTriangle size={20} color="#DC2626" />
              <h3 style={{ fontSize: '1.15rem', color: '#991B1B' }}>Danger Zone: Delete Storefront</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Deleting your storefront will unpublish all active products and tombstone your handle. This action is irreversible.
            </p>
            <button className="btn btn-ghost" style={{ borderColor: '#FCA5A5', color: '#DC2626' }}>
              Delete Storefront & Tombstone Handle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
