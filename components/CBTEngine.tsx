
import React, { useState, useEffect } from 'react';
import { Subject, ExamResult, User, TaskType } from '../types';

interface CBTEngineProps {
  subject: Subject;
  user: User;
  taskType: TaskType;
  onExit: () => void;
  onSaveResult: (result: ExamResult) => void;
}

const CBTEngine: React.FC<CBTEngineProps> = ({ subject, user, taskType, onExit, onSaveResult }) => {
  const getQuestions = () => {
    switch(taskType) {
      case TaskType.HOMEWORK: return subject.homework;
      case TaskType.TEST: return subject.tests;
      default: return subject.questions;
    }
  };

  const activeQuestions = getQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(taskType === TaskType.EXAM ? 3600 : 900);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) { setIsFinished(true); return; }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = activeQuestions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionIndex });
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) { score++; }
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

  const handleOfficialSave = () => {
    const score = calculateScore();
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const result: ExamResult = {
      id: `${taskType}-${Date.now()}`,
      studentName: user.fullName,
      studentClass: user.studentClass || 'N/A',
      subjectName: subject.name,
      subjectLevel: subject.level,
      taskType: taskType,
      score,
      totalQuestions: activeQuestions.length,
      percentage,
      grade: getGrade(percentage),
      date: new Date().toLocaleDateString('en-GB'),
      pin: `CV-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
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
    const percentage = Math.round((score / activeQuestions.length) * 100);
    const grade = getGrade(percentage);
    return (
      <div className="max-w-2xl mx-auto p-16 glass-effect rounded-[4rem] text-center border-[10px] border-white animate-in zoom-in-95">
        <div className="w-24 h-24 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white text-5xl font-black mx-auto mb-8">{grade}</div>
        <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{taskType} Complete!</h2>
        <p className="text-xl text-slate-600 mb-12">Total Score: {score} / {activeQuestions.length}</p>
        <div className="space-y-4">
          {!isSaved ? (
            <button onClick={handleOfficialSave} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-green-600">Sync with Portal</button>
          ) : (
             <div className="w-full py-6 bg-green-50 text-green-700 rounded-[2rem] font-black uppercase tracking-widest">Successfully Synced</div>
          )}
          <button onClick={onExit} className="w-full py-6 bg-amber-600 text-white rounded-[2rem] font-black uppercase tracking-widest">Return to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{subject.name} {taskType}</h2>
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{user.studentClass} • {activeQuestions.length} Items</span>
        </div>
        <div className="px-10 py-5 bg-slate-900 text-amber-500 rounded-[2rem] font-mono font-black text-3xl shadow-xl">{formatTime(timeLeft)}</div>
      </div>

      <div className="glass-effect rounded-[3.5rem] p-16 border-4 border-white mb-12">
        <h3 className="text-3xl font-black text-slate-900 mb-12 leading-tight">Q{currentIndex + 1}: {currentQuestion.text}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              className={`w-full text-left px-8 py-7 rounded-[2.5rem] border-4 transition-all flex items-center ${
                answers[currentQuestion.id] === idx ? 'border-amber-500 bg-slate-900 text-white' : 'border-white bg-white/40'
              }`}
            >
              <span className="w-12 h-12 rounded-xl flex items-center justify-center mr-6 font-black bg-slate-100 text-slate-400">{String.fromCharCode(65 + idx)}</span>
              <span className="text-xl font-bold">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)} className="px-10 py-5 border-4 border-white text-slate-900 rounded-[2rem] font-black uppercase text-xs">Back</button>
        {currentIndex === activeQuestions.length - 1 ? (
          <button onClick={() => setIsFinished(true)} className="px-16 py-5 bg-green-600 text-white rounded-[2rem] font-black uppercase text-xs">Finish {taskType}</button>
        ) : (
          <button onClick={() => setCurrentIndex(currentIndex + 1)} className="px-16 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs">Next Question</button>
        )}
      </div>
    </div>
  );
};

export default CBTEngine;
