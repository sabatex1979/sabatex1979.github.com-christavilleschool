
import React from 'react';

interface HeroProps {
  onStart: () => void;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, title, subtitle }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tighter mb-8 uppercase leading-tight">
            {title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-2xl text-slate-600 mb-12 font-medium leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onStart}
              className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-2xl active:scale-95"
            >
              Access Learning Portal
            </button>
            <button
              className="px-10 py-5 border-4 border-slate-100 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              School Prospectus
            </button>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 -right-20 w-[40rem] h-[40rem] bg-blue-100 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-[40rem] h-[40rem] bg-amber-100 rounded-full blur-[120px] opacity-40 animate-pulse [animation-delay:2s]"></div>
      </div>
    </div>
  );
};

export default Hero;
