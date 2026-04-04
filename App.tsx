
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
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
import ELibrary from './components/ELibrary';
import LearningMaterialsPortal from './components/LearningMaterialsPortal';
import HomeworkPortal from './components/HomeworkPortal';
import OfflineCBT from './components/OfflineCBT';
import SchoolRegistration from './components/SchoolRegistration';
import RegistrationOptions from './components/RegistrationOptions';
import { SUBJECTS, INITIAL_SCHOOL_CONFIG, TESTIMONIALS as INITIAL_TESTIMONIALS, SLIDES as INITIAL_SLIDES, MOCK_MEETINGS, LIBRARY_RESOURCES } from './constants';
import { Subject, SchoolLevel, User, UserRole, SchoolConfig, Meeting, ExamResult, AttendanceRecord, Testimonial, TaskType } from './types';

const AccessPending = () => (
  <div className="pt-32 pb-20 px-4 text-center">
    <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Access Pending</h2>
    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Your account is currently awaiting administrative approval. Please check back later.</p>
  </div>
);

const App: React.FC = () => {
  // Load initial state from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cv_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const isAuthorized = user?.role === UserRole.ADMIN || user?.isAuthorized;
  
  const [currentPage, setCurrentPage] = useState('home');
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cv_all_users');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [subjects, setSubjects] = useState<Subject[]>(SUBJECTS);
  const [config, setConfig] = useState<SchoolConfig>(INITIAL_SCHOOL_CONFIG);
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTaskType, setActiveTaskType] = useState<TaskType>(TaskType.EXAM);
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(null);
  
  const [results, setResults] = useState<ExamResult[]>(() => {
    const saved = localStorage.getItem('cv_results');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('cv_attendance');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [viewingResult, setViewingResult] = useState<ExamResult | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('cv_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cv_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('cv_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('cv_attendance', JSON.stringify(attendance));
  }, [attendance]);

  const getStudentLevel = (className?: string): SchoolLevel | null => {
    if (!className) return null;
    const lower = className.toLowerCase();
    if (lower.includes('nursery')) return SchoolLevel.NURSERY;
    if (lower.includes('grade')) return SchoolLevel.GRADE;
    if (lower.includes('jss') || lower.includes('junior')) return SchoolLevel.JUNIOR_SECONDARY;
    if (lower.includes('ss') || lower.includes('senior')) return SchoolLevel.SENIOR_SECONDARY;
    return null;
  };

  const getUserSubjects = () => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.TEACHER) return subjects;
    const level = getStudentLevel(user?.studentClass);
    return level ? subjects.filter(s => s.level === level) : [];
  };

  const filteredSubjects = getUserSubjects();

  const handleStartExam = (subject: Subject, type: TaskType = TaskType.EXAM) => {
    setSelectedSubject(subject);
    setActiveTaskType(type);
    setCurrentPage('exam-portal');
  };

  const handleLogin = (u: User, isRegistration: boolean = false) => {
    setUser(u);
    setAllUsers(prev => {
      if (prev.find(existing => existing.username === u.username)) return prev;
      return [...prev, u];
    });
    
    if (isRegistration && u.role !== UserRole.ADMIN) {
      setCurrentPage('fees');
    } else {
      setCurrentPage(u.role === UserRole.ADMIN ? 'admin' : 'materials');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setActiveMeeting(null);
    setViewingResult(null);
  };

  const navigateToFeature = (page: string) => {
    if (!user) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              onStart={() => setCurrentPage(user ? 'materials' : 'login')} 
            />
            
            {/* Learning Ecosystem Feature Grid */}
            <section className="py-24 px-4 relative overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Learning Ecosystem</h2>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
                    Integrated digital portals designed to streamline the academic experience for MORAVIA students.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { id: 'library', title: 'E-Library', desc: 'Access 10,000+ digital books and academic journals.', icon: '📖', color: 'colorful-card-grade' },
                    { id: 'virtual', title: 'Virtual Classroom', desc: 'Join live interactive Zoom sessions and workshops.', icon: '🎥', color: 'colorful-card-secondary' },
                    { id: 'cbt', title: 'CBT Examination', desc: 'Secure computer-based termly assessments.', icon: '💻', color: 'colorful-card-nursery' },
                    { id: 'homework', title: 'Homework & Tests', desc: 'Submit daily assignments and weekly quizzes.', icon: '📝', color: 'colorful-card-grade' },
                    { id: 'attendance', title: 'Live Attendance', desc: 'Real-time presence tracking and reporting.', icon: '⏱️', color: 'colorful-card-secondary' },
                    { id: 'results', title: 'Results Portal', desc: 'Instant access to performance slips and transcripts.', icon: '📊', color: 'colorful-card-nursery' }
                  ].map((feature) => (
                    <button 
                      key={feature.id}
                      onClick={() => navigateToFeature(feature.id)}
                      className={`group p-10 rounded-[3rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 text-left backdrop-blur-xl ${feature.color}`}
                    >
                      <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-inner group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{feature.title}</h3>
                      <p className="text-slate-600 font-medium leading-relaxed mb-8">{feature.desc}</p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all">
                        Access Portal <span className="text-lg">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <HomeSlider slides={slides} />
            <MapSearch />

            <section className="py-32 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-5xl font-black text-slate-900 mb-16 uppercase tracking-tighter">Curriculum Pathways</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-12 rounded-[3rem] bg-gradient-to-br from-indigo-50/80 to-blue-100/40 backdrop-blur-xl border-2 border-white text-left hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl group cursor-default shadow-lg">
                    <div className="text-6xl mb-8 group-hover:rotate-12 transition-transform duration-500">🇬🇧</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">British (Cambridge)</h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-lg">Global academic mastery. We foster critical thinkers recognized by top institutions worldwide.</p>
                  </div>
                  <div className="p-12 rounded-[3rem] bg-gradient-to-br from-emerald-50/80 to-green-100/40 backdrop-blur-xl border-2 border-white text-left hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl group cursor-default shadow-lg">
                    <div className="text-6xl mb-8 group-hover:rotate-12 transition-transform duration-500">🇳🇬</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Nigerian (NERDC)</h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-lg">Rich cultural heritage meets academic rigor. Full preparation for Entrance Exams, BECE (JUNIOR WAEC), WAEC, NECO, and JAMB excellence.</p>
                  </div>
                  <div className="p-12 rounded-[3rem] bg-gradient-to-br from-amber-50/80 to-orange-100/40 backdrop-blur-xl border-2 border-white text-left hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl group cursor-default shadow-lg">
                    <div className="text-6xl mb-8 group-hover:-rotate-12 transition-transform duration-500">🇺🇸</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-amber-600 transition-colors">American (Common Core)</h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-lg">Creativity meets rigor. Holistic SAT preparation and leadership development.</p>
                  </div>
                </div>
              </div>
            </section>

            {!user && <RegistrationOptions onNavigate={navigateToFeature} />}

            <section className="py-32 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-5xl font-black text-slate-900 mb-16 text-center uppercase tracking-tighter">Voices of MORAVIA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
                      <div className="flex items-center gap-4 mb-6">
                        <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full" />
                        <div>
                          <h4 className="font-black text-slate-900">{t.name}</h4>
                          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed italic">"{t.content}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {!user && (
              <section className="py-32 bg-slate-900 overflow-hidden relative">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                  <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-widest">Internal Portal</h2>
                  <p className="text-slate-400 mb-12 font-medium text-lg">Official access for authorized MORAVIA staff and administrators.</p>
                  <button 
                    onClick={() => setCurrentPage('login')}
                    className="px-16 py-7 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:-translate-y-2 active:translate-y-0"
                  >
                    Administrator Login
                  </button>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-white/5 rounded-full pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-12 text-white/5 font-black text-[15rem] pointer-events-none select-none">ADMIN</div>
              </section>
            )}
          </div>
        )}

        {currentPage === 'library' && user && (isAuthorized ? <ELibrary resources={LIBRARY_RESOURCES} userLevel={getStudentLevel(user.studentClass)} /> : <AccessPending />)}
        {currentPage === 'materials' && user && (isAuthorized ? <LearningMaterialsPortal subjects={filteredSubjects} /> : <AccessPending />)}
        {currentPage === 'homework' && user && (isAuthorized ? <HomeworkPortal subjects={filteredSubjects} onStartTask={(s, t) => handleStartExam(s, t)} /> : <AccessPending />)}
        {currentPage === 'virtual' && user && (isAuthorized ? <VirtualClassroom user={user} meetings={meetings} onJoinMeeting={(m) => {setActiveMeeting(m); setCurrentPage('classroom');}} /> : <AccessPending />)}
        
        {currentPage === 'cbt' && user && (isAuthorized ? (
          <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto animate-in slide-in-from-bottom-4">
             <div className="mb-16 text-center">
              <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Official Examination Center</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Synchronized Termly Assessments for {user.studentClass || 'Authorized Students'}
              </p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {filteredSubjects.map((sub) => (
                <div key={sub.id} className="p-10 rounded-[3rem] border-2 bg-white/60 backdrop-blur-xl hover:-translate-y-3 transition-all group shadow-sm hover:shadow-2xl">
                  <div className="text-6xl mb-8 group-hover:scale-125 transition-transform origin-left">{sub.icon}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{sub.name}</h3>
                  <p className="text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest">{sub.questions.length} Questions • Official Exam</p>
                  <button onClick={() => handleStartExam(sub, TaskType.EXAM)} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl text-[10px]">Entrance Official</button>
                </div>
              ))}
              {filteredSubjects.length === 0 && (
                <div className="col-span-full py-20 text-center glass-effect rounded-[3rem]">
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No subjects currently assigned to your class.</p>
                </div>
              )}
            </div>
          </div>
        ) : <AccessPending />)}

        {currentPage === 'classroom' && activeMeeting && user && (
          <VirtualMeetingRoom user={user} meeting={activeMeeting} onExit={() => {setActiveMeeting(null); setCurrentPage('virtual');}} />
        )}

        {currentPage === 'exam-portal' && selectedSubject && user && (
           <div className="pt-24 pb-20 px-4">
             <CBTEngine 
                subject={selectedSubject} 
                user={user} 
                taskType={activeTaskType}
                onExit={() => setCurrentPage(activeTaskType === TaskType.EXAM ? 'cbt' : 'homework')} 
                onSaveResult={(r) => setResults(prev => [r, ...prev])} 
              />
           </div>
        )}

        {currentPage === 'results' && user && (isAuthorized ? <ResultsPage user={user} results={results} onViewResult={(res) => setViewingResult(res)} /> : <AccessPending />)}
        {currentPage === 'attendance' && user && (isAuthorized ? <AttendancePage user={user} records={attendance} onMarkAttendance={(recs) => setAttendance(prev => [...recs, ...prev])} /> : <AccessPending />)}
        {currentPage === 'tutor' && user && <div className="pt-24 pb-20 px-4"><AIAssistant /></div>}
        {currentPage === 'login' && !user && <LoginPage onLogin={handleLogin} />}
        {currentPage === 'register' && !user && <LoginPage initialMode="register" onLogin={handleLogin} />}
        {currentPage === 'contact' && <div className="pt-24 pb-20"><ContactUs config={config} /></div>}
        {currentPage === 'offline-cbt' && <OfflineCBT />}
        {currentPage === 'school-reg' && <SchoolRegistration />}
        
        {currentPage === 'fees' && (
          <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">School Fees Portal</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Official termly payment instructions and verification</p>
            </div>
            
            <div className="glass-effect p-12 rounded-[4rem] border-4 border-white shadow-2xl bg-gradient-to-br from-amber-50 to-orange-100">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                  <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Payment Details</h3>
                  <p className="text-slate-700 font-medium text-lg mb-8 leading-relaxed">
                    To complete your registration or termly payments, please use the following bank details. 
                    Ensure you send your payment receipt to the designated email address for verification.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xs font-black text-slate-500 uppercase tracking-widest">Amount:</span>
                      <span className="text-xl font-black text-slate-900">{config.feesAmount} per term/semester</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xs font-black text-slate-500 uppercase tracking-widest">Bank:</span>
                      <span className="text-xl font-black text-slate-900">{config.feesBank}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xs font-black text-slate-500 uppercase tracking-widest">Account Type:</span>
                      <span className="text-xl font-black text-slate-900">{config.feesAccountType}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="w-32 text-xs font-black text-slate-500 uppercase tracking-widest">Account No:</span>
                      <span className="text-xl font-black text-slate-900 tracking-widest">{config.feesAccountNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-inner">
                  <div className="text-center">
                    <div className="text-6xl mb-6">📧</div>
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Send Receipt To</h4>
                    <p className="text-2xl font-black text-amber-600 break-all">{config.feesReceiptEmail}</p>
                    <p className="mt-6 text-slate-500 font-bold text-sm uppercase tracking-widest">
                      Please include student name and class in the email subject for instant confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentPage === 'about' && (
          <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
            <h2 className="text-6xl font-black text-slate-900 mb-12 uppercase tracking-tighter">The MORAVIA Legacy</h2>
            <div className="glass-effect p-16 rounded-[4rem] text-left space-y-10 shadow-2xl border-[10px] border-white/50">
              <p className="text-2xl text-slate-700 leading-relaxed font-medium italic">"{config.aboutText}"</p>
              <div className="h-[30rem] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                <img src="https://images.unsplash.com/photo-1523050853063-bd80e27433fb?auto=format&fit=crop&q=80&w=1200" alt="Graduation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'admin' && user?.role === UserRole.ADMIN && (
          <div className="pt-24 pb-20 px-4">
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
              onUpdateUser={(u) => setAllUsers(prev => prev.map(usr => usr.username === u.username ? u : usr))} 
            />
          </div>
        )}
      </main>

      {viewingResult && <ResultSlip result={viewingResult} config={config} onClose={() => setViewingResult(null)} />}
      <Footer config={config} />
      <Chatbot />
    </div>
  );
};

export default App;
