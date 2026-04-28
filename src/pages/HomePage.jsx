import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// -------------------------------------------------------------
// ASSETS
// -------------------------------------------------------------
import ceramicImg from "../assets/offers/ceramic.png";
import digitalImg from "../assets/offers/digital.png";
import exhibitionImg from "../assets/offers/exhibtion.png";
import outdoorImg from "../assets/offers/outdoor.jpeg";
import promotionalImg from "../assets/offers/promotional.jpeg";
import signageImg from "../assets/offers/signage.png";
import uvPrintingImg from "../assets/offers/uv_printing.png";

import img1 from '../assets/recent-works/img1.png';
import img2 from '../assets/recent-works/img2.png';
import img3 from '../assets/recent-works/img3.png';
import img4 from '../assets/recent-works/img4.png';
import img5 from '../assets/recent-works/img5.png';
import img6 from '../assets/recent-works/img6.png';
import img7 from '../assets/recent-works/img7.png';
import img8 from '../assets/recent-works/img8.png';
import img9 from '../assets/recent-works/img9.png';
import img10 from '../assets/recent-works/img10.png';
import img11 from '../assets/recent-works/img11.jpeg';
import img12 from '../assets/recent-works/img12.png';
import img13 from '../assets/recent-works/img13.png';
import img14 from '../assets/recent-works/img14.png';
import img15 from '../assets/recent-works/img15.png';
import img16 from '../assets/recent-works/img16.png';
import img17 from '../assets/recent-works/img17.png';
import img18 from '../assets/recent-works/img18.png';
import img19 from '../assets/recent-works/img19.png';
import img20 from '../assets/recent-works/img20.png';
import img21 from '../assets/recent-works/img21.png';
import img22 from '../assets/recent-works/img22.png';
import img23 from '../assets/recent-works/img23.png';
import img24 from '../assets/recent-works/img24.png';
import img25 from '../assets/recent-works/img25.png';
import img26 from '../assets/recent-works/img26.png';
import img27 from '../assets/recent-works/img27.png';
import img28 from '../assets/recent-works/img28.png';
import img29 from '../assets/recent-works/img29.png';
import img30 from '../assets/recent-works/img30.jpeg';
import img31 from '../assets/recent-works/img31.jpeg';
import img32 from '../assets/recent-works/img32.jpeg';
import img33 from '../assets/recent-works/img33.jpeg';
import img34 from '../assets/recent-works/img34.jpeg';
import img35 from '../assets/recent-works/img35.png';
import img36 from '../assets/recent-works/img36.png';

import ClientsSection from '../components/ClientsSection';
import LocationSection from '../components/LocationSection';

// -------------------------------------------------------------
// HERO
// -------------------------------------------------------------
function Hero() {
    const { scrollY } = useScroll();
    const contentY = useTransform(scrollY, [0, 600], [0, 150]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <motion.section className="hero section-padding" id="home" style={{ opacity }}>
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    style={{ y: contentY }}
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    <motion.h1 className="hero-title" variants={fadeUp}>
                        BRANDS MADE YOU<br />
                        <span className="accent-text">BUT WE MAKE BRANDS.</span>
                    </motion.h1>
                    <motion.h2 className="hero-subtitle" variants={fadeUp}>Let's People Recognize You</motion.h2>
                    <motion.p className="hero-description" variants={fadeUp}>
                        30+ years in the UAE market, we craft end-to-end signage solutions — from concept to installation featuring high-quality LED, digital, and traditional signage designed to elevate your brand presence.
                    </motion.p>
                    <motion.div className="hero-actions" variants={fadeUp}>
                        <a href="/recent" className="btn-gold">Explore Our Work</a>
                        <Link to="/services" className="btn-outline">Our Services</Link>
                    </motion.div>
                </motion.div>
                <div className="hero-visual">
                    <motion.div
                        className="visual-container"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <img src="/src/assets/identity.png" alt="Crystal Branding" className="hero-brand-img" />
                    </motion.div>
                </div>
            </div>
            <div className="hero-brand-strip" />
        </motion.section>
    );
}

// -------------------------------------------------------------
// ANIMATED COUNTER
// -------------------------------------------------------------
function AnimatedCounter({ from = 0, to, duration = 2, suffix = "", className }) {
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (inView) {
            const controls = animate(from, to, {
                duration,
                ease: [0.16, 1, 0.3, 1],
                onUpdate(value) {
                    if (nodeRef.current) nodeRef.current.textContent = Math.round(value) + suffix;
                }
            });
            return () => controls.stop();
        }
    }, [from, to, inView, duration, suffix]);

    return <span ref={nodeRef} className={className}>{from}{suffix}</span>;
}

