import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiArrowRight, FiZap } from 'react-icons/fi';
import ArrayVisualizer from '../../components/Visualizer/ArrayVisualizer';
import { algorithmInfo } from '../../data/visualizations';

const algorithms = [
  { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting', difficulty: 'Easy', icon: '🫧', color: 'from-blue-500 to-blue-600', desc: 'Simple comparison-based sorting. Great for learning the basics.' },
  { id: 'merge-sort', name: 'Merge Sort', category: 'Sorting', difficulty: 'Medium', icon: '🔀', color: 'from-purple-500 to-purple-600', desc: 'Divide and conquer sorting. Efficient and stable.' },
  { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting', difficulty: 'Medium', icon: '⚡', color: 'from-amber-500 to-amber-600', desc: 'Pivot-based sorting. Fast in practice.', comingSoon: true },
  { id: 'binary-search', name: 'Binary Search', category: 'Searching', difficulty: 'Easy', icon: '🎯', color: 'from-green-500 to-green-600', desc: 'Efficient search on sorted arrays.', comingSoon: true },
  { id: 'bfs', name: 'Breadth First Search', category: 'Graphs', difficulty: 'Medium', icon: '🌊', color: 'from-cyan-500 to-cyan-600', desc: 'Level-by-level graph traversal.', comingSoon: true },
  { id: 'dfs', name: 'Depth First Search', category: 'Graphs', difficulty: 'Medium', icon: '🏔️', color: 'from-teal-500 to-teal-600', desc: 'Deep graph traversal using recursion.', comingSoon: true },
];

const difficultyColor = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };

export default function VisualizerPage() {
  const [activeAlgo, setActiveAlgo] = useState('bubble-sort');
  const info = algorithmInfo[activeAlgo];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium px-3 py-1.5 rounded-full mb-3">
          <FiZap className="text-xs" /> Algorithm Visualizer
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          See Algorithms in Action
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Step through sorting, searching, and graph algorithms one step at a time. 
          Control the speed, input your own data, and truly understand what's happening.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Algorithm Selector */}
        <aside className="xl:w-72 shrink-0">
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
              <FiPlay className="text-accent" /> Choose Algorithm
            </h3>
            <div className="space-y-2">
              {algorithms.map(algo => (
                <button
                  key={algo.id}
                  disabled={algo.comingSoon}
                  onClick={() => !algo.comingSoon && setActiveAlgo(algo.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                    activeAlgo === algo.id
                      ? 'border-accent bg-blue-50 dark:bg-navy-700'
                      : algo.comingSoon
                      ? 'border-gray-100 dark:border-navy-700 opacity-50 cursor-not-allowed'
                      : 'border-gray-100 dark:border-navy-700 hover:border-accent hover:bg-blue-50/50 dark:hover:bg-navy-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${activeAlgo === algo.id ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>
                          {algo.name}
                        </span>
                        {algo.comingSoon && (
                          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-navy-700 px-1.5 py-0.5 rounded">Soon</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{algo.category}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                          algo.difficulty === 'Easy' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
                        }`}>{algo.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Info */}
          {info && (
            <div className="card mt-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-3">Complexity</h3>
              <div className="space-y-2">
                {[
                  { label: 'Best Case', value: info.timeComplexity.best, color: 'text-green-500' },
                  { label: 'Average', value: info.timeComplexity.average, color: 'text-amber-500' },
                  { label: 'Worst Case', value: info.timeComplexity.worst, color: 'text-red-500' },
                  { label: 'Space', value: info.spaceComplexity, color: 'text-cyan' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className={`text-xs font-mono font-bold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Visualizer */}
        <div className="flex-1 min-w-0">
          <ArrayVisualizer algorithmType={activeAlgo} />

          {/* Related Problems */}
          <div className="card mt-4">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              🎯 Practice This Algorithm
            </h3>
            <div className="space-y-2">
              {[
                { id: 17, title: 'Bubble Sort', difficulty: 'Easy' },
                { id: 5, title: 'Maximum Subarray', difficulty: 'Medium' },
              ].map(p => (
                <Link
                  key={p.id}
                  to={`/problems/${p.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-navy-900 hover:bg-blue-50 dark:hover:bg-navy-700 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent transition-colors">{p.title}</span>
                  <div className="flex items-center gap-2">
                    <span className={difficultyColor[p.difficulty]}>{p.difficulty}</span>
                    <FiArrowRight className="text-gray-400 group-hover:text-accent transition-colors text-sm" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

