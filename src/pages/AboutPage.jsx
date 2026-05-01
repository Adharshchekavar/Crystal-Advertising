import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ClientsSection from '../components/ClientsSection';
import SEO from '../components/SEO';
import '../styles/AboutPage.css';

import heroImg from '../assets/recent-works/img31.jpeg';
import visionImg from '../assets/design/vision.png';
import missionImg from '../assets/design/mission.png';

// ── Animated Counter ──
function AnimatedCounter({ from = 0, to, duration = 2, suffix = '', className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px' });

    useEffect(() => {
        if (inView) {
            const ctrl = animate(from, to, {
                duration,
                ease: [0.16, 1, 0.3, 1],
                onUpdate(v) {
                    if (ref.current) ref.current.textContent = Math.round(v) + suffix;
                },
            });
            return () => ctrl.stop();
        }
    }, [from, to, inView, duration, suffix]);

    return <span ref={ref} className={className}>{from}{suffix}</span>;
}

// ── Scroll-reveal hook ──
function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.ab-fade, .ab-fade-left, .ab-fade-right');
        const io = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('ab-in'); }),
            { threshold: 0.12 }
        );
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);
}

// ── Data ──
const BRAND_DATA_ACRONYM = [
    { letter: 'B', word: 'BLUEPRINT', color: '#d33b35' },
    { letter: 'R', word: 'RELATIONSHIP', color: '#eeb248' },
    { letter: 'A', word: 'AGREEMENT', color: '#8bc055' },
    { letter: 'N', word: 'NATURE', color: '#7ac9e8' },
    { letter: 'D', word: 'DISTINCTIVE', color: '#604c99' },
];

const whyUsItems = [
    {
        id: 1, number: '01',
        title: '30 Years of Unbeatable Track Record',
        desc: 'Since our inception, we have grown into a leading force in the UAE branding industry. We have worked with businesses from diverse industries and today, we can proudly say that we have served 500+ clients.',
        stat: '500+', statLabel: 'Clients Served',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="24" r="18" strokeDasharray="4 2" />
                <circle cx="24" cy="24" r="10" strokeWidth="2" />
                <path d="M24 14v10l7 4" />
            </svg>
        ),
    },
    {
        id: 2, number: '02',
        title: 'In-house Production Capability',
        desc: 'Our expansive workshop equipped with latest technology machines ensures that we deliver high quality and reliable products as per the exact specifications to our clients on time.',
        stat: '44K', statLabel: 'sq.ft Workshop',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="20" width="36" height="22" rx="2" />
                <path d="M6 26h36" strokeWidth="2" />
                <path d="M16 20V14a8 8 0 0116 0v6" />
                <rect x="20" y="30" width="8" height="6" rx="1" strokeWidth="2" />
            </svg>
        ),
    },
    {
        id: 3, number: '03',
        title: 'Eco-friendly UV Printing',
        desc: 'Our flat bed UV printing machine is our small initiative in offering greener services without compromising on the quality of the products.',
        stat: '100%', statLabel: 'UV Eco Process',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 6C14 6 8 16 10 26c8-4 18-2 22 8 6-12 2-28-8-28z" />
                <path d="M10 26c-2 8 4 16 14 16" />
                <path d="M24 42V30" strokeDasharray="2 3" />
            </svg>
        ),
    },
    {
        id: 4, number: '04',
        title: 'End-to-End Solutions',
        desc: 'Concept, design, production, and installation managed under one roof, giving you a single point of accountability and complete peace of mind.',
        stat: '1', statLabel: 'Point of Contact',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 24h8l6-12 8 24 6-16 4 4h8" />
            </svg>
        ),
    },
];

