import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/DigitalService.css';

// Hero
import heroImg from '../assets/digital/hero.png';

// What's Included imagery
import ecommerceImg from '../assets/digital/ecommerce.png';
import developmentImg from '../assets/digital/development.png';
import digitalImg from '../assets/digital/digital.jpeg';
import posterImg from '../assets/digital/poster.png';
import appImg from '../assets/digital/app.png';
import designImg from '../assets/digital/design.png';

const works = [
    {
        title: 'E-commerce Website',
        number: '01',
        images: [ecommerceImg],
        description: `A high-performing e-commerce website is the single most powerful sales asset your business can own — open around the clock, reaching customers anywhere, and converting interest into revenue without a physical storefront. We design and build custom e-commerce platforms tailored to your product catalogue, brand identity, and customer journey, integrating secure payment gateways, mobile-optimised product pages, and intuitive checkout flows that minimise drop-off. From boutique single-product stores to large multi-category catalogues, every platform we deliver is built on a foundation of performance, scalability, and conversion-focused design.`,
    },
    {
        title: 'Website Development',
        number: '02',
        images: [developmentImg],
        description: `Your website is your brand's most visible and always-on representative — and we build websites that perform as impressively as they look. We develop custom websites using modern frameworks and clean, semantic code, producing fast-loading, fully responsive experiences that work flawlessly across every device and browser. Whether you need a corporate information site, a portfolio, a landing page campaign, or a complex multi-page web application, we approach every build with the same rigour: clear information architecture, pixel-perfect implementation, and technical performance optimised for search engine visibility and user retention.`,
    },
    {
        title: 'Digital Marketing & Automation',
        number: '03',
        images: [digitalImg],
        description: `Effective digital marketing is no longer about volume — it is about precision, timing, and the intelligent automation that makes both possible at scale. We design and implement digital marketing strategies that combine paid media, social content, email marketing, and SEO with marketing automation workflows that nurture leads, re-engage prospects, and move your audience through the funnel without manual intervention. From Google Ads and Meta campaigns to CRM integration and automated email sequences, we build systems that generate measurable results and grow smarter with every campaign cycle.`,
    },
    {
        title: 'Poster & Graphic Design',
        number: '04',
        images: [posterImg],
        description: `Compelling visual design is the foundation of effective communication — and our graphic design team produces work that commands attention across every format and context. We create bespoke poster designs, promotional graphics, event visuals, and marketing collateral that distil your message into a single, impactful visual moment. Every design is produced with a clear understanding of hierarchy, colour psychology, and brand consistency, ensuring that whether your poster appears in a print run of thousands or as a digital asset across social platforms, it stops the scroll, holds the eye, and communicates with clarity.`,
    },
    {
        title: 'App Development',
        number: '05',
        images: [appImg],
        description: `A well-built mobile application places your brand directly in your customer's hand — accessible at any moment, delivering value with every interaction, and building the kind of habitual engagement no other channel can replicate. We develop native and cross-platform mobile applications for iOS and Android, combining intuitive UX design with robust back-end architecture to produce apps that are fast, reliable, and built to scale with your user base. From customer-facing retail and service apps to internal business tools and loyalty platforms, we manage the full development lifecycle from concept and wireframe through to App Store submission and post-launch support.`,
    },
    {
        title: 'Website Design',
        number: '06',
        images: [designImg],
        description: `Great website design begins long before a single line of code is written — in the careful study of your audience, your brand, and the specific journey you want every visitor to take. Our UI/UX design process produces visually distinctive, strategically structured website designs that balance aesthetic ambition with functional clarity. We deliver fully responsive design systems — including typography, colour, component libraries, and interaction states — that give developers a precise, implementation-ready blueprint and give your brand a digital presence that is as considered as it is compelling.`,
    },
];

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    io.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return { count, ref };
}

