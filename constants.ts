import { BadgeDefinition } from './types';

export const STUDENT_NAMES: string[] = [
  "AHMAD DANIEL BIN ABDULLAH",
  "AMIRUL ASYRAF BIN MOHAMMAD",
  "MUHAMMAD ADAM BIN ROSLI",
  "MUHAMMAD AMMAR BIN ZAKARIA",
  "MUHAMMAD ARIF BIN HASSAN",
  "MUHAMMAD DANIAL BIN IBRAHIM",
  "MUHAMMAD FAIZ BIN OTHMAN",
  "MUHAMMAD FARIS BIN ISMAIL",
  "MUHAMMAD HAFIZ BIN YUSOF",
  "MUHAMMAD HARITH BIN RAHMAN",
  "MUHAMMAD HAZIQ BIN ZAINAL",
  "MUHAMMAD IRFAN BIN SHAHRUL",
  "MUHAMMAD SYAHMI BIN AZIZ",
  "AINA NAJIHAH BINTI AHMAD",
  "ALIA NATASHA BINTI KAMAL",
  "NUR AISYAH BINTI RAZALI",
  "NUR ALIA BINTI MUSTAFA",
  "NUR AMIRA BINTI SULAIMAN",
  "NUR ATIQAH BINTI RAMLI",
  "NUR BATRISYIA BINTI AZMAN",
  "NUR FATIN BINTI OMAR",
  "NUR HUSNA BINTI ZULKIFLI",
  "NUR IZZATI BINTI KHALID",
  "NUR SYAZWANI BINTI YAHYA",
  "SITI NURHALIZA BINTI AWANG"
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