'use client';

import React, { useState } from 'react';
import SidebarNav from './SidebarNav';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  title: string;
  handle?: string;
  children: React.ReactNode;
}

export default function DashboardLayout({ title, handle = 'mayastudio', children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ambient-bg-wash" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Shared Reusable Dark Lime Navigation Drawer */}
      <SidebarNav handle={handle} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container Wrapper */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
        {/* Reusable Mobile Sticky Header (Height 68px, Sticky Top, Centered Title) */}
        <div
          className="dashboard-mobile-header"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
            padding: '0 20px',
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: 'rgba(247, 246, 242, 0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '44px',
            }}
          >
            <Menu size={22} color="var(--text-primary)" />
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Menu</span>
          </button>

          <span
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </span>

          <div style={{ width: '60px' }} />
        </div>

        {/* Page Content Body */}
        <div className="dashboard-content-main" style={{ flex: 1, padding: '24px 32px 120px 32px', overflowY: 'auto', width: '100%' }}>
          {children}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .dashboard-mobile-header {
            display: flex !important;
          }
          .dashboard-content-main {
            padding: 24px 16px 120px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
