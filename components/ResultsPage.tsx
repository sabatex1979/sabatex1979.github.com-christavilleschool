
import React, { useState } from 'react';
import { ExamResult, User } from '../types';

interface ResultsPageProps {
  user: User;
  results: ExamResult[];
  onViewResult: (result: ExamResult) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ user, results, onViewResult }) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const userResults = results.filter(r => r.studentName === user.fullName);

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    
    if (!pinInput.trim()) {
      setPinError('Please enter a valid result PIN.');
      return;
    }

    const foundResult = results.find(r => r.pin.toUpperCase() === pinInput.toUpperCase().trim());
    
    if (foundResult) {
      onViewResult(foundResult);
      setPinInput('');
    } else {
      setPinError('Invalid PIN. Please check your result slip or contact the administrator.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">Academic Results</h2>
          <p className="text-slate-600 mt-2">Track your progress and print official result slips for completed assessments.</p>
        </div>

        {/* PIN Checker Box */}
        <div className="w-full md:w-auto">
          <form onSubmit={handlePinCheck} className="glass-effect p-6 rounded-3xl border border-amber-200 shadow-lg bg-amber-50/50">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Check Result by PIN
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                maxLength={10}
                placeholder="Enter PIN (e.g. CV-1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="px-4 py-2 rounded-xl border border-amber-200 focus:ring-2 focus:ring-amber-500 outline-none text-sm font-mono w-48 uppercase"
              />
              <button 
                type="submit"
                className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-amber-600 transition-all shadow-md"
              >
                Check
              </button>
            </div>
            {pinError && <p className="text-[10px] font-bold text-red-600 mt-2 animate-pulse">{pinError}</p>}
          </form>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-bold text-slate-900 border-b pb-2">Your Logged Assessments</h3>
        
        {userResults.length === 0 ? (
          <div className="text-center py-20 glass-effect rounded-3xl border border-dashed border-slate-300">
            <div className="text-6xl mb-6 opacity-30">📄</div>
            <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Results Recorded Yet</h3>
            <p className="text-slate-500 mt-2">Complete a CBT assessment to see your performance here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userResults.map((res) => (
              <div key={res.id} className="glass-effect p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all group border-slate-100 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl">
                    {res.grade}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{res.date}</p>
                    <p className="text-xs text-slate-400 font-medium">Session 2023/24</p>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 uppercase">{res.subjectName}</h4>
                <p className="text-sm text-slate-500 font-medium mb-2">{res.subjectLevel} Assessment</p>
                <p className="text-[10px] text-slate-400 font-mono mb-6 uppercase">PIN: {res.pin}</p>
                
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 mb-8">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Score</p>
                     <p className="text-lg font-black text-slate-900">{res.score} / {res.totalQuestions}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase">Percentage</p>
                     <p className="text-lg font-black text-slate-900">{res.percentage}%</p>
                   </div>
                </div>

                <button 
                  onClick={() => onViewResult(res)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg flex items-center justify-center gap-2 mt-auto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  View & Print Slip
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
