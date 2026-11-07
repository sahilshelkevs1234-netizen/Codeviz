import { FiAward } from 'react-icons/fi';
import { leaderboard } from '../../data/userData';

const medals = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm font-medium px-3 py-1.5 rounded-full mb-3">
          <FiAward className="text-xs" /> Global Rankings
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Leaderboard</h1>
        <p className="text-gray-500 dark:text-gray-400">See how you rank among all CodeViz learners</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 mb-10">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((user, podiumIdx) => {
          const rankOrder = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
          const heights = ['h-24', 'h-32', 'h-20'];
          const colors = ['bg-gray-200 dark:bg-navy-700', 'bg-accent', 'bg-amber-200 dark:bg-amber-900/50'];
          return (
            <div key={user.username} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {user.name[0]}
              </div>
              <div className="text-xl">{medals[rankOrder - 1]}</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{user.name.split(' ')[0]}</div>
              <div className="text-xs text-accent font-mono">{user.solved} solved</div>
              <div className={`${heights[podiumIdx]} w-20 ${colors[podiumIdx]} rounded-t-lg flex items-start justify-center pt-2`}>
                <span className="text-2xl font-black text-white/80">#{rankOrder}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Table */}
      <div className="card overflow-hidden p-0">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-6 py-3 bg-gray-50 dark:bg-navy-900 border-b border-gray-100 dark:border-navy-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Student</span>
          <span className="col-span-2 text-center">Solved</span>
          <span className="col-span-2 text-center hidden sm:block">Streak</span>
          <span className="col-span-2 text-right hidden md:block">XP</span>
          <span className="col-span-1 text-right">College</span>
        </div>

        {leaderboard.map((user) => (
          <div
            key={user.username}
            className={`grid grid-cols-12 gap-2 px-6 py-4 items-center border-b border-gray-50 dark:border-navy-700 last:border-0 transition-colors ${
              user.isCurrentUser
                ? 'bg-blue-50 dark:bg-accent/5 border-l-4 border-l-accent'
                : 'hover:bg-gray-50 dark:hover:bg-navy-800/50'
            }`}
          >
            {/* Rank */}
            <div className="col-span-1">
              {user.rank <= 3
                ? <span className="text-xl">{medals[user.rank - 1]}</span>
                : <span className={`font-bold text-sm ${user.isCurrentUser ? 'text-accent' : 'text-gray-500 dark:text-gray-400'}`}>#{user.rank}</span>
              }
            </div>

            {/* User */}
            <div className="col-span-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${user.isCurrentUser ? 'bg-accent' : 'bg-gray-400'} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {user.name[0]}
              </div>
              <div className="min-w-0">
                <div className={`font-semibold text-sm truncate ${user.isCurrentUser ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>
                  {user.name} {user.isCurrentUser && <span className="text-xs font-normal text-accent">(You)</span>}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">@{user.username}</div>
              </div>
            </div>

            {/* Solved */}
            <div className="col-span-2 text-center">
              <span className="font-bold text-gray-900 dark:text-white">{user.solved}</span>
            </div>

            {/* Streak */}
            <div className="col-span-2 text-center hidden sm:flex items-center justify-center gap-1">
              
              <span className="font-semibold text-amber-500 text-sm">{user.streak}</span>
            </div>

            {/* XP */}
            <div className="col-span-2 text-right hidden md:block">
              <span className="text-sm font-bold text-yellow-500">{user.xp.toLocaleString()}</span>
              <span className="text-xs text-gray-400"> XP</span>
            </div>

            {/* College */}
            <div className="col-span-1 text-right">
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block truncate" title={user.college}>{user.college.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Rankings update every 24 hours • Showing top 10 of 45,200 users
      </p>
    </div>
  );
}

