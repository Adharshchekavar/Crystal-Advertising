import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../styles/PromotionalService.css';

// Hero
import heroImg from '../assets/promotion/hero.png';

// What's Included imagery
import tshirt1Img from '../assets/promotion/tshirt1.png';
import tshirt2Img from '../assets/promotion/tshirt2.png';
import capImg from '../assets/promotion/cap.png';
import mug1Img from '../assets/promotion/mug1.png';
import mug2Img from '../assets/promotion/mug2.png';
import key1Img from '../assets/promotion/key1.png';
import key2Img from '../assets/promotion/key2.png';
import pen1Img from '../assets/promotion/pen1.png';
import pen2Img from '../assets/promotion/pen2.jpeg';
import bagImg from '../assets/promotion/bag.png';
import idImg from '../assets/promotion/id.png';
import stationaryImg from '../assets/promotion/stationary.png';

const works = [
    {
        title: 'T-Shirt Printing',
        number: '01',
        images: [tshirt1Img, tshirt2Img],
        description: `Custom t-shirt printing is one of the most powerful and enduring ways to put your brand in front of an audience. We offer screen printing, heat transfer, and direct-to-garment (DTG) methods across a full range of fabric weights and fits — from lightweight promotional tees to premium cotton styles. Every print is colour-matched to your brand guidelines, ensuring consistent, vibrant results whether you're ordering ten pieces for a team event or a thousand for a product launch. The result is a wearable brand asset your audience will reach for again and again.`,
    },
    {
        title: 'Cap Printing',
        number: '02',
        images: [capImg],
        description: `Branded caps are a timeless promotional staple that combines daily wearability with maximum logo visibility. We produce embroidered and printed caps across a wide range of styles — structured snapbacks, unstructured dad caps, trucker hats, and beanies — using premium headwear blanks that hold their shape and colour wash after wash. Whether for corporate gifting, team uniforms, or event giveaways, a well-branded cap carries your identity into every setting your audience moves through, turning everyday wear into consistent brand impressions.`,
    },
    {
        title: 'Mug Printing',
        number: '03',
        images: [mug1Img, mug2Img],
        description: `A branded mug is one of the most retained promotional items in existence — kept on desks, used daily, and seen by everyone in the room. We produce full-wrap and spot-print ceramic and travel mugs using dye-sublimation and heat-press transfer techniques that deliver rich, durable colour with exceptional longevity. From a clean logo mark on a classic white mug to a fully wrapped panoramic design, our mug printing ensures your brand is part of your client's or team member's daily routine — morning coffee included.`,
    },
    {
        title: 'Keychain Printing',
        number: '04',
        images: [key1Img, key2Img],
        description: `Keychains are compact, cost-effective, and extraordinarily high-retention promotional items — carried in pockets and bags every single day. We produce custom keychains in acrylic, metal, PVC, and leather, with your logo or artwork applied via laser engraving, UV printing, or epoxy doming for a premium, long-lasting finish. Available in a wide range of shapes and sizes, our custom keychains are ideal for trade shows, product launches, and branded gifting programmes where you want maximum exposure from a minimal footprint.`,
    },
    {
        title: 'Pen Printing',
        number: '05',
        images: [pen1Img, pen2Img],
        description: `The branded pen remains one of the most universally effective promotional tools — used multiple times a day and frequently passed between hands, multiplying your brand's reach with every use. We offer a comprehensive range of pen styles, from sleek metal ballpoints and stylus pens to soft-touch rubberised bodies and eco-friendly options, all customised with your logo via pad printing, laser engraving, or digital print. With consistent ink performance and premium finishes, our branded pens reflect the quality and professionalism your brand deserves.`,
    },
    {
        title: 'Tote Bag Printing',
        number: '06',
        images: [bagImg],
        description: `Custom tote bags have earned their place as one of the most sought-after promotional items — practical, reusable, and increasingly preferred over single-use alternatives. We produce totes in cotton canvas, non-woven polypropylene, and jute, with your artwork applied via screen printing, heat transfer, or full-colour digital print across a generous print area. Whether used as conference swag, retail packaging, or a standalone gifting item, a well-branded tote bag travels through cities, offices, and markets — turning every outing into an organic brand moment.`,
    },
    {
        title: 'ID Card Printing',
        number: '07',
        images: [idImg],
        description: `A professionally printed ID card does more than identify — it communicates authority, trust, and brand consistency across every touchpoint. We produce custom ID cards in PVC and composite materials with full-colour single or double-sided printing, lamination, and optional extras such as magnetic stripes, barcodes, QR codes, and RFID chip embedding. Whether you need employee passes, access cards, membership cards, or visitor badges, our ID card printing delivers a clean, durable result that upholds your organisation's professional image every day.`,
    },
    {
        title: 'Office Stationery',
        number: '08',
        images: [stationaryImg],
        description: `Cohesive branded stationery transforms everyday office items into consistent touchpoints for your brand identity. We produce full suites of custom office stationery — letterheads, compliment slips, envelopes, notepads, folders, and presentation covers — all printed to the same exacting colour standards. Whether you're establishing a new corporate identity or refreshing an existing one, our stationery printing ensures that every document, folder, and note your team sends out reflects the same professionalism and attention to detail that defines your business.`,
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
        <div className="promo-stat" ref={ref}>
            <span className="promo-stat-num">{count}{suffix}</span>
            <span className="promo-stat-label">{label}</span>
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
            className={`promo-lightbox${closing ? ' promo-lb-closing' : ''}`}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
        >
            <div className="promo-lb-img-wrap" onClick={(e) => e.stopPropagation()}>
                <button className="promo-lb-close" onClick={close} aria-label="Close">✕</button>
                <img className="promo-lb-img" src={src} alt={alt} />
                <p className="promo-lb-caption">{alt}</p>
            </div>
        </div>
    );
}

