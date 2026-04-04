
import React from 'react';
import { SchoolConfig } from '../types';

interface FooterProps {
  config?: SchoolConfig;
}

const Footer: React.FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-white mr-3">M</div>
              <span className="text-2xl font-black tracking-tighter uppercase">{config?.schoolName || 'MORAVIA online Education'}</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Providing top-tier educational foundations for children in a safe, inspiring environment. Committed to academic excellence and moral uprightness.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-amber-500">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 font-bold text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Portal Admissions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Curriculum Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parent Connect</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-6 text-amber-500">Contact Portal</h4>
            <ul className="space-y-3 text-slate-400 font-bold text-sm">
              <li className="flex items-start gap-3">
                <span className="text-white">📧</span>
                <span>{config?.email || 'DS.D188034@rws.com'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">📞</span>
                <span>{config?.phone || '+2348038316472, +2349138570035'}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white">📍</span>
                <span>{config?.address || '76A Woji Road Rumurolu Town Port Harcourt Rivers State Nigeria'}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} {config?.schoolName || 'MORAVIA online Education'}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
