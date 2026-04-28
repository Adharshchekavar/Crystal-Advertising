import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import './styles/index.css'
import ServicePage from './pages/ServicePage';
import SignageService from './pages/SignageService';
import DigitalService from './pages/DigitalService';
import CeramicService from './pages/CeramicService';
import UvService from './pages/UvService';
import OutdoorService from './pages/OutdoorService';
import PromotionalService from './pages/PromotionalService';
import ExhibitionService from './pages/ExhibitionService';
import "./styles/_ServiceShared.css";



function App() {
  return (
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/services/signage" element={<SignageService />} />
          <Route path="/services/uv-printing" element={<UvService />} />
          <Route path="/services/outdoor" element={<OutdoorService />} />
          <Route path="/services/promotional" element={<PromotionalService />} />
          <Route path="/services/ceramic" element={<CeramicService />} />
          <Route path="/services/digital" element={<DigitalService />} />
          <Route path="/services/exhibition" element={<ExhibitionService />} />
          <Route path="/portfolio" element={<PortfolioPage />} />

        </Routes>
      </ReactLenis>
    </BrowserRouter>
  )
}

export default App