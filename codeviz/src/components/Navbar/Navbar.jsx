import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiCode, FiMenu, FiX, FiSearch, FiMoon, FiSun } from 'react-icons/fi';

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Problems', path: '/problems' },
    { label: 'Visualizer', path: '/visualizer' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FiCode className="text-white text-xl" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">CodeViz</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname.startsWith(link.path)
                    ? 'bg-blue-50 dark:bg-navy-800 text-accent'
                    : 'text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-blue-50 dark:hover:bg-navy-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            >
              <FiSearch className="text-lg" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
            >
              {darkMode ? <FiSun className="text-lg text-amber-400" /> : <FiMoon className="text-lg" />}
            </button>

            {user ? (
              <>
                <Link to="/profile" title={user.name} className="flex items-center gap-2 ml-1 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">{user.name[0]?.toUpperCase()}</div>
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="hidden sm:block text-sm text-gray-600 dark:text-gray-300 hover:text-accent px-2">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent px-3 py-2">Log in</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4 hidden sm:block">Sign up</Link>
              </>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3 animate-fade-in">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search problems, topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                onKeyDown={e => {
                  if (e.key === 'Escape') setSearchOpen(false);
                  if (e.key === 'Enter') { navigate('/problems'); setSearchOpen(false); }
                }}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 bg-gray-100 dark:bg-navy-700 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 animate-fade-in border-t border-gray-100 dark:border-navy-800 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-all ${
                  location.pathname.startsWith(link.path)
                    ? 'bg-blue-50 dark:bg-navy-800 text-accent'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300">Log out</button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-sm font-medium text-accent">Log in / Sign up</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

