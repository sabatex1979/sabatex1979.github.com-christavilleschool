
import React from 'react';
import { ExamResult, SchoolConfig } from '../types';

interface ResultSlipProps {
  result: ExamResult;
  config: SchoolConfig;
  onClose: () => void;
}

const ResultSlip: React.FC<ResultSlipProps> = ({ result, config, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto pt-24 pb-12">
      <div className="max-w-4xl w-full bg-white rounded-none shadow-2xl relative overflow-hidden print:shadow-none print:m-0 print:p-0">
        {/* Buttons (Hidden on Print) */}
        <div className="absolute top-4 right-4 flex gap-2 print:hidden z-20">
          <button 
            onClick={handlePrint}
            className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Slip
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 text-slate-600 rounded-full font-bold hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        {/* The Result Content */}
        <div className="p-12 md:p-16 border-[12px] border-slate-50 print:border-none">
          <div className="border-4 border-slate-900 p-8">
            {/* Header */}
            <div className="text-center border-b-4 border-slate-900 pb-8 mb-8">
              <div className="flex justify-center mb-4">
                 <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center text-4xl font-bold rounded-2xl">C</div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-1">{config.schoolName}</h1>
              <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">Excellence in Learning & Character</p>
              <div className="mt-4 inline-block px-8 py-2 bg-slate-900 text-white font-bold uppercase tracking-widest">
                Official Terminal Result Slip
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-2 gap-8 mb-10 text-sm">
              <div className="space-y-2">
                <p><span className="font-bold uppercase text-slate-500 mr-2">Student Name:</span> <span className="font-bold text-slate-900 uppercase">{result.studentName}</span></p>
                <p><span className="font-bold uppercase text-slate-500 mr-2">Registration ID:</span> <span className="font-bold text-slate-900">CHR-{result.id.slice(-6).toUpperCase()}</span></p>
                <p><span className="font-bold uppercase text-slate-500 mr-2">Level / Class:</span> <span className="font-bold text-slate-900">{result.subjectLevel} - {result.studentClass}</span></p>
              </div>
              <div className="space-y-2 text-right">
                <p><span className="font-bold uppercase text-slate-500 mr-2">Verification PIN:</span> <span className="font-bold text-amber-600 font-mono">{result.pin}</span></p>
                <p><span className="font-bold uppercase text-slate-500 mr-2">Term:</span> <span className="font-bold text-slate-900">FIRST TERM</span></p>
                <p><span className="font-bold uppercase text-slate-500 mr-2">Date Issued:</span> <span className="font-bold text-slate-900">{result.date}</span></p>
              </div>
            </div>

            {/* Score Table */}
            <div className="border-4 border-slate-900 mb-10 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-white uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 font-bold">Subject Examined</th>
                    <th className="px-6 py-4 font-bold text-center">Questions</th>
                    <th className="px-6 py-4 font-bold text-center">Score</th>
                    <th className="px-6 py-4 font-bold text-center">Percentage</th>
                    <th className="px-6 py-4 font-bold text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-slate-900 font-bold">
                  <tr>
                    <td className="px-6 py-6 uppercase">{result.subjectName}</td>
                    <td className="px-6 py-6 text-center">{result.totalQuestions}</td>
                    <td className="px-6 py-6 text-center">{result.score}</td>
                    <td className="px-6 py-6 text-center text-xl">{result.percentage}%</td>
                    <td className="px-6 py-6 text-center text-2xl font-black">{result.grade}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Performance Analysis */}
            <div className="grid grid-cols-3 gap-4 mb-10">
               <div className="border-2 border-slate-900 p-4 text-center">
                 <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Status</p>
                 <p className={`font-black uppercase ${result.percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                   {result.percentage >= 50 ? 'PASSED' : 'FAILED'}
                 </p>
               </div>
               <div className="border-2 border-slate-900 p-4 text-center">
                 <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Position</p>
                 <p className="font-black">12th / 45</p>
               </div>
               <div className="border-2 border-slate-900 p-4 text-center">
                 <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Verdict</p>
                 <p className="font-black text-xs">GOOD WORK</p>
               </div>
            </div>

            {/* Footer Signatures */}
            <div className="flex justify-between items-end mt-20">
              <div className="text-center w-48">
                <div className="border-b-2 border-slate-900 h-10 mb-2 italic flex items-center justify-center font-serif">Electronic Sig</div>
                <p className="text-[10px] font-bold uppercase tracking-widest">School Registrar</p>
              </div>
              
              <div className="w-24 h-24 border-2 border-slate-200 flex items-center justify-center text-slate-300 text-[8px] p-2 text-center opacity-50">
                 DIGITAL VERIFICATION STAMP
              </div>

              <div className="text-center w-48">
                <div className="border-b-2 border-slate-900 h-10 mb-2 italic flex items-center justify-center font-serif text-slate-300">Signature Area</div>
                <p className="text-[10px] font-bold uppercase tracking-widest">Principal's Signature</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.3em]">
               This is a computer generated document. PIN Verified: {result.pin}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSlip;
