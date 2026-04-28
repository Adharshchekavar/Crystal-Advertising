import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/R4NJoM9Vx1NDwHWV7";

// Embed URL from Google Maps share → Embed a map
// Crystal Advertising — QXPG+H2J, Al Araibi, Ras Al Khaimah, UAE
const EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14370.023596288!2d55.975721!3d25.786879!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef677eae8380eff%3A0xb86deb754dddfe5!2sCrystal!5e0!3m2!1sen!2sin!4v1777352710285!5m2!1sen!2sin";

const INFO_CARDS = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        label: "Address",
        value: "QXPG+H2J, Al Araibi, Ras Al Khaimah, UAE",
        href: GOOGLE_MAPS_LINK,
        isLink: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
        ),
        label: "WhatsApp",
        value: "+971 52 858 8613",
        href: "https://wa.me/00971528588613",
        isLink: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        label: "Email",
        value: "crystaladvertising777@gmail.com",
        href: "mailto:crystaladvertising777@gmail.com",
        isLink: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="#C9A84C" stroke="none" />
            </svg>
        ),
        label: "Instagram",
        value: "@crystaladvertising__",
        href: "https://instagram.com/crystaladvertising__",
        isLink: true,
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        label: "Working Hours",
        value: "Mon – Sat: 8:00 AM – 6:00 PM",
        href: null,
        isLink: false,
    },
];

export default function LocationSection() {
    return (
        <section className="location-section" id="location">

            {/* ── Header ── */}
            <motion.div
                className="loc-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
            >
                <span className="rw-label">Find Us</span>
                <h2 className="loc-heading">OUR LOCATION</h2>
                <p className="loc-sub">
                    Visit our facility in Ras Al Khaimah, UAE — where ideas become reality.
                </p>
            </motion.div>

            {/* ── Main layout ── */}
            <div className="loc-layout">

                {/* Left — Map */}
                <motion.div
                    className="loc-map-wrap"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        title="Crystal Advertising — Ras Al Khaimah"
                        src={EMBED_SRC}
                        className="loc-map-iframe"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    {/* Floating open button */}
                    <a
                        href={GOOGLE_MAPS_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="loc-open-btn"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Open in Google Maps
                    </a>
                </motion.div>

                {/* Right — Info */}
                <motion.div
                    className="loc-info"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    {INFO_CARDS.map((card, i) => (
                        <motion.div
                            key={card.label}
                            className="loc-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                        >
                            <div className="loc-icon-wrap">{card.icon}</div>
                            <div>
                                <p className="loc-card-label">{card.label}</p>
                                {card.isLink ? (
                                    <a
                                        href={card.href}
                                        target={card.href.startsWith("http") ? "_blank" : undefined}
                                        rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                                        className="loc-card-value loc-link"
                                    >
                                        {card.value}
                                    </a>
                                ) : (
                                    <p className="loc-card-value">{card.value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    <a
                        href={GOOGLE_MAPS_LINK}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold loc-directions-btn"
                    >
                        Get Directions
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}