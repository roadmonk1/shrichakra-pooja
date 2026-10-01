/**
 * Dynamic Annual Pooja Events Model & Database Store
 * 
 * Supports:
 * - DRAFT, PUBLISHED, ARCHIVED states
 * - Multiple years (2026 current, 2025, 2024, 2023 archived)
 * - Complete multilingual content in English, Kannada, and Sanskrit (Devanagari)
 * - Confirmed Client Details for Shri Kshethra Kukkikatte
 */

export const initialEvents = [
  {
    id: 'pooja-2026',
    year: '2026',
    status: 'PUBLISHED',
    featured: true,
    title: {
      en: 'Annual Shri Chakra Pooja 2026',
      kn: 'ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜೆ ೨೦೨೬',
      sa: 'वार्षिक श्रीचक्र महापूजा २०२६'
    },
    subheading: {
      en: 'Shri Kshethra Kukkikatte • Sacred Daylong Celebration',
      kn: 'ಶ್ರೀ ಕ್ಷೇತ್ರ ಕುಕ್ಕಿಕಟ್ಟೆ • ಅಖಂಡ ದಿನದ ಪವಿತ್ರ ಮಹೋತ್ಸವ',
      sa: 'श्री क्षेत्र कुक्कीकट्टे • अखण्ड दिवसस्य पावनी उपासना'
    },
    description: {
      en: 'Conducted under the holy guidance of Shri Raghavendra Tantri, the Annual Shri Chakra Pooja at Shri Kshethra Kukkikatte is a daylong sacred congregation. Devotees witness the consecration of the Shri Chakra with Navavarana Archana, Veda Chanting, Lalita Sahasranama Kumkumarchana, Maha Deeparadhana, and sanctified Mahaprasada distribution.',
      kn: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳ ದೈವಿಕ ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ಶ್ರೀ ಕ್ಷೇತ್ರ ಕುಕ್ಕಿಕಟ್ಟೆಯ ಶ್ರೀ ರಾಮ ನಿಲಯದಲ್ಲಿ ಜರುಗುವ ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜಾ ಮಹೋತ್ಸವ. ಮುಂಜಾನೆ ೬:೦೦ ರಿಂದ ರಾತ್ರಿ ೧೦:೦೦ ರವರೆಗೆ ನವಾವರಣ ಪೂಜೆ, ವೇದಘೋಷ, ಲಲಿತಾ ಸಹಸ್ರನಾಮ ಕುಂಕುಮಾರ್ಚನೆ, ಮಹಾದೀಪಾರಾಧನೆ ಹಾಗೂ ಅನ್ನಸಂತರ್ಪಣೆ ನೆರವೇರಲಿದೆ.',
      sa: 'श्री राघवेंद्र तन्त्रि-महोदयस्य मार्गदर्शने श्री क्षेत्र कुक्कीकट्टे श्री राम निलये आयोजिता वार्षिक श्रीचक्र महापूजा। प्रातः ६:०० वादनात् रात्रौ १०:०० वादनपर्यन्तं नवावरणार्चना, वेदघोषः, ललितासहस्रनाम कुङ्कुमार्चना, महादीपाराधना, महाप्रसाद वितरणं च भविष्यति।'
    },
    date: '2026-10-25',
    displayDate: {
      en: 'Sunday, 25 October 2026',
      kn: 'ಭಾನುವಾರ, ೨೫ ಅಕ್ಟೋಬರ್ ೨೦೨೬',
      sa: 'भानुवासरः, २५ अक्टोबर् २०२६'
    },
    startTime: '06:00',
    endTime: '22:00',
    timeText: {
      en: '06:00 AM – 10:00 PM (IST)',
      kn: 'ಬೆಳಗ್ಗೆ ೬:೦೦ ರಿಂದ ರಾತ್ರಿ ೧೦:೦೦ ರವರೆಗೆ',
      sa: 'प्रातः ६:०० तः रात्रि १०:०० पर्यन्तम्'
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
    invitationPdf: '/invitation-kukkikatte-2026.pdf',
    contactPerson: {
      en: 'Shri Raghavendra Tantri',
      kn: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳು',
      sa: 'श्री राघवेंद्र तन्त्री'
    },
    phone: '+91 98443 06623',
    email: 'shrichakreshwari74@gmail.com',
    whatsapp: '919844306623',
    schedule: [
      {
        id: 'sch-1',
        time: '06:00 AM – 07:30 AM',
        phase: {
          en: 'Ushakala Invocation',
          kn: 'ಉಷಃಕಾಲ ಪ್ರಾರ್ಥನೆ',
          sa: 'उषःकाल प्रार्थना'
        },
        title: {
          en: 'Suprabhata, Ganapati Pooja & Sankalpa',
          kn: 'ಸುಪ್ರಭಾತ, ಮಹಾಗಣಪತಿ ಪೂಜೆ ಹಾಗೂ ಸಂಕಲ್ಪ',
          sa: 'सुप्रभातम्, महागणपति पूजा तथा सङ्कल्पः'
        },
        description: {
          en: 'Auspicious commencement with sanctum purification, auspicious mangala vadya, and prayer to Lord Vighneshwara.',
          kn: 'ಮಂಗಳ ವಾದ್ಯದೊಂದಿಗೆ ಕ್ಷೇತ್ರ ಶುದ್ಧಿ ಹಾಗೂ ವಿಘ್ನನಿವಾರಕ ಮಹಾಗಣಪತಿ ಪೂಜೆ ಮತ್ತು ಮಹಾಸಂಕಲ್ಪ.',
          sa: 'मङ्गलवाद्यैः सह क्षेत्रशुद्धिः, विघ्नहर्तुः गणपति पूजा तथा महासङ्कल्पः।'
        }
      },
      {
        id: 'sch-2',
        time: '07:30 AM – 09:30 AM',
        phase: {
          en: 'Purification & Kalasha',
          kn: 'ಶುದ್ಧೀಕರಣ & ಕಲಶ ಸ್ಥಾಪನೆ',
          sa: 'पुण्याहवाचनं कलशस्थापनं च'
        },
        title: {
          en: 'Punyaha Vachana & Navakalasha Sthapana',
          kn: 'ಪುಣ್ಯಾಹ ವಾಚನ ಹಾಗೂ ನವಕಲಶ ಸ್ಥಾಪನೆ',
          sa: 'पुण्याहवाचनम् तथा नवकलश स्थापनम्'
        },
        description: {
          en: 'Consecration of sacred holy waters with Vedic chanting, inviting divine maternal energies into sacred kumbhas.',
          kn: 'ವೇದಮಂತ್ರಗಳ ಪಠಣದೊಂದಿಗೆ ಪವಿತ್ರ ಜಲಪ್ರೋಕ್ಷಣ ಹಾಗೂ ನವಕಲಶಗಳ ಆವಾಹನೆ.',
          sa: 'वेदमन्त्रोच्चारणेन पवित्र जलसंस्कारः, कलशेषु मातृशक्तेः आवाहनं च।'
        }
      },
      {
        id: 'sch-3',
        time: '09:30 AM – 01:30 PM',
        phase: {
          en: 'Maha Navavarana Pooja',
          kn: 'ಮಹಾ ನವಾವರಣ ಪೂಜೆ',
          sa: 'महा नवावरणार्चना'
        },
        title: {
          en: 'Shri Chakra Navavarana Archana & Lalita Sahasranama',
          kn: 'ಶ್ರೀಚಕ್ರ ನವಾವರಣಾರ್ಚನೆ ಮತ್ತು ಕುಂಕುಮಾರ್ಚನೆ',
          sa: 'श्रीचक्र नवावरणार्चना तथा ललितासहस्रनाम कुङ्कुमार्चनम्'
        },
        description: {
          en: 'Elaborate archana traversing each of the 9 celestial circuits of the Shri Chakra with pure vermilion, bilva leaves, and fragrant flowers.',
          kn: 'ಶ್ರೀಚಕ್ರದ ೯ ಆವರಣ ದೇವತೆಗಳಿಗೆ ಶಾಸ್ತ್ರೋಕ್ತ ಕುಂಕುಮಾರ್ಚನೆ, ಬಿಲ್ವಾರ್ಚನೆ ಹಾಗೂ ಲಲಿತಾ ಸಹಸ್ರನಾಮ ಪಾರಾಯಣ.',
          sa: 'श्रीचक्रस्य नवसु आवरणीयेषु मण्डलेषु कुङ्कुमेन, बिल्वपत्रैः सुगन्धिपुष्पैश्च विशेषार्चनम्।'
        }
      },
      {
        id: 'sch-4',
        time: '01:30 PM – 04:00 PM',
        phase: {
          en: 'Madhyahna Arati & Prasada',
          kn: 'ಮಧ್ಯಾಹ್ನ ಮಂಗಳಾರತಿ & ಮಹಾಪ್ರಸಾದ',
          sa: 'मध्याह्न मङ्गलारतिः महाप्रसादश्च'
        },
        title: {
          en: 'Maha Mangalarati & Annadana Mahaprasada',
          kn: 'ಮಹಾ ಮಂಗಳಾರತಿ ಹಾಗೂ ಸಾರ್ವಜನಿಕ ಅನ್ನಸಂತರ್ಪಣೆ',
          sa: 'महामङ्गलारतिः तथा अन्नदान महाप्रसाद वितरणम्'
        },
        description: {
          en: 'Grand noon ceremonial camphor aarti followed by sanctified community meal distribution to all visiting devotees.',
          kn: 'ಮಧ್ಯಾಹ್ನದ ಮಹಾಮಂಗಳಾರತಿ, ತೀರ್ಥ ವಿತರಣೆ ಹಾಗೂ ಸಮಸ್ತ ಭಕ್ತಾದಿಗಳಿಗೆ ಅನ್ನದಾನ ಪ್ರಸಾದ.',
          sa: 'मध्याह्न काले महामङ्गलारतिः, तीर्थवितरणं तथा आगतानां भक्तानां कृते अन्नदानम्।'
        }
      },
      {
        id: 'sch-5',
        time: '04:30 PM – 07:00 PM',
        phase: {
          en: 'Evening Upacharas',
          kn: 'ಸಂಜೆಯ ಉಪಚಾರ ಸೇವೆಗಳು',
          sa: 'सायङ्कालीन उपचाराः'
        },
        title: {
          en: 'Veda Ghosha, Devotional Chanting & Lalita Trishati',
          kn: 'ವೇದಘೋಷ, ಭಜನೆ ಹಾಗೂ ಲಲಿತಾ ತ್ರಿಶತೀ ಅರ್ಚನೆ',
          sa: 'वेदघोषः, भजनसङ्कीर्तनं तथा ललितात्रिशती अर्चनम्'
        },
        description: {
          en: 'Sacred chanting of the Lalita Trishati, Veda recitations by scholars, and community bhajan offerings.',
          kn: 'ವಿದ್ವಾಂಸರಿಂದ ವೇದ ಪಾರಾಯಣ, ಭಕ್ತರಿಂದ ಭಜನಾ ಸೇವೆ ಹಾಗೂ ಲಲಿತಾ ತ್ರಿಶತೀ ನಾಮಾವಳಿ ಪೂಜೆ.',
          sa: 'विद्वद्भिः वेदघोषः, भक्तजनैः सङ्कीर्तनं तथा ललितात्रिशती नामावलि पूजा।'
        }
      },
      {
        id: 'sch-6',
        time: '07:30 PM – 10:00 PM',
        phase: {
          en: 'Maha Deeparadhana',
          kn: 'ಮಹಾ ದೀಪಾರಾಧನೆ',
          sa: 'महादीपाराधना'
        },
        title: {
          en: 'Grand 1,008 Deeparadhana, Shanti Mantras & Prasada',
          kn: '೧,೦೦೮ ದೀಪಗಳ ಮಹಾ ದೀಪಾರಾಧನೆ, ಶಾಂತಿ ಮಂತ್ರ & ಪ್ರಸಾದ',
          sa: 'सहस्रदीप प्रज्वलनम्, शान्तिमन्त्राः महाप्रसादश्च'
        },
        description: {
          en: 'Breathtaking illumination of 1,008 sacred oil lamps, final Mahamangalarati, ashirvada, and prasada distribution concluding at 10:00 PM.',
          kn: 'ಸಹಸ್ರ ದೀಪಗಳ ಪ್ರಜ್ವಲನೆ, ರಾತ್ರಿಯ ಮಹಾಮಂಗಳಾರತಿ, ಆಶೀರ್ವಾದ ಮಂತ್ರಾಕ್ಷತೆ ಹಾಗೂ ಪ್ರಸಾದ ವಿನಿಯೋಗದೊಂದಿಗೆ ಸಂಪನ್ನ.',
          sa: 'सहस्रदीप प्रज्वालनेन महामङ्गलारतिः, आशिर्वचनम्, महाप्रसाद वितरणं च कृत्वा समाप्तिः।'
        }
      }
    ]
  },
  {
    id: 'pooja-2025',
    year: '2025',
    status: 'ARCHIVED',
    featured: false,
    title: {
      en: 'Annual Shri Chakra Pooja 2025',
      kn: 'ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜೆ ೨೦೨೫',
      sa: 'वार्षिक श्रीचक्र महापूजा २०२५'
    },
    subheading: {
      en: 'Shri Kshethra Kukkikatte Archive',
      kn: 'ಶ್ರೀ ಕ್ಷೇತ್ರ ಕುಕ್ಕಿಕಟ್ಟೆ ಸಂಗ್ರಹ',
      sa: 'श्री क्षेत्र कुक्कीकट्टे सङ्ग्रहः'
    },
    description: {
      en: 'Consecrated annual observance conducted with traditional grandeur at Shri Rama Nilaya, Kukkikatte, marked by magnificent floral decorations and deeparadhana.',
      kn: 'ಕುಕ್ಕಿಕಟ್ಟೆಯ ಶ್ರೀ ರಾಮ ನಿಲಯದಲ್ಲಿ ಶ್ರದ್ಧಾಭಕ್ತಿಗಳಿಂದ ನೆರವೇರಿದ ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವ.',
      sa: 'कुक्कीकट्टे श्री राम निलये श्रद्धया सम्पन्ना वार्षिक पूजा।'
    },
    date: '2025-10-19',
    displayDate: {
      en: 'Sunday, 19 October 2025',
      kn: 'ಭಾನುವಾರ, ೧೯ ಅಕ್ಟೋಬರ್ ೨೦೨೫',
      sa: 'भानुवासरः, १९ अक्टोबर् २०२५'
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
      en: 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka',
      kn: 'ಶ್ರೀ ರಾಮ ನಿಲಯ, ಕುಕ್ಕಿಕಟ್ಟೆ, ಉಡುಪಿ',
      sa: 'श्री राम निलयम्, कुक्कीकट्टे, उडुपी'
    },
    image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    invitationImage: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1000&q=80',
    invitationPdf: '/invitation-kukkikatte-2025.pdf',
    contactPerson: {
      en: 'Shri Raghavendra Tantri',
      kn: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳು',
      sa: 'श्री राघवेंद्र तन्त्री'
    },
    phone: '+91 98443 06623',
    email: 'shrichakreshwari74@gmail.com',
    whatsapp: '919844306623'
  },
  {
    id: 'pooja-2024',
    year: '2024',
    status: 'ARCHIVED',
    featured: false,
    title: {
      en: 'Annual Shri Chakra Pooja 2024',
      kn: 'ವಾರ್ಷಿಕ ಶ್ರೀಚಕ್ರ ಮಹಾಪೂಜೆ ೨೦೨೪',
      sa: 'वार्षिक श्रीचक्र महापूजा २०२४'
    },
    subheading: {
      en: 'Shri Kshethra Kukkikatte Archive',
      kn: 'ಶ್ರೀ ಕ್ಷೇತ್ರ ಕುಕ್ಕಿಕಟ್ಟೆ ಸಂಗ್ರಹ',
      sa: 'श्री क्षेत्र कुक्कीकट्टे सङ्ग्रहः'
    },
    description: {
      en: 'Sacred gathering attended by hundreds of families, with grand Kumkumarchana and consecrated Mahaprasada distribution.',
      kn: 'ಸಾವಿರಾರು ಭಕ್ತಾದಿಗಳು ಪಾಲ್ಗೊಂಡ ಭಕ್ತಿಪೂರ್ವಕ ಶ್ರೀಚಕ್ರ ಪೂಜೆ ಹಾಗೂ ಅನ್ನದಾನ ಸೇವೆ.',
      sa: 'भक्तजनैः सह सम्पन्ना पावनी पूजा तथा अन्नदानम्।'
    },
    date: '2024-10-20',
    displayDate: {
      en: 'Sunday, 20 October 2024',
      kn: 'ಭಾನುವಾರ, ೨೦ ಅಕ್ಟೋಬರ್ ೨೦೨೪',
      sa: 'भानुवासरः, २० अक्टोबर् २०२४'
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
      en: 'Shri Rama Nilaya, Kukkikatte, Udupi, Karnataka',
      kn: 'ಶ್ರೀ ರಾಮ ನಿಲಯ, ಕುಕ್ಕಿಕಟ್ಟೆ, ಉಡುಪಿ',
      sa: 'श्री राम निलयम्, कुक्कीकट्टे, उडुपी'
    },
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80',
    invitationImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    invitationPdf: '/invitation-kukkikatte-2024.pdf',
    contactPerson: {
      en: 'Shri Raghavendra Tantri',
      kn: 'ಶ್ರೀ ರಾಘವೇಂದ್ರ ತಂತ್ರಿಗಳು',
      sa: 'श्री राघवेंद्र तन्त्री'
    },
    phone: '+91 98443 06623',
    email: 'shrichakreshwari74@gmail.com',
    whatsapp: '919844306623'
  }
];
