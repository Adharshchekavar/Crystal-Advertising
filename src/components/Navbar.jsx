import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const SERVICES = [
  { label: 'Signage Solution', path: '/services/signage' },
  { label: 'UV Printing', path: '/services/uv-printing' },
  { label: 'Outdoor Graphics', path: '/services/outdoor' },
  { label: 'Promotional Merchandise', path: '/services/promotional' },
  { label: 'Interior & Surface Solutions', path: '/services/interior' },
  { label: 'Digital Solutions', path: '/services/digital' },
  { label: 'Outdoor Advertising & Structures', path: '/services/exhibition' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropRef = useRef(null);
  const location = useLocation();
  const isAbout = location.pathname === '/about';
  const isService = location.pathname.startsWith('/services');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setDropOpen(false);
    setMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">

          {/* Logo */}
          <Link to="/" className="logo-brand">
            <div className="logo-wrapper">
              <img src={logoImg} alt="Crystal Advertising Logo" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-crystal">CRYSTAL</span>
                <span className="brand-advertising">ADVERTISING</span>
                <span className="brand-tagline">.........The complete sign solution.........</span>
              </div>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'nav-active' : ''}>Home</Link>
            <Link to="/about" className={isAbout ? 'nav-active' : ''}>About</Link>

            {/* Services dropdown */}
            <div className="nav-dropdown-wrap" ref={dropRef}>
              <div className="nav-dropdown-group">
                <Link
                  to="/services"
                  className={`nav-dropdown-label-link${isService ? ' nav-active' : ''}`}
                >
                  Services
                </Link>
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
            <Link to="/contact" className={`btn-contact${location.pathname === '/contact' ? ' nav-active' : ''}`}>
              Contact Us
            </Link>
          </div>

          {/* ── Hamburger — mobile only ── */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* ── Mobile menu — outside nav so it overlays full screen ── */}
      <div
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-links">

          <Link
            to="/"
            className={`nav-mobile-link${location.pathname === '/' ? ' nav-active' : ''}`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`nav-mobile-link${isAbout ? ' nav-active' : ''}`}
          >
            About
          </Link>

          {/* Services accordion */}
          <div className="nav-mobile-services-wrap">
            <button
              className={`nav-mobile-link nav-mobile-services-btn${isService ? ' nav-active' : ''}`}
              onClick={() => setMobileServicesOpen(v => !v)}
              aria-expanded={mobileServicesOpen}
            >
              <span>Services</span>
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                className={`nav-mobile-chevron${mobileServicesOpen ? ' open' : ''}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={`nav-mobile-sub${mobileServicesOpen ? ' open' : ''}`}>
              <div className="nav-mobile-sub-inner">
                <Link
                  to="/services"
                  className={`nav-mobile-sub-link${location.pathname === '/services' ? ' active' : ''}`}
                >
                  All Services
                </Link>
                {SERVICES.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`nav-mobile-sub-link${location.pathname === path ? ' active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            to="/portfolio"
            className={`nav-mobile-link${location.pathname === '/portfolio' ? ' nav-active' : ''}`}
          >
            Portfolio
          </Link>

          <Link to="/contact" className="nav-mobile-link nav-mobile-contact">
            Contact Us
          </Link>

        </div>
      </div>

      {/* Backdrop — closes menu when tapped outside */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;