import React, { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  Trash2,
  Image as ImageIcon,
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  Database,
  Lock,
  Unlock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Plus,
  Eye,
  Archive,
  Star,
  LogOut,
  UploadCloud
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabaseSqlSchema } from '../services/storageService';
import SriChakraSvg from '../animations/SriChakraSvg';

export default function AdminPage({
  storageService,
  setActivePage,
  onResetDefaults,
  onPreviewEvent
}) {
  const { language, t, resolveText } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('shrichakreshwari74@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState('poojaEvents'); // 'poojaEvents' | 'dashboard' | 'approvals' | 'gallery' | 'messages' | 'supabase'
  const [copiedSql, setCopiedSql] = useState(false);

  // Live state from storage
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [messages, setMessages] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Official photo upload state
  const [newPhotoData, setNewPhotoData] = useState({
    year: '2026',
    category: 'OFFICIAL',
    caption: '',
    imageUrl: '',
    uploadedBy: 'Shri Raghavendra Tantri (Admin)'
  });

  const loadData = () => {
    const isAuth = storageService.isAdminAuthenticated();
    setIsAuthenticated(isAuth);

    const evts = storageService.getEvents();
    setEvents(evts);
    const featured = storageService.getFeaturedEvent();
    if (featured) {
      setSelectedEventId(featured.id);
      setEditingEvent({ ...featured });
    } else if (evts.length > 0) {
      setSelectedEventId(evts[0].id);
      setEditingEvent({ ...evts[0] });
    }
    setSubmissions(storageService.getSubmissions());
    setGallery(storageService.getAllGalleryPhotos());
    setMessages(storageService.getContactMessages());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const result = await storageService.adminLogin({
        email: emailInput,
        password: passwordInput
      });

      if (result.success) {
        setIsAuthenticated(true);
        setLoginError('');
        setPasswordInput('');
        setFeedbackMsg('Administrator session authenticated successfully.');
        setTimeout(() => setFeedbackMsg(''), 4000);
        loadData();
      } else {
        setLoginError(result.message || 'Invalid credentials.');
      }
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please check network.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await storageService.adminLogout();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleSelectEvent = (id) => {
    setSelectedEventId(id);
    const ev = events.find(e => e.id === id);
    if (ev) setEditingEvent({ ...ev });
  };

  const handleCreateNewEvent = () => {
    const nextYear = String(new Date().getFullYear() + 1);
    const newEv = {
      id: `pooja-${nextYear}`,
      year: nextYear,
      title: {
        en: `Annual Shri Chakra Pooja ${nextYear}`,
        kn: `ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜೆ ${nextYear}`,
        sa: `वार्षिक श्रीचक्र महापूजा ${nextYear}`
      },
      subheading: {
        en: 'Shri Kshethra Kukkikatte • Sacred Daylong Celebration',
        kn: 'ಶ್ರೀ ಕ್ಷೇತ್ರ ಕುಕ್ಕಿಕಟ್ಟೆ • ಅಖಂಡ ದಿನದ ಪವಿತ್ರ ಮಹೋತ್ಸವ',
        sa: 'श्री क्षेत्र कुक्कीकट्टे • अखण्ड दिवसस्य पावनी उपासना'
      },
      description: {
        en: `Conducted under the holy guidance of Shri Raghavendra Tantri, the Annual Shri Chakra Pooja ${nextYear} brings together thousands of devotees for divine blessings.`,
        kn: `ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಕುಕ್ಕಿಕಟ್ಟೆಯ ಶ್ರೀ ರಾಮ ನಿಲಯದಲ್ಲಿ ಜರುಗುವ ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜೆ ${nextYear}.`,
        sa: `श्री राघवेंद्र तन्त्रि-महोदयस्य मार्गदर्शने कुक्कीकट्टे श्री राम निलये आयोजिता वार्षिक श्रीचक्र पूजा ${nextYear}।`
      },
      date: `${nextYear}-10-25`,
      displayDate: {
        en: `Sunday, 25 October ${nextYear}`,
        kn: `ಭಾನುವಾರ, ೨೫ ಅಕ್ಟೋಬರ್ ${nextYear}`,
        sa: `भानुवासरः, २५ अक्टोबर् ${nextYear}`
      },
      startTime: '06:00',
      endTime: '22:00',
      timeText: {
        en: '06:00 AM – 10:00 PM',
        kn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ರಾತ್ರಿ ೧೦:೦೦',
        sa: 'प्रातः ६:०० तः रात्रि १०:००'
      },
      venue: {
        en: 'Shri Rama Nilaya',
        kn: 'ಶ್ರೀ ರಾಮ ನಿಲಯ',
        sa: 'श्री राम निलयम्'
      },
      area: {
        en: 'Kukkikatte, Udupi',
        kn: 'ಕುಕ್ಕಿಕಟ್ಟೆ, ಉಡುಪಿ',
        sa: 'कुक्कीकट्टे, उडुपी'
      },
      location: {
        en: 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka, India',
        kn: 'ಶ್ರೀ ರಾಮ ನಿಲಯ, ಕುಕ್ಕಿಕಟ್ಟೆ, ಉಡುಪಿ, ಕರ್ನಾಟಕ',
        sa: 'श्री राम निलयम्, कुक्कीकट्टे, उडुपी, कर्णाटकम्'
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shri+Rama+Nilaya+Kukkikatte+Udupi+Karnataka',
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
      invitationImage: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1000&q=80',
      invitationPdf: `/invitation-kukkikatte-${nextYear}.pdf`,
      contactPerson: {
        en: 'Shri Raghavendra Tantri',
        kn: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳು',
        sa: 'श्री राघवेंद्र तन्त्री'
      },
      phone: '+91 98443 06623',
      email: 'shrichakreshwari74@gmail.com',
      whatsapp: '919844306623',
      status: 'DRAFT',
      featured: false,
      schedule: []
    };
    setSelectedEventId(newEv.id);
    setEditingEvent(newEv);
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    const toSave = { ...editingEvent, status: 'DRAFT' };
    storageService.saveEvent(toSave);
    loadData();
    setFeedbackMsg(`Saved as Draft: ${toSave.year} Event.`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handlePublishAndFeature = (e) => {
    e.preventDefault();
    if (!editingEvent) return;
    const toSave = { ...editingEvent, status: 'PUBLISHED', featured: true };
    storageService.saveEvent(toSave);
    loadData();
    setFeedbackMsg(`Published & Featured! The public homepage now seamlessly displays the ${toSave.year} celebration without source code changes.`);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleArchiveEvent = (id) => {
    storageService.archiveEvent(id);
    loadData();
    setFeedbackMsg('Event moved to Archived celebrations.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDeleteEvent = (id) => {
    storageService.deleteEvent(id);
    loadData();
    setFeedbackMsg('Event deleted.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Photo Approvals
  const handleApprove = (id) => {
    storageService.approveSubmission(id);
    loadData();
    setFeedbackMsg('Submission approved and published to the public gallery as Devotee Memory!');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleReject = (id) => {
    storageService.rejectSubmission(id);
    loadData();
    setFeedbackMsg('Submission marked as rejected.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDeleteSubmission = (id) => {
    storageService.deleteSubmission(id);
    loadData();
    setFeedbackMsg('Submission deleted.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleAddOfficialPhoto = (e) => {
    e.preventDefault();
    if (!newPhotoData.imageUrl.trim() || !newPhotoData.caption.trim()) return;

    storageService.addGalleryPhoto({
      year: newPhotoData.year,
      category: 'OFFICIAL',
      caption: newPhotoData.caption,
      imageUrl: newPhotoData.imageUrl,
      thumbnailUrl: newPhotoData.imageUrl,
      uploadedBy: newPhotoData.uploadedBy || 'Shri Raghavendra Tantri (Admin)'
    });

    setNewPhotoData({
      year: '2026',
      category: 'OFFICIAL',
      caption: '',
      imageUrl: '',
      uploadedBy: 'Shri Raghavendra Tantri (Admin)'
    });

    loadData();
    setFeedbackMsg('Official temple photograph published to the public gallery!');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleDeleteGallery = (id) => {
    storageService.deleteGalleryPhoto(id);
    loadData();
    setFeedbackMsg('Gallery photo removed.');
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSqlSchema).then(() => {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    });
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'PENDING');
  const featuredEvent = events.find(e => e.featured);

  // -------------------------------------------------------------
  // LOGIN SCREEN (PROTECTED ADMIN ACCESS)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div
          className="spiritual-card spiritual-corner gold-ornate-card"
          style={{ maxWidth: '440px', width: '100%', padding: '40px 32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(28, 6, 15, 0.95) 0%, rgba(12, 2, 7, 0.98) 100%)' }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(229, 185, 100, 0.25) 0%, rgba(138, 21, 56, 0.4) 60%, rgba(10, 2, 6, 0.9) 100%)',
              border: '1.5px solid rgba(229, 185, 100, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px',
              boxShadow: '0 0 20px rgba(229, 185, 100, 0.3)'
            }}
          >
            <Shield size={28} className="text-[#ffd700]" />
          </div>

          <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
            Temple Administrator Portal
          </h2>

          <p style={{ color: '#dac8af', fontSize: '0.86rem', marginBottom: '20px' }}>
            Authorized portal for Shri Raghavendra Tantri & Seva Committee to manage annual pooja events, invitations, and gallery photos.
          </p>

          {/* Connection status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '20px',
              background: storageService.isSupabaseConnected() ? 'rgba(34, 197, 94, 0.12)' : 'rgba(229, 185, 100, 0.12)',
              border: `1px solid ${storageService.isSupabaseConnected() ? 'rgba(34, 197, 94, 0.4)' : 'rgba(229, 185, 100, 0.35)'}`,
              fontSize: '0.74rem',
              color: storageService.isSupabaseConnected() ? '#86efac' : '#e5b964',
              marginBottom: '20px'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: storageService.isSupabaseConnected() ? '#22c55e' : '#e5b964',
                boxShadow: storageService.isSupabaseConnected() ? '0 0 8px #22c55e' : '0 0 8px #e5b964'
              }}
            />
            <span>{storageService.isSupabaseConnected() ? 'Supabase Auth & Database Live' : 'Secure Authenticated Mode'}</span>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#c4aa82', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="shrichakreshwari74@gmail.com"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(8, 1, 4, 0.85)',
                  border: '1.5px solid rgba(229, 185, 100, 0.45)',
                  borderRadius: '6px',
                  color: '#f5ebd9',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#c4aa82', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Password / Access Key
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password or passcode"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  background: 'rgba(8, 1, 4, 0.85)',
                  border: '1.5px solid rgba(229, 185, 100, 0.45)',
                  borderRadius: '6px',
                  color: '#f5ebd9',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {loginError && (
              <div style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '-2px', textAlign: 'center' }}>
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-gold-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center', marginTop: '6px' }}
            >
              <Unlock size={16} />
              <span>{isLoggingIn ? 'Verifying Session...' : 'Unlock Admin Dashboard'}</span>
            </button>

            <div style={{ fontSize: '0.72rem', color: '#bca992', marginTop: '12px', textAlign: 'center', lineHeight: '1.4' }}>
              Authorized temple administration portal. Protected with cryptographic session authentication.
            </div>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div style={{ position: 'relative', minHeight: '90vh', padding: '40px 20px 80px' }}>
      <div className="container">
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '32px',
            borderBottom: '1px solid rgba(229, 185, 100, 0.3)',
            paddingBottom: '20px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(229, 185, 100, 0.2)',
                  border: '1px solid rgba(229, 185, 100, 0.45)',
                  color: '#ffd983',
                  fontSize: '0.72rem',
                  padding: '2px 10px',
                  borderRadius: '12px',
                  fontWeight: 700
                }}
              >
                <Shield size={12} />
                <span>CHIEF ADMINISTRATOR: SHRI RAGHAVENDRA TANTRI</span>
              </span>
              <span
                style={{
                  background: 'rgba(74, 222, 128, 0.15)',
                  color: '#4ade80',
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(74, 222, 128, 0.4)'
                }}
              >
                SESSION SECURE
              </span>
            </div>
            <h1 className="font-cinzel text-gold-gradient" style={{ fontSize: '2rem', marginTop: '6px', fontWeight: 900 }}>
              Shri Kshethra Kukkikatte Portal CMS
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                storageService.resetToDefaults();
                loadData();
                setFeedbackMsg('Sample database reset to confirmed client defaults.');
                setTimeout(() => setFeedbackMsg(''), 3000);
              }}
              className="btn-gold-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              title="Reset sample submissions and photos"
            >
              <RefreshCw size={14} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => setActivePage('home')}
              className="btn-gold-primary"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              <span>Back to Public Website</span>
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="End admin session"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Feedback message banner */}
        {feedbackMsg && (
          <div
            style={{
              background: 'rgba(74, 222, 128, 0.14)',
              border: '1px solid #4ade80',
              color: '#4ade80',
              padding: '12px 18px',
              borderRadius: '8px',
              marginBottom: '24px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <CheckCircle size={18} />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
            background: 'rgba(14, 2, 7, 0.85)',
            padding: '6px',
            borderRadius: '10px',
            border: '1px solid rgba(229, 185, 100, 0.25)'
          }}
        >
          {[
            { id: 'poojaEvents', label: '🪔 ANNUAL POOJA CMS', count: events.length },
            { id: 'dashboard', label: 'DASHBOARD STATS', count: null },
            { id: 'approvals', label: 'DEVOTEE PHOTO MODERATION', count: pendingSubmissions.length },
            { id: 'gallery', label: 'OFFICIAL GALLERY UPLOADS', count: gallery.length },
            { id: 'messages', label: 'DEVOTEE INQUIRIES', count: messages.filter(m => m.status === 'UNREAD').length },
            { id: 'supabase', label: 'SUPABASE POSTGRESQL SCHEMA', count: null }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #e5b964 0%, #b88628 100%)' : 'transparent',
                  color: isActive ? '#080104' : '#e5d7c3',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: isActive ? 800 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== null && tab.count > 0 && (
                  <span
                    style={{
                      background: isActive ? '#080104' : '#e5b964',
                      color: isActive ? '#ffd983' : '#080104',
                      fontSize: '0.68rem',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 800
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB: ANNUAL POOJA (DYNAMIC CMS & INVITATION SYSTEM)             */}
        {/* ============================================================== */}
        {activeTab === 'poojaEvents' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, 320px) 1fr', gap: '28px' }}>
            {/* Left Column: Event List & Create Action */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                  Annual Celebrations
                </h3>
                <button
                  onClick={handleCreateNewEvent}
                  className="btn-gold-primary"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  <Plus size={14} />
                  <span>Create Next Year</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {events.map((ev) => {
                  const isSelected = ev.id === selectedEventId;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => handleSelectEvent(ev.id)}
                      className="spiritual-card"
                      style={{
                        padding: '14px 16px',
                        cursor: 'pointer',
                        borderColor: isSelected ? '#e5b964' : ev.featured ? 'rgba(229, 185, 100, 0.65)' : 'rgba(229, 185, 100, 0.25)',
                        background: isSelected ? 'rgba(38, 9, 21, 0.9)' : 'rgba(14, 2, 7, 0.7)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span className="font-cinzel text-gold-light" style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                          {ev.year} Celebration
                        </span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {ev.featured && (
                            <span
                              style={{
                                background: 'rgba(229, 185, 100, 0.25)',
                                color: '#ffd983',
                                fontSize: '0.65rem',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 700
                              }}
                            >
                              FEATURED
                            </span>
                          )}
                          <span
                            style={{
                              background: ev.status === 'PUBLISHED' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: ev.status === 'PUBLISHED' ? '#4ade80' : '#f59e0b',
                              fontSize: '0.65rem',
                              padding: '1px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            {ev.status}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#dac8af' }}>
                        {resolveText(ev.displayDate, ev.date)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Edit Current Selected Event */}
            {editingEvent && (
              <div
                className="spiritual-card spiritual-corner gold-ornate-card"
                style={{ padding: 'clamp(24px, 3.5vw, 36px)', border: '1px solid rgba(229, 185, 100, 0.45)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    Editing: {editingEvent.year} Annual Pooja
                  </h3>
                  <button
                    onClick={() => onPreviewEvent(editingEvent)}
                    className="btn-gold-outline"
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                  >
                    <Eye size={14} />
                    <span>Preview Digital Patrika</span>
                  </button>
                </div>

                <form onSubmit={handlePublishAndFeature} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Event Title Multi-lingual */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Event Title (English)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.title?.en || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          title: { ...editingEvent.title, en: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        ಶೀರ್ಷಿಕೆ (Kannada)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.title?.kn || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          title: { ...editingEvent.title, kn: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        शीर्षकम् (Sanskrit Devanagari)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.title?.sa || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          title: { ...editingEvent.title, sa: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Date & Timings */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Pooja Date (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        value={editingEvent.date || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Display Date (English)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.displayDate?.en || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          displayDate: { ...editingEvent.displayDate, en: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Timings (e.g. 06:00 AM – 10:00 PM)
                      </label>
                      <input
                        type="text"
                        value={editingEvent.timeText?.en || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          timeText: { ...editingEvent.timeText, en: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Venue & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Venue
                      </label>
                      <input
                        type="text"
                        value={editingEvent.venue?.en || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          venue: { ...editingEvent.venue, en: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                        Location & Town
                      </label>
                      <input
                        type="text"
                        value={editingEvent.location?.en || ''}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          location: { ...editingEvent.location, en: e.target.value }
                        })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                      Event Narrative & Sankalpa Description (English)
                    </label>
                    <textarea
                      rows={3}
                      value={editingEvent.description?.en || ''}
                      onChange={(e) => setEditingEvent({
                        ...editingEvent,
                        description: { ...editingEvent.description, en: e.target.value }
                      })}
                      className="form-input"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                    <button
                      type="submit"
                      className="btn-gold-primary"
                      style={{ padding: '10px 24px' }}
                    >
                      <Star size={16} />
                      <span>PUBLISH & FEATURE ON HOMEPAGE</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveDraft}
                      className="btn-gold-outline"
                      style={{ padding: '10px 20px' }}
                    >
                      <span>SAVE AS DRAFT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleArchiveEvent(editingEvent.id)}
                      className="btn-gold-outline"
                      style={{ padding: '10px 16px' }}
                    >
                      <Archive size={15} />
                      <span>Archive</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(editingEvent.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(239, 68, 68, 0.4)',
                        color: '#ef4444',
                        padding: '10px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginLeft: 'auto'
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: DASHBOARD STATS                                           */}
        {/* ============================================================== */}
        {activeTab === 'dashboard' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}
            >
              <div className="spiritual-card" style={{ padding: '24px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                <div style={{ fontSize: '0.75rem', color: '#e5b964', fontFamily: 'var(--font-serif)', letterSpacing: '0.08em' }}>
                  FEATURED CELEBRATION
                </div>
                <div className="font-cinzel text-gold-light" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>
                  {featuredEvent ? featuredEvent.year : 'None'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dac8af' }}>Live on public homepage</div>
              </div>

              <div className="spiritual-card" style={{ padding: '24px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                <div style={{ fontSize: '0.75rem', color: '#f59e0b', fontFamily: 'var(--font-serif)', letterSpacing: '0.08em' }}>
                  PENDING SUBMISSIONS
                </div>
                <div className="font-cinzel text-gold-light" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>
                  {pendingSubmissions.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dac8af' }}>Visitor photos awaiting review</div>
              </div>

              <div className="spiritual-card" style={{ padding: '24px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                <div style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'var(--font-serif)', letterSpacing: '0.08em' }}>
                  ANNUAL CELEBRATIONS
                </div>
                <div className="font-cinzel text-gold-light" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>
                  {events.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dac8af' }}>Current & historical archives</div>
              </div>

              <div className="spiritual-card" style={{ padding: '24px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                <div style={{ fontSize: '0.75rem', color: '#e5b964', fontFamily: 'var(--font-serif)', letterSpacing: '0.08em' }}>
                  TOTAL GALLERY ARCHIVE
                </div>
                <div className="font-cinzel text-gold-light" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>
                  {gallery.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dac8af' }}>Official & Devotee photos</div>
              </div>

              <div className="spiritual-card" style={{ padding: '24px', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                <div style={{ fontSize: '0.75rem', color: '#60a5fa', fontFamily: 'var(--font-serif)', letterSpacing: '0.08em' }}>
                  DEVOTEE INQUIRIES
                </div>
                <div className="font-cinzel text-gold-light" style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0' }}>
                  {messages.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#dac8af' }}>Seva inquiries logged</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: DEVOTEE PHOTO MODERATION                                   */}
        {/* ============================================================== */}
        {activeTab === 'approvals' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                  Visitor Submissions Moderation Queue ({pendingSubmissions.length})
                </h2>
                <p style={{ color: '#dac8af', fontSize: '0.85rem' }}>
                  Devotee photo uploads start with PENDING status and only appear in the public gallery after admin approval.
                </p>
              </div>
            </div>

            {pendingSubmissions.length === 0 ? (
              <div className="spiritual-card" style={{ padding: '60px 20px', textAlign: 'center', color: '#dac8af' }}>
                <CheckCircle size={36} className="text-[#4ade80]" style={{ margin: '0 auto 12px' }} />
                <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.1rem', marginBottom: '6px' }}>
                  All Caught Up!
                </h3>
                <p style={{ fontSize: '0.85rem' }}>No pending photo submissions waiting for review.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {pendingSubmissions.map((sub) => (
                  <div key={sub.id} className="spiritual-card" style={{ overflow: 'hidden', border: '1px solid rgba(229, 185, 100, 0.35)' }}>
                    <div style={{ position: 'relative', height: '220px' }}>
                      <img src={sub.imageUrl} alt={sub.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(245, 158, 11, 0.9)', color: '#070103', fontWeight: 700, fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px' }}>
                        PENDING MODERATION
                      </span>
                    </div>

                    <div style={{ padding: '20px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f7eedb' }}>
                          Devotee: {sub.uploadedBy}
                        </div>
                        {sub.contact && <div style={{ fontSize: '0.78rem', color: '#dac8af' }}>Contact: {sub.contact}</div>}
                      </div>

                      <div style={{ background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '6px', fontSize: '0.84rem', color: '#f5ebd9', marginBottom: '18px' }}>
                        <strong>Caption:</strong> {sub.caption || 'None'}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleApprove(sub.id)}
                          style={{ flex: 1, background: 'rgba(74, 222, 128, 0.18)', border: '1px solid #4ade80', color: '#4ade80', padding: '9px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                        >
                          <CheckCircle size={15} />
                          <span>Approve & Publish</span>
                        </button>
                        <button
                          onClick={() => handleReject(sub.id)}
                          style={{ flex: 1, background: 'rgba(239, 68, 68, 0.14)', border: '1px solid rgba(239, 68, 68, 0.45)', color: '#fca5a5', padding: '9px', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
                        >
                          <XCircle size={15} />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleDeleteSubmission(sub.id)}
                          style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.2)', color: '#dac8af', padding: '9px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: GALLERY PHOTOS & OFFICIAL UPLOAD                          */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div>
            {/* Upload Official Photo Form */}
            <div
              className="spiritual-card gold-ornate-card"
              style={{ padding: '24px', marginBottom: '32px', border: '1px solid rgba(229, 185, 100, 0.4)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <UploadCloud size={20} className="text-[#e5b964]" />
                <h3 className="font-cinzel text-gold-light" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                  Upload Official Temple Photograph
                </h3>
              </div>

              <form onSubmit={handleAddOfficialPhoto} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                    Photo Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newPhotoData.imageUrl}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                    Caption / Ritual Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhotoData.caption}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, caption: e.target.value })}
                    placeholder="Consecrated Navavarana Archana deepam..."
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#e5b964', marginBottom: '4px' }}>
                    Celebration Year
                  </label>
                  <select
                    value={newPhotoData.year}
                    onChange={(e) => setNewPhotoData({ ...newPhotoData, year: e.target.value })}
                    className="form-input"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    type="submit"
                    className="btn-gold-primary"
                    style={{ width: '100%', padding: '10px 16px', justifyContent: 'center' }}
                  >
                    <Plus size={16} />
                    <span>Publish Official Photo</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Live Gallery */}
            <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.3rem', marginBottom: '16px', fontWeight: 800 }}>
              Live Public Gallery Photos ({gallery.length})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {gallery.map((photo) => (
                <div key={photo.id} className="spiritual-card" style={{ overflow: 'hidden', border: '1px solid rgba(229, 185, 100, 0.3)' }}>
                  <div style={{ position: 'relative', height: '160px' }}>
                    <img src={photo.thumbnailUrl || photo.imageUrl} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(8, 1, 4, 0.88)', color: '#ffd983', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {photo.year}
                    </span>
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: photo.category === 'COMMUNITY' ? 'rgba(234, 88, 12, 0.85)' : 'rgba(229, 185, 100, 0.85)', color: '#080104', fontSize: '0.62rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                      {photo.category || 'OFFICIAL'}
                    </span>
                  </div>
                  <div style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.78rem', color: '#dac8af', fontWeight: 500 }}>{photo.caption}</span>
                    <button onClick={() => handleDeleteGallery(photo.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: MESSAGES                                                  */}
        {/* ============================================================== */}
        {activeTab === 'messages' && (
          <div>
            <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.35rem', marginBottom: '16px', fontWeight: 800 }}>
              Devotee & Seva Inquiries ({messages.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((m) => (
                <div key={m.id} className="spiritual-card" style={{ padding: '20px', border: '1px solid rgba(229, 185, 100, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <strong style={{ color: '#ffd983', fontSize: '1rem' }}>{m.name}</strong>
                    <span style={{ fontSize: '0.74rem', color: '#dac8af' }}>{new Date(m.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#e5d7c3', marginBottom: '10px' }}>
                    {m.email && <span>Email: {m.email} | </span>}
                    {m.phone && <span>Phone: {m.phone}</span>}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#f5ebd9', lineHeight: 1.5, margin: 0 }}>
                    &ldquo;{m.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: SUPABASE ARCHITECTURE                                     */}
        {/* ============================================================== */}
        {activeTab === 'supabase' && (
          <div style={{ maxWidth: '920px' }}>
            <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.4rem', marginBottom: '10px', fontWeight: 800 }}>
              Supabase PostgreSQL Database Schema & Migration Blueprint
            </h2>
            <div className="spiritual-card" style={{ padding: '22px', border: '1px solid rgba(229, 185, 100, 0.4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="font-cinzel text-gold-primary" style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  schema.sql (PostgreSQL + RLS + Functions)
                </span>
                <button onClick={handleCopySql} className="btn-gold-outline" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                  {copiedSql ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
              </div>
              <pre style={{ background: '#040102', border: '1px solid rgba(229, 185, 100, 0.25)', padding: '16px', color: '#ffd983', fontSize: '0.78rem', overflowX: 'auto', maxHeight: '400px' }}>
                {supabaseSqlSchema}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
