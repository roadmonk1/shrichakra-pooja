import React, { useState } from 'react';
import { X, CheckSquare, Download, Copy, Check, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CHECKLIST_CATEGORIES = [
  {
    id: 'annual_pooja_invitation',
    title: '1. ANNUAL POOJA & DIGITAL INVITATION (V2 HIGHLIGHT)',
    description: 'Specific requirements for event announcement, dynamic countdown, and digital invitation sharing',
    items: [
      { key: 'evt_official_name', label: 'Official Annual Event Name (for current and subsequent years)' },
      { key: 'evt_dates_times', label: 'Confirmed celebration date, start time, and conclusion time' },
      { key: 'evt_venue_location', label: 'Mandapa hall / temple sanctum address and driving directions' },
      { key: 'evt_recurring_schedule', label: 'Recurring annual schedule format (morning to evening)' },
      { key: 'evt_description_instructions', label: 'Event description, sankalpa guidelines, and visitor dress code' },
      { key: 'inv_existing_design', label: 'Do you already have a designed printed invitation artwork?' },
      { key: 'inv_image_pdf', label: 'Provide high-res invitation image (JPG/PNG) and printable PDF file' },
      { key: 'inv_wording_multilingual', label: 'Approved invitation wording in English, Kannada (ಕನ್ನಡ), and Sanskrit (संस्कृतಮ್)' },
      { key: 'inv_download_policy', label: 'Enable public download of invitation card / PDF for devotees' },
      { key: 'inv_whatsapp_sharing', label: 'Enable 1-click WhatsApp share with pre-formatted invitation message' },
      { key: 'inv_calendar_integration', label: 'Enable Add to Google Calendar & .ICS calendar download' },
      { key: 'ann_lead_time', label: 'How early should upcoming event announcement appear on the homepage?' },
      { key: 'ann_countdown_toggle', label: 'Display live countdown timer until pooja commences' },
      { key: 'ann_post_event', label: 'Post-event display preference (switch to Celebration Concluded / Archive)' }
    ]
  },
  {
    id: 'identity',
    title: '2. IDENTITY & BRANDING',
    description: 'Core naming, organization details, and leadership contact',
    items: [
      { key: 'pooja_name', label: 'Sri Chakra / Official Pooja Name (e.g. Sri Chakra Mahapooja)' },
      { key: 'org_name', label: 'Family / Trust / Organization legal & display name' },
      { key: 'logo', label: 'High-resolution logo (Vector SVG / PNG format)' },
      { key: 'contact_person', label: 'Primary contact person & coordinator designation' },
      { key: 'phone', label: 'Official mobile & landline contact numbers' },
      { key: 'email', label: 'Dedicated email address for inquiries and seva communications' },
      { key: 'whatsapp', label: 'WhatsApp contact number for instant devotee communications' },
      { key: 'location', label: 'Permanent temple or annual pooja venue address' }
    ]
  },
  {
    id: 'history',
    title: '3. HISTORY & LINEAGE',
    description: 'The sacred origin and familial or institutional heritage',
    items: [
      { key: 'chakra_origin', label: 'Sacred origin and consecration history of the Sri Chakra' },
      { key: 'tradition_start', label: 'How the annual pooja tradition was initiated and blessed' },
      { key: 'family_background', label: 'Family, lineage, or Matha/Sampradaya background' },
      { key: 'years_conducted', label: 'Exact number of continuous years the pooja has been held' },
      { key: 'milestones', label: 'Key milestones (e.g., silver jubilee, golden jubilee, renovations)' }
    ]
  },
  {
    id: 'content',
    title: '4. MULTILINGUAL CONTENT & TEXTS',
    description: 'Client-approved copy in English, Kannada, and Sanskrit',
    items: [
      { key: 'en_text', label: 'English approved text for About Sri Chakra & Pooja overview' },
      { key: 'kn_text', label: 'Kannada (ಕನ್ನಡ) verified text and headings' },
      { key: 'sa_text', label: 'Sanskrit (संस्कृतम्) verses, shlokas, and dhyana mantras' },
      { key: 'mantra_display', label: 'Specific stotrams or mantras permissible for public web display' }
    ]
  },
  {
    id: 'media',
    title: '5. PHOTOGRAPHY & MEDIA ASSETS',
    description: 'High-resolution authentic imagery and recordings',
    items: [
      { key: 'sri_chakra_photos', label: 'Consecrated Sri Chakra high-resolution photographs' },
      { key: 'altar_decorations', label: 'Altar, floral ornamentation, and deeparadhana photos' },
      { key: 'archival_photos', label: 'Historical & previous years photographs (categorized by year)' },
      { key: 'audio_chants', label: 'Optional background instrumental / chanting audio tracks' },
      { key: 'videos', label: 'YouTube or Vimeo live-stream / highlight video links' }
    ]
  },
  {
    id: 'gallery',
    title: '6. GALLERY & DEVOTEE SUBMISSIONS',
    description: 'Configuration for memories and visitor uploads',
    items: [
      { key: 'years_filter', label: 'Years to display in public gallery (e.g., 2026, 2025, 2024, Older)' },
      { key: 'uploader_name', label: 'Should devotee names be publicly credited alongside photos?' },
      { key: 'captions_policy', label: 'Should personal captions and memories be displayed?' },
      { key: 'approval_flow', label: 'Confirm approval workflow (All submissions require admin review before publishing)' }
    ]
  },
  {
    id: 'admin',
    title: '7. ADMIN ACCESS & GOVERNANCE',
    description: 'Dashboard security and content manager privileges',
    items: [
      { key: 'admin_emails', label: 'Designated admin email addresses for Supabase authentication' },
      { key: 'approval_roles', label: 'Designated committee members authorized to approve visitor photos' },
      { key: 'cms_editors', label: 'Designated editors authorized to update schedules, create events & post notices' }
    ]
  },
  {
    id: 'legal',
    title: '8. LEGAL, CONSENT & PRIVACY',
    description: 'Terms and devotional photo release consents',
    items: [
      { key: 'photo_consent', label: 'Devotee photo upload consent terms review and sign-off' },
      { key: 'privacy_policy', label: 'Contact information privacy policy acceptance' }
    ]
  }
];

export default function ClientChecklistModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);
  const [expandedCat, setExpandedCat] = useState('annual_pooja_invitation');

  if (!isOpen) return null;

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyMarkdown = () => {
    let md = `# CLIENT INFORMATION CHECKLIST — SRI CHAKRA WEBSITE PROJECT\n\n`;
    md += `*Use this checklist in discovery meetings with the client before replacing demo placeholders with authentic details.*\n\n`;

    CHECKLIST_CATEGORIES.forEach(cat => {
      md += `### ${cat.title}\n`;
      cat.items.forEach(item => {
        const isDone = checkedItems[item.key] ? '[x]' : '[ ]';
        md += `- ${isDone} **${item.label}**\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const totalItems = CHECKLIST_CATEGORIES.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="spiritual-card spiritual-corner"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#0c0206',
          border: '1px solid rgba(223, 177, 91, 0.45)',
          borderRadius: '12px'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(223, 177, 91, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(35, 10, 20, 0.9) 0%, rgba(15, 3, 8, 0.9) 100%)'
          }}
        >
          <div>
            <div className="demo-tag" style={{ marginBottom: '6px' }}>
              <Sparkles size={11} />
              <span>Project Deliverable</span>
            </div>
            <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.25rem' }}>
              {t('footer.checklistBtn')}
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#c5b49d', marginTop: '2px' }}>
              Items to gather from the client before replacing demo placeholders with authentic details.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label={t('buttons.close')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(223, 177, 91, 0.3)',
              color: '#dfb15b',
              padding: '6px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar & Actions */}
        <div
          style={{
            padding: '12px 24px',
            background: 'rgba(20, 5, 12, 0.8)',
            borderBottom: '1px solid rgba(223, 177, 91, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: '#dfb15b', fontFamily: 'var(--font-serif)' }}>
              Gathered: {completedCount} / {totalItems} items
            </span>
            <div
              style={{
                width: '120px',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${(completedCount / totalItems) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #dfb15b, #ffd700)',
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCopyMarkdown}
              className="btn-gold-outline"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Markdown!' : 'Copy as Markdown'}</span>
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {CHECKLIST_CATEGORIES.map(category => {
            const isExpanded = expandedCat === category.id;
            const categoryCompleted = category.items.filter(i => checkedItems[i.key]).length;

            return (
              <div
                key={category.id}
                style={{
                  border: '1px solid rgba(223, 177, 91, 0.2)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(18, 4, 10, 0.5)',
                  overflow: 'hidden'
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedCat(isExpanded ? '' : category.id)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isExpanded ? 'rgba(40, 10, 22, 0.6)' : 'transparent',
                    border: 'none',
                    color: '#f7eedb',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <h3 className="font-cinzel text-gold-primary" style={{ fontSize: '0.95rem' }}>
                      {category.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#a79581', marginTop: '2px' }}>
                      {category.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: categoryCompleted === category.items.length ? '#4ade80' : '#dfb15b',
                        background: 'rgba(0,0,0,0.4)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {categoryCompleted}/{category.items.length}
                    </span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>

                {/* Items */}
                {isExpanded && (
                  <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(223, 177, 91, 0.12)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {category.items.map(item => {
                        const checked = !!checkedItems[item.key];
                        return (
                          <label
                            key={item.key}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              cursor: 'pointer',
                              padding: '6px 8px',
                              borderRadius: '4px',
                              background: checked ? 'rgba(223, 177, 91, 0.08)' : 'transparent',
                              transition: 'background 0.2s ease'
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCheck(item.key)}
                              style={{
                                accentColor: '#dfb15b',
                                marginTop: '3px',
                                cursor: 'pointer'
                              }}
                            />
                            <span
                              style={{
                                fontSize: '0.85rem',
                                color: checked ? '#ffd978' : '#e2d5c3',
                                textDecoration: checked ? 'line-through' : 'none'
                              }}
                            >
                              {item.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(223, 177, 91, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(12, 2, 7, 0.95)'
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#9d8a77' }}>
            Tip: Keep this checklist handy during the client discovery interview.
          </span>
          <button onClick={onClose} className="btn-gold-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            {t('buttons.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
