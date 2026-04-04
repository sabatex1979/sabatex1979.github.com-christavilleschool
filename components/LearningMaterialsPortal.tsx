
import React, { useState } from 'react';
import { Subject, LearningMaterial } from '../types';

interface LearningMaterialsPortalProps {
  subjects: Subject[];
}

const LearningMaterialsPortal: React.FC<LearningMaterialsPortalProps> = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(subjects[0] || null);

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="md:w-1/3 space-y-4">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-8">Course Subjects</h2>
        {subjects.map(s => (
          <button 
            key={s.id}
            onClick={() => setSelectedSubject(s)}
            className={`w-full text-left p-6 rounded-[2rem] border-2 transition-all flex items-center gap-4 ${
              selectedSubject?.id === s.id ? 'bg-slate-900 border-amber-500 text-white shadow-xl scale-105' : 'bg-white/60 border-white text-slate-600'
            }`}
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="font-black uppercase text-xs tracking-widest">{s.name}</span>
          </button>
        ))}
      </div>

      <div className="md:w-2/3">
        {selectedSubject ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-6 mb-10">
               <div className="text-6xl">{selectedSubject.icon}</div>
               <div>
                  <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">{selectedSubject.name}</h3>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Available Learning Materials</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedSubject.materials.map(m => (
                <div key={m.id} className="glass-effect p-8 rounded-[3rem] border-2 border-white shadow-sm hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      m.type === 'Video' ? 'bg-red-100 text-red-600' : m.type === 'PDF' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {m.type}
                    </span>
                    <button className="text-slate-400 hover:text-slate-900"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 uppercase">{m.title}</h4>
                  <p className="text-slate-600 font-medium leading-relaxed mb-8">{m.content}</p>
                  <button className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 shadow-lg">
                    {m.type === 'Video' ? 'Watch Lesson' : 'Download Material'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 font-bold uppercase">Select a subject to view notes</div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterialsPortal;
