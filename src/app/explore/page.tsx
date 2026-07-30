'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { Profile } from '@/lib/db';

export default function ExplorePage() {
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
    <DashboardLayout title="Explore" handle="mayastudio">
      {/* Header Area */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '28px' }}>
        <div style={{
          height: '160px', width: '100%', borderRadius: '16px', overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}>
          <img src="/images/explore_header_market.jpg" alt="Creative Market Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ position: 'relative', marginTop: '-70px', textAlign: 'center', padding: '0 12px' }}>
          <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '6px' }}>DIRECTORY</span>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: '8px' }}>
            Explore Atelier Storefronts
          </h1>
          <p style={{
            fontSize: '0.9rem', color: 'var(--text-secondary)',
            maxWidth: '540px', margin: '0 auto 20px auto', lineHeight: 1.5
          }}>
            Discover digital products, design systems, presets, audio samples, and code from independent creators.
          </p>

          {/* Search Bar - 52px height, rounded */}
          <div style={{ maxWidth: '500px', margin: '0 auto 16px auto', position: 'relative' }}>
            <Search size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '16px', top: '16px' }} />
            <input
              type="text"
              placeholder="Search creators, presets, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', height: '52px', padding: '10px 16px 10px 48px', borderRadius: '100px',
                border: '1px solid var(--border-medium)', fontSize: '0.9rem',
                backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Category Chips Container */}
          <div className="layout-tabs-scroll" style={{
            display: 'flex', gap: '8px', justifyContent: 'flex-start',
            overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            paddingBottom: '6px', borderBottom: 'none'
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
                  fontSize: '0.82rem',
                  minHeight: '40px',
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

      {/* Storefront Cards Feed */}
      <div>
        {/* SECTION 1: REAL STOREFRONTS */}
        {filteredReal.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={18} color="var(--accent-olive)" />
              <h2 style={{ fontSize: '1.3rem' }}>Live Creator Storefronts</h2>
            </div>
            <div className="explore-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {filteredReal.map((s) => (
                <Link key={s.handle} href={`/${s.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card glow-hover" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${s.accentColor || '#D4E157'}`, borderRadius: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                        <img src={s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={s.displayName} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>{s.displayName}</h3>
                          <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>@{s.handle}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                        {s.bio || 'Digital goods creator on Nimiq Pay.'}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                        {s.productCount || 0} PRODUCTS • {s.totalSales || 0} SALES
                      </span>
                      <button className="btn btn-lime" style={{ width: '100%', minHeight: '48px', justifyContent: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 16px 0' }}>
            <span className="eyebrow" style={{ color: 'var(--text-tertiary)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
              DEMO STOREFRONTS
            </span>
            <div style={{ height: '1px', backgroundColor: 'var(--border-medium)', flex: 1 }} />
          </div>

          <div className="explore-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredDemo.map((s) => (
              <Link key={s.handle} href={`/${s.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card glow-hover" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${s.accentColor}`, borderRadius: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                      <img src={s.avatarUrl} alt={s.displayName} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h3 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>{s.displayName}</h3>
                        <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>@{s.handle}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {s.bio}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '14px', borderTop: '1px solid var(--border-light)' }}>
                    <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                      {s.productCount} PRODUCTS • {s.salesCount} SALES
                    </span>
                    <button className="btn btn-lime" style={{ width: '100%', minHeight: '48px', justifyContent: 'center' }}>
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
        }
      `}</style>
    </DashboardLayout>
  );
}
