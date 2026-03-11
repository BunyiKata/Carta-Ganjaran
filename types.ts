export interface Student {
  id: string;
  name: string;
  stars: number;
  badges: string[]; // Array of badge IDs
}

export interface BadgeDefinition {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface WeeklyRecord {
  id: string;
  weekDate: string;
  totalStars: number;
  topStudents: { name: string; stars: number; avatar: string }[];
}