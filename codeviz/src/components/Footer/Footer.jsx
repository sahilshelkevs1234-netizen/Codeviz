import { Link } from 'react-router-dom';
import { FiCode } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                <FiCode className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">CodeViz</span>
            </div>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              Learn DSA, OOPs, SQL and more through interactive visualizations. Built for students, by developers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {['Problems', 'Visualizer', 'Dashboard', 'Leaderboard', 'About'].map(item => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="hover:text-accent transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              {[['DSA Problems', 'DSA'], ['OOPs Concepts', 'OOPs'], ['SQL Queries', 'SQL'], ['Languages', 'Language']].map(([item, cat]) => (
                <li key={item}>
                  <Link to={`/problems?category=${cat}`} className="hover:text-accent transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 CodeViz. All rights reserved.</p>
          <p>Built for students</p>
        </div>
      </div>
    </footer>
  );
}

