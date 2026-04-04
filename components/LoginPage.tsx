
import React, { useState, useEffect } from 'react';
import { UserRole, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User, isRegistration?: boolean) => void;
  initialMode?: 'login' | 'register';
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, initialMode = 'login' }) => {
  const [isLoginView, setIsLoginView] = useState(initialMode === 'login');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoginView(initialMode === 'login');
  }, [initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      if (username === 'sabatex1979' && password === '1234_ABCsadiku') {
        onLogin({ 
          username, 
          role: UserRole.ADMIN, 
          fullName: 'System Administrator',
          isAuthorized: true,
          registrationDate: new Date().toISOString()
        });
        return;
      }

      if (username && password) {
        onLogin({ 
          username, 
          role, 
          fullName: username.charAt(0).toUpperCase() + username.slice(1),
          isAuthorized: true,
          registrationDate: new Date().toISOString()
        });
      } else {
        setError('Please provide both username and password.');
      }
    } else {
      if (!username || !password || !fullName || !email || !phone || !address) {
        setError('Please fill in all required basic fields.');
        return;
      }

      if (role === UserRole.STUDENT && (!age || !studentClass)) {
        setError('Please provide your age and class.');
        return;
      }

      onLogin({ 
        username, 
        role, 
        fullName,
        email,
        phone,
        address,
        age: age ? parseInt(age) : undefined,
        studentClass: studentClass || undefined,
        isAuthorized: false,
        registrationDate: new Date().toISOString()
      }, true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Immersive Colorful Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-blue-500/10 animate-spin-slow opacity-50"></div>
      </div>

      <div className={`max-w-2xl w-full glass-effect p-12 md:p-16 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-white relative z-10 transition-all duration-700 ${!isLoginView ? 'scale-105' : ''} backdrop-blur-3xl`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-900 text-white rounded-[2rem] font-black text-3xl mb-6 shadow-2xl border-4 border-slate-800 transition-transform hover:scale-110">M</div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">
            {isLoginView ? 'Portal Access' : 'Create Account'}
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            {isLoginView ? 'Official MORAVIA Student Login' : 'Join our world-class educational hub'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLoginView && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Home Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="e.g. 123 Main St, City"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="e.g. Adebayo Tunde"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="tunde@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="+234..."
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Access Role</label>
            <div className="grid grid-cols-3 gap-3">
              {[UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest border-4 transition-all shadow-md ${
                    role === r ? 'bg-slate-900 border-amber-500 text-white scale-105' : 'bg-white border-slate-50 text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {!isLoginView && role === UserRole.STUDENT && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                  placeholder="12"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Academic Class</label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner appearance-none"
                  required
                >
                  <option value="">Choose Class</option>
                  <optgroup label="Primary">
                    {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'].map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Secondary">
                    {['JSS 1', 'JSS 2', 'JSS 3', 'SS 1', 'SS 2', 'SS 3'].map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none font-bold text-slate-900 shadow-inner"
                placeholder="Unique ID"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 ml-2">Secure Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-4 rounded-3xl border-none bg-slate-100/80 focus:ring-4 focus:ring-amber-500/20 outline-none pr-16 font-bold text-slate-900 shadow-inner"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-[48px] text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-black text-center bg-red-50 py-4 rounded-2xl border-2 border-red-100 animate-shake">{error}</p>}

          <button
            type="submit"
            className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-widest hover:bg-amber-600 shadow-2xl transition-all active:scale-[0.98] mt-6 flex items-center justify-center gap-3"
          >
            {isLoginView ? 'Unlock Portal' : 'Register Securely'}
            <span className="text-xl">→</span>
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 font-bold text-sm">
            {isLoginView ? "Need a student account?" : "Returning student?"} 
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="ml-2 text-amber-600 font-black hover:text-amber-700 focus:outline-none underline decoration-4 underline-offset-4"
            >
              {isLoginView ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center text-[8px] text-slate-300 font-black uppercase tracking-[0.5em]">
          &copy; {new Date().getFullYear()} MORAVIA online Education Infrastructure
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
