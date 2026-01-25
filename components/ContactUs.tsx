
import React from 'react';
import { SchoolConfig } from '../types';

interface ContactUsProps {
  config: SchoolConfig;
}

const ContactUs: React.FC<ContactUsProps> = ({ config }) => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">Get in Touch</h2>
        <p className="text-slate-600 max-w-2xl mx-auto font-medium">Have questions about admissions or our curriculum? We are here to help you every step of the way.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="glass-effect p-8 rounded-[2.5rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all group">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">📍</div>
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Our Campus</h4>
                <p className="text-slate-600 font-medium leading-relaxed">{config.address}</p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-[2.5rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all group">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">📞</div>
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Phone Lines</h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-1">General Inquiries: <span className="font-bold text-slate-900">{config.phone}</span></p>
                <p className="text-slate-600 font-medium leading-relaxed">Admin Office: <span className="font-bold text-slate-900">+234 810 377 2730</span></p>
              </div>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-[2.5rem] border-2 border-white shadow-xl hover:shadow-2xl transition-all group">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">✉️</div>
              <div>
                <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Email Us</h4>
                <p className="text-slate-600 font-medium leading-relaxed mb-1">Admissions: <span className="font-bold text-slate-900">{config.email}</span></p>
                <p className="text-slate-600 font-medium leading-relaxed">Support: <span className="font-bold text-slate-900">support@christaville.edu</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-effect p-10 md:p-12 rounded-[3.5rem] border-4 border-white shadow-2xl">
          <h3 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Send a Message</h3>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" required placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl border-none bg-slate-100 focus:ring-4 focus:ring-slate-900/10 outline-none font-bold text-slate-900 shadow-inner" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl border-none bg-slate-100 focus:ring-4 focus:ring-slate-900/10 outline-none font-bold text-slate-900 shadow-inner" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Subject</label>
              <select className="w-full px-6 py-4 rounded-2xl border-none bg-slate-100 focus:ring-4 focus:ring-slate-900/10 outline-none font-bold text-slate-900 shadow-inner">
                <option>Admission Inquiry</option>
                <option>Employment Opportunity</option>
                <option>Parent Feedback</option>
                <option>Technical Support</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Your Message</label>
              <textarea rows={5} required placeholder="How can we help you today?" className="w-full px-6 py-4 rounded-2xl border-none bg-slate-100 focus:ring-4 focus:ring-slate-900/10 outline-none font-bold text-slate-900 shadow-inner resize-none"></textarea>
            </div>
            <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl">
              Send Message Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
