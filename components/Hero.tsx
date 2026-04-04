
import React from 'react';

interface HeroProps {
  onStart: () => void;
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ onStart, title, subtitle }) => {
  return (
    <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-6 px-6 py-2 bg-slate-900/5 backdrop-blur-md rounded-full border border-slate-900/10">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">Established 1998 • MORAVIA Excellence</span>
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter mb-8 leading-[0.9] lg:px-20 gradient-text">
            {title}
          </h1>
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-slate-600 mb-12 font-medium leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={onStart}
              className="px-12 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-[0_20px_40px_rgba(15,23,42,0.3)] hover:shadow-amber-500/40 active:scale-95 group"
            >
              Access Learning Portal
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
            <button
              className="px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl"
            >
              School Prospectus
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Floating Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-blue-400 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-amber-400 rounded-full blur-[100px] opacity-20 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-purple-400 rounded-full blur-[120px] opacity-10"></div>
      </div>
    </div>
  );
};

export default Hero;