// -------------------------------------------------------------
// ABOUT
// -------------------------------------------------------------
function About() {
    return (
        <section className="abouts" id="abouts">
            <div className="container about-container">
                <motion.div
                    className="about-visual"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="about-img-wrapper">
                        <img src="/src/assets/logo.png" alt="Crystal Advertising" className="about-logo-img" />
                        <motion.div
                            className="about-badge"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                        >
                            <AnimatedCounter from={0} to={30} suffix="+" className="badge-number" />
                            <span className="badge-label">Years of Excellence</span>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    className="about-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                >
                    <motion.div className="section-tag" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Who We Are</motion.div>
                    <motion.h2 className="about-title" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>About Us</motion.h2>
                    <motion.p className="about-tagline" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        Brands made you — but we make brands that last a lifetime.
                    </motion.p>
                    <motion.p className="about-description" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        We are in the business of enhancing and maximizing brand recognition through <strong>Visual Merchandising</strong> and{' '}
                        <strong className="gold-highlight">Signage Solutions</strong> since 1994. Today, we pride ourselves as a complete one-stop shop for anything branding and signage in the UAE.
                    </motion.p>
                    <motion.p className="about-description" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        We are a team of <strong>50+ dynamic professionals</strong> committed to creating and manufacturing innovative, unique branding solutions for our diverse clientele — helping them achieve their branding goals and maximize their brand recognition across the UAE market.
                    </motion.p>
                    <motion.div className="about-stats" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <div className="stat-item">
                            <AnimatedCounter from={0} to={30} suffix="+" className="stat-number" />
                            <span className="stat-label">Years in UAE</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <AnimatedCounter from={0} to={500} suffix="+" duration={2.5} className="stat-number" />
                            <span className="stat-label">Projects Done</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <AnimatedCounter from={0} to={200} suffix="+" duration={2.2} className="stat-number" />
                            <span className="stat-label">Happy Clients</span>
                        </div>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}>
                        <Link to="/about" className="btn-gold about-btn">Read More</Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// RECENT WORK
// -------------------------------------------------------------
function seededRandom(seed) {
    let s = seed >>> 0;
    return () => {
        s = (Math.imul(1664525, s) + 1013904223) >>> 0;
        return s / 0x100000000;
    };
}
function generateLayout(count) {
    const rand = seededRandom(99);
    const COLS = 7, ROWS = 6;
    const items = [];
    for (let i = 0; i < count; i++) {
        const col = i % COLS, row = Math.floor(i / COLS);
        const cellW = 106 / COLS, cellH = 108 / ROWS;
        const cx = -3 + col * cellW + cellW / 2, cy = -4 + row * cellH + cellH / 2;
        const jx = (rand() - 0.5) * cellW * 0.7, jy = (rand() - 0.5) * cellH * 0.7;
        const x = cx + jx, y = cy + jy;
        const rotRange = rand() < 0.15 ? 20 : 12;
        const rotation = (rand() - 0.5) * rotRange * 2;
        const sizeRoll = rand();
        let w, h;
        if (sizeRoll < 0.22) { w = 150 + rand() * 55; h = 108 + rand() * 42; }
        else if (sizeRoll < 0.65) { w = 215 + rand() * 75; h = 155 + rand() * 58; }
        else { w = 295 + rand() * 85; h = 210 + rand() * 70; }
        items.push({ x, y, rotation, w, h, zIndex: Math.floor(rand() * 30) + 1 });
    }
    return items;
}
const allImages = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12,
    img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24,
    img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36,
];

