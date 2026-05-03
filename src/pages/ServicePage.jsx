import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicePage.css';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

// ── Hero slideshow images ──
import hero1 from '../assets/hero_service/3d_sinage.jpg';
import hero2 from '../assets/hero_service/backlit.jpg';
import hero3 from '../assets/hero_service/img10.jpg';
import hero4 from '../assets/hero_service/img12.jpg';
import hero5 from '../assets/hero_service/img23.jpg';
import hero6 from '../assets/hero_service/img30.jpg';
import hero7 from '../assets/hero_service/img31.jpg';

// ── Service card images ──
import ceramicImg from '../assets/offers/cnc_wood.jpg';
import digitalImg from '../assets/offers/digital.jpg';
import exhibitionImg from '../assets/offers/exhibtion.jpg';
import outdoorImg from '../assets/offers/billboard.jpg';
import promotionalImg from '../assets/offers/promotional.jpg';
import signageImg from '../assets/offers/backlit.png';
import uvPrintingImg from '../assets/offers/uv_printing.jpg';

const heroSlides = [
    { img: hero1, label: 'Signage Solutions' },
    { img: hero2, label: 'Backlit Displays' },
    { img: hero3, label: 'Premium Printing' },
    { img: hero4, label: 'Exhibition Builds' },
    { img: hero5, label: 'Outdoor Graphics' },
    { img: hero6, label: 'Brand Merchandise' },
    { img: hero7, label: 'Digital Solutions' },
];

const services = [
    { tag: 'Signage', title: 'Signage Solution', desc: 'High-impact LED and custom signage crafted to elevate your brand visibility across every environment.', img: signageImg, path: '/services/signage' },
    { tag: 'Printing', title: 'UV Printing', desc: 'Sharp, vibrant UV and digital printing on any substrate — from rigid boards to flexible media.', img: uvPrintingImg, path: '/services/uv-printing' },
    { tag: 'Outdoor', title: 'Outdoor Advertising', desc: 'Large-scale banners, vehicle wraps, billboards and outdoor advertising built for UAE conditions.', img: outdoorImg, path: '/services/outdoor' },
    { tag: 'Merchandise', title: 'Promotional Merchandise', desc: 'Custom branded merchandise for events, corporate gifting, and marketing campaigns.', img: promotionalImg, path: '/services/promotional' },
    { tag: 'Interior', title: 'Interior & Surface', desc: 'CNC wood paneling, artificial marble, reception counters and modular systems for refined spaces.', img: ceramicImg, path: '/services/ceramic' },
    { tag: 'Digital', title: 'Digital Solutions', desc: 'E-commerce platforms, websites, apps, and digital marketing automation for your brand online.', img: digitalImg, path: '/services/digital' },
    { tag: 'Structures', title: 'Outdoor & Structures', desc: 'Custom exhibition stalls, laser-cut panels, and architectural structures for trade shows and public spaces.', img: exhibitionImg, path: '/services/exhibition' },
];

/* ── Scroll reveal ── */
function useReveal(threshold = 0.12) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { el.classList.add('sp-in'); io.unobserve(el); } },
            { threshold }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);
    return ref;
}

/* ── Hero slideshow ── */
function HeroSlideshow() {
    const [active, setActive] = useState(0);
    const [prev, setPrev] = useState(null);
    const [paused, setPaused] = useState(false);
    const activeRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => { activeRef.current = active; }, [active]);

    const goTo = useCallback((i) => {
        setPrev(activeRef.current);
        setActive(i);
    }, []);

    useEffect(() => {
        if (paused) return;
        timerRef.current = setInterval(() => {
            setActive((cur) => {
                const next = (cur + 1) % heroSlides.length;
                setPrev(cur);
                return next;
            });
        }, 3000);
        return () => clearInterval(timerRef.current);
    }, [paused]);

    return (
        <div
            className="sp-slideshow"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slides */}
            {heroSlides.map((s, i) => (
                <div
                    key={i}
                    className={`sp-slide ${i === active ? 'sp-slide--active' : ''} ${i === prev ? 'sp-slide--prev' : ''}`}
                    style={{ backgroundImage: `url(${s.img})` }}
                    role="img"
                    aria-label={s.label}
                />
            ))}

            {/* Overlay */}
            <div className="sp-slide-overlay" />

            {/* Counter */}
            <div className="sp-slide-counter">
                <span className="sp-slide-index">{String(active + 1).padStart(2, '0')}</span>
                <span className="sp-slide-sep" />
                <span className="sp-slide-total">{String(heroSlides.length).padStart(2, '0')}</span>
            </div>

            {/* Current label */}
            <div className="sp-slide-label" key={active}>
                {heroSlides[active].label}
            </div>

            {/* Dot nav */}
            <div className="sp-dots" role="tablist" aria-label="Slide navigation">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        className={`sp-dot ${i === active ? 'sp-dot--active' : ''}`}
                        onClick={() => { clearInterval(timerRef.current); goTo(i); setPaused(false); }}
                        aria-label={`Go to slide ${i + 1}`}
                        role="tab"
                        aria-selected={i === active}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="sp-progress">
                <div
                    key={`${active}-bar`}
                    className={`sp-progress-bar ${!paused ? 'sp-progress-bar--running' : ''}`}
                />
            </div>
        </div>
    );
}

