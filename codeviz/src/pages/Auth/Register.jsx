import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCode, FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowRight } from 'react-icons/fi';

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setBusy(true); setError('');
    const err = await register(form);
    setBusy(false);
    if (err) setError(err); else navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shadow-lg">
              <FiCode className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-black text-white">CodeViz</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Create your account</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Create a free account to save your progress</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  required
                  placeholder="Arjun Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">College / Institute</label>
              <input
                type="text"
                placeholder="IIT Delhi, VIT, etc."
                value={form.college}
                onChange={e => setForm({ ...form, college: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
              />
            </div>

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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
                <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
              <input type="checkbox" required className="mt-0.5 accent-accent" />
              <span>I understand my account and progress are stored on this device only</span>
            </div>

            {error && <p role="alert" className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={busy} className="w-full btn-primary py-3 flex items-center justify-center gap-2 text-base disabled:opacity-60">
              {busy ? 'Creating account...' : 'Create Account'} <FiArrowRight />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

