import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

import img1 from "../assets/recent-works/img1.jpg";
import img2 from "../assets/recent-works/img2.jpg";
import img3 from "../assets/recent-works/img3.jpg";
import img4 from "../assets/recent-works/img4.jpg";
import img5 from "../assets/recent-works/img5.jpg";
import img6 from "../assets/recent-works/img6.jpg";
import img7 from "../assets/recent-works/img7.jpg";
import img8 from "../assets/recent-works/img8.jpg";
import img9 from "../assets/recent-works/img9.jpg";
import img10 from "../assets/recent-works/img10.jpg";
import img11 from "../assets/recent-works/img11.jpg";
import img12 from "../assets/recent-works/img12.jpg";
import img13 from "../assets/recent-works/img13.jpg";
import img14 from "../assets/recent-works/img14.jpg";
import img15 from "../assets/recent-works/img15.jpg";
import img16 from "../assets/recent-works/img16.jpg";
import img17 from "../assets/recent-works/img17.jpg";
import img18 from "../assets/recent-works/img18.jpg";
import img19 from "../assets/recent-works/img19.jpg";
import img20 from "../assets/recent-works/img20.jpg";
import img21 from "../assets/recent-works/img21.jpg";
import img22 from "../assets/recent-works/img22.jpg";
import img23 from "../assets/recent-works/img23.jpg";
import img24 from "../assets/recent-works/img24.jpg";
import img25 from "../assets/recent-works/img25.jpg";
import img26 from "../assets/recent-works/img26.jpg";
import img27 from "../assets/recent-works/img27.jpg";
import img28 from "../assets/recent-works/img28.jpg";
import img29 from "../assets/recent-works/img29.jpg";
import img30 from "../assets/recent-works/img30.jpg";
import img31 from "../assets/recent-works/img31.jpg";
import img32 from "../assets/recent-works/img32.jpg";
import img33 from "../assets/recent-works/img33.jpg";
import img34 from "../assets/recent-works/img34.jpg";
import img35 from "../assets/recent-works/img35.jpg";
import img36 from "../assets/recent-works/img36.jpg";
import img37 from "../assets/recent-works/img37.jpg";
import img38 from "../assets/recent-works/img38.jpg";
import img39 from "../assets/recent-works/img39.jpg";
import img40 from "../assets/recent-works/img40.jpg";
import img41 from "../assets/recent-works/img41.jpg";
import img42 from "../assets/recent-works/img42.jpg";
import img43 from "../assets/recent-works/img43.jpg";

