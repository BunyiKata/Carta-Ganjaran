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

export const getStudentAvatar = (name: string): string => {
  return "https://res.cloudinary.com/dyikytcgn/image/upload/v1771134867/GAMBAR_FORMAL_IZZAT_uq8nmq.png";
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