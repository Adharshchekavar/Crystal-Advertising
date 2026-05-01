import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import LocationSection from '../components/LocationSection';
import CopyEmailBtn from '../components/CopyEmailBtn';
import '../styles/ContactPage.css';

// ─── EmailJS Config — fill in your credentials ───────────────────────────────
const EMAILJS_SERVICE_ID = 'service_icrv1gu';
const EMAILJS_TEMPLATE_ID = 'template_4oeftss';
const EMAILJS_PUBLIC_KEY = 'MyM-oHTQ0Msg5eVmC';

// ─── Contact info cards ───────────────────────────────────────────────────────
const INFO_ITEMS = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
        ),
        label: 'Call Us',
        value: '+971 52 858 8613',
        href: 'tel:+971528588613',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: 'Email Us',
        value: 'crystaladvertising777@gmail.com',
        isCopyEmail: true,
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: 'Open Hours',
        value: 'Mon – Sat: 8:00 AM – 9:00 PM',
        href: null,
    },
];

const HEAR_OPTIONS = [
    'Google Search',
    'Social Media (Instagram / Facebook)',
    'Word of Mouth',
    'Walk-in / Passing By',
    'Referral from Existing Client',
    'Online Advertisement',
    'Other',
];

const LOOKING_OPTIONS = [
    'Signage Solution',
    'UV Printing',
    'Outdoor Graphics',
    'Promotional Merchandise',
    'Interior & Surface Solutions',
    'Digital Solutions',
    'Exhibition & Outdoor Structures',
    'Other / Not Sure',
];

const INIT = { name: '', phone: '', email: '', company: '', hear: '', looking: '', message: '' };

// ─── Save to localStorage (replace with Firebase later) ───────────────────────
function saveToLocal(data) {
    try {
        const existing = JSON.parse(localStorage.getItem('crystal_contacts') || '[]');
        existing.push({ ...data, submittedAt: new Date().toISOString() });
        localStorage.setItem('crystal_contacts', JSON.stringify(existing));
    } catch (_) { }
}

