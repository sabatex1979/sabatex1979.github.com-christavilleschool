
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'fees', label: 'Fees Payment' },
    { id: 'offline-cbt', label: 'Offline CBT' },
    { id: 'school-reg', label: 'School Registration' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  if (user) {
    navItems.splice(1, 0, { id: 'materials', label: 'Class Notes' });
    navItems.splice(2, 0, { id: 'homework', label: 'Homework/Tests' });
    navItems.splice(3, 0, { id: 'cbt', label: 'Exams' });
    navItems.splice(4, 0, { id: 'library', label: 'E-Library' });
    navItems.splice(5, 0, { id: 'results', label: 'Results' });
  }

  if (user?.role === UserRole.ADMIN) {
    navItems.push({ id: 'admin', label: 'Admin Panel' });
  }

  return (
    <nav className="fixed w-full z-50 glass-effect border-b print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">M</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">MORAVIA <span className="text-amber-600">online Education</span></span>
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-amber-600 ${
                  activePage === item.id ? 'text-amber-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l">
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-900 uppercase leading-none">{user.fullName}</p>
                  <p className="text-[8px] text-amber-600 uppercase font-bold tracking-widest leading-none mt-1">{user.studentClass || user.role}</p>
                </div>
                <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={() => onNavigate('login')} className="text-xs font-black uppercase text-slate-600 hover:text-slate-900 px-4 py-2">Login</button>
                <button onClick={() => onNavigate('register')} className="px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 shadow-md">Register</button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