/* ── Stat with count-up ── */
function AnimatedStat({ value, suffix, label }) {
    const { count, ref } = useCountUp(value, 1600);
    return (
        <div className="dig-stat" ref={ref}>
            <span className="dig-stat-num">{count}{suffix}</span>
            <span className="dig-stat-label">{label}</span>
        </div>
    );
}

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose }) {
    const [closing, setClosing] = useState(false);

    const close = useCallback(() => {
        setClosing(true);
        setTimeout(onClose, 220);
    }, [onClose]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') close(); };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [close]);

    return (
        <div
            className={`dig-lightbox${closing ? ' dig-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="dig-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="dig-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="dig-lb-img" src={src} alt={alt} />
                <p className="dig-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="dig-media dig-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="dig-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="dig-media dig-media-stack">
            <img
                className="dig-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="dig-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="dig-media-frame" aria-hidden="true" />
        </div>
    );
}

/* ── Scroll reveal ── */
function useScrollReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const root = ref.current;
        if (!root) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('dig-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.dig-fade, .dig-fade-left, .dig-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function DigitalService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="dig-page" ref={pageRef}>
            <SEO
                title="Digital Solutions — Website, App & E-commerce Development | Crystal Advertising UAE"
                description="Digital solutions in UAE: e-commerce websites, web development, mobile apps, digital marketing, graphic design & UI/UX. Crystal Advertising — Ras Al Khaimah."
                path="/services/digital"
                breadcrumbs={[
                    { name: 'Services', url: '/services' },
                    { name: 'Digital Solutions', url: '/services/digital' },
                ]}
                serviceSchema={{
                    name: 'Digital Solutions',
                    description: 'E-commerce, website development, app development, digital marketing and graphic design services in UAE.',
                }}
            />
            <Navbar />
            <main className="dig-main">

                {/* ── Hero ── */}
                <section className="dig-hero">
                    <div className="dig-hero-img-wrap">
                        <img src={heroImg} alt="Crystal Advertising digital solutions — web development and marketing UAE" className="dig-hero-img" />
                        <div className="dig-hero-overlay" />
                    </div>
                    <div className="dig-hero-content">
                        <div className="dig-breadcrumb">
                            <Link to="/services" className="dig-bc-link">Services</Link>
                            <span className="dig-bc-sep">›</span>
                            <span className="dig-bc-current dig-hero-item" style={{ animationDelay: '0.25s' }}>Digital Solutions</span>
                        </div>
                        <p className="dig-eyebrow">Digital Solutions</p>
                        <h1 className="dig-title dig-hero-item" style={{ animationDelay: '0.25s' }}>
                            DIGITAL<br />
                            <span className="dig-gold">SOLUTIONS</span>
                        </h1>
                        <p className="dig-hero-desc dig-hero-item" style={{ animationDelay: '0.35s' }}>
                            From e-commerce platforms to mobile apps and digital marketing,
                            we build the digital infrastructure that grows your brand,
                            reaches your audience, and converts attention into results.
                        </p>
                        <a
                            href="https://wa.me/971528588613?text=GET%20A%20QUOTE"
                            target="_blank"
                            rel="noreferrer"
                            className="dig-quote-btn"
                        >
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="dig-included">
                    <div className="dig-included-inner">
                        <div className="dig-section-header dig-fade">
                            <p className="dig-eyebrow dig-eyebrow-dark">What's Included</p>
                            <h2 className="dig-section-title">
                                Modern. Fast.<br />
                                <span className="dig-gold">Effective.</span>
                            </h2>
                        </div>

                        <div className="dig-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`dig-row ${isReverse ? 'dig-row-reverse' : ''}`}
                                    >
                                        <div className={`dig-row-media ${isReverse ? 'dig-fade-right' : 'dig-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="dig-row-text dig-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="dig-row-num">{w.number}</span>
                                            <h3 className="dig-row-title">{w.title}</h3>
                                            <span className="dig-row-rule" aria-hidden="true" />
                                            <p className="dig-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="dig-why">
                    <div className="dig-why-inner">
                        <div className="dig-why-left dig-fade-left">
                            <p className="dig-eyebrow dig-eyebrow-dark">Why Crystal</p>
                            <h2 className="dig-section-title">
                                Your Brand,<br />Digitally<br />
                                <span className="dig-gold">Elevated.</span>
                            </h2>
                            <p className="dig-why-desc">
                                With 30+ years of brand-building experience, we bridge the gap
                                between physical and digital — combining design expertise with
                                technical depth to deliver digital solutions that are both
                                visually compelling and built to perform. Every project is
                                delivered with full transparency, on time, and to specification.
                            </p>
                        </div>

                        <div className="dig-stats dig-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={150} suffix="+" label="Digital Projects" />
                            <AnimatedStat value={100} suffix="%" label="Custom Built" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="dig-cta">
                    <div className="dig-cta-inner">
                        <div className="dig-cta-text dig-fade-left">
                            <p className="dig-eyebrow dig-eyebrow-dark">Start Today</p>
                            <h2 className="dig-cta-title">
                                Grow your brand<br />
                                <span className="dig-gold">digitally.</span>
                            </h2>
                        </div>
                        <div className="dig-fade" style={{ transitionDelay: '0.2s' }}>
                            <Link
                                to="/contact"
                                className="dig-quote-btn"
                            >
                                Contact Us Now
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />

            {/* ── Lightbox ── */}
            {lightbox && (
                <Lightbox
                    src={lightbox.src}
                    alt={lightbox.alt}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
}