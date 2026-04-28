import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const SERVICES = [
  { label: 'Signage Solution', path: '/services/signage' },
  { label: 'UV Printing', path: '/services/uv-printing' },
  { label: 'Outdoor Graphics', path: '/services/outdoor' },
  { label: 'Promotional Merchandise', path: '/services/promotional' },
  { label: 'Interior & Surface Solutions', path: '/services/ceramic' },
  { label: 'Digital Solutions', path: '/services/digital' },
  { label: 'Outdoor Advertising & Structures', path: '/services/exhibition' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const isService = location.pathname.startsWith('/services');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on route change
  useEffect(() => { setDropOpen(false); }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">

        <Link to="/" className="logo-brand">
          <div className="logo-wrapper">
            <img src="/src/assets/logo.png" alt="Crystal Advertising Logo" className="brand-icon" />
            <div className="brand-text">
              <span className="brand-crystal">CRYSTAL</span>
              <span className="brand-advertising">ADVERTISING</span>
              <span className="brand-tagline">.........The complete sign solution.........</span>
            </div>
          </div>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about" className={isAbout ? 'nav-active' : ''}>About</Link>

          {/* ── Services: label links to /services overview, dropdown to each ── */}
          <div className="nav-dropdown-wrap" ref={dropRef}>
            <div className="nav-dropdown-group">
              {/* Clicking "Services" text → overview page */}
              <Link
                to="/services"
                className={`nav-dropdown-label-link${isService ? ' nav-active' : ''}`}
              >
                Services
              </Link>
              {/* Chevron toggles dropdown */}
              <button
                className={`nav-chevron-btn${dropOpen ? ' open' : ''}`}
                onClick={() => setDropOpen(v => !v)}
                aria-label="Toggle services menu"
                aria-expanded={dropOpen}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {dropOpen && (
              <div className="nav-dropdown">
                {SERVICES.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`nav-dropdown-item${location.pathname === path ? ' active' : ''}`}
                  >
                    <span>{label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'nav-active' : ''}>Portfolio</Link>

          <a href="/contact" className="btn-contact" target="_blank" rel="noreferrer">
            Contact Us
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;