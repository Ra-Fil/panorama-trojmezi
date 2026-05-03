import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SEO } from './components/layout/SEO';
import { useNavigation } from './hooks/use-navigation';
import { BackToTop } from './components/ui/BackToTop';
import './i18n';

// Senior Pattern: Loading component for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-paper">
    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

// Senior Pattern: Code Splitting for routes
const Home = lazy(() => import('./components/sections/Home').then(m => ({ default: m.Home })));
const Apartments = lazy(() => import('./components/sections/Apartments').then(m => ({ default: m.Apartments })));
const Tips = lazy(() => import('./components/sections/Tips').then(m => ({ default: m.Tips })));
const Booking = lazy(() => import('./components/sections/Booking').then(m => ({ default: m.Booking })));
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound'));

// Sub-components as lazy as they are used in Home but were separate in original App
const PropertyGallery = lazy(() => import('./components/sections/PropertyGallery').then(m => ({ default: m.PropertyGallery })));
const Reviews = lazy(() => import('./components/sections/Reviews').then(m => ({ default: m.Reviews })));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeSection, handleSectionChange } = useNavigation();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-orange-100 selection:text-orange-900">
      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
      {children}
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  const { handleSectionChange } = useNavigation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <main>
              <section id="home" className="w-full"><Home onInquiryNow={() => handleSectionChange('contact')} onViewTips={() => handleSectionChange('tips')} onBooking={() => handleSectionChange('booking')} /></section>
              <section id="apartments" className="w-full"><Apartments onViewGallery={() => handleSectionChange('gallery')} /></section>
              <section id="gallery" className="w-full"><PropertyGallery /></section>
              <section id="tips" className="w-full"><Tips /></section>
              <section id="booking" className="w-full"><Booking className="bg-paper" /></section>
              <div className="w-full"><Reviews className="bg-white" /></div>
              <section id="contact" className="w-full"><Contact /></section>
            </main>
          </MainLayout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <SEO />
        <ScrollToTop />
        <AppRoutes />
        <BackToTop />
      </Router>
    </HelmetProvider>
  );
}
