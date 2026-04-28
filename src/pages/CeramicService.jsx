import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/CeramicService.css';

// Hero
import heroImg from '../assets/interior/hero.png';

// What's Included imagery
import cncWoodImg from '../assets/interior/cnc_wood.png';
import receptionDesk1Img from '../assets/interior/reception_desk1.png';
import receptionDesk2Img from '../assets/interior/reception_desk2.png';
import salesDeskImg from '../assets/interior/sales_desk.png';
import artificial2Img from '../assets/interior/artificial2.png';
import artificial1Img from '../assets/interior/artificial1.png';
import modularImg from '../assets/interior/modular.png';

const works = [
    {
        title: 'CNC Wood Carving & Paneling',
        number: '01',
        images: [cncWoodImg],
        description: `CNC wood carving brings a level of precision and repeatability to decorative woodwork that hand craftsmanship alone cannot match. Our CNC routing and engraving capabilities allow us to produce intricate carved panels, feature walls, decorative screens, and custom joinery elements with flawless geometric accuracy across any timber or MDF substrate. Whether you are specifying ornate Arabic lattice patterns for a hospitality interior, clean contemporary panel systems for a corporate boardroom, or bespoke branded elements for a retail environment, our CNC wood paneling delivers a finish that is both architecturally refined and unmistakably premium.`,
    },
    {
        title: 'Custom Reception Counters',
        number: '02',
        images: [receptionDesk1Img, receptionDesk2Img],
        description: `Your reception counter is the first physical statement your brand makes to every visitor who walks through your door — and we ensure that statement is one of quality, confidence, and care. We design and fabricate fully bespoke reception counters in a curated selection of materials including artificial marble, lacquered MDF, veneer, and solid surface composites, integrating your brand identity through material choice, form language, and applied graphics. Every counter is built to specification with concealed cable management, integrated lighting options, and a structural finish that holds its appearance beautifully through years of daily use.`,
    },
    {
        title: 'Retail Counters',
        number: '03',
        images: [salesDeskImg],
        description: `A well-designed retail counter does more than facilitate a transaction — it anchors your retail floor, communicates your brand's positioning, and creates a natural focal point that guides customer flow. We produce custom retail sales counters and service desks across a full range of finishes and configurations, from compact checkout desks and jewellery display counters to large multi-station sales floors for flagship retail environments. Each counter is fabricated with durable, high-traffic surfaces and designed to integrate seamlessly with your existing interior scheme, ensuring a coherent, professional retail experience from every angle.`,
    },
    {
        title: 'Artificial Marble Works',
        number: '04',
        images: [artificial2Img, artificial1Img],
        description: `Artificial marble delivers the visual elegance and tonal richness of natural stone at a fraction of the weight, cost, and maintenance burden — making it the material of choice for high-end interior applications where both aesthetics and practicality matter. We fabricate custom artificial marble surfaces for reception counters, feature walls, flooring inlays, column cladding, and bespoke furniture, with seamless joins and precision-cut edges that are indistinguishable from the finest natural marble installations. Available in an extensive palette of veining patterns and base tones, our artificial marble works elevate any interior with enduring sophistication.`,
    },
    {
        title: 'Modular Kitchen Systems',
        number: '05',
        images: [modularImg],
        description: `Our modular kitchen systems are designed and fabricated to the exact dimensions of your space, combining intelligent storage engineering with a refined aesthetic sensibility that elevates the kitchen from a purely functional room to a considered design statement. We produce modular kitchen cabinetry in lacquered, veneer, and laminate finishes with soft-close hardware, integrated lighting, and a choice of worktop materials including engineered stone, artificial marble, and solid surface. Whether for a corporate pantry, a hospitality kitchen, or a residential installation, every system is assembled with exacting tolerances and finished to a standard that reflects the quality of your space.`,
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
        <div className="cer-stat" ref={ref}>
            <span className="cer-stat-num">{count}{suffix}</span>
            <span className="cer-stat-label">{label}</span>
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
            className={`cer-lightbox${closing ? ' cer-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="cer-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="cer-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="cer-lb-img" src={src} alt={alt} />
                <p className="cer-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="cer-media cer-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="cer-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="cer-media cer-media-stack">
            <img
                className="cer-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="cer-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="cer-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('cer-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.cer-fade, .cer-fade-left, .cer-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function CeramicService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="cer-page" ref={pageRef}>
            <Navbar />
            <main className="cer-main">

                {/* ── Hero ── */}
                <section className="cer-hero">
                    <div className="cer-hero-img-wrap">
                        <img src={heroImg} alt="Interior & Surface Solutions" className="cer-hero-img" />
                        <div className="cer-hero-overlay" />
                    </div>
                    <div className="cer-hero-content">
                        <div className="cer-breadcrumb">
                            <Link to="/services" className="cer-bc-link">Services</Link>
                            <span className="cer-bc-sep">›</span>
                            <span className="cer-bc-current cer-hero-item" style={{ animationDelay: '0.25s' }}>Interior & Surface Solutions</span>
                        </div>
                        <p className="cer-eyebrow">Interior & Surface</p>
                        <h1 className="cer-title cer-hero-item" style={{ animationDelay: '0.25s' }}>
                            INTERIOR &<br />
                            <span className="cer-gold">SURFACE</span>
                        </h1>
                        <p className="cer-hero-desc cer-hero-item" style={{ animationDelay: '0.35s' }}>
                            From CNC-carved wood panels to artificial marble and modular systems,
                            we craft interior environments that are functional, refined, and built
                            to represent your brand at its very best.
                        </p>
                        <a href="mailto:crystaladvertising777@gmail.com" className="cer-quote-btn">
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="cer-included">
                    <div className="cer-included-inner">
                        <div className="cer-section-header cer-fade">
                            <p className="cer-eyebrow cer-eyebrow-dark">What's Included</p>
                            <h2 className="cer-section-title">
                                Crafted with<br />
                                <span className="cer-gold">Precision.</span>
                            </h2>
                        </div>

                        <div className="cer-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`cer-row ${isReverse ? 'cer-row-reverse' : ''}`}
                                    >
                                        <div className={`cer-row-media ${isReverse ? 'cer-fade-right' : 'cer-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="cer-row-text cer-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="cer-row-num">{w.number}</span>
                                            <h3 className="cer-row-title">{w.title}</h3>
                                            <span className="cer-row-rule" aria-hidden="true" />
                                            <p className="cer-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="cer-why">
                    <div className="cer-why-inner">
                        <div className="cer-why-left cer-fade-left">
                            <p className="cer-eyebrow cer-eyebrow-dark">Why Crystal</p>
                            <h2 className="cer-section-title">
                                Durable.<br />Beautiful.<br />
                                <span className="cer-gold">Built to Last.</span>
                            </h2>
                            <p className="cer-why-desc">
                                With 30+ years of interior fabrication experience across the UAE,
                                we combine precision engineering with considered design to deliver
                                surfaces and fit-outs that hold their quality through years of daily use.
                                Every project is managed in-house from fabrication to installation,
                                ensuring a seamless result that meets your timeline and specification.
                            </p>
                        </div>

                        <div className="cer-stats cer-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={200} suffix="+" label="Fit-outs Delivered" />
                            <AnimatedStat value={100} suffix="%" label="Custom Made" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="cer-cta">
                    <div className="cer-cta-inner">
                        <div className="cer-cta-text cer-fade-left">
                            <p className="cer-eyebrow cer-eyebrow-dark">Start Today</p>
                            <h2 className="cer-cta-title">
                                Create something<br />
                                <span className="cer-gold">lasting in your space.</span>
                            </h2>
                        </div>
                        <div className="cer-fade" style={{ transitionDelay: '0.2s' }}>
                            <a href="mailto:crystaladvertising777@gmail.com" className="cer-quote-btn">
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