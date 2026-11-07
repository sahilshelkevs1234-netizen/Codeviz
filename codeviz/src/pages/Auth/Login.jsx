import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCode, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const err = await login(form);
    setBusy(false);
    if (err) setError(err); else navigate(location.state?.from || '/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shadow-lg">
              <FiCode className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black text-white">CodeViz</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Sign in to continue practising</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {error && <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={busy} className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-base mt-2 disabled:opacity-60">
              {busy ? 'Signing in...' : 'Sign In'} <FiArrowRight />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

