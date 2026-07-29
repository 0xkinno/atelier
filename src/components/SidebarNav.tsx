'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarNav({ handle = 'mayastudio' }: { handle?: string }) {
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
    <aside
      className="dashboard-sidebar"
      style={{
        width: '260px',
        minWidth: '260px',
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: 'linear-gradient(180deg, #FAFDF0 0%, #F7F6F2 100%)',
        borderRight: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        zIndex: 90,
      }}
    >
      <div>
        {/* Top Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '0 12px 24px 12px', borderBottom: '1px solid var(--border-light)', marginBottom: '20px' }}>
          <div style={{
            width: '32px', height: '32px', backgroundColor: 'var(--bg-dark)', borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent-primary)', fontFamily: 'var(--font-display)',
            fontSize: '18px', fontWeight: 700, fontStyle: 'italic',
          }}>
            A
          </div>
          <span className="font-display" style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Atelier
          </span>
        </Link>

        {/* Primary Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="glow-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-olive)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'rgba(212, 225, 87, 0.2)' : 'transparent',
                  borderLeft: isActive ? '3px solid #D4E157' : '3px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                <span className="font-display" style={{ fontSize: '0.95rem' }}>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '16px 0' }} />

        {/* Secondary Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {secondaryItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                className="glow-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ height: '1px', backgroundColor: 'var(--border-light)', margin: '16px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {bottomItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="glow-hover"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                }}
              >
                <span style={{ fontSize: '20px', lineHeight: 1 }}>{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
