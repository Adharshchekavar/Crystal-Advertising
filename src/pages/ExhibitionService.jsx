import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/ExhibitionService.css';

// Hero
import heroImg from '../assets/exhibition/hero.jpeg';

// What's Included imagery
import exhibitionImg from '../assets/exhibition/exhibition.png';
import publicImg from '../assets/exhibition/public.png';
import moonImg from '../assets/exhibition/moon.png';
import maskImg from '../assets/exhibition/mask.png';
import structure1Img from '../assets/exhibition/structure1.png';
import structure2Img from '../assets/exhibition/structure2.png';
import stallImg from '../assets/exhibition/stall.png';
import demoImg from '../assets/exhibition/demo.png';

const works = [
    {
        title: 'Custom Exhibition Structures',
        number: '01',
        images: [exhibitionImg],
        description: `A custom exhibition structure is your brand's most powerful physical presence at any trade show, expo, or industry event — a fully engineered environment designed to attract, engage, and impress from every angle on the floor. We design and fabricate bespoke exhibition structures from concept to completion, combining structural steel and aluminium frameworks with premium surface finishes, large-format graphic integration, built-in lighting, and branded architectural details that make your stand unmissable in even the most crowded exhibition halls. Every structure is engineered for safe assembly, reliable reuse, and efficient logistics across multiple events.`,
    },
    {
        title: 'Public Branding Installations',
        number: '02',
        images: [publicImg],
        description: `Public branding installations place your brand in the heart of shared spaces — parks, plazas, retail corridors, and public events — creating experiential brand moments that reach audiences far beyond traditional advertising formats. We design and fabricate custom public installations including branded archways, sculptural display structures, wayfinding totems, sponsor activation zones, and immersive environmental graphics. Built for structural integrity and weather resistance, our public installations are engineered to perform safely in open-air environments while delivering a visual impact that generates organic engagement, photography, and lasting brand recall.`,
    },
    {
        title: 'Decorative Laser-Cut Panels',
        number: '03',
        images: [moonImg, maskImg],
        description: `Laser-cut decorative panels represent the intersection of precision engineering and artistic expression — producing intricate patterns, cultural motifs, and architectural screens with a level of detail and repeatability that no other fabrication method can match. We cut panels across a wide range of materials including mild steel, stainless steel, aluminium, acrylic, and MDF, producing everything from delicate Arabic geometric lattices and custom logo screens to large-scale architectural cladding and event backdrop panels. Each panel is finished with powder coating, anodising, or paint to your exact specification, creating a visual element that is as durable as it is distinctive.`,
    },
    {
        title: 'Architectural Wooden Structures',
        number: '04',
        images: [structure1Img, structure2Img],
        description: `Architectural wooden structures bring warmth, texture, and organic character to exhibition, retail, and public environments in a way that no synthetic material can replicate. We design and fabricate large-scale timber structures including feature archways, branded pavilions, decorative ceiling installations, and spatial dividers using engineered timber, solid hardwood, and premium MDF with CNC-routed detailing. Every structure is designed with both aesthetic intent and structural rigour — engineered to bear load, resist movement, and maintain its form and finish through repeated installation and dismantling cycles across multiple events or permanent installations.`,
    },
    {
        title: 'Exhibition Stalls',
        number: '05',
        images: [stallImg],
        description: `Your exhibition stall is the single most concentrated expression of your brand at any trade show or expo — and we design and build stalls that work as hard as you do. From compact shell scheme upgrades and portable pop-up displays to fully custom double-deck structures spanning hundreds of square metres, we deliver complete stall solutions that integrate structural fabrication, graphic production, furniture, flooring, lighting, and AV into a single cohesive brand environment. Our turnkey service covers design, fabrication, transport, on-site installation, and post-event dismantling — so you arrive ready to engage, and leave without a single worry about logistics.`,
    },
    {
        title: 'Structural Design Solutions',
        number: '06',
        images: [demoImg],
        description: `Behind every successful large-scale installation is a structural design process that balances creative ambition with engineering reality. Our in-house design team works at the intersection of architectural intent and fabrication practicality, producing detailed structural design solutions for complex exhibition builds, permanent public installations, and bespoke architectural features. We deliver full concept drawings, 3D visualisations, material specifications, and engineering sign-off documentation — giving clients, venues, and contractors the complete technical confidence to approve, build, and install structures that are safe, stable, and visually exceptional in every environment they inhabit.`,
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
        <div className="exh-stat" ref={ref}>
            <span className="exh-stat-num">{count}{suffix}</span>
            <span className="exh-stat-label">{label}</span>
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
            className={`exh-lightbox${closing ? ' exh-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="exh-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="exh-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="exh-lb-img" src={src} alt={alt} />
                <p className="exh-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="exh-media exh-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="exh-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="exh-media exh-media-stack">
            <img
                className="exh-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="exh-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="exh-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('exh-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.exh-fade, .exh-fade-left, .exh-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function ExhibitionService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="exh-page" ref={pageRef}>
            <SEO
                title="Exhibition Stands & Outdoor Structures | Crystal Advertising UAE"
                description="Custom exhibition stalls, laser-cut panels, wooden structures & outdoor installations in UAE. Crystal Advertising delivers turnkey exhibition solutions for trade shows across UAE & GCC."
                path="/services/exhibition"
                breadcrumbs={[
                    { name: 'Services', url: '/services' },
                    { name: 'Exhibition & Structures', url: '/services/exhibition' },
                ]}
                serviceSchema={{
                    name: 'Exhibition Stands & Outdoor Structures',
                    description: 'Bespoke exhibition stalls, laser-cut panels, architectural wooden structures and public installations across UAE and GCC.',
                }}
            />
            <Navbar />
            <main className="exh-main">

                {/* ── Hero ── */}
                <section className="exh-hero">
                    <div className="exh-hero-img-wrap">
                        <img src={heroImg} alt="Crystal Advertising exhibition structures and outdoor installations UAE" className="exh-hero-img" />
                        <div className="exh-hero-overlay" />
                    </div>
                    <div className="exh-hero-content">
                        <div className="exh-breadcrumb">
                            <Link to="/services" className="exh-bc-link">Services</Link>
                            <span className="exh-bc-sep">›</span>
                            <span className="exh-bc-current exh-hero-item" style={{ animationDelay: '0.25s' }}>Outdoor Advertising & Structures</span>
                        </div>
                        <p className="exh-eyebrow">Structures & Installations</p>
                        <h1 className="exh-title exh-hero-item" style={{ animationDelay: '0.25s' }}>
                            OUTDOOR &<br />
                            <span className="exh-gold">STRUCTURES</span>
                        </h1>
                        <p className="exh-hero-desc exh-hero-item" style={{ animationDelay: '0.35s' }}>
                            From custom exhibition builds and laser-cut panels to architectural
                            timber structures and public installations — we design, fabricate,
                            and deliver structures that make your brand stand out in any space.
                        </p>
                        <a
                            href="https://wa.me/971528588613?text=GET%20A%20QUOTE"
                            target="_blank"
                            rel="noreferrer"
                            className="exh-quote-btn"
                        >
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="exh-included">
                    <div className="exh-included-inner">
                        <div className="exh-section-header exh-fade">
                            <p className="exh-eyebrow exh-eyebrow-dark">What's Included</p>
                            <h2 className="exh-section-title">
                                Stands that<br />
                                <span className="exh-gold">Stand Out.</span>
                            </h2>
                        </div>

                        <div className="exh-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`exh-row ${isReverse ? 'exh-row-reverse' : ''}`}
                                    >
                                        <div className={`exh-row-media ${isReverse ? 'exh-fade-right' : 'exh-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="exh-row-text exh-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="exh-row-num">{w.number}</span>
                                            <h3 className="exh-row-title">{w.title}</h3>
                                            <span className="exh-row-rule" aria-hidden="true" />
                                            <p className="exh-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="exh-why">
                    <div className="exh-why-inner">
                        <div className="exh-why-left exh-fade-left">
                            <p className="exh-eyebrow exh-eyebrow-dark">Why Crystal</p>
                            <h2 className="exh-section-title">
                                Complete<br />Turnkey<br />
                                <span className="exh-gold">Solution.</span>
                            </h2>
                            <p className="exh-why-desc">
                                With 30+ years of fabrication and installation experience across
                                UAE and GCC events, we manage every aspect of your exhibition
                                or structural project — design, engineering, fabrication, transport,
                                installation, and dismantling. You focus on your audience;
                                we handle everything else, on time and on specification.
                            </p>
                        </div>

                        <div className="exh-stats exh-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={300} suffix="+" label="Structures Built" />
                            <AnimatedStat value={100} suffix="%" label="End-to-End Service" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="exh-cta">
                    <div className="exh-cta-inner">
                        <div className="exh-cta-text exh-fade-left">
                            <p className="exh-eyebrow exh-eyebrow-dark">Start Today</p>
                            <h2 className="exh-cta-title">
                                Ready for your<br />
                                <span className="exh-gold">next exhibition?</span>
                            </h2>
                        </div>
                        <div className="exh-fade" style={{ transitionDelay: '0.2s' }}>
                            <Link
                                to="/contact"
                                className="exh-quote-btn"
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