import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeSlider from './components/HomeSlider';
import MapSearch from './components/MapSearch';
import CBTEngine from './components/CBTEngine';
import AIAssistant from './components/AIAssistant';
import VirtualClassroom from './components/VirtualClassroom';
import VirtualMeetingRoom from './components/VirtualMeetingRoom';
import ResultsPage from './components/ResultsPage';
import AttendancePage from './components/AttendancePage';
import ResultSlip from './components/ResultSlip';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import { SUBJECTS, INITIAL_SCHOOL_CONFIG, TESTIMONIALS as INITIAL_TESTIMONIALS, SLIDES as INITIAL_SLIDES, MOCK_MEETINGS } from './constants';
import { Subject, SchoolLevel, User, UserRole, SchoolConfig, Meeting, ExamResult, AttendanceRecord, Testimonial } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]); 
  const [subjects, setSubjects] = useState<Subject[]>(SUBJECTS);
  const [config, setConfig] = useState<SchoolConfig>(INITIAL_SCHOOL_CONFIG);
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [filterLevel, setFilterLevel] = useState<SchoolLevel | 'all'>('all');
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  const [results, setResults] = useState<ExamResult[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [viewingResult, setViewingResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    if (user) {
      setAllUsers(prev => {
        const index = prev.findIndex(u => u.username === user.username);
        if (index === -1) return [...prev, user];
        const newUsers = [...prev];
        newUsers[index] = user;
        return newUsers;
      });
    }
  }, [user]);

  const handleUpdateUser = (updatedUser: User) => {
    setAllUsers(prev => prev.map(u => u.username === updatedUser.username ? updatedUser : u));
    if (user?.username === updatedUser.username) {
      setUser(updatedUser);
    }
  };

  const handleStartExam = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentPage('exam');
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }

    if (meeting.id === 'zoom-taofeek' || meeting.meetingId === '378 965 7653') {
      window.open('https://us05web.zoom.us/j/3789657653?pwd=YTRiaCXvUwZSeBv6xj7n65i0OwiBXf.1&omn=81232763063', '_blank');
      return;
    }
    setActiveMeeting(meeting);
    setCurrentPage('classroom');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setActiveMeeting(null);
    setViewingResult(null);
  };

  const handleSaveResult = (result: ExamResult) => {
    setResults(prev => [result, ...prev]);
  };

  const handleMarkAttendance = (newRecords: AttendanceRecord[]) => {
    setAttendance(prev => [...newRecords, ...prev]);
  };

  const filteredSubjects = filterLevel === 'all' 
    ? subjects 
    : subjects.filter(s => s.level === filterLevel);

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <Navbar 
        activePage={currentPage} 
        onNavigate={(p) => {
          setCurrentPage(p);
          setSelectedSubject(null);
          setActiveMeeting(null);
          setViewingResult(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero 
              title={config.heroTitle} 
              subtitle={config.heroSubtitle} 
              onStart={() => setCurrentPage('cbt')} 
            />
            <HomeSlider slides={slides} />
            <MapSearch />
            
            {!user && (
               <section className="py-24 bg-slate-900/90 backdrop-blur-md overflow-hidden relative">
                 <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-widest">Management Portal</h2>
                    <p className="text-slate-400 mb-10 font-medium text-lg">Internal access for verified staff and administrators of Christaville School.</p>
                    <button 
                      onClick={() => setCurrentPage('login')}
                      className="px-14 py-6 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1"
                    >
                      Administrator Login
                    </button>
                 </div>
                 <div className="absolute top-0 right-0 p-12 text-white/5 font-black text-[12rem] pointer-events-none select-none">ADMIN</div>
               </section>
            )}

            <section className="py-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Curriculum Pathways</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="p-16 rounded-[4rem] glass-effect border-2 border-white/50 text-left hover:bg-slate-900 transition-all duration-700 hover:shadow-2xl group cursor-default">
                    <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">🇬🇧</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-white transition-colors">British (Cambridge)</h3>
                    <p className="text-slate-600 group-hover:text-slate-400 leading-relaxed font-medium text-lg">Global critical academic skills mastery. Excellence recognized worldwide.</p>
                  </div>
                  <div className="p-16 rounded-[4rem] glass-effect border-2 border-white/50 text-left hover:bg-amber-600 transition-all duration-700 hover:shadow-2xl group cursor-default">
                    <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">🇺🇸</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-white transition-colors">American (Common Core)</h3>
                    <p className="text-slate-600 group-hover:text-amber-50 leading-relaxed font-medium text-lg">Creativity and holistic SAT preparation. Building versatile leaders.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'admin' && user?.role === UserRole.ADMIN && (
          <div className="pt-24 pb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminDashboard 
              subjects={subjects} 
              setSubjects={setSubjects} 
              config={config} 
              setConfig={setConfig} 
              slides={slides}
              setSlides={setSlides}
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              results={results}
              setResults={setResults}
              users={allUsers}
              meetings={meetings}
              setMeetings={setMeetings}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        )}

        {currentPage === 'virtual' && user && (
          <div className="pt-24 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <VirtualClassroom user={user} meetings={meetings} onJoinMeeting={handleJoinMeeting} />
          </div>
        )}

        {currentPage === 'login' && !user && <LoginPage onLogin={(u) => {setUser(u); setCurrentPage(u.role === UserRole.ADMIN ? 'admin' : 'home');}} />}
        {currentPage === 'register' && !user && <LoginPage initialMode="register" onLogin={(u) => {setUser(u); setCurrentPage('home');}} />}
        
        {currentPage === 'cbt' && user && (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-12 text-center">
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Assessment Portal</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {['all', ...Object.values(SchoolLevel)].map((lvl) => (
                  <button key={lvl} onClick={() => setFilterLevel(lvl as any)} className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${filterLevel === lvl ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-white/50 backdrop-blur-sm border text-slate-500 hover:bg-slate-100 shadow-sm'}`}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSubjects.map((sub) => (
                <div key={sub.id} className="glass-effect p-8 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all flex flex-col group border-white/50 hover:-translate-y-2">
                  <div className="text-5xl mb-6 group-hover:scale-125 transition-transform origin-left">{sub.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight">{sub.name}</h3>
                  <p className="text-xs text-slate-500 font-bold mb-6">{sub.questions.length} Questions</p>
                  <button onClick={() => handleStartExam(sub)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg text-xs mt-auto">Start Exam</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'exam' && selectedSubject && user && <div className="pt-24 pb-20 px-4 animate-in zoom-in-95 duration-500"><CBTEngine subject={selectedSubject} user={user} onExit={() => {setCurrentPage('cbt'); setSelectedSubject(null);}} onSaveResult={handleSaveResult} /></div>}
        {currentPage === 'results' && user && <ResultsPage user={user} results={results} onViewResult={(res) => setViewingResult(res)} />}
        {currentPage === 'attendance' && user && <AttendancePage user={user} records={attendance} onMarkAttendance={handleMarkAttendance} />}
        {currentPage === 'tutor' && user && <div className="pt-24 pb-20 px-4"><AIAssistant /></div>}
        {currentPage === 'contact' && <div className="pt-24 pb-20"><ContactUs config={config} /></div>}
        
        {currentPage === 'about' && (
          <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tighter uppercase">The Christaville Legacy</h2>
            <div className="glass-effect p-12 rounded-[3.5rem] text-left space-y-8 shadow-2xl border-4 border-white">
              <p className="text-xl text-slate-600 leading-relaxed font-medium italic">"{config.aboutText}"</p>
              <div className="h-80 w-full rounded-2xl overflow-hidden shadow-inner bg-slate-100 relative group">
                <img src="https://images.unsplash.com/photo-1523050853063-bd80e27433fb?auto=format&fit=crop&q=80&w=1200" alt="Graduation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {viewingResult && <ResultSlip result={viewingResult} config={config} onClose={() => setViewingResult(null)} />}
      {activeMeeting && user && <VirtualMeetingRoom user={user} meeting={activeMeeting} onExit={() => {setActiveMeeting(null); setCurrentPage('virtual');}} />}
      <Footer config={config} />
    </div>
  );
};

export default App;