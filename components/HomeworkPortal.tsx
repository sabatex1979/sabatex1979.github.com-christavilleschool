
import React from 'react';
import { Subject, TaskType } from '../types';

interface HomeworkPortalProps {
  subjects: Subject[];
  onStartTask: (subject: Subject, type: TaskType) => void;
}

const HomeworkPortal: React.FC<HomeworkPortalProps> = ({ subjects, onStartTask }) => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Task Center</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Homework & Mid-Term Assessments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Homework Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">🏠</div>
            <h3 className="text-3xl font-black text-slate-900 uppercase">Daily Homework</h3>
          </div>
          {subjects.map(s => (
            <div key={s.id} className="glass-effect p-8 rounded-[2.5rem] border-2 border-white flex justify-between items-center shadow-sm hover:shadow-xl transition-all">
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase">{s.name} Homework</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{s.homework.length} Questions Pending</p>
              </div>
              <button 
                onClick={() => onStartTask(s, TaskType.HOMEWORK)}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg"
              >
                Launch Task
              </button>
            </div>
          ))}
        </div>

        {/* Tests Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">⚡</div>
            <h3 className="text-3xl font-black text-slate-900 uppercase">Classroom Tests</h3>
          </div>
          {subjects.map(s => (
            <div key={s.id} className="glass-effect p-8 rounded-[2.5rem] border-2 border-white flex justify-between items-center shadow-sm hover:shadow-xl transition-all">
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase">{s.name} Test</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{s.tests.length} Questions • 20 Mins</p>
              </div>
              <button 
                onClick={() => onStartTask(s, TaskType.TEST)}
                className="px-8 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 shadow-lg"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPortal;