/* ─────────────────────────────────────────
   Scoped styles
───────────────────────────────────────── */
const CSS = `
.pf-page {
    min-height: 100vh;
    background: #f7f7f7ff;
}

/* ── Hero banner ── */
.pf-hero {
    padding: 120px 6vw 72px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
}

.pf-hero-left {}

.pf-eyebrow {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 16px;
}

.pf-heading {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(40px, 7vw, 80px);
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -3px;
    text-transform: uppercase;
    color: #4b484886;
    margin: 0 0 2rem;
}

.pf-heading-gold { color: #C9A84C; }

.pf-heading-line {
    width: 64px;
    height: 2px;
    background: #C9A84C;
    margin: 20px 0 0;
    transform-origin: left;
}

.pf-hero-right {
    text-align: right;
    flex-shrink: 0;
}

.pf-hero-count {
    font-size: 4rem;
    font-weight: 900;
    color: #98938dff;
    line-height: 1;
    letter-spacing: -2px;
}

.pf-hero-count-label {
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #555;
    margin-top: 6px;
}

.pf-hero-sub {
    font-size: 0.88rem;
    color: #666;
    max-width: 280px;
    line-height: 1.7;
    margin: 16px 0 0 auto;
}

/* ── Main content ── */
.pf-content {
    padding: 56px 6vw 96px;
}

/* ── Masonry grid ── */
.pf-grid {
    columns: 3;
    column-gap: 10px;
}

.pf-item {
    break-inside: avoid;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    background: #1a1a1a;
}

.pf-item:nth-child(7n+1) img  { aspect-ratio: 4/3; }
.pf-item:nth-child(7n+2) img  { aspect-ratio: 3/4; }
.pf-item:nth-child(7n+3) img  { aspect-ratio: 16/9; }
.pf-item:nth-child(7n+4) img  { aspect-ratio: 1/1; }
.pf-item:nth-child(7n+5) img  { aspect-ratio: 4/3; }
.pf-item:nth-child(7n+6) img  { aspect-ratio: 3/4; }
.pf-item:nth-child(7n+7) img  { aspect-ratio: 16/9; }

.pf-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.pf-item:hover img {
    transform: scale(1.06);
}

.pf-item-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 14px 16px;
}

.pf-item:hover .pf-item-overlay {
    opacity: 1;
}

.pf-item-num {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: #C9A84C;
    text-transform: uppercase;
}

.pf-item-zoom {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.75rem;
}

/* ── Load more ── */
.pf-load-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 56px;
}

.pf-load-btn {
    padding: 13px 40px;
    border: 1px solid rgba(201,168,76,0.4);
    background: transparent;
    color: #C9A84C;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.25s ease;
}

.pf-load-btn:hover {
    background: #C9A84C;
    color: #0e0e0e;
    border-color: #C9A84C;
}

.pf-load-progress {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: #444;
    text-transform: uppercase;
}

/* ── Lightbox ── */
.pf-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.96);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
}

.pf-lightbox-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 3px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
    user-select: none;
}

.pf-lightbox-close {
    position: absolute;
    top: 20px;
    right: 24px;
    background: none;
    border: 1px solid rgba(255,255,255,0.15);
    color: #aaa;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.pf-lightbox-close:hover {
    border-color: #C9A84C;
    color: #C9A84C;
}

.pf-lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: 1px solid rgba(255,255,255,0.12);
    color: #aaa;
    width: 48px;
    height: 48px;
    border-radius: 2px;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.pf-lightbox-nav:hover {
    border-color: #C9A84C;
    color: #C9A84C;
}

.pf-lightbox-prev { left: 20px; }
.pf-lightbox-next { right: 20px; }

.pf-lightbox-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    color: #444;
    text-transform: uppercase;
    white-space: nowrap;
}

/* Responsive */
@media (max-width: 900px) {
    .pf-grid { columns: 2; }
    .pf-hero { flex-direction: column; align-items: flex-start; }
    .pf-hero-right { text-align: left; }
    .pf-hero-sub { margin-left: 0; }
    .pf-lightbox { padding: 60px 20px; }
}

@media (max-width: 540px) {
    .pf-grid { columns: 2; column-gap: 6px; }
    .pf-item { margin-bottom: 6px; }
    .pf-hero { padding: 100px 5vw 48px; }
    .pf-content { padding: 40px 5vw 72px; }
    .pf-lightbox-nav { display: none; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('pf-page-styles')) {
    const tag = document.createElement('style');
    tag.id = 'pf-page-styles';
    tag.textContent = CSS;
    document.head.appendChild(tag);
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const ALL_IMAGES = [
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12,
    img13, img14, img15, img16, img17, img18,
    img19, img20, img21, img22, img23, img24,
    img25, img26, img27, img28, img29, img30,
    img31, img32, img33, img34, img35, img36,
    img37, img38, img39, img40, img41, img42, img43
];

const INITIAL_COUNT = 18;
const LOAD_STEP = 9;
const EASE = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────
   Motion variants
───────────────────────────────────────── */
const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.75, delay: d, ease: EASE } }),
};

const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.9, delay: 0.35, ease: EASE } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: (i % 9) * 0.045, ease: EASE } }),
};

/* ─────────────────────────────────────────
   Page component
───────────────────────────────────────── */
export default function PortfolioPage() {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const [lightbox, setLightbox] = useState(null);

    const visibleImages = ALL_IMAGES.slice(0, visibleCount);
    const hasMore = visibleCount < ALL_IMAGES.length;

    const openLightbox = (i) => setLightbox(i);
    const closeLightbox = () => setLightbox(null);
    const prevImage = () => setLightbox((l) => (l > 0 ? l - 1 : ALL_IMAGES.length - 1));
    const nextImage = () => setLightbox((l) => (l < ALL_IMAGES.length - 1 ? l + 1 : 0));

    /* scroll to top on mount */
    useEffect(() => { window.scrollTo(0, 0); }, []);

    /* keyboard nav for lightbox */
    useEffect(() => {
        if (lightbox === null) return;
        const handler = (e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightbox]);

    return (
        <div className="pf-page">
            <SEO
                title="Portfolio — Our Signage & Branding Work | Crystal Advertising UAE"
                description="Browse 40+ completed projects by Crystal Advertising LLC: signage, branding, print, outdoor & digital work delivered across UAE. Ras Al Khaimah since 1994."
                path="/portfolio"
                breadcrumbs={[{ name: 'Portfolio', url: '/portfolio' }]}
            />
            <Navbar />

            {/* ── Hero ── */}
            <motion.div
                className="pf-hero"
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
            >
                <div className="pf-hero-left">
                    <motion.span className="pf-eyebrow" variants={heroVariants} custom={0}>
                        Crystal Advertising
                    </motion.span>

                    <motion.h1 className="pf-heading" variants={heroVariants} custom={0.1}>
                        OUR<br />
                        <span className="pf-heading-gold">PORTFOLIO.</span>
                    </motion.h1>

                    <motion.div className="pf-heading-line" variants={lineVariants} />
                </div>

                <div className="pf-hero-right">
                    <motion.div className="pf-hero-count" variants={heroVariants} custom={0.2}>
                        {ALL_IMAGES.length}+
                    </motion.div>
                    <motion.div className="pf-hero-count-label" variants={heroVariants} custom={0.25}>
                        Projects Showcased
                    </motion.div>
                    <motion.p className="pf-hero-sub" variants={heroVariants} custom={0.3}>
                        Signage, branding, print & digital work delivered across the UAE.
                    </motion.p>
                </div>
            </motion.div>

            {/* ── Grid ── */}
            <div className="pf-content">
                <motion.div
                    className="pf-grid"
                    initial="hidden"
                    animate="visible"
                >
                    {visibleImages.map((src, i) => (
                        <motion.div
                            key={i}
                            className="pf-item"
                            custom={i}
                            variants={itemVariants}
                            onClick={() => openLightbox(i)}
                        >
                            <img
                                src={src}
                                alt={`Crystal Advertising project ${i + 1}`}
                                loading="lazy"
                            />
                            <div className="pf-item-overlay">
                                <span className="pf-item-num">#{String(i + 1).padStart(2, '0')}</span>
                                <span className="pf-item-zoom">⤢</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load More */}
                {hasMore && (
                    <div className="pf-load-wrap">
                        <motion.button
                            className="pf-load-btn"
                            onClick={() => setVisibleCount((c) => Math.min(c + LOAD_STEP, ALL_IMAGES.length))}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Load More
                        </motion.button>
                        <span className="pf-load-progress">
                            {visibleCount} / {ALL_IMAGES.length} shown
                        </span>
                    </div>
                )}
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        className="pf-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeLightbox}
                    >
                        <motion.img
                            key={lightbox}
                            className="pf-lightbox-img"
                            src={ALL_IMAGES[lightbox]}
                            alt={`Project ${lightbox + 1}`}
                            initial={{ opacity: 0, scale: 0.93 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.93 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button className="pf-lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>

                        <button
                            className="pf-lightbox-nav pf-lightbox-prev"
                            onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous image"
                        >←</button>

                        <button
                            className="pf-lightbox-nav pf-lightbox-next"
                            onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next image"
                        >→</button>

                        <span className="pf-lightbox-counter">
                            {lightbox + 1} &nbsp;/&nbsp; {ALL_IMAGES.length}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}