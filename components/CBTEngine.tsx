
import React, { useState, useEffect } from 'react';
import { Subject, ExamResult, User } from '../types';

interface CBTEngineProps {
  subject: Subject;
  user: User;
  onExit: () => void;
  onSaveResult: (result: ExamResult) => void;
}

const CBTEngine: React.FC<CBTEngineProps> = ({ subject, user, onExit, onSaveResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isFinished, setIsFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = subject.questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    subject.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const generateAutoPin = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let pin = 'CV-';
    for (let i = 0; i < 4; i++) {
      pin += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pin;
  };

  const handleOfficialSave = () => {
    const score = calculateScore();
    const percentage = Math.round((score / subject.questions.length) * 100);
    const result: ExamResult = {
      id: Date.now().toString(),
      studentName: user.fullName,
      studentClass: user.studentClass || 'N/A',
      subjectName: subject.name,
      subjectLevel: subject.level,
      score,
      totalQuestions: subject.questions.length,
      percentage,
      grade: getGrade(percentage),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      pin: generateAutoPin() // Auto-generate PIN on save
    };
    onSaveResult(result);
    setIsSaved(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    const score = calculateScore();
    const percentage = Math.round((score / subject.questions.length) * 100);
    const grade = getGrade(percentage);
    
    return (
      <div className="max-w-2xl mx-auto p-12 glass-effect rounded-[3rem] shadow-2xl text-center border-4 border-white animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-5xl font-black mx-auto mb-6 shadow-xl border-4 border-slate-800">
           {grade}
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">EXAM COMPLETED!</h2>
        <div className="inline-block px-6 py-2 bg-amber-100 text-amber-900 rounded-full font-bold text-sm mb-8 uppercase tracking-widest">
           Grade: {grade} ({percentage}%)
        </div>
        
        <p className="text-slate-600 mb-10 leading-relaxed font-medium">
          Congratulations {user.fullName}! You answered <span className="text-slate-900 font-black">{score}</span> out of <span className="text-slate-900 font-black">{subject.questions.length}</span> questions correctly in the {subject.name} examination.
        </p>

        <div className="space-y-4">
          {!isSaved ? (
            <button
              onClick={handleOfficialSave}
              className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold hover:bg-slate-800 shadow-xl flex items-center justify-center gap-3 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save to Official Results
            </button>
          ) : (
            <div className="w-full py-5 bg-green-50 text-green-700 border-2 border-green-100 rounded-[2rem] font-bold flex items-center justify-center gap-3 mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Result Saved Officially
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                  setCurrentIndex(0);
                  setAnswers({});
                  setTimeLeft(3600);
                  setIsFinished(false);
                  setIsSaved(false);
              }}
              className="py-4 border-2 border-slate-100 text-slate-600 rounded-[2rem] font-bold hover:bg-slate-50 transition-all"
            >
              Retake Practice
            </button>
            <button
              onClick={onExit}
              className="py-4 bg-amber-600 text-white rounded-[2rem] font-bold hover:bg-amber-700 shadow-lg transition-all"
            >
              Exit Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{subject.name}</h2>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{subject.level} OFFICIAL ASSESSMENT</p>
        </div>
        <div className="px-6 py-3 bg-slate-900 text-white rounded-[1.5rem] font-mono font-bold text-lg shadow-xl border-4 border-slate-800">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-8 flex gap-2">
        {subject.questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-amber-600 scale-y-125' : answers[subject.questions[i].id] !== undefined ? 'bg-slate-900' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      <div className="glass-effect rounded-[2.5rem] p-10 shadow-sm border-2 border-white mb-8 min-h-[450px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none">
          <div className="text-[120px] font-black">{currentIndex + 1}</div>
        </div>
        
        <span className="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-4">
          Question {currentIndex + 1} of {subject.questions.length}
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 leading-tight relative z-10">{currentQuestion.text}</h3>
        
        <div className="grid grid-cols-1 gap-4 relative z-10">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left px-6 py-5 rounded-[1.5rem] border-2 transition-all group flex items-center ${
                answers[currentQuestion.id] === idx
                  ? 'border-slate-900 bg-slate-900 text-white shadow-xl translate-x-2'
                  : 'border-slate-100 bg-white hover:border-slate-300 text-slate-700 hover:translate-x-1'
              }`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 font-black transition-all ${
                answers[currentQuestion.id] === idx 
                  ? 'bg-amber-500 text-slate-900' 
                  : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-lg font-bold">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="px-8 py-4 border-2 border-slate-200 text-slate-600 rounded-[1.5rem] font-black uppercase text-xs tracking-widest disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
          Previous
        </button>
        
        <div className="flex-1 text-center text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">
          End of Session
        </div>

        {currentIndex === subject.questions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="px-12 py-4 bg-green-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-green-700 shadow-xl transition-all animate-bounce"
          >
            Final Submission
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-12 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-slate-800 shadow-xl transition-all"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default CBTEngine;
