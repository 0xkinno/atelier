'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, ExternalLink, ArrowRight } from 'lucide-react';

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [storefronts] = useState([
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
    {
      handle: 'kaitanaka',
      displayName: 'Kai Tanaka',
      bio: 'Electronic music producer releasing Ableton templates, synth patches, and sample packs.',
      category: 'Audio',
      accentColor: '#6B7F3A',
      productCount: 4,
      salesCount: 65,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    },
    {
      handle: 'sarahjenkins',
      displayName: 'Sarah Jenkins',
      bio: 'Full-stack engineer crafting production Next.js boilerplates & API starter kits.',
      category: 'Code',
      accentColor: '#3B82F6',
      productCount: 6,
      salesCount: 112,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      handle: 'marcusvance',
      displayName: 'Marcus Vance',
      bio: 'Author & educator releasing ebooks, prompt engineering libraries, and writing guides.',
      category: 'Education',
      accentColor: '#8B5CF6',
      productCount: 2,
      salesCount: 29,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
  ]);

  const categories = ['All', 'Design', 'Photography', 'Audio', 'Code', 'Education'];

  const filteredStorefronts = storefronts.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ambient-bg-wash" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Navigation Header */}
      <nav style={{ padding: '24px 0', borderBottom: '1px solid var(--border-light)' }}>
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
          <Link href="/create" className="btn btn-olive btn-sm">
            Open Storefront
          </Link>
        </div>
      </nav>

      {/* Header Area with Market Image Gradient Mask */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '40px' }}>
        <div style={{
          height: '240px', width: '100%',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
        }}>
          <img src="/images/explore_header_market.jpg" alt="Creative Market Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="container" style={{ position: 'relative', marginTop: '-120px', textAlign: 'center' }}>
          <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>DIRECTORY</span>
          <h1 className="font-display" style={{ fontSize: '2.8rem', marginBottom: '16px' }}>
            Explore Atelier Storefronts
          </h1>
          <p style={{
            fontSize: '1.05rem', fontWeight: 300, color: 'var(--text-secondary)',
            letterSpacing: '-0.01em', maxWidth: '560px', margin: '0 auto 32px auto'
          }}>
            Discover digital products, design systems, presets, audio samples, and code from independent creators.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '480px', margin: '0 auto 32px auto', position: 'relative' }}>
            <Search size={18} color="var(--text-tertiary)" style={{ position: 'absolute', left: '16px', top: '14px' }} />
            <input
              type="text"
              placeholder="Search creators, presets, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 48px', borderRadius: '100px',
                border: '1px solid var(--border-medium)', fontSize: '0.9rem',
                backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="btn btn-sm"
                style={{
                  backgroundColor: selectedCategory === cat ? 'var(--accent-olive)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.82rem'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Storefront Cards Grid */}
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
          {filteredStorefronts.map((s) => (
            <Link
              key={s.handle}
              href={`/${s.handle}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="card glow-hover"
                style={{
                  padding: '32px', height: '100%', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', borderTop: `4px solid ${s.accentColor}`
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={s.avatarUrl} alt={s.displayName} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>{s.displayName}</h3>
                      <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>@{s.handle}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {s.bio}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                  <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                    {s.productCount} PRODUCTS • {s.salesCount} SALES
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Visit <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