// ──────────────────────────────────────────────
// WHY CHOOSE US
// ──────────────────────────────────────────────
function WhyChooseUs() {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);
    const timerRef = useRef(null);

    const goTo = (idx) => {
        if (animating || idx === active) return;
        setAnimating(true);
        setTimeout(() => { setActive(idx); setAnimating(false); }, 350);
    };

    const navigate = (dir) => {
        const next = active + dir;
        if (next >= 0 && next < whyUsItems.length) goTo(next);
    };

    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setActive(prev => prev < whyUsItems.length - 1 ? prev + 1 : 0);
        }, 4500);
    };

    useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

    const item = whyUsItems[active];

    return (
        <section className="wcu-section">
            <div className="wcu-grid-bg" aria-hidden="true">
                {Array.from({ length: 80 }).map((_, i) => <div key={i} className="wcu-grid-cell" />)}
            </div>
            <div className="wcu-slash" aria-hidden="true" />

            <div className="wcu-inner">
                {/* Left */}
                <div className="wcu-left-col">
                    <div className="wcu-eyebrow">
                        <span className="wcu-eyebrow-line" />
                        Crystal Advertising
                    </div>
                    <h2 className="wcu-heading">
                        Why<br /><em>Choose</em><br />Us?
                    </h2>
                    <div className="wcu-nav-dots">
                        {whyUsItems.map((_, i) => (
                            <button
                                key={i}
                                className={`wcu-nav-dot${i === active ? ' active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                    <div className="wcu-nav-arrows">
                        <button className="wcu-arrow-btn" onClick={() => navigate(-1)} disabled={active === 0} aria-label="Previous">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M15 18l-6-6 6-6" strokeLinecap="round" />
                            </svg>
                        </button>
                        <span className="wcu-count">
                            <strong>{String(active + 1).padStart(2, '0')}</strong>
                            {' / '}{String(whyUsItems.length).padStart(2, '0')}
                        </span>
                        <button className="wcu-arrow-btn" onClick={() => navigate(1)} disabled={active === whyUsItems.length - 1} aria-label="Next">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18l6-6-6-6" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Right */}
                <div className="wcu-right-col">
                    <div
                        className={`wcu-card${animating ? ' wcu-card--out' : ''}`}
                        onMouseEnter={() => clearInterval(timerRef.current)}
                        onMouseLeave={startTimer}
                    >
                        <div className="wcu-card-number">{item.number}</div>
                        <div className="wcu-card-icon">{item.icon}</div>
                        <div className="wcu-stat-badge">
                            <span className="wcu-stat-value">{item.stat}</span>
                            <span className="wcu-stat-label">{item.statLabel}</span>
                        </div>
                        <div className="wcu-card-content">
                            <h3 className="wcu-card-title">{item.title}</h3>
                            <p className="wcu-card-desc">{item.desc}</p>
                        </div>
                        <div className="wcu-card-bar" />
                    </div>

                    <div className="wcu-thumb-strip">
                        {whyUsItems.map((it, i) => (
                            <button
                                key={it.id}
                                className={`wcu-thumb${i === active ? ' active' : ''}`}
                                onClick={() => goTo(i)}
                            >
                                <span className="wcu-thumb-num">{it.number}</span>
                                <span className="wcu-thumb-title">{it.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ──────────────────────────────────────────────
// ABOUT PAGE
// ──────────────────────────────────────────────
export default function AboutPage() {
    useScrollReveal();

    return (
        <div className="about-page">
            <SEO
                title="About Us — Crystal Advertising | 30 Years of UAE Branding Excellence"
                description="Learn about Crystal Advertising LLC — established in 1994 in Ras Al Khaimah, UAE. 50+ professionals, 44,000 sq.ft workshop, 500+ clients, and 30+ years of signage & branding expertise."
                path="/about"
                breadcrumbs={[{ name: 'About Us', url: '/about' }]}
            />
            <Navbar />

            {/* ── HERO ── */}
            <section className="ab-hero">
                <div className="ab-hero-img-wrap">
                    <img src={heroImg} alt="Crystal Advertising" className="ab-hero-img" />
                </div>

                <div className="ab-hero-content">
                    {/* Breadcrumb */}
                    <div className="ab-hero-item ab-breadcrumb" style={{ animationDelay: '0s' }}>
                        <a href="/" className="ab-bc-link">Home</a>
                        <span className="ab-bc-sep">/</span>
                        <span className="ab-bc-current">About Us</span>
                    </div>

                    <p className="ab-hero-eyebrow ab-hero-item" style={{ animationDelay: '0.1s' }}>
                        Crystal Advertising — Est. 1994
                    </p>

                    <h1 className="ab-hero-title ab-hero-item" style={{ animationDelay: '0.2s' }}>
                        We Don't Just<br />
                        Make <span>Signs.</span>
                    </h1>

                    <p className="ab-hero-sub ab-hero-item" style={{ animationDelay: '0.35s' }}>
                        For over 30 years, Crystal Advertising has been the trusted partner
                        for brands across the UAE — crafting high-impact signage and branding
                        solutions from concept to completion.
                    </p>
                </div>
            </section>

            {/* ── STATS BAR ── */}
            <div className="ab-stats-bar">
                <div className="ab-stats-inner">
                    {[
                        { to: 30, suffix: '+', label: 'Years in UAE' },
                        { to: 500, suffix: '+', label: 'Projects Delivered', dur: 2.5 },
                        { to: 200, suffix: '+', label: 'Happy Clients', dur: 2.2 },
                        { to: 50, suffix: '+', label: 'In-House Team' },
                    ].map(({ to, suffix, label, dur }) => (
                        <div className="ab-stat" key={label}>
                            <AnimatedCounter from={0} to={to} suffix={suffix} duration={dur || 2} className="ab-stat-num" />
                            <span className="ab-stat-label">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── OUR STORY ── */}
            <section className="ab-section">
                <div className="ab-section-inner">
                    <div className="ab-story">
                        {/* Text */}
                        <div className="ab-story-text ab-fade-left">
                            <span className="ab-eyebrow">Who We Are</span>
                            <h2 className="ab-section-title">
                                The Complete<br />
                                Branding &amp; <span>Signage</span><br />
                                Partner
                            </h2>
                            <span className="ab-rule" />
                            <p>
                                Founded in 1994, Crystal Advertising has grown from a boutique sign
                                studio into one of the UAE's most respected end-to-end branding and
                                signage companies. We serve a portfolio spanning retail, hospitality,
                                corporate, government, and F&amp;B sectors.
                            </p>
                            <p>
                                Our strength lies in keeping everything under one roof — strategy,
                                design, fabrication, and installation — so our clients experience
                                a seamless journey from the first sketch to the moment their signage
                                commands attention in the real world.
                            </p>
                            <p>
                                With a team of 50+ seasoned professionals and a fully equipped
                                in-house production facility, we have the capacity and the craft to
                                meet any brief — large or small, simple or complex.
                            </p>
                        </div>

                        {/* Visual */}
                        <div className="ab-story-visual ab-fade-right">
                            <div className="ab-story-media">
                                <img src="/src/assets/logo.png" alt="Crystal Advertising" style={{ objectFit: 'contain', padding: '3rem', background: '#f7f6f3' }} />
                                <div className="ab-story-frame" />
                                <div className="about-badge">
                                    <AnimatedCounter from={0} to={30} suffix="+" className="badge-number" />
                                    <span className="badge-label">Years of Excellence</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BRAND ACRONYM ── */}
            <section className="ab-brands-section">
                <div className="ab-brands-inner">
                    <p className="ab-brands-tagline ab-fade">
                        Crystal brings your brand concepts to reality
                    </p>

                    <div className="brand-acronym-container ab-fade">
                        <div className="brand-acronym">
                            {BRAND_DATA_ACRONYM.map(({ letter, word, color }, i) => (
                                <React.Fragment key={letter}>
                                    <div className="brand-item-about">
                                        <span className="brand-letter-about" style={{ '--clr': color }}>{letter}</span>
                                        <span className="brand-word-about" style={{ '--clr': color }}>{word}</span>
                                    </div>
                                    {i < BRAND_DATA_ACRONYM.length - 1 && (
                                        <div className="brand-divider-about" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION ── */}
            <div className="ab-mv-section">
                <div className="ab-mv-rows">
                    {/* Vision */}
                    <div className="ab-mv-row">
                        <div className="ab-mv-image-wrapper ab-fade-left">
                            <div className="ab-mv-media">
                                <img src={visionImg} alt="Our Vision" className="ab-mv-img" />
                                <div className="ab-mv-frame" />
                            </div>
                        </div>
                        <div className="ab-mv-content ab-fade-right">
                            <span className="ab-mv-num">01</span>
                            <span className="ab-mv-label">Our Vision</span>
                            <h3 className="ab-mv-title">The UAE's Most Trusted<br />Branding Partner</h3>
                            <span className="ab-rule" />
                            <p className="ab-mv-text">
                                To be recognized as the leading branding and signage provider in the
                                region — built on a foundation of innovation, integrity, and an
                                unwavering commitment to client success.
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="ab-mv-row mv-reverse">
                        <div className="ab-mv-content ab-fade-left">
                            <span className="ab-mv-num">02</span>
                            <span className="ab-mv-label">Our Mission</span>
                            <h3 className="ab-mv-title">Crafting Excellence,<br />Delivering Impact</h3>
                            <span className="ab-rule" />
                            <p className="ab-mv-text">
                                To deliver high-quality, customized branding and signage solutions that
                                empower businesses to communicate their identity with clarity and
                                confidence — on time, every time.
                            </p>
                        </div>
                        <div className="ab-mv-image-wrapper ab-fade-right">
                            <div className="ab-mv-media">
                                <img src={missionImg} alt="Our Mission" className="ab-mv-img" />
                                <div className="ab-mv-frame mv-reverse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── WHY CHOOSE US ── */}
            <WhyChooseUs />

            {/* ── CLIENTS ── */}
            <ClientsSection />

            {/* ── CTA ── */}
            <section className="ab-cta">
                <div className="ab-cta-inner">
                    <div className="ab-fade">
                        <span className="ab-eyebrow">Get In Touch</span>
                        <h2 className="ab-cta-title">
                            Ready to <span>Elevate</span><br />
                            Your Brand?
                        </h2>
                        <p className="ab-cta-sub">
                            Let's talk about your next project. From a single sign to a complete
                            retail fit-out, we're ready to make it happen.
                        </p>
                    </div>
                    <a
                        href="https://wa.me/971528588613?text=I%20Would%20like%20to%20know%20more%20about%20your%20services."
                        className="ab-cta-btn ab-fade"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Get In Touch
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}