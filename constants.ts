import { BadgeDefinition } from './types';

export const STUDENT_NAMES: string[] = [
  "ASFA MUTTAQIN BIN SUKMA SYUKRILLAH",
  "AZHAD ARIQ BIN HARIS",
  "DAIYAN BIN AHMAD ANWAR",
  "MUHAMMAD AIDYN AFFAN BIN MOHD FITRI",
  "MUHAMMAD DZAFRAN MIKHAEL BIN MOHAMAD ZAMRI",
  "MUHAMMAD FAIQ AMSYAR BIN MOHAMAD FARID",
  "MUHAMMAD FAIZ MIKAIL BIN MOHD FITRI",
  "MUHAMMAD NAFIS BIN MOHD ZAKWAN",
  "MUHAMMAD NUH QAYEED BIN MOHAMAD NIZAM",
  "MUHAMMAD QHATRUL QHAZRAL BIN MOHD NORISAM",
  "MUHAMMAD QHATRUL QHAZREL BIN MOHD NORISAM",
  "NUH HARRAZ BIN MOHAMAD FIRDAUS",
  "IZZA IMAANI BINTI MUHAMAD ZULFAHMI",
  "NUR ANNISA RAIHA BINTI ZULKIFLY",
  "NUR ALYSSA FATHIA BINTI MUHAMMAD SAIFUL ASYRAF",
  "NUR BASHIRAH HUMAIRA BINTI MUHAMMAD SYAHIR",
  "NUR EHAN AAINUHA BINTI RAFIEZI",
  "NUR EISHAL FATIHAH BINTI ZAMAN",
  "NUR ERMINA RAEESA BINTI RIZDUAN",
  "NUR HAASYA ADANIYYA BINTI FHAIZAL",
  "NUR MAWADDAH BINTI ABDUL HAMID",
  "NURIN SHAHIRAH BINTI DARUL-AKAM",
  "QASEH NUR TYARA BINTI MOHD NIZAM",
  "UMMU MARYAM AZIZAH BINTI MOHD SYAFIQ",
  "VANIA ZAHRA BINTI ASRUL SHAM"
];

const AVATAR_MAP: Record<string, string> = {
  // Existing
  "ASFA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770861696/photo_6082398497391971616_w_okqkle.jpg",
  "ERMINA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862562/photo_6082398497391971635_w_iqumyq.jpg",
  "UMMU": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862569/photo_6082398497391971627_w_vzji0w.jpg",
  "TYARA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862576/photo_6082398497391971624_w_hqf1ze.jpg",
  "ALYSSA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862574/photo_6082398497391971626_w_dqkmta.jpg",
  "AZHAD": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862574/photo_6082398497391971623_w_wlkx54.jpg",
  "NUH QAYEED": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862572/photo_6082398497391971625_w_p6jgoh.jpg",
  "MAWADDAH": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862568/photo_6082398497391971633_w_cwpzvp.jpg",
  "ANNISA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862567/photo_6082398497391971628_w_llmscy.jpg",
  "AIDYN": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862566/photo_6082398497391971629_w_x13nof.jpg",

  // New
  "AAINUHA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862565/photo_6082398497391971632_w_r2smvv.jpg",
  "QHAZRAL": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862565/photo_6082398497391971630_w_aejzlk.jpg",
  "QHAZREL": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862554/photo_6082398497391971645_w_uruuuw.jpg",
  "HAASYA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862561/photo_6082398497391971636_w_wenowe.jpg",
  "BASHIRAH": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862560/photo_6082398497391971634_w_zv6zpp.jpg",
  "HARRAZ": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862558/photo_6082398497391971638_w_cmlcql.jpg",
  "MIKAIL": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862557/photo_6082398497391971640_w_stft1w.jpg",
  "NURIN": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862557/photo_6082398497391971643_w_iwqftn.jpg",
  "FAIQ AMSYAR": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862556/photo_6082398497391971639_w_tpshbd.jpg",
  "DZAFRAN": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862555/photo_6082398497391971641_w_uepwfe.jpg",
  "FATIHAH": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862554/photo_6082398497391971642_w_cmnmar.jpg",
  "NAFIS": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862553/photo_6082398497391971644_w_gbzj0c.jpg",
  "IZZA": "https://res.cloudinary.com/dyikytcgn/image/upload/v1770862551/photo_6082398497391971646_w_avaref.jpg"
};

export const getStudentAvatar = (name: string): string => {
  const upperName = name.toUpperCase();
  for (const [key, url] of Object.entries(AVATAR_MAP)) {
    if (upperName.includes(key)) {
      return url;
    }
  }
  return `https://api.dicebear.com/8.x/fun-emoji/svg?seed=${encodeURIComponent(name)}&radius=50&backgroundColor=f5d0fe,d8b4fe,c4b5fd,a78bfa,8b5cf6,fbcfe8,e879f9,fca5a5,fdbd8d,fdba74,fcd34d,fde68a,bef264,a3e635,86efad,4ade80,67e8f9,38bdf8,7dd3fc,e0e7ff`;
};

// Achievement Badges Configuration
export const BADGES: Record<string, BadgeDefinition> = {
  FIRST_STEP: {
    id: 'first_step',
    label: 'Langkah Pertama',
    icon: '🚀',
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    description: 'Mencapai 1 bintang pertama'
  },
  RISING_STAR: {
    id: 'rising_star',
    label: 'Semangat Waja',
    icon: '🔥',
    color: 'bg-orange-100 text-orange-600 border-orange-200',
    description: 'Mencapai 3 bintang'
  },
  SUPER_STAR: {
    id: 'super_star',
    label: 'Bintang Cemerlang',
    icon: '👑',
    color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    description: 'Mencapai 5 bintang penuh'
  }
};