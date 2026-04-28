import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SignageService.css';

// Hero
import signageImg from '../assets/recent-works/img31.jpeg';

// What's Included imagery
import threeDImg from '../assets/sinage/3d_sinage.jpeg';
import ledChannelImg from '../assets/sinage/led_channel.png';
import backlitImg from '../assets/sinage/backlit.png';
import frontSinage1 from '../assets/sinage/front_sinage_1.png';
import frontSinage2 from '../assets/sinage/front_sinage_2.png';
import indoorReception from '../assets/sinage/indoor_reception.png';
import directional1 from '../assets/sinage/directional_signs_1.png';
import directional2 from '../assets/sinage/directional_signs_2.png';

const works = [
    {
        title: '3D Acrylic Letter Signage',
        number: '01',
        images: [threeDImg],
        description: `Our 3D acrylic letter signage is engineered to command attention the moment your customers approach. Each letter is precision-cut and hand-finished using high-grade acrylic, giving your brand name a dimensional depth that flat signage simply cannot replicate. The result is a bold, architectural presence that reads as both modern and refined — ideal for storefronts, corporate lobbies, and brand installations where first impressions count.`,
    },
    {
        title: 'LED Channel Letter Signs',
        number: '02',
        images: [ledChannelImg],
        description: `LED channel letter signs ensure your brand remains visible and impactful around the clock. Each letter is individually fabricated with a powder-coated aluminium housing and fitted with energy-efficient LED modules that deliver consistent, glare-free illumination. Whether viewed at dusk or in the middle of the night, the crisp glow of your name creates an unmistakable presence on the street — combining superior durability with a sleek, contemporary finish.`,
    },
    {
        title: 'Backlit Sign Boards',
        number: '03',
        images: [backlitImg],
        description: `Backlit sign boards transform your branding into a luminous focal point that draws the eye from across a street or corridor. Using diffused LED backlighting behind frosted or translucent panels, we achieve a soft, even glow that highlights your logo and messaging with exceptional clarity. The seamless illumination eliminates hotspots, presenting your brand in the most polished, professional light — day or night, indoors or out.`,
    },
    {
        title: 'Shop Front Signage',
        number: '04',
        images: [frontSinage1, frontSinage2],
        description: `Your shopfront is your brand's handshake with the world, and we design it to leave a lasting impression. We produce fully custom facades — combining channel letters, panel graphics, and architectural framing — that reflect your brand personality with precision. Every element, from material selection to mounting method, is considered to ensure your storefront communicates quality, confidence, and professionalism before a single customer steps inside.`,
    },
    {
        title: 'Indoor Reception Signs',
        number: '05',
        images: [indoorReception],
        description: `A reception sign sets the tone for every client, partner, and visitor who enters your space. Our indoor reception signage blends dimensional lettering, brushed metal finishes, and subtle backlighting to create a feature piece that is both welcoming and authoritative. Tailored to align perfectly with your brand guidelines, these installations communicate that your business takes pride in every detail — from the products you offer to the environment you curate.`,
    },
    {
        title: 'Wayfinding & Directional Signs',
        number: '06',
        images: [directional1, directional2],
        description: `Effective wayfinding does more than guide people — it shapes the entire experience of moving through your space. Our directional signage systems are designed with both clarity and aesthetics in mind, using a cohesive visual language of icons, typography, and colour coding that integrates naturally with your interior environment. Whether across a retail mall, corporate campus, or hospitality venue, our wayfinding solutions ensure every visitor feels oriented, comfortable, and confident at every turn.`,
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
            // Ease out cubic
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
        <div className="sig-stat" ref={ref}>
            <span className="sig-stat-num">{count}{suffix}</span>
            <span className="sig-stat-label">{label}</span>
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
            className={`sig-lightbox${closing ? ' sig-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="sig-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="sig-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="sig-lb-img" src={src} alt={alt} />
                <p className="sig-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="sig-media sig-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="sig-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="sig-media sig-media-stack">
            <img
                className="sig-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="sig-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="sig-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('sig-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.sig-fade, .sig-fade-left, .sig-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function SignageService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="sig-page" ref={pageRef}>
            <Navbar />
            <main className="sig-main">

                {/* ── Hero ── */}
                <section className="sig-hero">
                    <div className="sig-hero-img-wrap">
                        <img src={signageImg} alt="Signage Solution" className="sig-hero-img" />
                        <div className="sig-hero-overlay" />
                    </div>
                    <div className="sig-hero-content">
                        <div className="sig-breadcrumb">
                            <Link to="/services" className="sig-bc-link">Services</Link>
                            <span className="sig-bc-sep">›</span>
                            <span className="sig-bc-current sig-hero-item" style={{ animationDelay: '0.25s' }}>Signage Solution</span>
                        </div>
                        <p className="sig-eyebrow">Premium Signage</p>
                        <h1 className="sig-title sig-hero-item" style={{ animationDelay: '0.25s' }}>
                            SIGNAGE<br />
                            <span className="sig-gold">SOLUTION</span>
                        </h1>
                        <p className="sig-hero-desc sig-hero-item" style={{ animationDelay: '0.25s' }}>
                            High-impact signage that makes your brand impossible to ignore.
                            From LED illumination to precision-crafted acrylics — every detail
                            considered, every installation perfected.
                        </p>
                        <a href="mailto:crystaladvertising777@gmail.com" className="sig-quote-btn">
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="sig-included">
                    <div className="sig-included-inner">
                        <div className="sig-section-header sig-fade">
                            <p className="sig-eyebrow sig-eyebrow-dark">What's Included</p>
                            <h2 className="sig-section-title">
                                Crafted Signage,<br />
                                <span className="sig-gold">End to End.</span>
                            </h2>
                        </div>

                        <div className="sig-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`sig-row ${isReverse ? 'sig-row-reverse' : ''}`}
                                    >
                                        <div className={`sig-row-media ${isReverse ? 'sig-fade-right' : 'sig-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="sig-row-text sig-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="sig-row-num">{w.number}</span>
                                            <h3 className="sig-row-title">{w.title}</h3>
                                            <span className="sig-row-rule" aria-hidden="true" />
                                            <p className="sig-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="sig-why">
                    <div className="sig-why-inner">
                        <div className="sig-why-left sig-fade-left">
                            <p className="sig-eyebrow sig-eyebrow-dark">Why Crystal</p>
                            <h2 className="sig-section-title">
                                Precision.<br />Quality.<br />
                                <span className="sig-gold">Impact.</span>
                            </h2>
                            <p className="sig-why-desc">
                                With 30+ years in the UAE market, our signage solutions are trusted by
                                leading retail brands, government entities, and global corporations.
                                Every sign goes through rigorous quality checks before delivery and installation.
                            </p>
                        </div>

                        <div className="sig-stats sig-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={500} suffix="+" label="Projects Delivered" />
                            <AnimatedStat value={100} suffix="%" label="Custom Made" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="sig-cta">
                    <div className="sig-cta-inner">
                        <div className="sig-cta-text sig-fade-left">
                            <p className="sig-eyebrow sig-eyebrow-dark">Start Today</p>
                            <h2 className="sig-cta-title">
                                Ready to make<br />
                                your <span className="sig-gold">brand visible?</span>
                            </h2>
                        </div>
                        <div className="sig-fade" style={{ transitionDelay: '0.2s' }}>
                            <a href="mailto:crystaladvertising777@gmail.com" className="sig-quote-btn">
                                Contact Us Now
                            </a>
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