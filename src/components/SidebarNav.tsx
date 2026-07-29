'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

interface SidebarNavProps {
  handle?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SidebarNav({ handle = 'mayastudio', isOpen = false, onClose }: SidebarNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/dashboard', emoji: '📊' },
    { label: 'Products', href: '/dashboard/products', emoji: '📦' },
    { label: 'Sales History', href: '/dashboard/sales', emoji: '📈' },
    { label: 'Share Kit', href: '/dashboard/share', emoji: '🔗' },
    { label: 'Settings', href: '/dashboard/settings', emoji: '⚙️' },
  ];

  const secondaryItems = [
    { label: 'My Storefront', href: `/${handle}`, emoji: '🏪', external: true },
    { label: 'Explore', href: '/explore', emoji: '🧭' },
  ];

  const bottomItems = [
    { label: 'View as Buyer', href: '/purchases', emoji: '🛒' },
    { label: 'Back to Home', href: '/', emoji: '🏠' },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 998,
          }}
        />
      )}

      {/* Dark Lime Dashboard Sidebar */}
      <aside
        className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          background: 'linear-gradient(180deg, #242C14 0%, #1A200E 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          zIndex: 999,
          color: '#FFFFFF',
          transition: 'transform 300ms var(--ease-premium)',
        }}
      >
        <div>
          {/* Top Header with Brand Logo & Close Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', marginBottom: '20px' }}>
            <Link href="/" onClick={onClose} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', backgroundColor: '#D4E157', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#1A200E', fontFamily: 'var(--font-display)',
                fontSize: '18px', fontWeight: 800, fontStyle: 'italic',
              }}>
                A
              </div>
              <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 600, color: '#FFFFFF' }}>
                Atelier
              </span>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)', border: 'none', padding: '6px', borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <X size={18} color="#FFFFFF" />
              </button>
            )}
          </div>

          {/* Primary Menu (White Color Fonts) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: isActive ? '#D4E157' : '#FFFFFF',
                    backgroundColor: isActive ? 'rgba(212, 225, 87, 0.22)' : 'transparent',
                    borderLeft: isActive ? '3px solid #D4E157' : '3px solid transparent',
                    fontWeight: isActive ? 700 : 600,
                    fontSize: '0.92rem',
                    minHeight: '44px',
                    transition: 'all 200ms ease',
                  }}
                >
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                  <span className="font-display" style={{ fontSize: '0.95rem', color: isActive ? '#D4E157' : '#FFFFFF' }}>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)', margin: '16px 0' }} />

          {/* Secondary Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {secondaryItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  target={item.external ? '_blank' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    minHeight: '44px',
                  }}
                >
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{ color: '#FFFFFF' }}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.12)', margin: '16px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {bottomItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    minHeight: '44px',
                  }}
                >
                  <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{ color: '#FFFFFF' }}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <style jsx global>{`
        @media (max-width: 768px) {
          aside.dashboard-sidebar {
            position: fixed !important;
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 270px !important;
            z-index: 1000 !important;
            transform: translateX(-100%) !important;
            transition: transform 300ms var(--ease-premium) !important;
          }
          aside.dashboard-sidebar.open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
}
