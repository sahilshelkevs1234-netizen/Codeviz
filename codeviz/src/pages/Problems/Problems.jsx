import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { problems as baseProblems, categories, difficulties, topics } from '../../data/problems';
import { getSolved } from '../../utils/progress';
import ProblemCard from '../../components/ProblemCard/ProblemCard';

export default function Problems() {
  const problems = useMemo(() => { const done = getSolved(); return baseProblems.map(p => ({ ...p, solved: done.has(p.id) })); }, []);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [showSolvedOnly, setShowSolvedOnly] = useState(false);

  const availableTopics = useMemo(() => {
    if (selectedCategory === 'All') return ['All Topics'];
    return topics[selectedCategory] || ['All Topics'];
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch = search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopic === 'All Topics' || p.topic === selectedTopic;
      const matchesSolved = !showSolvedOnly || p.solved;
      return matchesSearch && matchesCategory && matchesDifficulty && matchesTopic && matchesSolved;
    });
  }, [problems, search, selectedCategory, selectedDifficulty, selectedTopic, showSolvedOnly]);

  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: problems.filter(p => p.difficulty === 'Easy' && p.solved).length + '/' + problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium' && p.solved).length + '/' + problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard' && p.solved).length + '/' + problems.filter(p => p.difficulty === 'Hard').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Problems</h1>
        <p className="text-gray-500 dark:text-gray-400">Practice DSA, OOPs, SQL and more. Track your progress.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="card text-center py-4">
          <div className="text-2xl font-black text-gray-900 dark:text-white">{stats.solved}/{stats.total}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Solved</div>
          <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-1.5 mt-2">
            <div className="bg-accent h-1.5 rounded-full" style={{ width: `${(stats.solved / stats.total) * 100}%` }} />
          </div>
        </div>
        {[
          { label: 'Easy', value: stats.easy, color: 'text-green-500', bg: 'bg-green-500' },
          { label: 'Medium', value: stats.medium, color: 'text-amber-500', bg: 'bg-amber-500' },
          { label: 'Hard', value: stats.hard, color: 'text-red-500', bg: 'bg-red-500' },
        ].map(s => (
          <div key={s.label} className="card text-center py-4">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-56 shrink-0">
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="text-accent" />
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">Filters</h3>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">Category</label>
              <div className="space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setSelectedTopic('All Topics'); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-accent text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">Difficulty</label>
              <div className="space-y-1">
                {difficulties.map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedDifficulty === d
                        ? 'bg-accent text-white font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            {selectedCategory !== 'All' && (
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block mb-2">Topic</label>
                <div className="space-y-1">
                  {availableTopics.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTopic(t)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedTopic === t
                          ? 'bg-blue-50 dark:bg-navy-700 text-accent font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Solved toggle */}
            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <div
                onClick={() => setShowSolvedOnly(s => !s)}
                className={`w-10 h-5 rounded-full transition-colors ${showSolvedOnly ? 'bg-accent' : 'bg-gray-300 dark:bg-navy-600'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${showSolvedOnly ? 'translate-x-5' : ''}`} />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Solved only</span>
            </label>
          </div>
        </aside>

        {/* Problem List */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 dark:bg-navy-900 border-b border-gray-100 dark:border-navy-700 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              <span className="w-8">#</span>
              <span className="w-5"></span>
              <span className="flex-1">Title</span>
              <span className="hidden sm:block w-32">Topic</span>
              <span className="hidden md:block w-16 text-right">Accept%</span>
              <span className="w-16 text-right">Level</span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No problems match your filters</p>
                <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedDifficulty('All'); setSelectedTopic('All Topics'); setShowSolvedOnly(false); }} className="text-accent text-sm mt-2 hover:underline">Clear filters</button>
              </div>
            ) : (
              filtered.map((problem, i) => (
                <ProblemCard key={problem.id} problem={problem} index={i} />
              ))
            )}
          </div>

          <div className="text-xs text-gray-400 mt-3 text-right">
            Showing {filtered.length} of {problems.length} problems
          </div>
        </div>
      </div>
    </div>
  );
}