/* ── Media block ── */
function WorkMedia({ images, title, onImageClick }) {
    if (images.length === 1) {
        return (
            <div className="promo-media promo-media-single">
                <img
                    src={images[0]}
                    alt={title}
                    loading="lazy"
                    onClick={() => onImageClick(images[0], title)}
                />
                <span className="promo-media-frame" aria-hidden="true" />
            </div>
        );
    }
    return (
        <div className="promo-media promo-media-stack">
            <img
                className="promo-media-base"
                src={images[0]}
                alt={title}
                loading="lazy"
                onClick={() => onImageClick(images[0], title)}
            />
            <img
                className="promo-media-overlay"
                src={images[1]}
                alt={`${title} detail`}
                loading="lazy"
                onClick={() => onImageClick(images[1], `${title} detail`)}
            />
            <span className="promo-media-frame" aria-hidden="true" />
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
                        e.target.classList.add('promo-in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
        );
        root.querySelectorAll('.promo-fade, .promo-fade-left, .promo-fade-right').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
    return ref;
}

/* ── Page ── */
export default function PromotionalService() {
    const pageRef = useScrollReveal();
    const [lightbox, setLightbox] = useState(null);

    const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
    const closeLightbox = useCallback(() => setLightbox(null), []);

    return (
        <div className="promo-page" ref={pageRef}>
            <SEO
                title="Promotional Merchandise & Corporate Gifts | Crystal Advertising UAE"
                description="Custom branded promotional merchandise in UAE: t-shirts, caps, mugs, keychains, pens, tote bags, ID cards & office stationery. Crystal Advertising, Ras Al Khaimah."
                path="/services/promotional"
                breadcrumbs={[
                    { name: 'Services', url: '/services' },
                    { name: 'Promotional Merchandise', url: '/services/promotional' },
                ]}
                serviceSchema={{
                    name: 'Promotional Merchandise & Corporate Gifts',
                    description: 'Custom branded apparel, accessories, corporate gifts and stationery for events and marketing campaigns in UAE.',
                }}
            />
            <Navbar />
            <main className="promo-main">

                {/* ── Hero ── */}
                <section className="promo-hero">
                    <div className="promo-hero-img-wrap">
                        <img src={heroImg} alt="Crystal Advertising promotional merchandise and branded products UAE" className="promo-hero-img" />
                        <div className="promo-hero-overlay" />
                    </div>
                    <div className="promo-hero-content">
                        <div className="promo-breadcrumb">
                            <Link to="/services" className="promo-bc-link">Services</Link>
                            <span className="promo-bc-sep">›</span>
                            <span className="promo-bc-current promo-hero-item" style={{ animationDelay: '0.25s' }}>Promotional Merchandise</span>
                        </div>
                        <p className="promo-eyebrow">Brand Merchandise</p>
                        <h1 className="promo-title promo-hero-item" style={{ animationDelay: '0.25s' }}>
                            PROMOTIONAL<br />
                            <span className="promo-gold">MERCHANDISE</span>
                        </h1>
                        <p className="promo-hero-desc promo-hero-item" style={{ animationDelay: '0.35s' }}>
                            Put your brand in the hands of your audience — literally.
                            From apparel to accessories, every item is crafted to carry
                            your identity into everyday life with quality that lasts.
                        </p>
                        <a
                            href="https://wa.me/971528588613?text=GET%20A%20QUOTE"
                            target="_blank"
                            rel="noreferrer"
                            className="promo-quote-btn"
                        >
                            Get a Quote
                        </a>
                    </div>
                </section>

                {/* ── What's Included ── */}
                <section className="promo-included">
                    <div className="promo-included-inner">
                        <div className="promo-section-header promo-fade">
                            <p className="promo-eyebrow promo-eyebrow-dark">What's Included</p>
                            <h2 className="promo-section-title">
                                Your Brand,<br />
                                <span className="promo-gold">On Everything.</span>
                            </h2>
                        </div>

                        <div className="promo-rows">
                            {works.map((w, i) => {
                                const isReverse = i % 2 === 1;
                                return (
                                    <article
                                        key={w.title}
                                        className={`promo-row ${isReverse ? 'promo-row-reverse' : ''}`}
                                    >
                                        <div className={`promo-row-media ${isReverse ? 'promo-fade-right' : 'promo-fade-left'}`}>
                                            <WorkMedia
                                                images={w.images}
                                                title={w.title}
                                                onImageClick={openLightbox}
                                            />
                                        </div>
                                        <div className="promo-row-text promo-fade" style={{ transitionDelay: '0.15s' }}>
                                            <span className="promo-row-num">{w.number}</span>
                                            <h3 className="promo-row-title">{w.title}</h3>
                                            <span className="promo-row-rule" aria-hidden="true" />
                                            <p className="promo-row-desc">{w.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Why Us ── */}
                <section className="promo-why">
                    <div className="promo-why-inner">
                        <div className="promo-why-left promo-fade-left">
                            <p className="promo-eyebrow promo-eyebrow-dark">Why Crystal</p>
                            <h2 className="promo-section-title">
                                Branded.<br />Quality.<br />
                                <span className="promo-gold">Memorable.</span>
                            </h2>
                            <p className="promo-why-desc">
                                With 30+ years serving the UAE market, we source premium blanks
                                and apply precision printing and embroidery techniques that keep
                                your brand looking sharp — from the first use to the hundredth.
                                Flexible minimums for startups, bulk pricing for enterprises.
                            </p>
                        </div>

                        <div className="promo-stats promo-fade-right" style={{ transitionDelay: '0.1s' }}>
                            <AnimatedStat value={30} suffix="+" label="Years Experience" />
                            <AnimatedStat value={50} suffix="+" label="Product Types" />
                            <AnimatedStat value={100} suffix="%" label="Custom Made" />
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="promo-cta">
                    <div className="promo-cta-inner">
                        <div className="promo-cta-text promo-fade-left">
                            <p className="promo-eyebrow promo-eyebrow-dark">Start Today</p>
                            <h2 className="promo-cta-title">
                                Ready to brand<br />
                                your <span className="promo-gold">merchandise?</span>
                            </h2>
                        </div>
                        <div className="promo-fade" style={{ transitionDelay: '0.2s' }}>
                            <Link
                                to="/contact"
                                className="promo-quote-btn"
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