export default function ContactPage() {
    const formRef = useRef(null);
    const [fields, setFields] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const update = (key) => (e) => {
        setFields((p) => ({ ...p, [key]: e.target.value }));
        setErrors((p) => ({ ...p, [key]: '' }));
    };

    // ── Validation ──────────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!fields.name.trim()) e.name = 'Name is required';
        if (!fields.phone.trim()) e.phone = 'Phone is required';
        else if (!/^[+\d\s()-]{7,}$/.test(fields.phone)) e.phone = 'Enter a valid phone number';
        if (!fields.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Enter a valid email';
        if (!fields.hear) e.hear = 'Please select an option';
        if (!fields.looking) e.looking = 'Please select an option';
        if (!fields.message.trim()) e.message = 'Message is required';
        return e;
    };

    // ── Submit ──────────────────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setStatus('sending');
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            saveToLocal(fields);
            setStatus('success');
            setFields(INIT);
        } catch (_) {
            setStatus('error');
        }
    };

    const fd = (name) => ({ value: fields[name], onChange: update(name) });

    return (
        <div className="cp-page">
            <SEO
                title="Contact Us — Get a Free Quote | Crystal Advertising UAE"
                description="Contact Crystal Advertising LLC in Ras Al Khaimah, UAE. Call +971 52 858 8613 or email us for signage, branding and advertising quotes. Mon–Sat 8am–6pm."
                path="/contact"
                breadcrumbs={[{ name: 'Contact', url: '/contact' }]}
            />
            <Navbar />

            {/* ── Page heading ──────────────────────────────────────────────── */}
            <section className="cp-heading-section">
                <div className="cp-heading-inner">
                    <motion.p
                        className="cp-eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        Crystal Advertising
                    </motion.p>
                    <motion.h1
                        className="cp-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.1 }}
                    >
                        GET<br />
                        <span className="cp-title-gold">IN TOUCH</span>
                    </motion.h1>
                    <motion.nav
                        className="cp-breadcrumb"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                    >
                        <Link to="/" className="cp-bc-link">Home</Link>
                        <span className="cp-bc-sep">›</span>
                        <span className="cp-bc-current">Contact</span>
                    </motion.nav>
                </div>
                <div className="cp-heading-line" />
            </section>

            {/* ── Main layout ───────────────────────────────────────────────── */}
            <section className="cp-body">
                <div className="cp-layout">

                    {/* Left — info */}
                    <motion.div
                        className="cp-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="cp-info-lead">
                            Have a project in mind? Send us a message and our team will get
                            back to you within 24 hours.
                        </p>

                        <div className="cp-info-cards">
                            {INFO_ITEMS.map((item) => {
                                if (item.isCopyEmail) {
                                    return (
                                        <CopyEmailBtn key={item.label} className="cp-info-card cp-info-card--copy">
                                            <span className="cp-info-icon">{item.icon}</span>
                                            <div style={{ textAlign: 'left' }}>
                                                <p className="cp-info-label">{item.label}</p>
                                                <p className="cp-info-value">{item.value}</p>
                                            </div>
                                            <span className="cp-info-arrow">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                            </span>
                                        </CopyEmailBtn>
                                    );
                                }

                                const Tag = item.href ? 'a' : 'div';
                                const linkProps = item.href
                                    ? {
                                        href: item.href,
                                        target: item.href.startsWith('http') ? '_blank' : undefined,
                                        rel: 'noreferrer',
                                    }
                                    : {};
                                return (
                                    <Tag key={item.label} className="cp-info-card" {...linkProps}>
                                        <span className="cp-info-icon">{item.icon}</span>
                                        <div>
                                            <p className="cp-info-label">{item.label}</p>
                                            <p className="cp-info-value">{item.value}</p>
                                        </div>
                                        {item.href && (
                                            <span className="cp-info-arrow">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                                            </span>
                                        )}
                                    </Tag>
                                );
                            })}
                        </div>

                        {/* Social row */}
                        <div className="cp-social-row">
                            <a href="https://wa.me/00971528588613" target="_blank" rel="noreferrer" className="cp-social-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                                WhatsApp
                            </a>
                            <a href="https://instagram.com/crystaladvertising__" target="_blank" rel="noreferrer" className="cp-social-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                                </svg>
                                Instagram
                            </a>
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        className="cp-form-wrap"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <div className="cp-form-header">
                            <p className="cp-form-tagline">Send us your queries. We will get back to you.</p>
                        </div>

                        {status === 'success' ? (
                            <div className="cp-success">
                                <div className="cp-success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                                <button className="cp-submit" onClick={() => setStatus('idle')}>Send Another</button>
                            </div>
                        ) : (
                            <form ref={formRef} className="cp-form" onSubmit={handleSubmit} noValidate>

                                {/* Row 1: Name */}
                                <div className={`cp-field ${errors.name ? 'cp-field--error' : ''}`}>
                                    <span className="cp-field-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </span>
                                    <input name="from_name" type="text" placeholder="Your Name *" {...fd('name')} />
                                    {errors.name && <span className="cp-err">{errors.name}</span>}
                                </div>

                                {/* Row 2: Phone */}
                                <div className={`cp-field ${errors.phone ? 'cp-field--error' : ''}`}>
                                    <span className="cp-field-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                                    </span>
                                    <input name="phone" type="tel" placeholder="Your Phone *" {...fd('phone')} />
                                    {errors.phone && <span className="cp-err">{errors.phone}</span>}
                                </div>

                                {/* Row 3: Email */}
                                <div className={`cp-field ${errors.email ? 'cp-field--error' : ''}`}>
                                    <span className="cp-field-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                    </span>
                                    <input name="from_email" type="email" placeholder="Email *" {...fd('email')} />
                                    {errors.email && <span className="cp-err">{errors.email}</span>}
                                </div>

                                {/* Row 4: Company */}
                                <div className="cp-field">
                                    <span className="cp-field-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
                                    </span>
                                    <input name="company" type="text" placeholder="Company / Business Name" {...fd('company')} />
                                </div>

                                {/* Row 5: Hear dropdown */}
                                <div className={`cp-field cp-field--select ${errors.hear ? 'cp-field--error' : ''}`}>
                                    <select name="hear_about" {...fd('hear')}>
                                        <option value="">Where did you hear about us? *</option>
                                        {HEAR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <span className="cp-select-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                    </span>
                                    {errors.hear && <span className="cp-err">{errors.hear}</span>}
                                </div>

                                {/* Row 6: Looking for dropdown */}
                                <div className={`cp-field cp-field--select ${errors.looking ? 'cp-field--error' : ''}`}>
                                    <select name="looking_for" {...fd('looking')}>
                                        <option value="">What are you looking for? *</option>
                                        {LOOKING_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                    </select>
                                    <span className="cp-select-arrow">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                                    </span>
                                    {errors.looking && <span className="cp-err">{errors.looking}</span>}
                                </div>

                                {/* Row 7: Message */}
                                <div className={`cp-field cp-field--textarea ${errors.message ? 'cp-field--error' : ''}`}>
                                    <textarea name="message" placeholder="Message *" rows={5} {...fd('message')} />
                                    {errors.message && <span className="cp-err">{errors.message}</span>}
                                </div>

                                {status === 'error' && (
                                    <p className="cp-err-global">Something went wrong. Please try again or email us directly.</p>
                                )}

                                <button type="submit" className="cp-submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? (
                                        <><span className="cp-spinner" /> Sending…</>
                                    ) : (
                                        <>Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                </div>
            </section>

            {/* ── Location ──────────────────────────────────────────────────── */}
            <LocationSection />

            <Footer />
        </div>
    );
}
