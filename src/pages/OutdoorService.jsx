import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import CopyEmailBtn from '../components/CopyEmailBtn';
import '../styles/OutdoorService.css';

// Hero
import heroImg from '../assets/outdoor/hero.png';

// What's Included imagery
import banner1Img from '../assets/outdoor/banner1.jpeg';
import banner2Img from '../assets/outdoor/banner2.png';
import billboardImg from '../assets/outdoor/billboard.png';
import vehicleImg from '../assets/outdoor/vehicle.jpeg';
import buildingImg from '../assets/outdoor/building.jpeg';
import displayImg from '../assets/outdoor/display.png';

const works = [
    {
        title: 'Banner Printing',
        number: '01',
        images: [banner1Img, banner2Img],
        description: `Banners remain one of the most versatile and cost-effective outdoor advertising formats available — high-impact, fast to deploy, and effective across a vast range of environments. We produce banners in PVC flex, mesh, and fabric materials with UV-resistant, weatherproof inks that maintain vivid colour and sharp detail even under prolonged exposure to the UAE's intense sun and humidity. From event backdrops and road-facing flex banners to hanging displays and retail fascias, every banner is finished with reinforced hems and rust-proof eyelets built for outdoor durability.`,
    },
    {
        title: 'Billboard Advertising',
        number: '02',
        images: [billboardImg],
        description: `Billboards command attention at scale — positioned along high-traffic roads, junctions, and urban corridors, they deliver your brand message to thousands of viewers every single day. We produce large-format billboard graphics on premium flex and backlit substrates, engineered for structural rigidity and UV stability across extended outdoor campaigns. Our production process includes precision colour management to ensure your brand's identity is reproduced faithfully at massive scale, with the clarity and impact that only a billboard can deliver in a competitive outdoor landscape.`,
    },
    {
        title: 'Vehicle Wraps',
        number: '03',
        images: [vehicleImg],
        description: `A wrapped vehicle is a moving billboard — your brand travels with it through every street, car park, and motorway in the UAE, accumulating thousands of impressions daily at a fraction of the cost of static media. We use premium cast vinyl from industry-leading manufacturers, applied by our certified installation team using heat-forming techniques that conform perfectly to every curve, panel, and recess. Whether you need a full wrap, a partial livery, or a fleet of branded commercial vehicles, we deliver finishes that are visually seamless, durable, and designed to represent your brand professionally on every journey.`,
    },
    {
        title: 'Building Wraps',
        number: '04',
        images: [buildingImg],
        description: `Few advertising formats command attention like a building wrap — transforming an entire façade into a monumental brand canvas visible from hundreds of metres away. We produce large-scale building wraps using breathable mesh vinyl and perforated materials that allow airflow through the substrate while maintaining full graphic fidelity from street level. Engineered for structural wind load and UV resistance, our building wraps are produced with precision tiling and reinforced anchor points to ensure they remain secure, taut, and visually impactful throughout the full duration of your campaign.`,
    },
    {
        title: 'Outdoor LED Displays',
        number: '05',
        images: [displayImg],
        description: `Outdoor LED displays represent the pinnacle of dynamic outdoor advertising — delivering full-motion content, real-time messaging, and eye-catching luminosity that no static format can match. We supply, install, and maintain high-brightness outdoor LED panels engineered for UAE conditions, with IP-rated weatherproofing, automatic brightness adjustment for day and night visibility, and robust aluminium cabinet construction. Whether for permanent installations, retail frontage, event screens, or roadside digital billboards, our LED solutions ensure your brand message is always vivid, always current, and impossible to ignore.`,
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
        <div className="out-stat" ref={ref}>
            <span className="out-stat-num">{count}{suffix}</span>
            <span className="out-stat-label">{label}</span>
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
            className={`out-lightbox${closing ? ' out-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="out-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="out-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="out-lb-img" src={src} alt={alt} />
                <p className="out-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="out-media out-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="out-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="out-media out-media-stack">
            <img
                className="out-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="out-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="out-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('out-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.out-fade, .out-fade-left, .out-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function OutdoorService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="out-page" ref={pageRef}>
            <SEO
                title="Outdoor Advertising — Banners, Billboards & Vehicle Wraps | Crystal Advertising UAE"
                description="Large-format outdoor advertising in UAE: banner printing, billboard graphics, vehicle wraps, building wraps & LED displays. Crystal Advertising — 30+ years, Ras Al Khaimah."
                path="/services/outdoor"
                breadcrumbs={[
                    { name: 'Services', url: '/services' },
                    { name: 'Outdoor Graphics', url: '/services/outdoor' },
                ]}
                serviceSchema={{
                    name: 'Outdoor Advertising & Graphics',
                    description: 'Large-format outdoor banners, billboards, vehicle wraps, building wraps and LED display advertising across UAE.',
                }}
            />
            <Navbar />
            <main className="out-main">

                {/* ── Hero ── */}
                <section className="out-hero">
                    <div className="out-hero-img-wrap">
                        <img src={heroImg} alt="Outdoor Advertising" className="out-hero-img" />
                        <div className="out-hero-overlay" />
                    </div>
                    <div className="out-hero-content">
                        <div className="out-breadcrumb">
                            <Link to="/services" className="out-bc-link">Services</Link>
                            <span className="out-bc-sep">›</span>
                            <span className="out-bc-current out-hero-item" style={{ animationDelay: '0.25s' }}>Outdoor Advertising</span>
                        </div>
                        <p className="out-eyebrow">Outdoor Advertising</p>
                        <h1 className="out-title out-hero-item" style={{ animationDelay: '0.25s' }}>
                            OUTDOOR<br />
                            <span className="out-gold">ADVERTISING</span>
                        </h1>
                        <p className="out-hero-desc out-hero-item" style={{ animationDelay: '0.35s' }}>
                            Bold, large-scale advertising built to dominate every environment.
                            From banners to building wraps and LED displays, we make your brand
                            impossible to ignore — wherever your audience moves.
                        </p>
                        <a 
                            href="https://wa.me/971528588613?text=GET%20A%20QUOTE" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="out-quote-btn"
                        >
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="out-included">
                    <div className="out-included-inner">
                        <div className="out-section-header out-fade">
                            <p className="out-eyebrow out-eyebrow-dark">What's Included</p>
                            <h2 className="out-section-title">
                                Bold. Large.<br />
                                <span className="out-gold">Unmissable.</span>
                            </h2>
                        </div>

                        <div className="out-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`out-row ${isReverse ? 'out-row-reverse' : ''}`}
                                    >
                                        <div className={`out-row-media ${isReverse ? 'out-fade-right' : 'out-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="out-row-text out-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="out-row-num">{w.number}</span>
                                            <h3 className="out-row-title">{w.title}</h3>
                                            <span className="out-row-rule" aria-hidden="true" />
                                            <p className="out-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="out-why">
                    <div className="out-why-inner">
                        <div className="out-why-left out-fade-left">
                            <p className="out-eyebrow out-eyebrow-dark">Why Crystal</p>
                            <h2 className="out-section-title">
                                Built for<br />the<br />
                                <span className="out-gold">Outdoors.</span>
                            </h2>
                            <p className="out-why-desc">
                                Every outdoor graphic we produce uses UV-resistant inks and
                                weatherproof substrates engineered to withstand the harsh UAE
                                climate — intense heat, humidity, and direct sun — without fading,
                                peeling, or losing impact. With 30+ years of experience and
                                UAE-wide coverage, we deliver outdoor advertising that performs
                                from day one to the last day of your campaign.
                            </p>
                        </div>

                        <div className="out-stats out-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={500} suffix="+" label="Outdoor Installs" />
                            <AnimatedStat value={100} suffix="%" label="UV Resistant" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="out-cta">
                    <div className="out-cta-inner">
                        <div className="out-cta-text out-fade-left">
                            <p className="out-eyebrow out-eyebrow-dark">Start Today</p>
                            <h2 className="out-cta-title">
                                Let your brand<br />
                                <span className="out-gold">dominate outdoors.</span>
                            </h2>
                        </div>
                        <div className="out-fade" style={{ transitionDelay: '0.2s' }}>
                            <Link 
                                to="/contact" 
                                className="out-quote-btn"
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