function RecentWork() {
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const layout = useMemo(() => generateLayout(allImages.length), []);
    return (
        <section className="rw-section" id="portfolio">
            <div className="rw-header">
                <span className="rw-label">Portfolio</span>
                <h2 className="rw-title">FEATURED WORKS</h2>
            </div>
            <div className="rw-canvas">
                {allImages.map((img, i) => {
                    const p = layout[i];
                    const active = hoveredIdx === i;
                    return (
                        <div
                            key={i}
                            className={`rw-card${active ? ' rw-card--on' : ''}`}
                            style={{
                                left: `${p.x}%`, top: `${p.y}%`,
                                width: `${p.w}px`, height: `${p.h}px`,
                                '--r': `${p.rotation}deg`,
                                zIndex: active ? 200 : p.zIndex,
                            }}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <img src={img} alt={`Work ${i + 1}`} className="rw-img" loading="lazy" draggable={false} />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

// -------------------------------------------------------------
// SERVICES — redesigned grid layout matching Navbar routes
// -------------------------------------------------------------
const SERVICES_DATA = [
    {
        tag: "01",
        title: "Signage Solution",
        desc: "High-impact LED, illuminated, and fabricated signs engineered to dominate your space and maximize brand visibility.",
        img: signageImg,
        path: "/services/signage",
        accent: "#C9A84C",
    },
    {
        tag: "02",
        title: "UV Printing",
        desc: "Precision flatbed UV printing on virtually any substrate — glass, acrylic, metal, wood — with razor-sharp detail.",
        img: uvPrintingImg,
        path: "/services/uv-printing",
        accent: "#C9A84C",
    },
    {
        tag: "03",
        title: "Outdoor Graphics",
        desc: "Bold large-format graphics, vehicle wraps, building wraps, and banners that command attention at any scale.",
        img: outdoorImg,
        path: "/services/outdoor",
        accent: "#C9A84C",
    },
    {
        tag: "04",
        title: "Promotional Merchandise",
        desc: "Branded corporate gifts, event merchandise, and custom giveaways that keep your brand in every hand.",
        img: promotionalImg,
        path: "/services/promotional",
        accent: "#C9A84C",
    },
    {
        tag: "05",
        title: "Interior & Surface Solutions",
        desc: "Custom ceramic prints, surface cladding, and interior visual solutions that transform any branded environment.",
        img: ceramicImg,
        path: "/services/ceramic",
        accent: "#C9A84C",
    },
    {
        tag: "06",
        title: "Digital Solutions",
        desc: "Responsive websites, digital displays, and interactive media experiences that extend your brand into the digital world.",
        img: digitalImg,
        path: "/services/digital",
        accent: "#C9A84C",
    },
    {
        tag: "07",
        title: "Outdoor Advertising & Structures",
        desc: "Complete exhibition stalls, outdoor advertising structures, and large-scale event builds from concept to installation.",
        img: exhibitionImg,
        path: "/services/exhibition",
        accent: "#C9A84C",
    },
];

function ServicesSection() {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = SERVICES_DATA[activeIdx];

    return (
        <section className="services-section" id="services">
            {/* Header */}
            <motion.div
                className="sv-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
            >
                <span className="rw-label">Capabilities</span>
                <h2 className="sv-heading">WHAT WE OFFER</h2>
                <p className="sv-subheading">
                    End-to-end branding and signage services — everything under one roof.
                </p>
            </motion.div>

            {/* Main layout: list + preview */}
            <div className="sv-layout">
                {/* Left: service list */}
                <div className="sv-list">
                    {SERVICES_DATA.map((svc, i) => (
                        <motion.div
                            key={svc.path}
                            className={`sv-item ${activeIdx === i ? 'sv-item--active' : ''}`}
                            onClick={() => setActiveIdx(i)}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                        >
                            <span className="sv-num">{svc.tag}</span>
                            <div className="sv-item-content">
                                <span className="sv-item-title">{svc.title}</span>
                                {activeIdx === i && (
                                    <motion.p
                                        className="sv-item-desc"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.35 }}
                                    >
                                        {svc.desc}
                                    </motion.p>
                                )}
                            </div>
                            <Link
                                to={svc.path}
                                className="sv-arrow"
                                onClick={e => e.stopPropagation()}
                                aria-label={`View ${svc.title}`}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Right: image preview */}
                <motion.div
                    className="sv-preview"
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="sv-preview-img-wrap">
                        <img src={active.img} alt={active.title} className="sv-preview-img" />
                        <div className="sv-preview-overlay">
                            <span className="sv-preview-tag">{active.tag}</span>
                            <h3 className="sv-preview-title">{active.title}</h3>
                            <Link to={active.path} className="sv-preview-cta">
                                Explore Service
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    {/* Dots */}
                    <div className="sv-dots">
                        {SERVICES_DATA.map((_, i) => (
                            <button
                                key={i}
                                className={`sv-dot ${activeIdx === i ? 'sv-dot--active' : ''}`}
                                onClick={() => setActiveIdx(i)}
                                aria-label={SERVICES_DATA[i].title}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                className="sv-footer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <p>Can't find what you're looking for?</p>
                <a href="/contact" className="btn-gold">Get in Touch</a>
            </motion.div>
        </section>
    );
}

// -------------------------------------------------------------
// MAIN
// -------------------------------------------------------------
export default function HomePage() {
    return (
        <main className="homepage">
            <Navbar />
            <Hero />
            <About />
            <RecentWork />
            <ServicesSection />
            <LocationSection />
            <ClientsSection />
            <Footer />
        </main>
    );
}