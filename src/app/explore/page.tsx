'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SidebarNav from '@/components/SidebarNav';
import { Search, ArrowRight, Sparkles, Menu } from 'lucide-react';
import { Profile } from '@/lib/db';

export default function ExplorePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [realProfiles, setRealProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const demoStorefronts = [
    {
      handle: 'mayastudio',
      displayName: 'Maya Lin Studio',
      bio: 'Minimalist motion designer & photographer crafting UI kits and typography masterclasses.',
      category: 'Design',
      accentColor: '#D4E157',
      productCount: 3,
      salesCount: 42,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      handle: 'alexvance',
      displayName: 'Alex Vance',
      bio: 'Landscape & portrait photographer releasing signature RAW Lightroom presets.',
      category: 'Photography',
      accentColor: '#A4B87C',
      productCount: 5,
      salesCount: 88,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  useEffect(() => {
    async function fetchExploreData() {
      try {
        const res = await fetch('/api/explore');
        if (res.ok) {
          const data = await res.json();
          const realOnly = (data.profiles || []).filter(
            (p: Profile) => p.handle !== 'mayastudio' && p.handle !== 'alexvance'
          );
          setRealProfiles(realOnly);
        }
      } catch (err) {
        console.error('Error fetching explore profiles:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchExploreData();
  }, []);

  const categories = ['All', 'Design', 'Photography', 'Audio', 'Code', 'Education'];

  const filteredReal = realProfiles.filter((s) => {
    const matchesSearch = s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.bio || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredDemo = demoStorefronts.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Dashboard Offcanvas Sidebar Drawer */}
      <SidebarNav handle="mayastudio" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Dashboard Mobile Top Navigation Shell (☰ Menu Explore) */}
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
        <span className="font-display" style={{ fontWeight: 700, fontSize: '1.15rem' }}>Explore</span>
        <div style={{ width: '40px' }} />
      </div>

      {/* Desktop Header Nav */}
      <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--border-light)' }} className="explore-desktop-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', backgroundColor: 'var(--bg-dark)', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)',
              fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, fontStyle: 'italic'
            }}>
              A
            </div>
            <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Atelier</span>
          </Link>
          <Link href="/dashboard" className="btn btn-olive btn-sm">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Header Area */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '32px' }}>
        <div style={{
          height: '200px', width: '100%',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}>
          <img src="/images/explore_header_market.jpg" alt="Creative Market Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="container" style={{ position: 'relative', marginTop: '-90px', textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '8px' }}>DIRECTORY</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', marginBottom: '12px' }}>
            Explore Atelier Storefronts
          </h1>
          <p style={{
            fontSize: '0.95rem', fontWeight: 300, color: 'var(--text-secondary)',
            letterSpacing: '-0.01em', maxWidth: '560px', margin: '0 auto 24px auto', lineHeight: 1.5
          }}>
            Discover digital products, design systems, presets, audio samples, and code from independent creators.
          </p>

          {/* Search Bar - 56px height, rounded */}
          <div style={{ maxWidth: '520px', margin: '0 auto 20px auto', position: 'relative' }}>
            <Search size={20} color="var(--text-tertiary)" style={{ position: 'absolute', left: '18px', top: '18px' }} />
            <input
              type="text"
              placeholder="Search creators, presets, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', height: '56px', padding: '12px 20px 12px 52px', borderRadius: '100px',
                border: '1px solid var(--border-medium)', fontSize: '0.95rem',
                backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Category Chips Container: Single horizontal scrollable container */}
          <div className="layout-tabs-scroll" style={{
            display: 'flex', gap: '8px', justifyContent: 'flex-start',
            overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            paddingBottom: '8px', borderBottom: 'none'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn btn-sm"
                style={{
                  backgroundColor: selectedCategory === cat ? 'var(--accent-olive)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.85rem',
                  minHeight: '44px',
                  borderRadius: '100px',
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Storefront Cards Feed (1 card per row on mobile) */}
      <div className="container">
        {/* SECTION 1: REAL STOREFRONTS */}
        {filteredReal.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Sparkles size={20} color="var(--accent-olive)" />
              <h2 style={{ fontSize: '1.4rem' }}>Live Creator Storefronts</h2>
            </div>
            <div className="explore-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {filteredReal.map((s) => (
                <Link key={s.handle} href={`/${s.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card glow-hover" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${s.accentColor || '#D4E157'}`, borderRadius: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                        <img src={s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={s.displayName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{s.displayName}</h3>
                          <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>@{s.handle}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                        {s.bio || 'Digital goods creator on Nimiq Pay.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                        {s.productCount || 0} PRODUCTS • {s.totalSales || 0} SALES
                      </span>
                      <button className="btn btn-lime" style={{ width: '100%', minHeight: '52px', justifyContent: 'center' }}>
                        Visit Storefront <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: DEMO STOREFRONTS */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0 20px 0' }}>
            <span className="eyebrow" style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              DEMO STOREFRONTS
            </span>
            <div style={{ height: '1px', backgroundColor: 'var(--border-medium)', flex: 1 }} />
          </div>

          <div className="explore-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredDemo.map((s) => (
              <Link key={s.handle} href={`/${s.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card glow-hover" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${s.accentColor}`, borderRadius: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                      <img src={s.avatarUrl} alt={s.displayName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{s.displayName}</h3>
                        <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>@{s.handle}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                      {s.bio}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                      {s.productCount} PRODUCTS • {s.salesCount} SALES
                    </span>
                    <button className="btn btn-lime" style={{ width: '100%', minHeight: '52px', justifyContent: 'center' }}>
                      Visit Storefront <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .explore-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .dashboard-mobile-header {
            display: flex !important;
          }
          .explore-desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
