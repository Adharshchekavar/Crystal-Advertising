import { Link } from 'react-router-dom';

const QUICK_LINKS = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Portfolio", path: "/#portfolio" },
    { label: "Contact", path: "/contact" },
];

const SERVICE_LINKS = [
    { label: "Signage Solution", path: "/services/signage" },
    { label: "UV Printing", path: "/services/uv-printing" },
    { label: "Outdoor Graphics", path: "/services/outdoor" },
    { label: "Promotional Merchandise", path: "/services/promotional" },
    { label: "Interior & Surface Solutions", path: "/services/ceramic" },
    { label: "Digital Solutions", path: "/services/digital" },
    { label: "Outdoor Advertising & Structures", path: "/services/exhibition" },
];

export default function Footer() {
    return (
        <footer style={s.footer}>
            <style>{`
        .footer-contact-row {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0.65rem 0.85rem;
          margin-left: -0.85rem;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .footer-contact-row:hover {
          background: rgba(201,168,76,0.08);
        }
        .footer-contact-row:hover .ficon {
          border-color: #C9A84C !important;
          color: #C9A84C !important;
        }
        .footer-contact-row:hover .flabel {
          color: #C9A84C !important;
        }
        .footer-nav-link {
          font-size: 13px;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.03em;
        }
        .footer-nav-link:hover { color: #C9A84C; }
        .footer-bottom-link {
          font-size: 11px;
          color: #333;
          text-decoration: none;
        }
        .footer-bottom-link:hover { color: #C9A84C; }
      `}</style>

            {/* Gold top accent */}
            <div style={s.topAccent} />

            <div style={s.inner}>

                {/* Col 1 — Brand */}
                <div style={s.col}>
                    <img
                        src="/logo.png"
                        alt="Crystal Advertising"
                        style={s.logo}
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            document.getElementById("ca-logo-text").style.display = "block";
                        }}
                    />
                    <div id="ca-logo-text" style={{ display: "none" }}>
                        <span style={s.logoText}>CRYSTAL</span>
                        <span style={s.logoSub}>ADVERTISING</span>
                    </div>

                    <p style={s.desc}>
                        Crafting impactful retail solutions and immersive brand experiences,
                        Crystal Advertising delivers end-to-end signage and branding services.
                        From concept to installation, we handle everything under one roof —
                        including fabric printing, metal fabrication, flatbed UV printing,
                        and joinery works.
                    </p>

                    <p style={s.tagline}>
                        <span style={s.goldDash}>——</span>&nbsp; The Complete Sign Solution
                    </p>
                </div>

                {/* Col 2 — Quick Links */}
                <div style={s.col}>
                    <p style={s.colLabel}>Quick Links</p>
                    <div style={s.navLinks}>
                        {QUICK_LINKS.map(({ label, path }) => (
                            <Link key={label} to={path} className="footer-nav-link">
                                <span style={s.navArrow}>›</span> {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Col 3 — Services */}
                <div style={s.col}>
                    <p style={s.colLabel}>Services</p>
                    <div style={s.navLinks}>
                        {SERVICE_LINKS.map(({ label, path }) => (
                            <Link key={path} to={path} className="footer-nav-link">
                                <span style={s.navArrow}>›</span> {label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Col 4 — Contact */}
                <div style={s.col}>
                    <p style={s.colLabel}>Get In Touch</p>
                    <div style={s.contactLinks}>

                        <a
                            href="https://instagram.com/crystaladvertising__"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-contact-row"
                        >
                            <span className="ficon" style={s.iconWrap}>
                                <InstagramIcon />
                            </span>
                            <div>
                                <p style={s.platform}>Instagram</p>
                                <p className="flabel" style={s.handle}>crystaladvertising__</p>
                            </div>
                        </a>

                        <a
                            href="https://wa.me/00971528588613"
                            target="_blank"
                            rel="noreferrer"
                            className="footer-contact-row"
                        >
                            <span className="ficon" style={s.iconWrap}>
                                <WhatsappIcon />
                            </span>
                            <div>
                                <p style={s.platform}>WhatsApp</p>
                                <p className="flabel" style={s.handle}>+971 52 858 8613</p>
                            </div>
                        </a>

                        <a
                            href="mailto:crystaladvertising777@gmail.com"
                            className="footer-contact-row"
                        >
                            <span className="ficon" style={s.iconWrap}>
                                <EmailIcon />
                            </span>
                            <div>
                                <p style={s.platform}>Email</p>
                                <p className="flabel" style={s.handle}>crystaladvertising777@gmail.com</p>
                            </div>
                        </a>

                    </div>
                </div>

            </div>

            {/* Divider */}
            <div style={s.divider} />

            {/* Bottom bar */}
            <div style={s.bottom}>
                <span style={s.copy}>
                    © {new Date().getFullYear()} Crystal Advertising LLC. All rights reserved. — UAE
                </span>
                <div style={{ display: "flex", gap: 16 }}>
                    <a href="#" className="footer-bottom-link">Privacy Policy</a>
                    <a href="#" className="footer-bottom-link">Terms of Use</a>
                </div>
            </div>
        </footer>
    );
}

/* ── Icons ── */
const InstagramIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
);

const WhatsappIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

const EmailIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

/* ── Styles ── */
const GOLD = "#C9A84C";
const BG = "#0a0a0a";
const BORDER = "#1e1c10";

const s = {
    footer: {
        background: BG,
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#fff",
    },
    topAccent: {
        height: 3,
        background: `linear-gradient(90deg, ${GOLD} 0%, #e8c96a 50%, ${GOLD} 100%)`,
    },
    inner: {
        display: "grid",
        gridTemplateColumns: "1.6fr 0.8fr 1fr 1.2fr",
        gap: "3rem",
        padding: "4rem 3rem 3rem",
        maxWidth: 1200,
        margin: "0 auto",
    },
    col: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    logo: {
        height: 56,
        objectFit: "contain",
        objectPosition: "left center",
        maxWidth: 200,
        marginBottom: "0.5rem",
    },
    logoText: {
        display: "block",
        fontSize: 22,
        fontWeight: 800,
        color: GOLD,
        letterSpacing: "0.1em",
    },
    logoSub: {
        display: "block",
        fontSize: 11,
        letterSpacing: "0.3em",
        color: "#666",
        textTransform: "uppercase",
    },
    desc: {
        fontSize: 13.5,
        color: "#666",
        lineHeight: 1.85,
        margin: 0,
    },
    tagline: {
        fontSize: 12,
        color: "#444",
        margin: 0,
        fontStyle: "italic",
        letterSpacing: "0.04em",
    },
    goldDash: {
        color: GOLD,
    },
    colLabel: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: GOLD,
        margin: "0 0 0.5rem",
        paddingBottom: "0.5rem",
        borderBottom: `0.5px solid ${BORDER}`,
    },
    navLinks: {
        display: "flex",
        flexDirection: "column",
        gap: "0.55rem",
    },
    navArrow: {
        color: GOLD,
        marginRight: 4,
        fontSize: 14,
    },
    contactLinks: {
        display: "flex",
        flexDirection: "column",
        gap: "0.1rem",
    },
    iconWrap: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "0.5px solid #2a2710",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: "#666",
        transition: "border-color 0.2s, color 0.2s",
    },
    platform: {
        fontSize: 10,
        color: "#444",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        margin: "0 0 2px",
        fontWeight: 600,
    },
    handle: {
        fontSize: 13,
        color: "#888",
        margin: 0,
        transition: "color 0.2s",
    },
    divider: {
        height: "0.5px",
        background: BORDER,
        maxWidth: 1200,
        margin: "0 auto",
    },
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 3rem",
        maxWidth: 1200,
        margin: "0 auto",
        flexWrap: "wrap",
        gap: 12,
    },
    copy: {
        fontSize: 11,
        color: "#333",
        letterSpacing: "0.03em",
    },
};