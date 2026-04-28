import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/UvService.css';

// Hero
import uvBackImg from '../assets/printing/uv_back.png';

// What's Included imagery
import uvCuttingImg from '../assets/printing/uv_cutting.png';
import digital1Img from '../assets/printing/digital_1.png';
import digital2Img from '../assets/printing/digital_2.png';
import offset1Img from '../assets/printing/offset_1.png';
import offset2Img from '../assets/printing/offset_2.png';
import brochureImg from '../assets/printing/brochure.png';
import cardImg from '../assets/printing/card.png';

const works = [
    {
        title: 'UV Printing',
        number: '01',
        images: [uvCuttingImg],
        description: `UV printing stands at the forefront of modern print technology, curing ink instantly with ultraviolet light to produce razor-sharp detail and brilliant colour on virtually any rigid or flexible substrate. Whether you need to print directly onto acrylic, wood, glass, aluminium, or PVC board, our UV flatbed printer delivers exceptional resolution with vibrant, fade-resistant output. The result is a finished product that commands attention — durable, tactile, and visually striking in any environment.`,
    },
    {
        title: 'Digital Printing',
        number: '02',
        images: [digital1Img, digital2Img],
        description: `Digital printing gives you the freedom to produce high-resolution, full-colour output with no plate setup and no minimum run constraints. Ideal for banners, posters, roll-ups, and marketing collateral, our digital printing process faithfully reproduces every gradient, fine line, and photographic detail with consistent accuracy across every sheet. Whether you need a single proof or a short run of bespoke materials, digital printing delivers professional results with a fast turnaround — perfectly suited for campaigns that demand both quality and speed.`,
    },
    {
        title: 'Offset Printing',
        number: '03',
        images: [offset1Img, offset2Img],
        description: `For high-volume print runs where colour consistency and cost efficiency are paramount, offset printing remains the gold standard. Using precise CMYK and Pantone colour matching, our offset presses reproduce your brand's exact colours across thousands of sheets with unwavering fidelity. From corporate stationery and catalogues to packaging and promotional materials, offset printing delivers a premium, polished finish that is both cost-effective at scale and unmatched in overall print quality.`,
    },
    {
        title: 'Brochure Printing',
        number: '04',
        images: [brochureImg],
        description: `A well-crafted brochure is one of the most powerful tangible touchpoints your brand can offer. We produce brochures across a full range of formats — tri-fold, bi-fold, saddle-stitched booklets, and gate-fold — printed on premium coated and uncoated stocks with your choice of gloss, matte, or soft-touch lamination. Every brochure is produced to the highest print standard, ensuring that the quality of the paper, the richness of the colour, and the crispness of the finish reflect the professionalism of your business.`,
    },
    {
        title: 'Business Card Printing',
        number: '05',
        images: [cardImg],
        description: `Your business card is often the first physical impression you make, and we ensure it's a memorable one. We offer a wide range of card finishes — from classic gloss and matte lamination to premium options such as spot UV, soft-touch coating, foil stamping, and thick duplex stocks. Every card is precision-cut and printed with rich, accurate colour that holds detail beautifully. Whether you require a minimalist typographic design or a bold, multi-layer specialty card, we produce business cards that feel as impressive as they look.`,
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
        <div className="uv-stat" ref={ref}>
            <span className="uv-stat-num">{count}{suffix}</span>
            <span className="uv-stat-label">{label}</span>
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
            className={`uv-lightbox${closing ? ' uv-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="uv-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="uv-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="uv-lb-img" src={src} alt={alt} />
                <p className="uv-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="uv-media uv-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="uv-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="uv-media uv-media-stack">
            <img
                className="uv-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="uv-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="uv-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('uv-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.uv-fade, .uv-fade-left, .uv-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function UvService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="uv-page" ref={pageRef}>
            <Navbar />
            <main className="uv-main">

                {/* ── Hero ── */}
                <section className="uv-hero">
                    <div className="uv-hero-img-wrap">
                        <img src={uvBackImg} alt="Printing Solutions" className="uv-hero-img" />
                        <div className="uv-hero-overlay" />
                    </div>
                    <div className="uv-hero-content">
                        <div className="uv-breadcrumb">
                            <Link to="/services" className="uv-bc-link">Services</Link>
                            <span className="uv-bc-sep">›</span>
                            <span className="uv-bc-current uv-hero-item" style={{ animationDelay: '0.25s' }}>Printing Solutions</span>
                        </div>
                        <p className="uv-eyebrow">Premium Printing</p>
                        <h1 className="uv-title uv-hero-item" style={{ animationDelay: '0.25s' }}>
                            PRINTING<br />
                            <span className="uv-gold">SOLUTIONS</span>
                        </h1>
                        <p className="uv-hero-desc uv-hero-item" style={{ animationDelay: '0.35s' }}>
                            From UV flatbed to precision offset, we deliver printing that speaks
                            for your brand without compromise. Every substrate, every finish,
                            every run — crafted to the highest standard.
                        </p>
                        <a href="mailto:crystaladvertising777@gmail.com" className="uv-quote-btn">
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="uv-included">
                    <div className="uv-included-inner">
                        <div className="uv-section-header uv-fade">
                            <p className="uv-eyebrow uv-eyebrow-dark">What's Included</p>
                            <h2 className="uv-section-title">
                                Premium Print,<br />
                                <span className="uv-gold">Every Format.</span>
                            </h2>
                        </div>

                        <div className="uv-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`uv-row ${isReverse ? 'uv-row-reverse' : ''}`}
                                    >
                                        <div className={`uv-row-media ${isReverse ? 'uv-fade-right' : 'uv-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="uv-row-text uv-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="uv-row-num">{w.number}</span>
                                            <h3 className="uv-row-title">{w.title}</h3>
                                            <span className="uv-row-rule" aria-hidden="true" />
                                            <p className="uv-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="uv-why">
                    <div className="uv-why-inner">
                        <div className="uv-why-left uv-fade-left">
                            <p className="uv-eyebrow uv-eyebrow-dark">Why Crystal</p>
                            <h2 className="uv-section-title">
                                Colour.<br />Clarity.<br />
                                <span className="uv-gold">Consistency.</span>
                            </h2>
                            <p className="uv-why-desc">
                                With 30+ years serving the UAE market, our print facility is equipped
                                with industry-leading presses and operated by experienced print specialists.
                                Every job is colour-managed from file to finish, ensuring your brand
                                looks exactly as intended — every single time.
                            </p>
                        </div>

                        <div className="uv-stats uv-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={1000} suffix="+" label="Print Jobs Done" />
                            <AnimatedStat value={100} suffix="%" label="Colour Accurate" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="uv-cta">
                    <div className="uv-cta-inner">
                        <div className="uv-cta-text uv-fade-left">
                            <p className="uv-eyebrow uv-eyebrow-dark">Start Today</p>
                            <h2 className="uv-cta-title">
                                Ready to print<br />
                                with <span className="uv-gold">confidence?</span>
                            </h2>
                        </div>
                        <div className="uv-fade" style={{ transitionDelay: '0.2s' }}>
                            <a href="mailto:crystaladvertising777@gmail.com" className="uv-quote-btn">
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