import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Student, WeeklyRecord } from './types';
import { STUDENT_NAMES, BADGES, getStudentAvatar } from './constants';
import { StudentCard } from './components/StudentCard';
import { RankingBoard } from './components/RankingBoard';
import { showConfetti } from './services/confettiService';

type View = 'dashboard' | 'students' | 'history';

// Helper component for Sidebar items - Updated for Lighter Background
const SidebarItem = ({ icon, label, isActive, onClick }: { icon: string; label: string; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-all duration-200 border-l-4 group ${
      isActive 
        ? 'bg-white/20 border-white text-white font-bold shadow-inner' 
        : 'border-transparent text-white/80 hover:bg-white/10 hover:text-white hover:pl-7'
    }`}
  >
    <span className={`text-xl drop-shadow-md ${isActive ? 'scale-110' : ''} transition-transform`}>{icon}</span>
    <span className="font-medium tracking-wide">{label}</span>
  </button>
);

const App: React.FC = () => {
  // State Initialization
  const [students, setStudents] = useState<Student[]>(() => {
    return STUDENT_NAMES.map((name, index) => ({
      id: `student-${index}`,
      name: name,
      stars: 0,
      badges: [],
    }));
  });

  const [weeklyRecords, setWeeklyRecords] = useState<WeeklyRecord[]>([]);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Ref to access latest students state inside callbacks without dependency issues
  const studentsRef = useRef(students);
  useEffect(() => {
    studentsRef.current = students;
  }, [students]);

  // Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper function to calculate badges
  const calculateBadges = (currentBadges: string[], stars: number): string[] => {
    const newBadges = new Set(currentBadges);
    if (stars >= 1) newBadges.add(BADGES.FIRST_STEP.id);
    if (stars >= 3) newBadges.add(BADGES.RISING_STAR.id);
    if (stars >= 5) newBadges.add(BADGES.SUPER_STAR.id);
    return Array.from(newBadges);
  };

  // Handlers
  const handleIndividualStarChange = useCallback((id: string, delta: 1 | -1) => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === id) {
          const newStars = Math.max(0, Math.min(5, student.stars + delta));
          if (newStars === 5 && student.stars < 5) showConfetti();
          return { 
            ...student, 
            stars: newStars,
            badges: calculateBadges(student.badges, newStars)
          };
        }
        return student;
      })
    );
  }, []);

  const handleBulkAddStar = useCallback(() => {
    let confettiTriggered = false;
    setStudents(prevStudents =>
      prevStudents.map(student => {
        const newStars = Math.min(5, student.stars + 1);
        if (newStars === 5 && student.stars < 5 && !confettiTriggered) {
          showConfetti();
          confettiTriggered = true;
        }
        return {
          ...student,
          stars: newStars,
          badges: calculateBadges(student.badges, newStars)
        };
      })
    );
  }, []);

  const handleBulkSubtractStar = useCallback(() => {
    setStudents(prevStudents =>
      prevStudents.map(student => ({
        ...student,
        stars: Math.max(0, student.stars - 1),
      }))
    );
  }, []);

  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => b.stars - a.stars);
  }, [students]);

  // Fungsi Reset Bintang - Diperbaiki
  const handleResetStars = useCallback(() => {
    // Gunakan setTimeout untuk memastikan UI tidak tersangkut sebelum confirm
    setTimeout(() => {
        if (window.confirm("⚠️ PENGESAHAN RESET\n\nAdakah anda pasti mahu memadamkan SEMUA bintang murid kembali kepada 0?\n\nRekod semasa akan disimpan secara automatik.")) {
            
            // Menggunakan ref untuk mendapatkan data terkini tanpa bergantung closure lama
            const currentStudents = studentsRef.current;
            const totalStars = currentStudents.reduce((acc, curr) => acc + curr.stars, 0);

            // Simpan sejarah jika ada bintang terkumpul
            if (totalStars > 0) {
                const currentSorted = [...currentStudents].sort((a, b) => b.stars - a.stars);
                const top3 = currentSorted.slice(0, 3).map(s => ({
                    name: s.name,
                    stars: s.stars,
                    avatar: getStudentAvatar(s.name)
                }));

                const newRecord: WeeklyRecord = {
                    id: `reset-${Date.now()}`,
                    weekDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                    totalStars,
                    topStudents: top3
                };
                setWeeklyRecords(prev => [newRecord, ...prev]);
            }

            // Lakukan Reset Bintang
            setStudents(prevStudents => 
                prevStudents.map(student => ({
                    ...student,
                    stars: 0,
                    badges: []
                }))
            );
            
            // Alert kecil untuk maklum balas berjaya
            // alert("Reset berjaya! Semua bintang telah kembali ke 0.");
        }
    }, 50);
  }, []); 

  // Render Helpers
  const renderTop3 = () => {
    const top3 = sortedStudents.slice(0, 3);
    // Ensure we have 3 slots even if students are missing (edge case)
    const [first, second, third] = [top3[0], top3[1], top3[2]];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
            {/* 2nd Place */}
            <div className="order-2 md:order-1 bg-white rounded-2xl shadow-sm border-b-4 border-gray-200 p-6 flex flex-col items-center relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500"></div>
                <div className="w-20 h-20 rounded-full border-4 border-gray-300 mb-3 relative z-10">
                   {second && <img src={getStudentAvatar(second.name)} className="w-full h-full rounded-full object-cover" />}
                </div>
                <div className="text-4xl font-bold text-gray-400 mb-1">2</div>
                <h3 className="text-gray-800 font-semibold text-center truncate w-full h-6">{second?.name || '-'}</h3>
                <p className="text-yellow-500 font-bold">{second?.stars || 0} ⭐</p>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-2xl shadow-xl border-b-8 border-indigo-900 p-8 flex flex-col items-center transform md:-translate-y-4 relative text-white">
                <div className="absolute top-4 right-4 text-3xl opacity-50 animate-pulse">👑</div>
                <div className="w-28 h-28 rounded-full border-4 border-yellow-400 mb-4 p-1 bg-white bg-opacity-20 backdrop-blur-sm">
                   {first && <img src={getStudentAvatar(first.name)} className="w-full h-full rounded-full object-cover" />}
                </div>
                <div className="text-5xl font-extrabold text-yellow-300 mb-2 drop-shadow-md">1</div>
                <h3 className="font-bold text-xl text-center truncate w-full mb-1">{first?.name || '-'}</h3>
                <p className="text-yellow-300 font-bold text-2xl">{first?.stars || 0} ⭐</p>
            </div>

            {/* 3rd Place */}
            <div className="order-3 bg-white rounded-2xl shadow-sm border-b-4 border-orange-200 p-6 flex flex-col items-center relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-yellow-600"></div>
                <div className="w-20 h-20 rounded-full border-4 border-yellow-600 mb-3 relative z-10">
                   {third && <img src={getStudentAvatar(third.name)} className="w-full h-full rounded-full object-cover" />}
                </div>
                <div className="text-4xl font-bold text-yellow-700 mb-1">3</div>
                <h3 className="text-gray-800 font-semibold text-center truncate w-full h-6">{third?.name || '-'}</h3>
                <p className="text-yellow-500 font-bold">{third?.stars || 0} ⭐</p>
            </div>
        </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar - Lighter Colorful Background */}
      <aside className="w-64 bg-gradient-to-b from-indigo-400 to-purple-500 text-white hidden md:flex flex-col z-20 shadow-2xl relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-10 -left-10 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="p-6 pb-2 relative z-10 text-center">
            <h1 className="text-2xl font-bold text-white brand-font leading-tight drop-shadow-md mb-6">
                Carta Ganjaran <br/>
                <span className="text-yellow-200">Prasekolah Ceria</span>
            </h1>

            {/* Teacher Profile Section */}
            <div className="flex flex-col items-center mb-2">
                <div className="w-24 h-24 rounded-full p-1 bg-white/30 backdrop-blur-sm border-2 border-white/60 mb-2 shadow-lg hover:scale-105 transition-transform duration-300">
                    <img 
                        src="https://res.cloudinary.com/dyikytcgn/image/upload/v1768457680/GAMBAR_FORMAL_IZZAT_xrrh2m.png" 
                        alt="Cikgu Izzat" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <h3 className="font-bold text-lg text-white drop-shadow-sm">Cikgu Izzat</h3>
                <p className="text-xs text-indigo-50 font-semibold bg-white/20 px-3 py-1 rounded-full mt-1 backdrop-blur-md">Guru Kelas</p>
            </div>
        </div>
        
        <nav className="flex-1 mt-4 relative z-10">
            <SidebarItem 
                icon="📊" 
                label="Dashboard Utama" 
                isActive={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')} 
            />
            <SidebarItem 
                icon="🎓" 
                label="Senarai Murid" 
                isActive={currentView === 'students'} 
                onClick={() => setCurrentView('students')} 
            />
            <SidebarItem 
                icon="📜" 
                label="Rekod Mingguan" 
                isActive={currentView === 'history'} 
                onClick={() => setCurrentView('history')} 
            />
        </nav>

        <div className="p-6 border-t border-white/10 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20 shadow-lg group hover:bg-white/20 transition-colors">
                <p className="text-xs text-indigo-50 uppercase font-bold mb-2 tracking-wider">Tarikh Hari Ini</p>
                <p className="text-white font-bold text-lg brand-font">
                    {currentTime.toLocaleDateString('ms-MY', { weekday: 'long' })}
                </p>
                <p className="text-indigo-50">
                    {currentTime.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-indigo-100 text-sm mt-1 font-mono">
                    {currentTime.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
        {/* Mobile Header */}
        <header className="md:hidden bg-indigo-500 text-white p-4 shadow-md flex justify-between items-center z-20">
            <div className="flex items-center gap-3">
                 <img 
                    src="https://res.cloudinary.com/dyikytcgn/image/upload/v1768457680/GAMBAR_FORMAL_IZZAT_xrrh2m.png" 
                    alt="Cikgu Izzat" 
                    className="w-10 h-10 rounded-full border-2 border-white"
                />
                <h1 className="text-lg font-bold brand-font">Prasekolah Ceria</h1>
            </div>
            <div className="flex gap-4 text-xl">
                <button onClick={() => setCurrentView('dashboard')} className={currentView === 'dashboard' ? 'text-yellow-300' : 'text-indigo-100'}>📊</button>
                <button onClick={() => setCurrentView('students')} className={currentView === 'students' ? 'text-yellow-300' : 'text-indigo-100'}>🎓</button>
                <button onClick={() => setCurrentView('history')} className={currentView === 'history' ? 'text-yellow-300' : 'text-indigo-100'}>📜</button>
            </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
            {/* Top Header Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 brand-font drop-shadow-sm">
                        {currentView === 'dashboard' && 'Ringkasan Pencapaian'}
                        {currentView === 'students' && 'Pengurusan Bintang'}
                        {currentView === 'history' && 'Arkib Mingguan'}
                    </h2>
                    <p className="text-gray-500 font-medium">Selamat datang, Cikgu Izzat!</p>
                </div>
                
                {/* Global Actions */}
                <div className="flex gap-3 flex-wrap">
                    {currentView === 'students' && (
                        <>
                             <button onClick={handleBulkAddStar} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 font-bold flex items-center gap-2 border-b-4 border-green-700">
                                <span>+1</span> <span className="hidden sm:inline">Semua</span>
                            </button>
                            <button onClick={handleBulkSubtractStar} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 font-bold flex items-center gap-2 border-b-4 border-red-700">
                                <span>-1</span> <span className="hidden sm:inline">Semua</span>
                            </button>
                        </>
                    )}
                    <button onClick={handleResetStars} className="bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all transform active:scale-95 font-bold flex items-center gap-2">
                        <span>🔄</span> <span className="hidden sm:inline">Reset Bintang</span>
                    </button>
                </div>
            </div>

            {/* Views */}
            {currentView === 'dashboard' && (
                <div className="max-w-6xl mx-auto">
                    {/* Hero Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-6 text-white shadow-lg border-b-8 border-rose-700 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                             <div className="relative z-10">
                                <p className="opacity-90 font-bold mb-1 tracking-wide text-rose-100">BINTANG MINGGU INI</p>
                                <h3 className="text-5xl font-extrabold drop-shadow-sm">{students.reduce((acc,s) => acc + s.stars, 0)}</h3>
                             </div>
                             <div className="absolute -right-4 -bottom-4 opacity-20 text-9xl transform rotate-12">★</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg border-b-8 border-purple-800 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                             <div className="relative z-10">
                                <p className="opacity-90 font-bold mb-1 tracking-wide text-violet-100">MURID CEMERLANG (5★)</p>
                                <h3 className="text-5xl font-extrabold drop-shadow-sm">{students.filter(s => s.stars === 5).length}</h3>
                             </div>
                             <div className="absolute -right-4 -bottom-4 opacity-20 text-9xl transform rotate-12">🏆</div>
                        </div>
                        <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white shadow-lg border-b-8 border-blue-700 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                             <div className="relative z-10">
                                <p className="opacity-90 font-bold mb-1 tracking-wide text-cyan-100">JUMLAH MURID</p>
                                <h3 className="text-5xl font-extrabold drop-shadow-sm">{students.length}</h3>
                             </div>
                             <div className="absolute -right-4 -bottom-4 opacity-20 text-9xl transform rotate-12">👥</div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <span className="bg-yellow-400 text-white w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">👑</span>
                        Top 3 Minggu Ini
                    </h3>
                    {renderTop3()}

                    <RankingBoard students={sortedStudents} />
                </div>
            )}

            {currentView === 'students' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                    {students.map((student, index) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onStarChange={handleIndividualStarChange}
                            index={index}
                        />
                    ))}
                </div>
            )}

            {currentView === 'history' && (
                <div className="max-w-4xl mx-auto">
                    {weeklyRecords.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border-4 border-dashed border-indigo-100">
                            <div className="text-6xl mb-4">📂</div>
                            <p className="text-indigo-400 text-xl font-medium">Belum ada rekod mingguan disimpan.</p>
                            <p className="text-sm text-gray-400 mt-2">Tekan butang "Reset Bintang" untuk menyimpan rekod semasa.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {weeklyRecords.map(record => (
                                <div key={record.id} className="bg-white rounded-xl p-6 shadow-sm border-l-8 border-purple-500 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-purple-800">Minggu: {record.weekDate}</h3>
                                            <p className="text-gray-500 text-sm font-medium">Total Bintang: <span className="text-yellow-500 font-bold">{record.totalStars}</span></p>
                                        </div>
                                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold shadow-sm">
                                            Selesai
                                        </div>
                                    </div>
                                    
                                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                        <h4 className="text-xs uppercase text-purple-400 font-bold mb-3 tracking-wider">Pemenang Podium</h4>
                                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-200">
                                            {record.topStudents.map((winner, idx) => (
                                                <div key={idx} className="flex items-center gap-3 min-w-[160px] bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                                                    <div className="relative">
                                                        <img src={winner.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt={winner.name} />
                                                        <span className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-bold border-2 border-white shadow-sm ${
                                                            idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                                        }`}>
                                                            {idx + 1}
                                                        </span>
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <p className="font-bold text-sm truncate w-24 text-gray-700">{winner.name}</p>
                                                        <p className="text-xs text-yellow-500 font-bold">{winner.stars} ⭐</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;