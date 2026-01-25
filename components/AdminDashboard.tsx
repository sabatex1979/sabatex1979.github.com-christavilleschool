
import React, { useState } from 'react';
import { Subject, SchoolConfig, ExamResult, User, UserRole, SchoolLevel, Testimonial, Meeting } from '../types';

interface AdminDashboardProps {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  config: SchoolConfig;
  setConfig: React.Dispatch<React.SetStateAction<SchoolConfig>>;
  slides: any[];
  setSlides: React.Dispatch<React.SetStateAction<any[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  results: ExamResult[];
  setResults: React.Dispatch<React.SetStateAction<ExamResult[]>>;
  users: User[];
  meetings: Meeting[];
  setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
  onUpdateUser: (updatedUser: User) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  subjects, 
  setSubjects, 
  config, 
  setConfig, 
  slides,
  setSlides,
  testimonials,
  setTestimonials,
  results, 
  setResults, 
  users,
  meetings,
  setMeetings,
  onUpdateUser 
}) => {
  const [activeTab, setActiveTab] = useState<'results' | 'cbt' | 'virtual' | 'content'>('results');
  const [contentSubTab, setContentSubTab] = useState<'global' | 'slider' | 'testimonials'>('global');
  const [editingResult, setEditingResult] = useState<ExamResult | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({ title: '', teacherName: '', startTime: '', duration: '', status: 'live' });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title) return;
    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title!,
      teacherName: newMeeting.teacherName || 'SADIKU BABATUNDE TAOFEEK',
      startTime: newMeeting.startTime || 'Now',
      duration: newMeeting.duration || '60 mins',
      status: newMeeting.status as any || 'live',
      meetingId: newMeeting.meetingId || '378 965 7653',
      password: newMeeting.password || '1979'
    };
    setMeetings([meeting, ...meetings]);
    setNewMeeting({ title: '', teacherName: '', startTime: '', duration: '', status: 'live' });
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(meetings.filter(m => m.id !== id));
  };

  const handleSlideChange = (id: number, field: string, value: string) => {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleTestimonialChange = (id: string, field: string, value: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 print:hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Christaville Management Hub</h2>
          <p className="text-slate-600 font-medium">Administrator: <span className="text-amber-600 font-bold">sabatex1979</span></p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto shadow-inner">
          {[
            { id: 'results', label: 'Results' },
            { id: 'cbt', label: 'CBT Portal' },
            { id: 'virtual', label: 'Virtual Class' },
            { id: 'content', label: 'Global Editor' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'virtual' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="glass-effect p-8 rounded-[2.5rem] border shadow-sm border-white">
            <h3 className="text-xl font-bold mb-6">Schedule New Zoom Session</h3>
            <form onSubmit={handleAddMeeting} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Meeting Title" className="p-3 rounded-xl border" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})} />
              <input type="text" placeholder="Teacher Name" className="p-3 rounded-xl border" value={newMeeting.teacherName} onChange={e => setNewMeeting({...newMeeting, teacherName: e.target.value})} />
              <input type="text" placeholder="Meeting ID" className="p-3 rounded-xl border" value={newMeeting.meetingId} onChange={e => setNewMeeting({...newMeeting, meetingId: e.target.value})} />
              <input type="text" placeholder="Passcode" className="p-3 rounded-xl border" value={newMeeting.password} onChange={e => setNewMeeting({...newMeeting, password: e.target.value})} />
              <button type="submit" className="md:col-span-3 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest shadow-lg">Create Meeting</button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {meetings.map(m => (
              <div key={m.id} className="p-6 bg-white rounded-3xl border flex justify-between items-center shadow-sm">
                <div>
                  <h4 className="font-black text-slate-900 uppercase">{m.title}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">ID: {m.meetingId} | Teacher: {m.teacherName}</p>
                </div>
                <button onClick={() => handleDeleteMeeting(m.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex gap-4 mb-4 bg-slate-100 p-1 rounded-2xl w-fit">
            {[
              { id: 'global', label: 'Branding' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'slider', label: 'Home Slider' }
            ].map(sub => (
              <button key={sub.id} onClick={() => setContentSubTab(sub.id as any)} className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${contentSubTab === sub.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{sub.label}</button>
            ))}
          </div>

          {contentSubTab === 'contact' && (
            <div className="glass-effect p-8 rounded-[2rem] border shadow-sm border-white grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Physical Office Address</label>
                <textarea name="address" rows={2} value={config.address} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">School Email</label>
                <input type="email" name="email" value={config.email} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Official Phone</label>
                <input type="text" name="phone" value={config.phone} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none" />
              </div>
            </div>
          )}

          {contentSubTab === 'global' && (
            <div className="space-y-6">
              <div className="glass-effect p-8 rounded-[2rem] border shadow-sm border-white grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Primary School Name</label>
                  <input type="text" name="schoolName" value={config.schoolName} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Landing Title</label>
                  <input type="text" name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Welcome Subtext</label>
                  <textarea name="heroSubtitle" rows={3} value={config.heroSubtitle} onChange={handleConfigChange} className="w-full px-4 py-3 rounded-xl border outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* Other Content sub-tabs... */}
          <div className="pt-8 flex justify-end">
             <button className="px-10 py-4 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl">
               Save All Portal Updates
             </button>
          </div>
        </div>
      )}

      {/* Other tabs results/cbt... */}
    </div>
  );
};

export default AdminDashboard;
