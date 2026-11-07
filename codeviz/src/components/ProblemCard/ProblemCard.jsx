import { Link } from 'react-router-dom';
import { FiCheckCircle, FiCircle, FiZap } from 'react-icons/fi';

const difficultyClass = {
  Easy: 'badge-easy',
  Medium: 'badge-medium',
  Hard: 'badge-hard',
};

export default function ProblemCard({ problem, index }) {
  return (
    <Link to={`/problems/${problem.id}`}>
      <div className="flex items-center gap-4 px-6 py-4 hover:bg-blue-50/50 dark:hover:bg-navy-800/50 border-b border-gray-100 dark:border-navy-700 transition-colors group cursor-pointer">
        {/* Index */}
        <span className="text-sm text-gray-400 w-8 shrink-0 text-center font-mono">{index + 1}</span>

        {/* Solved status */}
        <div className="shrink-0">
          {problem.solved
            ? <FiCheckCircle className="text-green-500 text-lg" />
            : <FiCircle className="text-gray-300 dark:text-gray-600 text-lg" />
          }
        </div>

        {/* Title + Tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors truncate">
              {problem.title}
            </span>
            {problem.hasVisualizer && (
              <span className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium px-2 py-0.5 rounded-full shrink-0">
                <FiZap className="text-xs" /> Visual
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {problem.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-navy-700 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Topic */}
        <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 w-32 shrink-0 truncate">{problem.topic}</span>

        {/* Acceptance */}
        <span className="hidden md:block text-xs text-gray-500 dark:text-gray-400 w-16 text-right shrink-0">{problem.acceptance}%</span>

        {/* Difficulty */}
        <span className={`${difficultyClass[problem.difficulty]} shrink-0`}>{problem.difficulty}</span>
      </div>
    </Link>
  );
}

