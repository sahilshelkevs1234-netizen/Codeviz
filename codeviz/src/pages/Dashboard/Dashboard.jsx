import { Link } from 'react-router-dom';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart,
} from 'recharts';
import { FiAward, FiZap, FiTrendingUp, FiTarget, FiStar, FiCalendar } from 'react-icons/fi';
import { userProfile, weeklyProgress, monthlyActivity, recentActivity } from '../../data/userData';

const DIFF_COLORS = { Easy: '#15803D', Medium: '#B45309', Hard: '#B91C1C' };

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
        <Icon className="text-white text-xl" />
      </div>
      <div>
        <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function HeatmapCell({ count }) {
  const intensity = count === 0 ? 'bg-gray-100 dark:bg-navy-700' :
    count <= 2 ? 'bg-green-200 dark:bg-green-900' :
    count <= 4 ? 'bg-green-400' :
    count <= 6 ? 'bg-green-500' : 'bg-green-600';
  return (
    <div className={`w-3.5 h-3.5 rounded-sm ${intensity} cursor-pointer hover:ring-2 hover:ring-accent hover:ring-offset-1 transition-all`} title={`${count} solved`} />
  );
}

export default function Dashboard() {
  const { name, rank, totalUsers, currentStreak, maxStreak, totalSolved, totalProblems, xp, level, solvedByDifficulty, solvedByCategory } = userProfile;

  const rows = [];
  for (let week = 0; week < 5; week++) {
    rows.push(monthlyActivity.slice(week * 6, week * 6 + 6));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, <span className="font-semibold text-accent">{name}</span> 👋</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 rounded-xl px-4 py-3">
            <div className="text-lg font-black text-gray-900 dark:text-white">{currentStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
          </div>
          <div className="text-center bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 rounded-xl px-4 py-3">
            <div className="text-lg font-black text-accent">#{rank.toLocaleString()}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Global Rank</div>
          </div>
          <div className="text-center bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 rounded-xl px-4 py-3">
            <div className="text-lg font-black text-yellow-500">Lv.{level}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{xp.toLocaleString()} XP</div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Problems Solved" value={totalSolved} sub={`of ${totalProblems} total`} icon={FiTarget} color="bg-accent" />
        <StatCard label="Current Streak" value={`${currentStreak} days`} sub={`Best: ${maxStreak} days`} icon={FiZap} color="bg-amber-500" />
        <StatCard label="Global Rank" value={`#${rank.toLocaleString()}`} sub={`of ${totalUsers.toLocaleString()} users`} icon={FiTrendingUp} color="bg-emerald-500" />
        <StatCard label="XP Earned" value={xp.toLocaleString()} sub={`Level ${level} Coder`} icon={FiStar} color="bg-purple-500" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiTrendingUp className="text-accent" /> Weekly Progress
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">Daily target: 5 problems</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyProgress} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="solvedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
              <Area type="monotone" dataKey="target" stroke="#E5E7EB" strokeDasharray="4 4" fill="none" strokeWidth={1.5} name="Target" />
              <Area type="monotone" dataKey="solved" stroke="#0F766E" fill="url(#solvedGrad)" strokeWidth={2.5} dot={{ r: 4, fill: '#0F766E' }} name="Solved" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="card">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🥧 By Category
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={solvedByCategory} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {solvedByCategory.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1E293B', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {solvedByCategory.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.fill }}></div>
                  <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="card">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            🎯 By Difficulty
          </h2>
          {Object.entries(solvedByDifficulty).map(([diff, count]) => {
            const total = { Easy: 15, Medium: 10, Hard: 5 }[diff] || 10;
            const pct = Math.round((count / total) * 100);
            return (
              <div key={diff} className="mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className={`font-semibold ${diff === 'Easy' ? 'text-green-500' : diff === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>{diff}</span>
                  <span className="text-gray-600 dark:text-gray-400">{count} solved</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-2.5">
                  <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: DIFF_COLORS[diff] }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Activity Heatmap */}
        <div className="card lg:col-span-2">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiCalendar className="text-accent" /> Activity — Last 30 Days
          </h2>
          <div className="flex gap-1 flex-wrap">
            {monthlyActivity.map((day, i) => (
              <HeatmapCell key={i} count={day.count} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
            <span>Less</span>
            {['bg-gray-100 dark:bg-navy-700', 'bg-green-200', 'bg-green-400', 'bg-green-500', 'bg-green-600'].map((c, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Badges */}
        <div className="card">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FiAward className="text-accent" /> Badges
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {userProfile.badges.map(badge => (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  badge.earned
                    ? 'bg-blue-50 dark:bg-navy-700 border border-blue-200 dark:border-navy-600'
                    : 'bg-gray-50 dark:bg-navy-900 opacity-40 border border-gray-100 dark:border-navy-800'
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-xs text-center text-gray-600 dark:text-gray-400 font-medium leading-tight">{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card lg:col-span-3">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
            <span>⏱️ Recent Activity</span>
            <Link to="/problems" className="text-sm text-accent hover:underline">View all →</Link>
          </h2>
          <div className="space-y-2">
            {recentActivity.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-navy-900 border border-gray-100 dark:border-navy-700">
                <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'Solved' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <span className="font-medium text-gray-900 dark:text-white text-sm flex-1">{item.problem}</span>
                <span className={`text-xs font-semibold ${item.difficulty === 'Easy' ? 'text-green-500' : item.difficulty === 'Medium' ? 'text-amber-500' : 'text-red-500'}`}>{item.difficulty}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.status === 'Solved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>{item.status}</span>
                <span className="text-xs text-gray-400 hidden sm:block font-mono bg-gray-100 dark:bg-navy-700 px-2 py-0.5 rounded">{item.language}</span>
                <span className="text-xs text-gray-400 hidden md:block">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

