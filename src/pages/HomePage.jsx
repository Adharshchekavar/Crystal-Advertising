import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import heroImg from '../assets/hero.png';

// -------------------------------------------------------------
// ASSETS
// -------------------------------------------------------------

import ceramicImg from "../assets/offers/cnc_wood.jpg";
import digitalImg from "../assets/offers/digital.jpg";
import exhibitionImg from "../assets/offers/exhibtion.jpg";
import outdoorImg from "../assets/offers/billboard.jpg";
import promotionalImg from "../assets/offers/promotional.jpg";
import signageImg from "../assets/offers/backlit.png";
import uvPrintingImg from "../assets/offers/uv_printing.jpg";
import logoImg from '../assets/logo.png';

import img1 from '../assets/recent-works/img1.jpg';
import img23 from '../assets/recent-works/img23.jpg';
import img33 from '../assets/recent-works/img33.jpg';
import img4 from '../assets/recent-works/img4.jpg';
import img5 from '../assets/recent-works/img5.jpg';
import img6 from '../assets/recent-works/img6.jpg';
import img7 from '../assets/recent-works/img7.jpg';
import img8 from '../assets/recent-works/img8.jpg';
import img9 from '../assets/recent-works/img9.jpg';
import img19 from '../assets/recent-works/img19.jpg';
import img11 from '../assets/recent-works/img11.jpg';
import img12 from '../assets/recent-works/img12.jpg';

import ClientsSection from '../components/ClientsSection';
import LocationSection from '../components/LocationSection';

const EASE = [0.22, 1, 0.36, 1];

// -------------------------------------------------------------
// HERO — hero.png background with SignageService-style gradient
// -------------------------------------------------------------
function Hero() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const yParallax = useTransform(scrollY, [0, 500], [0, 60]);

    return (
        <motion.section className="hero" id="home" style={{ opacity }}>
            {/* Background image + overlay */}
            <div className="hero-img-wrap">
                <img src={heroImg} alt="Crystal Advertising" className="hero-img" />
                <div className="hero-overlay" />
            </div>

            <motion.div
                className="hero-inner"
                style={{ y: yParallax }}
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
                <motion.span
                    className="hero-eyebrow"
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                    Ras Al Khaimah, UAE — Since 1994
                </motion.span>

                <motion.h1
                    className="hero-title"
                    variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                >
                    BRANDS SHAPE PEOPLE,<br />
                    <span className="hero-title-gold">WE SHAPE<br />BRANDS.</span>
                </motion.h1>

                <motion.p
                    className="hero-description"
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                >
                    30+ years crafting end-to-end signage and branding solutions
                    across the UAE — from concept to installation.
                </motion.p>

                <motion.div
                    className="hero-actions"
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                    <Link to="/portfolio" className="hero-btn-primary">
                        View Our Work
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <Link to="/services" className="hero-btn-ghost">Our Services</Link>
                </motion.div>
            </motion.div>



            {/* Scroll cue */}
            <motion.div
                className="hero-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
            >
                <div className="hero-scroll-line" />
                <span>Scroll</span>
            </motion.div>
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
// ABOUT — unchanged
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
                    <div className="about-story-media">
                        <img src={logoImg} alt="Crystal Advertising logo" className="about-logo-img" style={{ objectFit: 'contain', padding: '3rem', background: '#f7f6f3' }} />
                        <div className="about-story-frame" />
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
                    <motion.span className="about-eyebrow" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Who We Are</motion.span>
                    <motion.h2 className="about-title" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        ABOUT <span className="about-title-gold">US</span>
                    </motion.h2>
                    <motion.p className="about-tagline" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        Brands made you — <span className="about-tagline-gold">but we make brands</span> that last a lifetime.
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
            </div >
        </section >
    );
}

// -------------------------------------------------------------
// RECENT WORK — masonry grid + lightbox + mobile slider
// -------------------------------------------------------------
const allImages = [
    img1, img23, img33, img4, img5, img6,
    img7, img8, img9, img19, img11, img12,
];

function Lightbox({ images, index, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, onPrev, onNext]);

    return (
        <div className="rw-lightbox" onClick={onClose}>
            <button className="rw-lb-close" onClick={onClose} aria-label="Close">✕</button>
            <button className="rw-lb-arrow rw-lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="rw-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <img src={images[index]} alt={`Project ${index + 1}`} className="rw-lb-img" />
                <span className="rw-lb-counter">{index + 1} / {images.length}</span>
            </div>
            <button className="rw-lb-arrow rw-lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
        </div>
    );
}

