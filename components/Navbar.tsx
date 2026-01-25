
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
    { id: 'cbt', label: 'CBT Portal' },
    { id: 'virtual', label: 'Virtual Class' },
    { id: 'tutor', label: 'AI Tutor' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  if (user) {
    navItems.splice(2, 0, { id: 'results', label: 'Results' });
    navItems.splice(3, 0, { id: 'attendance', label: 'Attendance' });
  }

  if (user?.role === UserRole.ADMIN) {
    navItems.push({ id: 'admin', label: 'Admin Panel' });
  }

  return (
    <nav className="fixed w-full z-50 glass-effect border-b print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="h-10 w-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
              C
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Christaville <span className="text-amber-600">School</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  activePage === item.id ? 'text-amber-600 font-bold' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900 leading-none">{user.fullName}</p>
                  <p className="text-[10px] text-amber-600 uppercase font-bold tracking-widest leading-none mt-1">{user.role}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass-effect border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === item.id ? 'text-amber-600 bg-amber-50' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-red-600 font-bold"
              >
                Logout
              </button>
            ) : (
              <div className="pt-2 pb-1 border-t border-slate-100">
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-900 font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onNavigate('register');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-amber-600 font-bold"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
