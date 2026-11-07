// ─── User/Dashboard mock data ────────────────────────────────────────────────

export const userProfile = {
  name: 'Arjun Sharma',
  username: 'arjun_codes',
  avatar: null,
  rank: 1247,
  totalUsers: 45200,
  joinedDate: '2026-03-15',
  college: 'IIT Delhi',
  currentStreak: 14,
  maxStreak: 28,
  totalSolved: 87,
  totalProblems: 300,
  xp: 4320,
  level: 12,
  badges: [
    { id: 1, name: '7-Day Streak', icon: '🔥', earned: true },
    { id: 2, name: 'Array Master', icon: '📊', earned: true },
    { id: 3, name: 'SQL Wizard', icon: '🗄️', earned: true },
    { id: 4, name: 'Speed Demon', icon: '⚡', earned: false },
    { id: 5, name: 'Consistent', icon: '📅', earned: true },
    { id: 6, name: 'Hard Hitter', icon: '💪', earned: false },
  ],
  solvedByDifficulty: { Easy: 45, Medium: 32, Hard: 10 },
  solvedByCategory: [
    { name: 'DSA', value: 52, fill: '#0F766E' },
    { name: 'SQL', value: 18, fill: '#475569' },
    { name: 'OOPs', value: 10, fill: '#94A3B8' },
    { name: 'Language', value: 7, fill: '#14B8A6' },
  ],
};

export const activityData = [
  { date: '2026-10-27', count: 3 },
  { date: '2026-10-28', count: 5 },
  { date: '2026-10-29', count: 0 },
  { date: '2026-10-30', count: 2 },
  { date: '2026-10-31', count: 4 },
  { date: '2026-11-01', count: 6 },
  { date: '2026-11-02', count: 3 },
];

export const weeklyProgress = [
  { day: 'Mon', solved: 4, target: 5 },
  { day: 'Tue', solved: 6, target: 5 },
  { day: 'Wed', solved: 2, target: 5 },
  { day: 'Thu', solved: 7, target: 5 },
  { day: 'Fri', solved: 5, target: 5 },
  { day: 'Sat', solved: 8, target: 5 },
  { day: 'Sun', solved: 3, target: 5 },
];

export const monthlyActivity = Array.from({ length: 30 }, (_, i) => ({
  date: `2026-10-${String(i + 1).padStart(2, '0')}`,
  count: Math.floor(Math.random() * 8),
}));

export const recentActivity = [
  { id: 1, problem: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2 hours ago', language: 'JavaScript' },
  { id: 2, problem: 'Climbing Stairs', difficulty: 'Easy', status: 'Solved', time: '5 hours ago', language: 'Python' },
  { id: 3, problem: 'Maximum Subarray', difficulty: 'Medium', status: 'Solved', time: '1 day ago', language: 'Java' },
  { id: 4, problem: 'Trapping Rain Water', difficulty: 'Hard', status: 'Attempted', time: '2 days ago', language: 'C++' },
  { id: 5, problem: 'Bubble Sort', difficulty: 'Easy', status: 'Solved', time: '3 days ago', language: 'Python' },
];

export const leaderboard = [
  { rank: 1, name: 'Priya Patel', username: 'priya_dev', solved: 245, streak: 67, xp: 12450, college: 'BITS Pilani' },
  { rank: 2, name: 'Rahul Verma', username: 'rahul_codes', solved: 231, streak: 45, xp: 11200, college: 'NIT Trichy' },
  { rank: 3, name: 'Sneha Kumar', username: 'sneha_algo', solved: 218, streak: 52, xp: 10800, college: 'VIT Vellore' },
  { rank: 4, name: 'Vikram Singh', username: 'vikram_dsa', solved: 205, streak: 38, xp: 9900, college: 'DTU Delhi' },
  { rank: 5, name: 'Anjali Gupta', username: 'anjali_sql', solved: 198, streak: 31, xp: 9200, college: 'IIT Bombay' },
  { rank: 6, name: 'Rohan Shah', username: 'rohan_cp', solved: 187, streak: 29, xp: 8700, college: 'IIIT Hyderabad' },
  { rank: 7, name: 'Meera Nair', username: 'meera_java', solved: 174, streak: 24, xp: 7900, college: 'SRM Chennai' },
  { rank: 8, name: 'Karthik Raj', username: 'karthik_ml', solved: 162, streak: 19, xp: 7200, college: 'Manipal Udupi' },
  { rank: 9, name: 'Divya Menon', username: 'divya_ds', solved: 150, streak: 17, xp: 6600, college: 'CET Thiruvananthapuram' },
  { rank: 10, name: 'Arjun Sharma', username: 'arjun_codes', solved: 87, streak: 14, xp: 4320, college: 'IIT Delhi', isCurrentUser: true },
];

