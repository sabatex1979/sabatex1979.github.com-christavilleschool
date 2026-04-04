
import React, { useState } from 'react';

const SchoolRegistration: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-4 text-center animate-in zoom-in duration-500">
        <div className="max-w-2xl mx-auto glass-effect p-16 rounded-[4rem] border-4 border-white shadow-2xl">
          <div className="text-8xl mb-8">🏫</div>
          <h2 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Application Received</h2>
          <p className="text-slate-600 font-medium text-xl mb-10 leading-relaxed">
            Thank you for choosing MORAVIA online Education. Our institutional partnership team will review your application and contact you within 48 hours to finalize the onboarding process.
          </p>
          <div className="p-6 bg-amber-50 rounded-3xl border-2 border-amber-100 text-amber-800 font-bold uppercase tracking-widest text-sm">
            Reference ID: SCH-REG-{Math.floor(Math.random() * 1000000)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Institutional Enrollment</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">
          Partner with MORAVIA to bring world-class digital education infrastructure to your school.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-effect p-12 rounded-[4rem] border-4 border-white shadow-2xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Official School Name</label>
                <input
                  type="text"
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="e.g. Royal Academy International"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">School Type</label>
                <select className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner appearance-none">
                  <option>Private K-12</option>
                  <option>Public/Government</option>
                  <option>Vocational/Technical</option>
                  <option>International School</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Estimated Student Count</label>
                <input
                  type="number"
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="e.g. 500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Administrator Email</label>
                <input
                  type="email"
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="admin@school.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Contact Phone</label>
                <input
                  type="tel"
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="+234..."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">School Address</label>
                <textarea
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner h-32 resize-none"
                  placeholder="Full physical address..."
                  required
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-amber-600 shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Submit Enrollment Request
              <span className="text-xl">→</span>
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="glass-effect p-10 rounded-[3rem] border-2 border-white shadow-xl bg-slate-900 text-white">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Partner Benefits</h3>
            <ul className="space-y-6">
              {[
                { title: 'Custom Branding', desc: 'Your school logo and colors on the portal.' },
                { title: 'Teacher Training', desc: 'Full certification for your academic staff.' },
                { title: 'Parent App', desc: 'Real-time monitoring for your parents.' },
                { title: 'Bulk Licensing', desc: 'Discounted rates for large student bodies.' }
              ].map((benefit, i) => (
                <li key={i}>
                  <h4 className="text-amber-500 font-black text-xs uppercase tracking-widest mb-1">{benefit.title}</h4>
                  <p className="text-slate-400 text-sm font-medium">{benefit.desc}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="glass-effect p-10 rounded-[3rem] border-2 border-white shadow-xl text-center">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">Need Help?</h3>
            <p className="text-slate-500 font-medium text-sm mb-6">Our institutional consultants are available for a live demo.</p>
            <button className="w-full py-4 border-4 border-slate-900 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 hover:text-white transition-all">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolRegistration;
