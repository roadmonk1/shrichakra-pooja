import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import DigitalInvitationModal from './components/DigitalInvitationModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PoojaPage from './pages/PoojaPage';
import GalleryPage from './pages/GalleryPage';
import ShareMomentPage from './pages/ShareMomentPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

import { storageService } from './services/storageService';

function MainLayout() {
  const { language } = useLanguage();
  const [activePage, setActivePage] = useState('home');
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [invitationEvent, setInvitationEvent] = useState(null);

  // Live data synchronized with storage service
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const refreshData = () => {
    const featured = storageService.getFeaturedEvent();
    const evts = storageService.getEvents();
    setFeaturedEvent(featured);
    setAllEvents(evts);
    setInvitationEvent(featured || evts[0]);
    setGalleryPhotos(storageService.getApprovedGalleryPhotos());
  };

  useEffect(() => {
    refreshData();
  }, [activePage]);

  // Helper to parse route from either pathname (/about, /pooja, /admin) or hash (#about, #pooja)
  const getPageFromLocation = () => {
    if (typeof window === 'undefined') return 'home';
    const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const cleanHash = window.location.hash.replace(/^#\/?/g, '').toLowerCase();
    const target = cleanPath || cleanHash;

    if (!target || target === 'home') return 'home';
    if (target.startsWith('about')) return 'about';
    if (target.startsWith('pooja') || target.startsWith('annual-pooja')) return 'pooja';
    if (target.startsWith('gallery')) return 'gallery';
    if (target.startsWith('share')) return 'share';
    if (target.startsWith('contact')) return 'contact';
    if (target.startsWith('admin')) return 'admin';
    return 'home';
  };

  // Synchronize route with browser history (back/forward and deep link reload)
  useEffect(() => {
    const syncRoute = () => {
      const page = getPageFromLocation();
      setActivePage(page);
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    const newPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInvitation = (targetEvent) => {
    setInvitationEvent(targetEvent || featuredEvent || allEvents[0]);
    setIsInvitationOpen(true);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Golden Ambient Particle Dust Canvas */}
      <ParticleCanvas particleCount={40} />

      {/* Sticky Sacred Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
      />

      {/* Main Page Routing */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {activePage === 'home' && (
          <HomePage
            setActivePage={handlePageChange}
            featuredEvent={featuredEvent}
            galleryPhotos={galleryPhotos}
            onOpenInvitation={() => handleOpenInvitation(featuredEvent)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            setActivePage={handlePageChange}
          />
        )}

        {activePage === 'pooja' && (
          <PoojaPage
            currentEvent={featuredEvent}
            allEvents={allEvents}
            setActivePage={handlePageChange}
            onOpenInvitation={() => handleOpenInvitation(featuredEvent)}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            galleryPhotos={galleryPhotos}
            setActivePage={handlePageChange}
          />
        )}

        {activePage === 'share' && (
          <ShareMomentPage
            storageService={storageService}
            setActivePage={handlePageChange}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            storageService={storageService}
            setActivePage={handlePageChange}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            storageService={storageService}
            setActivePage={handlePageChange}
            onResetDefaults={refreshData}
            onPreviewEvent={(ev) => handleOpenInvitation(ev)}
          />
        )}
      </main>

      {/* Sacred Luxury Footer */}
      <Footer
        setActivePage={handlePageChange}
      />

      {/* Full-Screen Digital Invitation Modal */}
      <DigitalInvitationModal
        isOpen={isInvitationOpen}
        onClose={() => setIsInvitationOpen(false)}
        event={invitationEvent}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
