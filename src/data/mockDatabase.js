/**
 * Curated Media & Archive Database for Shri Chakra Pooja — Shri Kshethra Kukkikatte
 * 
 * Separates:
 * 1. OFFICIAL PHOTOS (Uploaded by Admin / Temple Committee)
 * 2. COMMUNITY / DEVOTEE PHOTOS (Submitted by visitors, approved after moderation)
 */

export const initialGalleryPhotos = [
  // 2026 Photos (Official & Devotee)
  {
    id: 'gal-official-2026-1',
    year: '2026',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=75',
    caption: 'Consecrated Deepam illumination at Shri Rama Nilaya sanctum',
    uploadedBy: 'Shri Raghavendra Tantri (Admin)',
    status: 'APPROVED',
    createdAt: '2026-10-01T08:30:00Z',
    approvedAt: '2026-10-01T08:30:00Z',
    featured: true
  },
  {
    id: 'gal-official-2026-2',
    year: '2026',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=600&q=75',
    caption: 'Crimson Kumkumarchana petals and sacred bilva offerings for Shri Chakra Navavarana',
    uploadedBy: 'Shri Raghavendra Tantri (Admin)',
    status: 'APPROVED',
    createdAt: '2026-10-01T09:15:00Z',
    approvedAt: '2026-10-01T09:15:00Z',
    featured: true
  },
  {
    id: 'gal-community-2026-1',
    year: '2026',
    category: 'COMMUNITY',
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=75',
    caption: 'Resonant bronze bells and devout seekers during the morning invocation',
    uploadedBy: 'Smt. Ananya Rao & Family (Devotee)',
    status: 'APPROVED',
    createdAt: '2026-10-01T10:00:00Z',
    approvedAt: '2026-10-01T10:30:00Z',
    featured: true
  },

  // 2025 Photos (Official & Devotee)
  {
    id: 'gal-official-2025-1',
    year: '2025',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=75',
    caption: 'Traditional brass vilakku deepas radiating divine golden aura',
    uploadedBy: 'Temple Archive — Kukkikatte',
    status: 'APPROVED',
    createdAt: '2025-10-19T18:00:00Z',
    approvedAt: '2025-10-19T18:00:00Z',
    featured: false
  },
  {
    id: 'gal-official-2025-2',
    year: '2025',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=75',
    caption: 'Sacred floral mandala ornamentation welcoming devotees at Shri Rama Nilaya',
    uploadedBy: 'Temple Archive — Kukkikatte',
    status: 'APPROVED',
    createdAt: '2025-10-19T08:00:00Z',
    approvedAt: '2025-10-19T08:00:00Z',
    featured: false
  },
  {
    id: 'gal-community-2025-1',
    year: '2025',
    category: 'COMMUNITY',
    imageUrl: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?auto=format&fit=crop&w=600&q=75',
    caption: 'Devotee families partaking in holy teertha and receiving prasada',
    uploadedBy: 'Nagaraj Bhat (Devotee)',
    status: 'APPROVED',
    createdAt: '2025-10-19T13:30:00Z',
    approvedAt: '2025-10-19T14:00:00Z',
    featured: false
  },

  // 2024 Photos (Official & Devotee)
  {
    id: 'gal-official-2024-1',
    year: '2024',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=75',
    caption: 'Consecrated panchamrita kalasha abhisheka offerings',
    uploadedBy: 'Temple Archive — Kukkikatte',
    status: 'APPROVED',
    createdAt: '2024-10-20T10:00:00Z',
    approvedAt: '2024-10-20T10:00:00Z',
    featured: false
  },
  {
    id: 'gal-official-2024-2',
    year: '2024',
    category: 'OFFICIAL',
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=75',
    caption: 'Evening Maha Mangala Aarti with resonance of sacred conch shells',
    uploadedBy: 'Temple Archive — Kukkikatte',
    status: 'APPROVED',
    createdAt: '2024-10-20T19:30:00Z',
    approvedAt: '2024-10-20T19:30:00Z',
    featured: false
  }
];

export const initialPhotoSubmissions = [
  {
    id: 'sub-demo-1',
    year: '2026',
    category: 'COMMUNITY',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=75',
    caption: 'Devotional sandalwood and chandan archana offerings',
    uploadedBy: 'Suresh Nayak (Udupi)',
    contact: '+91 94481 22334',
    status: 'PENDING',
    createdAt: '2026-10-01T11:20:00Z'
  },
  {
    id: 'sub-demo-2',
    year: '2026',
    category: 'COMMUNITY',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=75',
    caption: 'Devotee assemblage listening to Lalita Sahasranama chanting',
    uploadedBy: 'Girija K. (Mangalore)',
    contact: 'girija.seva@example.com',
    status: 'PENDING',
    createdAt: '2026-10-01T15:45:00Z'
  }
];

export const initialContactMessages = [
  {
    id: 'msg-1',
    name: 'Santhosh Upadhyaya',
    email: 'santhosh.upadh@example.com',
    phone: '+91 98450 11223',
    message: 'Namaskara to Shri Raghavendra Tantri. We wish to volunteer for floral seva and Annadana seva on 25 October 2026.',
    submittedAt: '2026-10-01T09:00:00Z',
    status: 'UNREAD'
  },
  {
    id: 'msg-2',
    name: 'Prabhakar Shenoy',
    email: 'shenoy.prabhakar@example.com',
    phone: '+91 94482 99887',
    message: 'Namaste. Kindly let us know the exact timing for the afternoon Mahaprasada and evening 1,008 deeparadhana.',
    submittedAt: '2026-10-01T12:30:00Z',
    status: 'READ'
  }
];
