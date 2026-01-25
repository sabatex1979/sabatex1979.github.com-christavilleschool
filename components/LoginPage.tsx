
import React, { useState, useEffect } from 'react';
import { UserRole, User } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
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
      if (!username || !password || !fullName || !email || !phone) {
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
        age: age ? parseInt(age) : undefined,
        studentClass: studentClass || undefined,
        isAuthorized: true, // Auto-authorize upon registration
        registrationDate: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20 mt-12">
      <div className={`max-w-md w-full glass-effect p-8 rounded-3xl shadow-xl border transition-all duration-300 ${!isLoginView ? 'scale-105' : ''}`}>
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-2xl font-bold text-2xl mb-4 shadow-lg">C</div>
          <h2 className="text-2xl font-bold text-slate-900">{isLoginView ? 'Portal Login' : 'Student Registration'}</h2>
          <p className="text-sm text-slate-500">{isLoginView ? 'Access your Christaville account' : 'Join our official portal today'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Contact Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                    placeholder="+234..."
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">{isLoginView ? 'Login as' : 'Register as'}</label>
            <div className="grid grid-cols-3 gap-1">
              {[UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    role === r ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {!isLoginView && role === UserRole.STUDENT && (
            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  placeholder="e.g. 14"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Current Class</label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm bg-white"
                  required
                >
                  <option value="">Select Class</option>
                  <optgroup label="Nursery">
                    <option value="Nursery 1">Nursery 1</option>
                    <option value="Nursery 2">Nursery 2</option>
                  </optgroup>
                  <optgroup label="Primary">
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                  </optgroup>
                  <optgroup label="Secondary">
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="JSS 3">JSS 3</option>
                    <option value="SSS 1">SSS 1</option>
                    <option value="SSS 2">SSS 2</option>
                    <option value="SSS 3">SSS 3</option>
                  </optgroup>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
              placeholder="Pick a unique username"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:outline-none pr-12 text-sm"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[34px] text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg transition-all active:scale-[0.98] mt-2"
          >
            {isLoginView ? 'Login to Portal' : 'Register Now'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-600">
            {isLoginView ? "New to Christaville?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="ml-1 text-amber-600 font-bold hover:underline focus:outline-none"
            >
              {isLoginView ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          <p>Official Education Portal &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
