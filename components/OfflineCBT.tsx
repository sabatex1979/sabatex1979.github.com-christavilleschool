
import React from 'react';

const OfflineCBT: React.FC = () => {
  const downloadItems = [
    { id: 'win', title: 'MORAVIA CBT for Windows', version: 'v2.4.0', size: '124MB', icon: '🪟' },
    { id: 'mac', title: 'MORAVIA CBT for macOS', version: 'v2.4.0', size: '138MB', icon: '🍎' },
    { id: 'android', title: 'MORAVIA CBT Mobile (APK)', version: 'v1.1.2', size: '45MB', icon: '🤖' },
    { id: 'ios', title: 'MORAVIA CBT for iOS', version: 'v1.1.2', size: '52MB', icon: '📱' },
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Offline CBT Center</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
          Download our standalone examination software for practice and official assessments without an active internet connection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {downloadItems.map((item) => (
          <div key={item.id} className="glass-effect p-10 rounded-[3rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all group flex items-center gap-8">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">{item.title}</h3>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Version {item.version} • {item.size}</p>
              <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg flex items-center gap-2">
                Download Installer <span>↓</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-effect p-12 rounded-[4rem] border-4 border-white shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Why Offline CBT?</h3>
            <ul className="space-y-4">
              {[
                'Zero Latency: Instant question loading and response saving.',
                'Data Independence: No internet required during the actual examination.',
                'Secure Environment: Advanced anti-cheat and lockdown browser features.',
                'Auto-Sync: Results are automatically uploaded once a connection is detected.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                  <span className="text-blue-600 font-black">✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-inner text-center">
            <div className="text-6xl mb-6">🔑</div>
            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Activation Required</h4>
            <p className="text-slate-600 font-medium mb-6">
              After installation, use your student portal credentials to activate the software. 
              One license per device is allowed for security purposes.
            </p>
            <div className="p-4 bg-slate-900 text-white rounded-2xl font-mono text-xs tracking-widest">
              SUPPORT CODE: MORAVIA-OFFLINE-2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineCBT;
