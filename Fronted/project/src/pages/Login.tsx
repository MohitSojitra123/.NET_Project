import { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, LogIn, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const demoCredentials = [
  { role: 'Admin', email: 'admin@spms.com', password: 'admin123' },
  { role: 'Faculty', email: 'priya.sharma@spms.com', password: 'faculty123' },
  { role: 'Student', email: 'rohan.mehta@spms.com', password: 'student123' },
];

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid email or password. Use demo credentials below.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2540] via-[#1a3a5c] to-[#0f2540] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-5 bg-blue-400"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              top: `${10 + i * 15}%`,
              left: `${-5 + i * 18}%`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 pt-8 pb-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SPMS</h1>
            <p className="text-blue-200 text-sm mt-1">Student Project Management System</p>
          </div>

          <div className="px-8 py-7">
            <h2 className="text-lg font-semibold text-gray-800 text-center">Login to Your Account</h2>
            <p className="text-sm text-gray-500 text-center mt-1 mb-6">Enter your credentials to continue</p>

            {error && (
              <div className="mb-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <Info size={16} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 pr-11 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={17} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Info size={14} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-700">Demo Login Credentials</span>
              </div>
              <div className="space-y-2">
                {demoCredentials.map(cred => (
                  <button
                    key={cred.role}
                    onClick={() => { setEmail(cred.email); setPassword(cred.password); }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-blue-100 border border-blue-100 transition-colors text-left group"
                  >
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      cred.role === 'Admin' ? 'bg-blue-600 text-white' :
                      cred.role === 'Faculty' ? 'bg-teal-600 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {cred.role}
                    </span>
                    <span className="text-xs text-gray-600 flex-1">{cred.email}</span>
                    <span className="text-xs text-gray-400">{cred.password}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
