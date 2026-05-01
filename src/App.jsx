import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import { HelmetProvider } from 'react-helmet-async'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './styles/index.css'
import ServicePage from './pages/ServicePage';
import SignageService from './pages/SignageService';
import DigitalService from './pages/DigitalService';
import InteriorService from './pages/InteriorService';
import UvService from './pages/UvService';
import OutdoorService from './pages/OutdoorService';
import PromotionalService from './pages/PromotionalService';
import ExhibitionService from './pages/ExhibitionService';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import "./styles/_ServiceShared.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <WhatsAppButton />
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/services/signage" element={<SignageService />} />
            <Route path="/services/uv-printing" element={<UvService />} />
            <Route path="/services/outdoor" element={<OutdoorService />} />
            <Route path="/services/promotional" element={<PromotionalService />} />
            <Route path="/services/interior" element={<InteriorService />} />
            <Route path="/services/digital" element={<DigitalService />} />
            <Route path="/services/exhibition" element={<ExhibitionService />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </ReactLenis>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App