
import React from 'react';
import { User, Meeting } from '../types';

interface VirtualClassroomProps {
  user: User | null;
  meetings: Meeting[];
  onJoinMeeting: (meeting: Meeting) => void;
}

const VirtualClassroom: React.FC<VirtualClassroomProps> = ({ user, meetings, onJoinMeeting }) => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Virtual Classroom</h2>
          <p className="text-slate-600 mt-2 font-medium">Official Zoom sessions managed by school administrators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {meetings.length === 0 ? (
              <div className="glass-effect p-12 rounded-[2.5rem] border text-center text-slate-400 font-bold uppercase tracking-widest">
                No active classes scheduled.
              </div>
            ) : (
              meetings.map((m) => (
                <div key={m.id} className="glass-effect p-8 rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all group border-white">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl shadow-inner bg-slate-50">
                        {m.status === 'live' ? '🎥' : '📅'}
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors uppercase">{m.title}</h4>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Instructor: {m.teacherName}</p>
                        <div className="flex gap-4 mt-4">
                          <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">ID: {m.meetingId}</span>
                          {m.password && <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 px-3 py-1 rounded-lg">Passcode: {m.password}</span>}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onJoinMeeting(m)}
                      className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg"
                    >
                      Join Zoom Session
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Zoom Guidelines</h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <li className="flex gap-4"><span className="text-amber-500">01.</span> Camera On</li>
              <li className="flex gap-4"><span className="text-amber-500">02.</span> Mute on entry</li>
              <li className="flex gap-4"><span className="text-amber-500">03.</span> Quiet environment</li>
              <li className="flex gap-4"><span className="text-amber-500">04.</span> Official Zoom App</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualClassroom;
