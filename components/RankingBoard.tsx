import React from 'react';
import { Student } from '../types';
import { getStudentAvatar } from '../constants';

interface RankingBoardProps {
  students: Student[];
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ students }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 brand-font">
          Senarai Kedudukan Penuh
        </h2>
      </div>
      <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Murid</th>
                    <th className="px-6 py-4">Bintang</th>
                    <th className="px-6 py-4">Pencapaian</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => {
                    const avatarUrl = getStudentAvatar(student.name);
                    return (
                        <tr key={student.id} className="hover:bg-purple-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-400">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img src={avatarUrl} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                                    <span className="font-medium text-gray-700">{student.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <span className="font-bold text-gray-800 mr-2">{student.stars}</span>
                                    ★
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-500">
                                    {student.badges.length > 0 ? `${student.badges.length} Lencana` : '-'}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
          </table>
      </div>
    </div>
  );
};