import { Link } from 'react-router-dom';
import { FiCode, FiPlay, FiBarChart2, FiCheckCircle } from 'react-icons/fi';
import { problems } from '../../data/problems';

const features = [
  { icon: FiCode, title: 'Practice problems', text: 'Problems across DSA, OOPs, SQL and programming languages, each with a full statement, examples, constraints and three progressive hints.' },
  { icon: FiPlay, title: 'Write and test code', text: 'A built-in editor runs your JavaScript against visible and hidden test cases directly in the browser, with clear pass/fail results.' },
  { icon: FiBarChart2, title: 'Visualise algorithms', text: 'Step through sorting algorithms and see exactly how each comparison and swap changes the array.' },
  { icon: FiCheckCircle, title: 'Track progress', text: 'Solved problems and your saved code are remembered on your device between visits.' },
];

export default function About() {
  const counts = ['DSA', 'OOPs', 'SQL', 'Language'].map((c) => [c === 'Language' ? 'Languages' : c, problems.filter((p) => p.category === c).length]);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">About CodeViz</h1>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
        CodeViz is a learning platform for computer science students. It combines problem practice with step-by-step algorithm
        visualisation, so you can understand why a solution works instead of only memorising it.
      </p>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What you can do here</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="card">
            <Icon className="text-accent text-xl mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">The problem set</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {counts.map(([name, n]) => (
          <div key={name} className="card text-center py-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{n}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{name}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How it works</h2>
      <div className="card text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 mb-10">
        <p>CodeViz is a front-end project: everything runs in your browser and your data stays on your device. Accounts, solved problems and saved code are stored locally, so clearing your browser data resets them.</p>
        <p>Because there is no server, automatic test running is available for JavaScript. SQL, Python and Java problems let you write and review your answer against sample output and the reference solution.</p>
      </div>

      <div className="flex gap-3">
        <Link to="/problems" className="btn-primary">Browse problems</Link>
        <Link to="/visualizer" className="btn-secondary">Open visualizer</Link>
      </div>
    </div>
  );
}
