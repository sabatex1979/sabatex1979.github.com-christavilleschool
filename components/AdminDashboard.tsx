
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
  const [activeTab, setActiveTab] = useState<'results' | 'cbt' | 'virtual' | 'content' | 'users'>('results');
  const [contentSubTab, setContentSubTab] = useState<'global' | 'slider' | 'testimonials' | 'contact' | 'materials' | 'subjects'>('global');
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

  const handleRoleChange = (user: User, newRole: UserRole) => {
    const updatedUser = { ...user, role: newRole };
    onUpdateUser(updatedUser);
  };

  const toggleAuthorization = (user: User) => {
    const updatedUser = { ...user, isAuthorized: !user.isAuthorized };
    onUpdateUser(updatedUser);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 print:hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Admin Console</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Management Level: <span className="text-amber-600">Full Authorization</span></p>
        </div>
        <div className="flex bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto shadow-inner border border-slate-200">
          {[
            { id: 'results', label: 'Results' },
            { id: 'users', label: 'Users' },
            { id: 'cbt', label: 'Portal' },
            { id: 'virtual', label: 'Classes' },
            { id: 'content', label: 'Editor' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-slate-900 shadow-xl text-white scale-105' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'users' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="glass-effect rounded-[3rem] border shadow-2xl overflow-hidden border-white">
            <div className="p-8 border-b bg-slate-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase">Registered Personnel</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{users.length} Total Accounts</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-6">Full Name</th>
                    <th className="px-8 py-6">Username</th>
                    <th className="px-8 py-6">Current Role</th>
                    <th className="px-8 py-6">Access</th>
                    <th className="px-8 py-6 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No users found in database</td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.username} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg border-2 border-white ${u.role === UserRole.ADMIN ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                              {u.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-sm uppercase">{u.fullName}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{u.email || 'No email'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <code className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg uppercase">{u.username}</code>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            u.role === UserRole.ADMIN ? 'bg-purple-100 text-purple-700' :
                            u.role === UserRole.TEACHER ? 'bg-blue-100 text-blue-700' :
                            u.role === UserRole.PARENT ? 'bg-green-100 text-green-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <button 
                            onClick={() => toggleAuthorization(u)}
                            className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${u.isAuthorized ? 'text-green-600' : 'text-red-600'}`}
                           >
                             <div className={`w-3 h-3 rounded-full ${u.isAuthorized ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></div>
                             {u.isAuthorized ? 'Granted' : 'Revoked'}
                           </button>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {u.role !== UserRole.ADMIN ? (
                              <button 
                                onClick={() => handleRoleChange(u, UserRole.ADMIN)}
                                className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 shadow-lg"
                              >
                                Grant Admin
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleRoleChange(u, UserRole.STUDENT)}
                                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700"
                              >
                                Revoke Admin
                              </button>
                            )}
                            <button 
                              onClick={() => handleRoleChange(u, u.role === UserRole.TEACHER ? UserRole.STUDENT : UserRole.TEACHER)}
                              className="px-4 py-2 border-2 border-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white"
                            >
                              {u.role === UserRole.TEACHER ? 'Make Student' : 'Make Teacher'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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

      {activeTab === 'results' && (
        <div className="animate-in fade-in duration-500">
           <div className="glass-effect rounded-[3rem] border shadow-2xl overflow-hidden border-white">
              <div className="p-8 border-b bg-slate-50/50">
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Assessment Logs</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-6">Student</th>
                      <th className="px-8 py-6">Subject</th>
                      <th className="px-8 py-6">Performance</th>
                      <th className="px-8 py-6">PIN</th>
                      <th className="px-8 py-6 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest">No results synchronized yet</td>
                      </tr>
                    ) : (
                      results.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-black text-slate-900 uppercase text-xs">{r.studentName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{r.studentClass}</p>
                          </td>
                          <td className="px-8 py-6">
                            <p className="font-black text-slate-700 text-xs uppercase">{r.subjectName}</p>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <span className="text-lg font-black text-slate-900">{r.percentage}%</span>
                               <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${r.percentage >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                 Grade {r.grade}
                               </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <code className="text-xs font-black text-amber-600 font-mono">{r.pin}</code>
                          </td>
                          <td className="px-8 py-6 text-right font-bold text-slate-400 text-[10px] uppercase">
                            {r.date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex gap-4 mb-4 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200 shadow-inner">
            {[
              { id: 'global', label: 'Branding' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'slider', label: 'Home Slider' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'materials', label: 'Materials' },
              { id: 'subjects', label: 'Subjects' }
            ].map(sub => (
              <button key={sub.id} onClick={() => setContentSubTab(sub.id as any)} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${contentSubTab === sub.id ? 'bg-white text-slate-900 shadow-lg scale-105' : 'text-slate-400 hover:text-slate-600'}`}>{sub.label}</button>
            ))}
          </div>

          {contentSubTab === 'subjects' && (
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="glass-effect p-8 rounded-[2rem] border shadow-sm border-white grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <input type="text" value={subject.name} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, name: e.target.value} : s))} className="p-3 rounded-xl border font-black uppercase" />
                  <input type="text" value={subject.icon} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, icon: e.target.value} : s))} className="p-3 rounded-xl border text-center text-2xl" />
                  <select value={subject.level} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, level: e.target.value as any} : s))} className="p-3 rounded-xl border font-black uppercase">
                    {Object.values(SchoolLevel).map(level => <option key={level} value={level}>{level}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )}

          {contentSubTab === 'materials' && (
            <div className="space-y-8">
              {subjects.map((subject) => (
                <div key={subject.id} className="glass-effect p-8 rounded-[2rem] border shadow-sm border-white">
                  <h4 className="text-lg font-black text-slate-900 uppercase mb-4">{subject.name} - {subject.level}</h4>
                  <div className="space-y-4">
                    {subject.materials.map((material, idx) => (
                      <div key={idx} className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl">
                        <input type="text" value={material.title} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, materials: s.materials.map((m, i) => i === idx ? {...m, title: e.target.value} : m)} : s))} className="flex-grow p-2 rounded-lg border" />
                        <select value={material.type} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, materials: s.materials.map((m, i) => i === idx ? {...m, type: e.target.value as any} : m)} : s))} className="p-2 rounded-lg border">
                          <option value="Note">Note</option>
                          <option value="Video">Video</option>
                          <option value="PDF">PDF</option>
                        </select>
                        <input type="text" value={material.url || ''} onChange={e => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, materials: s.materials.map((m, i) => i === idx ? {...m, url: e.target.value} : m)} : s))} className="flex-grow p-2 rounded-lg border" placeholder="URL" />
                        <button onClick={() => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, materials: s.materials.filter((_, i) => i !== idx)} : s))} className="text-red-500 hover:text-red-700">Delete</button>
                      </div>
                    ))}
                    <button onClick={() => setSubjects(prev => prev.map(s => s.id === subject.id ? {...s, materials: [...s.materials, { id: Date.now().toString(), title: 'New Material', type: 'Note', content: '' }]} : s))} className="text-xs font-black uppercase text-amber-600 hover:text-amber-700">+ Add Material</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {contentSubTab === 'testimonials' && (
            <div className="space-y-6">
              {testimonials.map((t) => (
                <div key={t.id} className="glass-effect p-8 rounded-[2rem] border shadow-sm border-white flex gap-6">
                  <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full" />
                  <div className="flex-grow">
                    <input type="text" value={t.name} onChange={e => setTestimonials(prev => prev.map(item => item.id === t.id ? {...item, name: e.target.value} : item))} className="w-full font-black text-slate-900 uppercase tracking-tight mb-2 bg-transparent border-b border-slate-200" />
                    <input type="text" value={t.role} onChange={e => setTestimonials(prev => prev.map(item => item.id === t.id ? {...item, role: e.target.value} : item))} className="w-full text-xs font-bold text-amber-600 uppercase tracking-widest mb-4 bg-transparent border-b border-slate-200" />
                    <textarea value={t.content} onChange={e => setTestimonials(prev => prev.map(item => item.id === t.id ? {...item, content: e.target.value} : item))} className="w-full text-slate-600 font-medium leading-relaxed italic bg-transparent border-b border-slate-200" />
                  </div>
                  <button onClick={() => setTestimonials(prev => prev.filter(item => item.id !== t.id))} className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              ))}
            </div>
          )}

          {contentSubTab === 'contact' && (
            <div className="space-y-6">
              <div className="glass-effect p-10 rounded-[2.5rem] border shadow-2xl border-white grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 border-b pb-2">Contact Information</h4>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Physical Office Address</label>
                  <textarea name="address" rows={2} value={config.address} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">School Email</label>
                  <input type="email" name="email" value={config.email} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Official Phone</label>
                  <input type="text" name="phone" value={config.phone} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
              </div>

              <div className="glass-effect p-10 rounded-[2.5rem] border shadow-2xl border-white grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 border-b pb-2">Fees & Payment Details</h4>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Fees Amount</label>
                  <input type="text" name="feesAmount" value={config.feesAmount} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Bank Name</label>
                  <input type="text" name="feesBank" value={config.feesBank} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Account Type</label>
                  <input type="text" name="feesAccountType" value={config.feesAccountType} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Account Number</label>
                  <input type="text" name="feesAccountNumber" value={config.feesAccountNumber} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Receipt Verification Email</label>
                  <input type="email" name="feesReceiptEmail" value={config.feesReceiptEmail} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner" />
                </div>
              </div>
            </div>
          )}

          {contentSubTab === 'global' && (
            <div className="space-y-6">
              <div className="glass-effect p-10 rounded-[2.5rem] border shadow-2xl border-white grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Primary School Name</label>
                  <input type="text" name="schoolName" value={config.schoolName} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-black text-slate-900 shadow-inner" />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Landing Title</label>
                  <input type="text" name="heroTitle" value={config.heroTitle} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-black text-slate-900 shadow-inner" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Welcome Subtext</label>
                  <textarea name="heroSubtitle" rows={3} value={config.heroSubtitle} onChange={handleConfigChange} className="w-full px-6 py-4 rounded-2xl border-none bg-slate-50 focus:ring-4 focus:ring-amber-500/20 outline-none font-black text-slate-900 shadow-inner" />
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 flex justify-end">
             <button className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-2xl scale-105 active:scale-100">
               Save Portal Updates
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
