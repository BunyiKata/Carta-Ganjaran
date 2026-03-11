import React, { useCallback } from 'react';
import { Student } from '../types';
import { getStudentAvatar, BADGES } from '../constants';

interface StudentCardProps {
  student: Student;
  onStarChange: (id: string, delta: 1 | -1) => void;
  index?: number; // Added index prop for color cycling
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onStarChange, index = 0 }) => {
  const avatarUrl = getStudentAvatar(student.name);

  const handleAddStar = useCallback(() => {
    onStarChange(student.id, 1);
  }, [student.id, onStarChange]);

  const handleSubtractStar = useCallback(() => {
    onStarChange(student.id, -1);
  }, [student.id, onStarChange]);

  // Soft Pastel 3D Color Palette
  const colors = [
    { bg: 'bg-pink-50', border: 'border-pink-200', borderB: 'border-pink-300', text: 'text-pink-700', ring: 'ring-pink-200', btnAdd: 'text-pink-500 hover:bg-pink-500', btnSub: 'text-pink-400 hover:bg-pink-400' },
    { bg: 'bg-blue-50', border: 'border-blue-200', borderB: 'border-blue-300', text: 'text-blue-700', ring: 'ring-blue-200', btnAdd: 'text-blue-500 hover:bg-blue-500', btnSub: 'text-blue-400 hover:bg-blue-400' },
    { bg: 'bg-purple-50', border: 'border-purple-200', borderB: 'border-purple-300', text: 'text-purple-700', ring: 'ring-purple-200', btnAdd: 'text-purple-500 hover:bg-purple-500', btnSub: 'text-purple-400 hover:bg-purple-400' },
    { bg: 'bg-green-50', border: 'border-green-200', borderB: 'border-green-300', text: 'text-green-700', ring: 'ring-green-200', btnAdd: 'text-green-500 hover:bg-green-500', btnSub: 'text-green-400 hover:bg-green-400' },
    { bg: 'bg-orange-50', border: 'border-orange-200', borderB: 'border-orange-300', text: 'text-orange-700', ring: 'ring-orange-200', btnAdd: 'text-orange-500 hover:bg-orange-500', btnSub: 'text-orange-400 hover:bg-orange-400' },
    { bg: 'bg-cyan-50', border: 'border-cyan-200', borderB: 'border-cyan-300', text: 'text-cyan-700', ring: 'ring-cyan-200', btnAdd: 'text-cyan-500 hover:bg-cyan-500', btnSub: 'text-cyan-400 hover:bg-cyan-400' },
  ];

  const theme = colors[index % colors.length];

  return (
    <div className={`${theme.bg} rounded-2xl shadow-sm border-2 ${theme.border} border-b-[6px] ${theme.borderB} p-5 flex flex-col items-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative group h-full justify-between`}>
      
      {/* Content Top */}
      <div className="flex flex-col items-center w-full">
        {/* Avatar Container */}
        <div className="relative mb-3">
          <div className={`w-20 h-20 rounded-full p-1 bg-white shadow-sm ring-4 ${theme.ring}`}>
            <img
              src={avatarUrl}
              alt={student.name}
              className="w-full h-full rounded-full object-cover bg-gray-100"
            />
          </div>
          {student.stars >= 5 && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-md animate-bounce tracking-wide border-2 border-white">
                  MAX
              </div>
          )}
        </div>

        <h3 className={`${theme.text} font-bold text-center text-lg mb-2 leading-tight px-1 line-clamp-2 min-h-[3rem] flex items-center justify-center`} title={student.name}>
          {student.name}
        </h3>
        
        {/* Star Progress Bar */}
        <div className="w-full bg-white rounded-full h-3 mb-3 overflow-hidden border border-gray-100 shadow-inner">
          <div 
              className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_2px_4px_rgba(234,179,8,0.4)]" 
              style={{ width: `${(student.stars / 5) * 100}%` }}
          ></div>
        </div>

        {/* Visual Bintang */}
        <div className="flex items-center justify-center gap-1 mb-4 h-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i} 
              className={`text-2xl transition-all duration-300 transform ${
                i < student.stars 
                  ? 'text-yellow-400 drop-shadow-[0_2px_0_rgba(202,138,4,1)] scale-110' 
                  : 'text-gray-300 scale-90 opacity-40'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Content Bottom */}
      <div className="w-full flex flex-col items-center gap-3">
         {/* Kawalan */}
        <div className="flex gap-4 w-full justify-center">
            <button
            onClick={handleSubtractStar}
            disabled={student.stars <= 0}
            className={`w-12 h-12 rounded-xl bg-white shadow-sm border-b-4 border-gray-200 ${theme.btnSub} hover:text-white transition-all active:border-b-0 active:translate-y-1 flex items-center justify-center font-bold text-2xl disabled:opacity-40 disabled:active:border-b-4 disabled:active:translate-y-0 disabled:cursor-not-allowed`}
            >
            -
            </button>
            <button
            onClick={handleAddStar}
            disabled={student.stars >= 5}
            className={`w-12 h-12 rounded-xl bg-white shadow-sm border-b-4 border-gray-200 ${theme.btnAdd} hover:text-white transition-all active:border-b-0 active:translate-y-1 flex items-center justify-center font-bold text-2xl disabled:opacity-40 disabled:active:border-b-4 disabled:active:translate-y-0 disabled:cursor-not-allowed`}
            >
            +
            </button>
        </div>

        {/* Paparan Lencana */}
        <div className="flex gap-1 justify-center w-full h-8 mt-1 bg-white/50 rounded-full py-1 px-2">
            {student.badges.map((badgeId) => {
            const badgeDef = Object.values(BADGES).find(b => b.id === badgeId);
            if (!badgeDef) return null;
            return (
                <div 
                key={badgeId} 
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs cursor-help ${badgeDef.color} shadow-sm transform hover:scale-125 transition-transform`}
                title={badgeDef.label}
                >
                {badgeDef.icon}
                </div>
            );
            })}
            {student.badges.length === 0 && <span className="text-[10px] text-gray-400 italic self-center">Tiada lencana</span>}
        </div>
      </div>
    </div>
  );
};