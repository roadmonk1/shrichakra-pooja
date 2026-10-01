# SHRI CHAKRA POOJA — PRODUCTION HANDOVER & DEPLOYMENT GUIDE
**Shri Kshethra Kukkikatte • Official Digital Experience**

---

## 1. PROJECT SUMMARY & CONFIRMED DETAILS

| Item | Confirmed Detail |
| :--- | :--- |
| **Pooja Name** | Shri Chakra Pooja (ಶ್ರೀಚಕ್ರ ಪೂಜೆ / श्रीचक्र पूजा) |
| **Sacred Place** | Shri Kshethra Kukkikatte, Udupi, Karnataka |
| **Annual Pooja Date** | **Sunday, 25 October 2026** (6:00 AM – 10:00 PM) |
| **Venue** | **Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka, India** |
| **Main Priest & Custodian** | **Shri Raghavendra Tantri** |
| **Phone & WhatsApp** | `+91 98443 06623` |
| **Official Email** | `shrichakreshwari74@gmail.com` |
| **Google Maps** | [Shri Rama Nilaya, Kukkikatte on Google Maps](https://www.google.com/maps/search/?api=1&query=Shri+Rama+Nilaya+Kukkikatte+Udupi+Karnataka) |
| **Languages Supported** | English, ಕನ್ನಡ (Kannada), and संस्कृतम् (Sanskrit in proper Devanagari script) |

---

## 2. HOW TO DEPLOY TO VERCEL IN 2 MINUTES (GET ONE PUBLIC URL)

You can deploy this website to **Vercel** for free. Once deployed, Vercel gives you a permanent HTTPS public URL (e.g. `https://shrichakra-pooja.vercel.app`) that works on **all Android phones, iPhones, iPads, Macs, and Windows PCs** across the world without requiring local Wi-Fi.

### Option A: Deploy via GitHub (Recommended)
1. **Push this repository to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/shrichakra-pooja.git
   git branch -M main
   git push -u origin main
   ```
2. Open **[vercel.com](https://vercel.com)** and sign in.
3. Click **Add New... > Project**.
4. Select your `shrichakra-pooja` repository.
5. In **Framework Preset**, Vercel will automatically detect **Vite**.
6. (Optional) Add your Environment Variables under **Environment Variables** (see section 4).
7. Click **Deploy**.
8. In ~45 seconds, you will receive your live public URL!

### Option B: Deploy via Vercel CLI (Instant from terminal)
1. In this project directory, run:
   ```bash
   npx vercel
   ```
2. Follow the 3 prompts:
   - *Set up and deploy?* -> `y`
   - *Which scope?* -> select your account
   - *Link to existing project?* -> `n`
   - *What's your project's name?* -> `shrichakra-pooja`
   - *In which directory is your code located?* -> `./`
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

---

## 3. HOW TO RUN LOCALLY

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# Local URL: http://localhost:3000
# Network URL: http://<your-computer-ip>:3000 (accessible on same Wi-Fi)

# 3. Test production build
npm run build
npm run preview
```

---

## 4. ENVIRONMENT VARIABLES & SUPABASE SETUP

The project is built with a dual backend architecture:
- **Offline / Standalone Mode**: Works 100% out of the box with zero setup using browser persistence, cryptographic session verification, and bundled mock data.
- **Supabase Cloud Mode**: Seamlessly switches to real-time PostgreSQL database, Supabase Auth, and cloud image storage when `.env.local` or Vercel Environment Variables are added.

### Environment Variables Template (`.env.example`)
```env
# Supabase Project URL (from Supabase Dashboard > Project Settings > API)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co

# Supabase Public Anonymous Key
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Authorized Temple Administrator Email
VITE_ADMIN_EMAIL=shrichakreshwari74@gmail.com

# Optional emergency offline passcode
VITE_ADMIN_ACCESS_KEY=
```

### Complete Supabase SQL Database Schema
To initialize the Supabase database, open **Supabase Dashboard > SQL Editor**, paste the following script, and click **Run**:

```sql
-- 1. ANNUAL POOJA EVENTS TABLE
CREATE TABLE IF NOT EXISTS pooja_events (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title JSONB NOT NULL,
  subheading JSONB,
  description JSONB NOT NULL,
  date DATE NOT NULL,
  display_date JSONB,
  start_time TEXT,
  end_time TEXT,
  time_text JSONB,
  venue JSONB NOT NULL,
  area JSONB NOT NULL,
  location JSONB NOT NULL,
  google_maps_url TEXT,
  image TEXT,
  invitation_image TEXT,
  invitation_pdf TEXT,
  contact_person JSONB,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  status TEXT DEFAULT 'PUBLISHED',
  featured BOOLEAN DEFAULT false,
  schedule JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PUBLIC PHOTO GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery_photos (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('OFFICIAL', 'COMMUNITY')),
  caption TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  uploaded_by TEXT NOT NULL,
  likes INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DEVOTEE VISITOR PHOTO SUBMISSIONS (APPROVAL QUEUE)
CREATE TABLE IF NOT EXISTS photo_submissions (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  devotee_name TEXT NOT NULL,
  phone TEXT,
  caption TEXT NOT NULL,
  image_url TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_notes TEXT
);

-- 4. CONTACT & SEVA INQUIRY MESSAGES
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE pooja_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE photo_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published events and approved gallery photos
CREATE POLICY "Public events readable" ON pooja_events FOR SELECT USING (status = 'PUBLISHED' OR auth.role() = 'authenticated');
CREATE POLICY "Public gallery readable" ON gallery_photos FOR SELECT USING (true);

-- Allow devotees to submit visitor photos
CREATE POLICY "Visitors can submit photos" ON photo_submissions FOR INSERT WITH CHECK (true);

-- Allow visitors to submit contact messages
CREATE POLICY "Visitors can send messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated Temple Admin has full control
CREATE POLICY "Admin full pooja_events" ON pooja_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full gallery_photos" ON gallery_photos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full photo_submissions" ON photo_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
```

---

## 5. TEMPLE ADMINISTRATOR PORTAL (`/admin`)

The admin portal is protected and accessible via navigation bar or by visiting `/admin`.

### Access Credentials:
- **Authorized Admin Email**: `shrichakreshwari74@gmail.com`
- **Custodian**: Shri Raghavendra Tantri
- **Offline / Demo Passcode**: `tantri2026` or `kukkikatte` (verified via SHA-256 in offline mode; when Supabase is connected, the password created in Supabase Auth is used).

### What Shri Raghavendra Tantri & Seva Committee Can Do:
1. **Manage Annual Pooja Events**:
   - Create, edit, publish, and feature upcoming annual poojas (e.g. 2026, 2027, 2028).
   - Changing the featured pooja automatically updates the countdown timer, hero section, schedules, and digital invitation across the entire public website.
2. **Review Visitor Photo Submissions**:
   - Devotees can submit their holy moments via the **"Share Your Moment"** tab (`/share`).
   - All submissions go into a **PENDING** queue with devotee name, phone number, and photo.
   - The admin can **Approve** (instantly transfers to the public Devotee Moments gallery) or **Reject**.
3. **Upload Official High-Resolution Temple Photographs**:
   - Add authentic temple photography with captions into the **Official Gallery**.
4. **Digital Invitation Management**:
   - Preview and verify digital invitation passes.
5. **View Seva & Contact Messages**:
   - Devotee inquiries sent through the contact form are stored for follow-up.

---

## 6. PROJECT ARCHITECTURE & FILE MAP

```
shrichakra-website/
├── public/
│   └── favicon.svg                    # Sacred Sri Chakra gold emblem favicon
├── src/
│   ├── animations/
│   │   └── SriChakraSvg.jsx           # Mathematical 9 interlocking triangles, 8/16 petals, Bindu
│   ├── components/
│   │   ├── Navbar.jsx                 # Glassmorphic header with Logo and multilingual switcher
│   │   ├── Footer.jsx                 # Sacred footer with contact details & quick links
│   │   ├── Logo.jsx                   # Original golden temple emblem
│   │   ├── ParticleCanvas.jsx         # Golden ambient dust particles
│   │   ├── FeaturedEventBanner.jsx    # Live countdown & event status ribbon
│   │   ├── DigitalInvitationModal.jsx # Shareable invitation modal with WhatsApp/SMS/Calendar
│   │   ├── LightboxModal.jsx          # High-res photo inspection modal
│   │   ├── DemoBanner.jsx             # Top admin & checklist shortcut
│   │   └── ClientChecklistModal.jsx   # Interactive presentation checklist for client review
│   ├── context/
│   │   └── LanguageContext.jsx        # Global multilingual provider (English, Kannada, Sanskrit)
│   ├── data/
│   │   ├── translations.js            # Triple-language dictionary (Devanagari Sanskrit, Kannada, EN)
│   │   ├── eventsData.js              # Annual pooja timeline & 2026 default event
│   │   ├── contentData.js             # Detailed 9 Avaranas & Sri Vidya sacred geometry data
│   │   └── mockDatabase.js            # Initial official & community gallery images
│   ├── pages/
│   │   ├── HomePage.jsx               # Hero, Countdown, Legacy, Priest profile, 9 Avaranas, Gallery
│   │   ├── AboutPage.jsx              # Deep Sri Chakra history, 9 Avaranas, philosophy
│   │   ├── PoojaPage.jsx              # Complete 25 Oct 2026 event details, schedule, Google Map
│   │   ├── GalleryPage.jsx            # Filterable gallery (Year + Official vs Devotee Moments)
│   │   ├── ShareMomentPage.jsx        # Devotee photo upload workflow (Year 2026 strict validation)
│   │   ├── ContactPage.jsx            # Venue, Phone, WhatsApp, Priest info, Seva inquiry form
│   │   └── AdminPage.jsx              # Multi-tab admin portal with approval queue & event editor
│   ├── services/
│   │   ├── storageService.js          # Unified data layer (Supabase + Secure Offline localStorage)
│   │   └── supabaseClient.js          # Supabase client initializer
│   ├── styles/
│   │   └── index.css                  # Obsidian black, sacred gold, maroon luxury design tokens
│   ├── App.jsx                        # Main layout with dual Pathname/Hash router & popstate sync
│   └── main.jsx                       # React 18 entry point
├── .env.example                       # Documented environment variables template
├── .gitignore                         # Standard git ignore rules
├── index.html                         # Full SEO, Open Graph & Twitter meta tags
├── package.json                       # Dependencies & build scripts
├── vercel.json                        # Vercel SPA rewrite & security headers
└── vite.config.js                     # Vite build configuration with chunk code-splitting
```

---

## 7. CLIENT PRESENTATION TALKING POINTS

When presenting this website to **Shri Raghavendra Tantri and the Temple Committee**:

1. **Multilingual Inclusivity**:
   - Demonstrate switching between **English**, **ಕನ್ನಡ (Kannada)**, and **संस्कृतम् (Sanskrit in pure Devanagari script)**. Point out that the entire navigation, headings, countdown, and sacred descriptions translate seamlessly.
2. **25 October 2026 Pooja Ready**:
   - Highlight the live countdown clock ticking down to Sunday, 25 October 2026, 6:00 AM at Shri Rama Nilaya, Kukkikatte.
3. **Interactive Digital Invitation**:
   - Open the **Digital Invitation** on mobile/laptop. Show how devotees can click **Share on WhatsApp**, **Add to Calendar**, or **Download Invitation**.
4. **Devotee Engagement with Sacred Moderation**:
   - Show how devotees can submit their pooja photos under **"Share Your Moment"**.
   - Explain that **no photo appears publicly until Shri Raghavendra Tantri or the Admin approves it** in the Admin Portal.
5. **Future-Proof Annual Management**:
   - Demonstrate how in 2027, the committee can log into the Admin Portal, create the 2027 Pooja, click "Publish & Feature", and the entire website (countdown, dates, venue, invitation) will automatically update for the new year without needing any programmer!