/* ── Service Card ── */
function ServiceCard({ s, index }) {
    return (
        <motion.div
            className="sp-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="sp-card-img-wrap">
                <img src={s.img} alt={s.title} className="sp-card-img" loading="lazy" />
                <div className="sp-card-img-overlay" />
            </div>
            <div className="sp-card-body">
                <span className="sp-card-num">{s.tag}</span>
                <h3 className="sp-card-title">{s.title}</h3>
                <p className="sp-card-desc">{s.desc}</p>
                <Link to={s.path} className="sp-card-link">
                    Explore
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </motion.div>
    );
}

/* ── Page ── */
export default function ServicePage() {
    const introRef = useReveal(0.15);
    const ctaRef = useReveal(0.15);

    return (
        <div className="sp-page">
            <SEO
                title="Our Services — Signage, Printing & Branding Solutions | Crystal Advertising UAE"
                description="Explore Crystal Advertising's full range of services: signage, UV printing, outdoor advertising, promotional merchandise, interior solutions, digital & exhibition stands. Ras Al Khaimah, UAE."
                path="/services"
                breadcrumbs={[{ name: 'Services', url: '/services' }]}
            />
            <Navbar />

            {/* ── Hero ── */}
            <section className="sp-hero">
                <HeroSlideshow />

                {/* Hero text */}
                <div className="sp-hero-content">
                    <p className="sp-eyebrow sp-hero-item" style={{ animationDelay: '0.1s' }}>
                        Crystal Advertising — UAE
                    </p>
                    <h1 className="sp-hero-title sp-hero-item" style={{ animationDelay: '0.22s' }}>
                        OUR<br /><span className="sp-gold">SERVICES</span>
                    </h1>
                    <p className="sp-hero-sub sp-hero-item" style={{ animationDelay: '0.36s' }}>
                        End-to-end branding and signage solutions crafted with
                        precision — from concept to installation, everything under one roof.
                    </p>
                    <a href="#sp-grid" className="sp-hero-btn sp-hero-item" style={{ animationDelay: '0.48s' }}>
                        Explore Services
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </a>
                </div>

                {/* Scroll cue */}
                <div className="sp-scroll-cue">
                    <span className="sp-scroll-line" />
                </div>
            </section>


            {/* ── Services Section ── */}
            <section className="sp-grid-section" id="sp-grid">
                {/* Header */}
                <motion.div
                    className="sp-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="sp-header-left">
                        <span className="sp-label">Capabilities</span>
                        <h2 className="sp-heading">
                            WHAT WE<br />
                            <span className="sp-heading-gold">OFFER.</span>
                        </h2>
                    </div>
                    <p className="sp-subheading">
                        End-to-end branding and signage services —<br />everything under one roof.
                    </p>
                </motion.div>

                <div className="sp-grid">
                    {services.map((s, i) => (
                        <ServiceCard key={s.path} s={s} index={i} />
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="sp-cta">
                <div className="sp-cta-inner sp-reveal" ref={ctaRef}>
                    <div className="sp-cta-left">
                        <p className="sp-eyebrow sp-eyebrow--dark">Ready to Start?</p>
                        <h2 className="sp-cta-title">
                            CAN'T FIND WHAT<br />
                            YOU'RE <span className="sp-gold">LOOKING FOR?</span>
                        </h2>
                        <p className="sp-cta-sub">
                            We build custom solutions tailored to your exact requirements.
                            Just reach out and tell us what you need.
                        </p>
                    </div>
                    <div className="sp-cta-right">
                        <Link to="/contact" className="sp-cta-btn">
                            Get a Free Quote
                        </Link>
                        <a href="tel:+971 52 858 8613" className="sp-cta-phone">
                            Or call us directly →
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}