'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, Zap, Check, LayoutDashboard, Menu, X
} from 'lucide-react';

export default function LandingPage() {
  const [monthlySales, setMonthlySales] = useState<number>(3000);
  const gumroadLoss = Math.round(monthlySales * 0.10);
  const atelierKeeps = monthlySales;
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', overflowX: 'hidden' }}>
      {/* 1. NAVIGATION BAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(247, 246, 242, 0.95)' : 'rgba(247, 246, 242, 0.85)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: isScrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all 300ms var(--ease-premium)',
      }}>
        <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo - Single Line No Wrap */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
            <div style={{
              width: '32px', height: '32px', backgroundColor: 'var(--bg-dark)', borderRadius: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent-primary)', fontFamily: 'var(--font-display)',
              fontSize: '18px', fontWeight: 700, fontStyle: 'italic',
            }}>
              A
            </div>
            <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Atelier
            </span>
          </Link>

          {/* Desktop Nav Links (Hidden below 1024px) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="nav-links-desktop">
            <a href="#how-it-works" className="link-animated" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              HOW IT WORKS
            </a>
            <a href="#calculator" className="link-animated" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              REVENUE
            </a>
            <a href="#comparison" className="link-animated" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              COMPARE
            </a>
            <Link href="/explore" className="link-animated" style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              EXPLORE
            </Link>
            <Link href="/dashboard" className="link-animated" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-olive)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              DASHBOARD
            </Link>
          </div>

          {/* Action Buttons & Mobile Hamburger */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href="/create" className="btn btn-olive btn-sm">
              Connect Nimiq
            </Link>

            {/* Mobile Hamburger Trigger Button (Visible below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-hamburger-btn"
              style={{
                background: 'none', border: 'none', padding: '8px', cursor: 'pointer',
                display: 'none', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={24} color="var(--text-primary)" /> : <Menu size={24} color="var(--text-primary)" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer Menu */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-light)',
            padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', padding: '8px 0' }}>
              HOW IT WORKS
            </a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', padding: '8px 0' }}>
              REVENUE
            </a>
            <a href="#comparison" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', padding: '8px 0' }}>
              COMPARE
            </a>
            <Link href="/explore" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', padding: '8px 0' }}>
              EXPLORE
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--accent-olive)', fontWeight: 700, fontSize: '1rem', padding: '8px 0' }}>
              OPEN DASHBOARD 📊
            </Link>
          </div>
        )}
      </nav>

      {/* Floating Mobile Dashboard CTA Button */}
      <div className="floating-dashboard-btn">
        <Link href="/dashboard" className="btn btn-lime btn-cta-pulse" style={{ padding: '14px 24px', boxShadow: 'var(--shadow-lg)', borderRadius: '100px' }}>
          <LayoutDashboard size={18} /> Open Dashboard
        </Link>
      </div>

      {/* 2. HERO SECTION */}
      <section style={{ paddingTop: '150px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container">
          <div className="grid-hero">
            <div>
              <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span style={{ width: '20px', height: '1px', backgroundColor: 'var(--text-tertiary)' }} />
                A NIMIQ PAY MINI APP
              </div>
              <h1 style={{ marginBottom: '24px' }}>
                Your digital storefront. One link.{' '}
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, var(--accent-olive), #6B7F3A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Instant NIM.
                </em>
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '520px', marginBottom: '36px', fontWeight: 300 }}>
                Sell presets, templates, art, guides, music, and code directly from your wallet. Zero platform fees. Payments settle in seconds, not days.
              </p>

              <div className="hero-actions" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link href="/create" className="btn btn-olive" style={{ padding: '16px 32px', fontSize: '0.95rem' }}>
                  Open your Atelier <ArrowRight size={18} />
                </Link>
                <a href="#how-it-works" className="btn btn-ghost" style={{ padding: '15px 28px', fontSize: '0.95rem' }}>
                  See how it works
                </a>
              </div>
            </div>

            <div style={{ position: 'relative', width: '100%' }}>
              <div style={{
                position: 'relative', borderRadius: '20px', overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)',
                maxHeight: '480px', width: '100%'
              }} className="img-hover">
                <img
                  src="/images/hero_creator_portrait.jpg"
                  alt="Creative Entrepreneur"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <div className="animate-float glow-hover" style={{
                position: 'absolute', top: '-20px', right: '-20px',
                backgroundColor: 'var(--bg-card)', borderRadius: '16px', padding: '20px',
                boxShadow: 'var(--shadow-float)', border: '1px solid var(--border-medium)', width: '220px',
                zIndex: 10
              }}>
                <span className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '6px', display: 'block' }}>TOTAL EARNINGS</span>
                <div className="font-display" style={{ fontSize: '1.8rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                  18,500 <small style={{ fontSize: '0.85rem' }}>NIM</small>
                </div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  100% non-custodial
                </div>
              </div>

              <div className="animate-float-slow glow-hover" style={{
                position: 'absolute', bottom: '30px', left: '-30px',
                backgroundColor: 'var(--bg-dark)', color: 'var(--text-on-dark)',
                borderRadius: '16px', padding: '18px 22px',
                boxShadow: 'var(--shadow-float)', width: '210px', zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <ShieldCheck size={20} color="var(--accent-primary)" />
                  <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>On-Chain Verified</span>
                </div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-on-dark-sub)' }}>
                  tx: 0x8f93...4a21
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRICS STRIP */}
      <section className="metrics" style={{ backgroundColor: 'var(--bg-dark)', padding: '50px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="grid-metrics">
            <div>
              <div className="font-display" style={{ fontSize: '2.4rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '4px' }}>0%</div>
              <div className="eyebrow" style={{ color: 'var(--text-on-dark-sub)' }}>PLATFORM FEES</div>
            </div>
            <div>
              <div className="font-display" style={{ fontSize: '2.4rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '4px' }}>Sub-3s</div>
              <div className="eyebrow" style={{ color: 'var(--text-on-dark-sub)' }}>SETTLEMENT SPEED</div>
            </div>
            <div>
              <div className="font-display" style={{ fontSize: '2.4rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '4px' }}>NIM + USDT</div>
              <div className="eyebrow" style={{ color: 'var(--text-on-dark-sub)' }}>DUAL-CHAIN PAYMENTS</div>
            </div>
            <div>
              <div className="font-display" style={{ fontSize: '2.4rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '4px' }}>Wallet = Login</div>
              <div className="eyebrow" style={{ color: 'var(--text-on-dark-sub)' }}>NO SIGNUP REQUIRED</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '90px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{
            marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', height: '180px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }} className="reveal-on-scroll">
            <img src="/images/workspace_flatlay.jpg" alt="Creative Workspace Flatlay" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }} className="reveal-on-scroll">
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>HOW IT WORKS</span>
            <h2>From connect to first sale in under sixty seconds</h2>
          </div>

          <div className="grid-steps">
            <div className="card glow-hover reveal-on-scroll" style={{ padding: '28px 20px', transitionDelay: '0ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-moss)', fontWeight: 600 }}>01</span>
                <span className="step-icon" style={{ backgroundColor: '#FFF3D0' }}>🔐</span>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Connect Wallet</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Open Atelier in Nimiq Pay. Connect your wallet with one tap. Zero email or password forms.
              </p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '28px 20px', transitionDelay: '80ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-moss)', fontWeight: 600 }}>02</span>
                <span className="step-icon" style={{ backgroundColor: '#E8F4E8' }}>🎨</span>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Build Storefront</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Set your handle, creator bio, avatar, and custom accent theme color in seconds.
              </p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '28px 20px', transitionDelay: '160ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-moss)', fontWeight: 600 }}>03</span>
                <span className="step-icon" style={{ backgroundColor: '#E8ECF4' }}>📦</span>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Upload Your Work</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Add presets, templates, audio or guides with preview imagery and set your USD price.
              </p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '28px 20px', transitionDelay: '240ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--accent-moss)', fontWeight: 600 }}>04</span>
                <span className="step-icon" style={{ backgroundColor: '#F4E8F0' }}>⚡</span>
              </div>
              <h3 style={{ marginBottom: '10px' }}>Get Paid Instantly</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Share your atelier link. Buyers pay in NIM or USDT, verified on-chain, instant file unlock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CREATOR STOREFRONT PREVIEW */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-two-col">
            <div className="reveal-on-scroll">
              <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>EXCEPTIONAL DESIGN</span>
              <h2 style={{ marginBottom: '20px' }}>
                A storefront that makes your work look as good as it is
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
                Every Atelier storefront features magazine-quality typography, responsive card layouts, dynamic theme accents, and frictionless crypto checkout.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Check size={16} color="var(--accent-olive)" /> Wallet-signature auth
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Check size={16} color="var(--accent-olive)" /> On-chain verification
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Check size={16} color="var(--accent-olive)" /> Cryptographic receipts
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Check size={16} color="var(--accent-olive)" /> Live fiat conversion
                </div>
              </div>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-medium)', width: '100%' }}>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                <div className="font-mono" style={{ margin: '0 auto', fontSize: '0.75rem', color: 'var(--text-tertiary)', backgroundColor: '#FFFFFF', padding: '2px 16px', borderRadius: '100px' }}>
                  atelier.app/mayastudio
                </div>
              </div>

              <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  <img src="/images/creator_working.jpg" alt="Maya Lin" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Maya Lin</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }} className="font-mono">3 PRODUCTS • 42 SALES</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div className="card" style={{ padding: '10px' }}>
                    <div style={{ height: '80px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', marginBottom: '8px', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" alt="Preset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Minimalist Motion UI</div>
                    <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-olive)' }}>$29.00</div>
                  </div>
                  <div className="card" style={{ padding: '10px' }}>
                    <div style={{ height: '80px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', marginBottom: '8px', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80" alt="Preset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Typography Masterclass</div>
                    <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-olive)' }}>$49.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CATEGORIES GRID */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }} className="reveal-on-scroll">
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>EVERY DIGITAL FORM</span>
            <h2>If it's digital and it's yours, it belongs on Atelier</h2>
          </div>

          <div className="grid-categories">
            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '0ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#FFF0E0', marginBottom: '14px' }}>🎨</span>
              <h3 style={{ marginBottom: '6px' }}>Design</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>UI kits, Figma components, icon packs, and vector assets.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '80ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#E8F0E8', marginBottom: '14px' }}>📷</span>
              <h3 style={{ marginBottom: '6px' }}>Photography</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Lightroom presets, DNG profile packs, and RAW stock imagery.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '160ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#F0E8F4', marginBottom: '14px' }}>🎵</span>
              <h3 style={{ marginBottom: '6px' }}>Audio</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Sample packs, Ableton templates, synth patches, and stems.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '240ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#E8ECF4', marginBottom: '14px' }}>💻</span>
              <h3 style={{ marginBottom: '6px' }}>Code</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Next.js boilerplates, API scripts, and CLI tools.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '320ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#FFF8E0', marginBottom: '14px' }}>📚</span>
              <h3 style={{ marginBottom: '6px' }}>Education</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Ebooks, video courses, tutorial series, and guides.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '400ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#FFE8E8', marginBottom: '14px' }}>🎬</span>
              <h3 style={{ marginBottom: '6px' }}>Video</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>LUTs, Premiere motion templates, and DaVinci grade nodes.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '480ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#E8F4F0', marginBottom: '14px' }}>✏️</span>
              <h3 style={{ marginBottom: '6px' }}>Writing</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Newsletters, prompt packs, essay collections, and fiction.</p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px 20px', transitionDelay: '560ms' }}>
              <span className="category-icon" style={{ backgroundColor: '#F4F0E8', marginBottom: '14px' }}>🎭</span>
              <h3 style={{ marginBottom: '6px' }}>Digital Art</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>3D render models, Procreate brushes, and generative art.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVENUE CALCULATOR */}
      <section id="calculator" style={{ padding: '90px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-two-col">
            <div className="reveal-on-scroll">
              <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>NO COMMISSION</span>
              <h2 style={{ marginBottom: '16px' }}>
                One transparent fee. None.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                Traditional marketplaces take 10% to 30% of your earnings. Atelier operates wallet-to-wallet on Nimiq Pay. Keep 100% of every sale you make.
              </p>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '32px 24px', backgroundColor: 'var(--bg-accent-card)', borderRadius: '20px', border: 'none', boxShadow: 'var(--shadow-xl)', width: '100%' }}>
              <span className="eyebrow" style={{ color: 'var(--text-on-accent)', opacity: 0.8, marginBottom: '14px', display: 'block' }}>
                INTERACTIVE EARNINGS COMPARISON
              </span>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: '10px', color: 'var(--text-on-accent)', fontSize: '0.9rem' }}>
                  <span>Monthly Sales</span>
                  <span className="font-mono" style={{ fontSize: '1.1rem' }}>${monthlySales.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--bg-dark)', cursor: 'pointer', minHeight: '44px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', borderTop: '1px solid rgba(44,51,25,0.15)', paddingTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-on-accent)', opacity: 0.8 }}>Gumroad Fee</div>
                  <div className="font-display" style={{ fontSize: '1.5rem', color: '#B91C1C', fontWeight: 600 }}>
                    -${gumroadLoss.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-on-accent)', opacity: 0.8 }}>Atelier Keep</div>
                  <div className="font-display" style={{ fontSize: '1.5rem', color: 'var(--bg-dark)', fontWeight: 700 }}>
                    ${atelierKeeps.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPARISON TABLE */}
      <section id="comparison" style={{ padding: '90px 0', backgroundColor: 'var(--bg-dark)', color: 'var(--text-on-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }} className="reveal-on-scroll">
            <span className="eyebrow" style={{ color: 'var(--text-on-dark-sub)', display: 'inline-block', marginBottom: '12px' }}>BENCHMARK</span>
            <h2 style={{ color: 'var(--text-on-dark)' }}>Keep what you earn</h2>
          </div>

          <div className="layout-table-wrapper">
            <div className="card reveal-on-scroll" style={{ backgroundColor: 'var(--bg-dark-card)', border: '1px solid rgba(255,255,255,0.08)', padding: 0, minWidth: '480px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <th style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>FEATURE</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>GUMROAD</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>PAYHIP</th>
                    <th style={{ padding: '16px 18px', color: 'var(--accent-primary)', fontWeight: 700 }}>ATELIER</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 18px', fontWeight: 600 }}>Platform Fee</td>
                    <td style={{ padding: '16px 18px', color: '#EF4444' }}>10% flat</td>
                    <td style={{ padding: '16px 18px', color: '#EF4444' }}>5% per sale</td>
                    <td style={{ padding: '16px 18px', color: 'var(--accent-primary)', fontWeight: 700 }}>0% Zero fees</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 18px', fontWeight: 600 }}>Payout Speed</td>
                    <td style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>Weekly</td>
                    <td style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>Instant (Stripe)</td>
                    <td style={{ padding: '16px 18px', color: 'var(--accent-primary)', fontWeight: 700 }}>Instant (&lt; 3s)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 18px', fontWeight: 600 }}>Account Signup</td>
                    <td style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>KYC Required</td>
                    <td style={{ padding: '16px 18px', color: 'var(--text-on-dark-sub)' }}>Email + Pass</td>
                    <td style={{ padding: '16px 18px', color: 'var(--accent-primary)', fontWeight: 700 }}>Wallet = Login</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HOW PAYMENTS WORK */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="grid-two-col">
            <div className="reveal-on-scroll" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', backgroundColor: '#F0EFE9', width: '100%' }}>
              <img
                src="/images/creator_working.jpg"
                alt="Creator working on tablet"
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                className="img-hover"
              />
            </div>
            <div className="reveal-on-scroll">
              <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>ON-CHAIN INFRASTRUCTURE</span>
              <h2 style={{ marginBottom: '20px' }}>Cryptographic verification with zero middleman</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
                Payments travel directly from buyer wallet to creator wallet. Our server validates the transaction on the Nimiq RPC node before issuing a signed download key.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <div className="card glow-hover" style={{ padding: '16px' }}>
                  <ShieldCheck size={18} color="var(--accent-olive)" style={{ marginBottom: '6px' }} />
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Non-Custodial</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Direct wallet settlement.</div>
                </div>
                <div className="card glow-hover" style={{ padding: '16px' }}>
                  <Zap size={18} color="var(--accent-olive)" style={{ marginBottom: '6px' }} />
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Instant Finality</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Under 3s RPC check.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. SOCIAL PROOF */}
      <section style={{ padding: '90px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }} className="reveal-on-scroll">
            <span className="eyebrow" style={{ display: 'inline-block', marginBottom: '12px' }}>COMMUNITY</span>
            <h2>Creators already selling on Atelier</h2>
          </div>

          <div className="reveal-on-scroll" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', marginBottom: '40px', width: '100%' }}>
            <img
              src="/images/creator_showcase.jpg"
              alt="Creators in studio"
              style={{ width: '100%', height: '360px', maxHeight: '360px', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
              className="img-hover"
            />
          </div>

          <div className="grid-three-col">
            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px', transitionDelay: '0ms', borderTop: '4px solid #D4E157' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Maya Lin" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Maya Lin</div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>@mayastudio</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                "Switching from Gumroad to Atelier saved me over $400 in fees in my first month alone."
              </p>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                18,500 NIM EARNED
              </div>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px', transitionDelay: '100ms', borderTop: '4px solid #D4E157' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Alex Vance" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Alex Vance</div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>@alexvance</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                "My Lightroom preset buyers love paying instantly inside Nimiq Pay. No account creation needed."
              </p>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                42,000 NIM EARNED
              </div>
            </div>

            <div className="card glow-hover reveal-on-scroll" style={{ padding: '24px', transitionDelay: '200ms', borderTop: '4px solid #D4E157' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Elena Rostova" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Elena Rostova</div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>@elenadesign</div>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                "The UI design of Atelier matches Apple standard. It elevates my brand immediately."
              </p>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-olive)', fontWeight: 600 }}>
                24,100 NIM EARNED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CTA SECTION */}
      <section style={{ padding: '100px 0', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container reveal-on-scroll" style={{ maxWidth: '720px' }}>
          <h2 style={{ marginBottom: '20px' }}>
            Your work deserves a storefront without a middleman
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Join creators selling presets, templates, and code with 0% platform fees on Nimiq Pay.
          </p>
          <Link href="/create" className="btn btn-lime" style={{ padding: '16px 36px', fontSize: '0.95rem' }}>
            Open your Atelier
          </Link>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-on-dark)', padding: '60px 0 100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '32px', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '28px', height: '28px', backgroundColor: '#D4E157', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C3319', fontWeight: 700, fontStyle: 'italic' }}>
                A
              </div>
              <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600 }}>Atelier</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem', color: 'var(--text-on-dark-sub)', flexWrap: 'wrap' }}>
              <a href="https://nimiq.com" target="_blank" rel="noreferrer" className="link-animated" style={{ color: 'inherit' }}>Nimiq Pay</a>
              <a href="https://github.com/0xkinno/atelier" target="_blank" rel="noreferrer" className="link-animated" style={{ color: 'inherit' }}>GitHub</a>
              <Link href="/explore" className="link-animated" style={{ color: 'inherit' }}>Explore</Link>
              <Link href="/create" className="link-animated" style={{ color: 'inherit' }}>Create Storefront</Link>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-on-dark-sub)', flexWrap: 'wrap', gap: '12px' }} className="font-mono">
            <div>Built for Nimiq Pay Mini App Ecosystem • MIT License</div>
            <div>Atelier v1.0.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
