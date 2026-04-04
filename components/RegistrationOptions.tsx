
import React from 'react';

interface RegistrationOptionsProps {
  onNavigate: (page: string) => void;
}

const RegistrationOptions: React.FC<RegistrationOptionsProps> = ({ onNavigate }) => {
  const options = [
    { title: 'Student Registration', desc: 'Join our digital learning hub.', icon: '🎓', color: 'from-blue-50 to-indigo-100' },
    { title: 'Teacher Registration', desc: 'Empower students with modern tools.', icon: '🍎', color: 'from-emerald-50 to-green-100' },
    { title: 'Parent Registration', desc: 'Monitor your child\'s progress.', icon: '👨‍👩‍👧‍👦', color: 'from-amber-50 to-orange-100' },
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Get Started</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
            Choose your path and join the MORAVIA online Education community today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((opt, i) => (
            <button 
              key={i}
              onClick={() => onNavigate('register')}
              className={`p-10 rounded-[3rem] bg-gradient-to-br ${opt.color} backdrop-blur-xl border-2 border-white text-left hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl group cursor-pointer shadow-lg`}
            >
              <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500">{opt.icon}</div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{opt.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">{opt.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all">
                Register Now <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationOptions;
