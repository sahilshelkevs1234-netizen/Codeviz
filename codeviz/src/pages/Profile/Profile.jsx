import { Link } from 'react-router-dom';
import { FiEdit3, FiGithub, FiLinkedin, FiAward, FiTarget } from 'react-icons/fi';
import { userProfile, recentActivity } from '../../data/userData';
import { useAuth } from '../../context/AuthContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const { user } = useAuth();
  const { name: _n, username: _u, college: _c, rank, currentStreak, maxStreak, totalSolved, totalProblems, xp, level, badges, solvedByCategory, solvedByDifficulty } = userProfile;
  const name = user?.name || _n;
  const username = (user?.email || _u).split('@')[0];
  const college = user?.college || _c;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Profile Header */}
      <div className="card mb-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-navy-800 rounded-t-xl" />

        <div className="relative pt-12 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center text-white text-3xl font-black shadow-lg border-4 border-white dark:border-navy-800 shrink-0">
            {name[0]}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">{name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>@{username}</span>
              <span>•</span>
              <span>🏛️ {college}</span>
              <span>•</span>
              <span>🏆 Rank #{rank.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
              <FiEdit3 className="text-sm" /> Edit Profile
            </button>
            <button className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
              <FiGithub />
            </button>
            <button className="p-2 rounded-lg border border-gray-200 dark:border-navy-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors">
              <FiLinkedin />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTarget className="text-accent" /> Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Problems Solved', value: `${totalSolved} / ${totalProblems}` },
                { label: 'Current Streak', value: `${currentStreak} days` },
                { label: 'Best Streak', value: `⚡ ${maxStreak} days` },
                { label: 'XP Earned', value: `⭐ ${xp.toLocaleString()} XP` },
                { label: 'Level', value: `🎮 Level ${level}` },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-navy-700 last:border-0">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{s.label}</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiAward className="text-accent" /> Badges ({badges.filter(b => b.earned).length}/{badges.length})
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                    badge.earned
                      ? 'bg-blue-50 dark:bg-navy-700'
                      : 'bg-gray-50 dark:bg-navy-900 opacity-40'
                  }`}
                  title={badge.name}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-xs text-center text-gray-600 dark:text-gray-400 leading-tight font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Breakdown */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Problems by Category</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={solvedByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {solvedByCategory.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {solvedByCategory.map(cat => (
                  <div key={cat.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                        <div className="w-3 h-3 rounded-full" style={{ background: cat.fill }}></div>
                        {cat.name}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">{cat.value}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${(cat.value / totalSolved) * 100}%`, background: cat.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Difficulty */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Difficulty Breakdown</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Easy', value: solvedByDifficulty.Easy, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' },
                { label: 'Medium', value: solvedByDifficulty.Medium, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
                { label: 'Hard', value: solvedByDifficulty.Hard, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' },
              ].map(d => (
                <div key={d.label} className={`${d.bg} border ${d.border} rounded-xl p-4`}>
                  <div className={`text-3xl font-black ${d.color}`}>{d.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{d.label} solved</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Recent Submissions</h3>
              <Link to="/problems" className="text-sm text-accent hover:underline">All problems →</Link>
            </div>
            <div className="space-y-2">
              {recentActivity.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-navy-900 text-sm">
                  <span className={`text-base ${item.status === 'Solved' ? '✅' : '🕐'}`}>
                    {item.status === 'Solved' ? '✅' : '🕐'}
                  </span>
                  <span className="flex-1 font-medium text-gray-900 dark:text-white">{item.problem}</span>
                  <span className={`text-xs font-semibold ${item.difficulty === 'Easy' ? 'text-green-500' : item.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>{item.difficulty}</span>
                  <span className="text-xs font-mono bg-gray-200 dark:bg-navy-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded hidden sm:block">{item.language}</span>
                  <span className="text-xs text-gray-400 hidden md:block">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