function RecentWork() {
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [sliderIndex, setSliderIndex] = useState(0);

    const openLightbox = useCallback((i) => setLightboxIndex(i), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevLightbox = useCallback(() => setLightboxIndex(i => (i - 1 + allImages.length) % allImages.length), []);
    const nextLightbox = useCallback(() => setLightboxIndex(i => (i + 1) % allImages.length), []);

    const prevSlide = useCallback(() => setSliderIndex(i => (i - 1 + allImages.length) % allImages.length), []);
    const nextSlide = useCallback(() => setSliderIndex(i => (i + 1) % allImages.length), []);

    return (
        <section className="rw-section" id="portfolio">
            <motion.div
                className="rw-header"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <div className="rw-header-left">
                    <span className="rw-label">Portfolio</span>
                    <h2 className="rw-heading">
                        FEATURED<br />
                        <span className="rw-heading-gold">WORKS.</span>
                    </h2>
                </div>
                <div className="rw-header-right">
                    <p className="rw-sub">A glimpse of what we've built across the UAE.</p>
                    <Link to="/portfolio" className="rw-view-all">
                        View All Projects
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </motion.div>

            {/* Desktop: Masonry grid */}
            <div className="rw-masonry rw-masonry-desktop">
                {allImages.map((img, i) => (
                    <motion.div
                        key={i}
                        className="rw-masonry-item"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (i % 6) * 0.06, ease: EASE }}
                        onClick={() => openLightbox(i)}
                    >
                        <img src={img} alt={`Crystal Advertising project ${i + 1} — signage and branding work in UAE`} className="rw-masonry-img" loading="lazy" />
                        <div className="rw-masonry-overlay">
                            <span className="rw-masonry-num">#{String(i + 1).padStart(2, '0')}</span>
                            <span className="rw-masonry-zoom">⤢</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile: Full-screen slider */}
            <div className="rw-slider rw-slider-mobile">
                <div className="rw-slider-track" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
                    {allImages.map((img, i) => (
                        <div key={i} className="rw-slide" onClick={() => openLightbox(i)}>
                            <img src={img} alt={`Crystal Advertising project ${i + 1}`} className="rw-slide-img" loading="lazy" />
                            <div className="rw-slide-overlay">
                                <span className="rw-masonry-num">#{String(i + 1).padStart(2, '0')}</span>
                                <span className="rw-masonry-zoom">⤢</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="rw-slider-arrow rw-slider-prev" onClick={prevSlide} aria-label="Previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="rw-slider-arrow rw-slider-next" onClick={nextSlide} aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                <div className="rw-slider-dots">
                    {allImages.map((_, i) => (
                        <button key={i} className={`rw-slider-dot${i === sliderIndex ? ' active' : ''}`} onClick={() => setSliderIndex(i)} aria-label={`Go to ${i + 1}`} />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={allImages}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevLightbox}
                    onNext={nextLightbox}
                />
            )}
        </section>
    );
}

// -------------------------------------------------------------
// SERVICES — minimal accordion + image
// -------------------------------------------------------------
const SERVICES_DATA = [
    {
        tag: "01",
        title: "Signage Solution",
        desc: "High-impact LED, illuminated, and fabricated signs engineered to dominate your space and maximize brand visibility.",
        img: signageImg,
        path: "/services/signage",
    },
    {
        tag: "02",
        title: "UV Printing",
        desc: "Precision flatbed UV printing on virtually any substrate — glass, acrylic, metal, wood — with razor-sharp detail.",
        img: uvPrintingImg,
        path: "/services/uv-printing",
    },
    {
        tag: "03",
        title: "Outdoor Graphics",
        desc: "Bold large-format graphics, vehicle wraps, building wraps, and banners that command attention at any scale.",
        img: outdoorImg,
        path: "/services/outdoor",
    },
    {
        tag: "04",
        title: "Promotional Merchandise",
        desc: "Branded corporate gifts, event merchandise, and custom giveaways that keep your brand in every hand.",
        img: promotionalImg,
        path: "/services/promotional",
    },
    {
        tag: "05",
        title: "Interior & Surface Solutions",
        desc: "Custom ceramic prints, surface cladding, and interior visual solutions that transform any branded environment.",
        img: ceramicImg,
        path: "/services/ceramic",
    },
    {
        tag: "06",
        title: "Digital Solutions",
        desc: "Responsive websites, digital displays, and interactive media experiences that extend your brand into the digital world.",
        img: digitalImg,
        path: "/services/digital",
    },
    {
        tag: "07",
        title: "Outdoor Advertising & Structures",
        desc: "Complete exhibition stalls, outdoor advertising structures, and large-scale event builds from concept to installation.",
        img: exhibitionImg,
        path: "/services/exhibition",
    },
];

function ServicesSection() {
    return (
        <section className="services-section" id="services">
            {/* Header */}
            <motion.div
                className="sv-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: EASE }}
            >
                <div className="sv-header-left">
                    <span className="rw-label">Capabilities</span>
                    <h2 className="sv-heading">
                        WHAT WE<br />
                        <span className="sv-heading-gold">OFFER.</span>
                    </h2>
                </div>
                <p className="sv-subheading">
                    End-to-end branding and signage services —<br />everything under one roof.
                </p>
            </motion.div>

            {/* Card grid */}
            <div className="sv-card-grid">
                {SERVICES_DATA.map((svc, i) => (
                    <motion.div
                        key={svc.path}
                        className="sv-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    >
                        <div className="sv-card-img-wrap">
                            <img src={svc.img} alt={svc.title} className="sv-card-img" loading="lazy" />
                            <div className="sv-card-img-overlay" />
                        </div>
                        <div className="sv-card-body">
                            <span className="sv-card-num">{svc.tag}</span>
                            <h3 className="sv-card-title">{svc.title}</h3>
                            <p className="sv-card-desc">{svc.desc}</p>
                            <Link to={svc.path} className="sv-card-link">
                                Explore
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                className="sv-footer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
            >
                <p>Can't find what you're looking for?</p>
                <Link to="/services" className="btn-gold">Get in Touch</Link>
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
            <SEO
                title="Crystal Advertising — UAE's Leading Signage & Branding Company"
                description="Crystal Advertising LLC — 30+ years of premium signage, UV printing, outdoor graphics, promotional merchandise & branding solutions in UAE. Based in Ras Al Khaimah since 1994."
                path="/"
            />
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