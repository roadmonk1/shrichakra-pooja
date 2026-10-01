import React, { useState } from 'react';
import { Upload, CheckCircle, Image as ImageIcon, AlertCircle, ArrowRight, Shield, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ShareMomentPage({
  storageService,
  setActivePage
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    year: '2026',
    caption: '',
    consent: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit. Please select a smaller photo.');
      return;
    }

    setErrorMsg('');
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!imagePreview) {
      setErrorMsg('Please select a photograph to upload.');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please check the consent box to grant publication permission.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const newSubmission = await storageService.submitVisitorPhoto({
        name: formData.name,
        contact: formData.contact,
        year: formData.year,
        caption: formData.caption,
        imageBase64: imagePreview
      });

      setSubmittedItem(newSubmission);
      setIsSubmitting(false);
    } catch (err) {
      setErrorMsg('Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* ============================================================== */}
      {/* 1. HERO HEADER                                                 */}
      {/* ============================================================== */}
      <section
        style={{
          padding: '80px 20px 40px',
          textAlign: 'center',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 0%, rgba(120, 16, 38, 0.28) 0%, transparent 70%)'
        }}
      >
        <div className="container" style={{ maxWidth: '820px' }}>
          <span className="sacred-tag" style={{ marginBottom: '12px' }}>
            <Heart size={12} className="text-[#dfb15b]" />
            <span>{t('nav.share')}</span>
          </span>

          <h1
            className="font-cinzel text-gold-gradient"
            style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', marginBottom: '16px', lineHeight: 1.15 }}
          >
            {t('share.headline')}
          </h1>

          <p className="font-cormorant" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.4rem)', color: '#eee0cb', lineHeight: 1.5 }}>
            {t('share.description')}
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE WORKFLOW DIAGRAM BANNER                                 */}
      {/* ============================================================== */}
      <section style={{ position: 'relative', zIndex: 10, marginBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div
            className="spiritual-card"
            style={{
              padding: '20px 24px',
              backgroundColor: 'rgba(15, 3, 9, 0.85)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} className="text-[#dfb15b]" />
              <span className="font-cinzel text-gold-light" style={{ fontSize: '0.85rem' }}>
                {t('share.workflowTitle')}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.74rem',
                color: '#c9b8a0',
                flexWrap: 'wrap'
              }}
            >
              <span style={{ color: '#ffd883' }}>{t('share.stepUpload')}</span>
              <span>→</span>
              <span style={{ color: '#f59e0b' }}>{t('share.stepPending')}</span>
              <span>→</span>
              <span style={{ color: '#dfb15b' }}>{t('share.stepApproval')}</span>
              <span>→</span>
              <span style={{ color: '#4ade80' }}>{t('share.stepPublished')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FORM / SUCCESS STATE CONTAINER                              */}
      {/* ============================================================== */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 10, paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          {submittedItem ? (
            /* Success State */
            <div
              className="spiritual-card spiritual-corner"
              style={{
                padding: '48px 36px',
                textAlign: 'center',
                backgroundColor: 'rgba(15, 3, 9, 0.95)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 128, 0.15)',
                  border: '1px solid #4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#4ade80'
                }}
              >
                <CheckCircle size={36} />
              </div>

              <h2 className="font-cinzel text-gold-light" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>
                {t('share.successTitle')}, {submittedItem.uploadedBy}!
              </h2>

              <p style={{ color: '#d8c8b4', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto 24px' }}>
                {t('share.successDesc')}
              </p>

              {/* Submission Preview Card */}
              <div
                style={{
                  maxWidth: '360px',
                  margin: '0 auto 32px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(223, 177, 91, 0.3)',
                  background: 'rgba(0,0,0,0.5)'
                }}
              >
                <img
                  src={submittedItem.imageUrl}
                  alt="Submission preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
                <div style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', color: '#ded1be' }}>
                  <div><strong>Caption:</strong> {submittedItem.caption || 'None provided'}</div>
                  <div style={{ marginTop: '4px' }}>
                    <strong>Status:</strong> <span style={{ color: '#f59e0b' }}>{t('share.statusPending')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setSubmittedItem(null);
                    setImageFile(null);
                    setImagePreview(null);
                    setFormData({ name: '', contact: '', year: '2026', caption: '', consent: false });
                  }}
                  className="btn-gold-outline"
                >
                  <span>{t('buttons.submitAnother')}</span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-gold-primary"
                >
                  <Shield size={16} />
                  <span>{t('buttons.testAdmin')}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <form
              onSubmit={handleSubmit}
              className="spiritual-card spiritual-corner"
              style={{
                padding: 'clamp(28px, 4vw, 48px)',
                backgroundColor: 'rgba(15, 3, 9, 0.9)'
              }}
            >
              {errorMsg && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    marginBottom: '24px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* 1. Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#ffd883', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                    {t('share.nameLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Smt. Gayatri or Sri Raghuveer"
                    className="form-input"
                  />
                </div>

                {/* 2. Contact (Optional) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#dfb15b', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                    {t('share.contactLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="To notify you when your photo is approved"
                    className="form-input"
                  />
                </div>

                {/* 3. Year */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#dfb15b', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                    {t('share.yearLabel')}
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="Older">Older</option>
                  </select>
                </div>

                {/* 4. Photo Upload Area */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#ffd883', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                    {t('share.uploadLabel')}
                  </label>

                  <div
                    style={{
                      border: '2px dashed rgba(223, 177, 91, 0.4)',
                      borderRadius: '8px',
                      padding: '24px',
                      textAlign: 'center',
                      background: 'rgba(10, 2, 6, 0.6)',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#dfb15b')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(223, 177, 91, 0.4)')}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%'
                      }}
                    />

                    {imagePreview ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={imagePreview}
                          alt="Upload preview"
                          style={{
                            maxHeight: '180px',
                            borderRadius: '6px',
                            border: '1px solid rgba(223, 177, 91, 0.3)'
                          }}
                        />
                        <span style={{ fontSize: '0.78rem', color: '#ffd883' }}>
                          Click or drag another image to replace
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <Upload size={32} className="text-[#dfb15b]" />
                        <span style={{ color: '#f7eedb', fontSize: '0.9rem', fontWeight: 500 }}>
                          Click to select a photograph or drop it here
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#a89781' }}>
                          Supports JPG, PNG, WEBP formats up to 5MB
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 5. Caption */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#dfb15b', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                    {t('share.captionLabel')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    placeholder="Tell us about this sacred moment, the seva performed, or family presence..."
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* 6. Consent Checkbox */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input
                    type="checkbox"
                    id="consent-check"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    style={{ accentColor: '#dfb15b', marginTop: '4px', cursor: 'pointer' }}
                  />
                  <label htmlFor="consent-check" style={{ fontSize: '0.82rem', color: '#ded2c0', lineHeight: 1.5, cursor: 'pointer' }}>
                    {t('share.consentText')}
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <Upload size={17} />
                  <span>{isSubmitting ? '...' : t('buttons.submit')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
