import { Link } from 'react-router-dom';
import { problems } from '../../data/problems';
import { FiArrowRight, FiCode, FiBarChart2, FiZap, FiUsers, FiCheckCircle, FiPlay } from 'react-icons/fi';

const cnt = (c) => problems.filter(p => p.category === c).length;
const stats = [
  { label: 'Practice Problems', value: String(problems.length), icon: FiCode },
  { label: 'Algorithm Visualizers', value: '2', icon: FiZap },
  { label: 'Categories', value: '4', icon: FiUsers },
  { label: 'Languages', value: '3', icon: FiCheckCircle },
];

const features = [
  {
    icon: FiCode,
    title: 'Curated Problems',
    desc: 'DSA, OOPs, SQL, and language-specific problems categorized by difficulty. From Easy to Hard — we have it all.',
    color: 'from-blue-500 to-blue-600',
    link: '/problems',
  },
  {
    icon: FiZap,
    title: 'Algorithm Visualizer',
    desc: 'Watch algorithms run step-by-step. See Bubble Sort, Merge Sort, Binary Search and more come to life visually.',
    color: 'from-purple-500 to-purple-600',
    link: '/visualizer',
  },
  {
    icon: FiBarChart2,
    title: 'Progress Tracking',
    desc: 'Track your daily activity, streak, problems solved by category, and see how you rank among peers.',
    color: 'from-cyan-500 to-cyan-600',
    link: '/dashboard',
  },
];

const topicCards = [
  { name: 'DSA', color: 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700', count: cnt('DSA'), desc: 'Arrays, Trees, Graphs, DP' },
  { name: 'OOPs', color: 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700', count: cnt('OOPs'), desc: 'Design and class modelling' },
  { name: 'SQL', color: 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700', count: cnt('SQL'), desc: 'Queries, Joins, Aggregations' },
  { name: 'Languages', color: 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700', count: cnt('Language'), desc: 'Python, JavaScript, Java' },
];

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-hero min-h-[88vh] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="hidden" />
        <div className="hidden" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-sm font-medium px-4 py-2 rounded-full mb-6">
            <FiZap className="text-xs" />
            Learn DSA visually — Not just theoretically
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Master Coding<br />
            <span className="text-gradient">Step by Step</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Solve DSA, OOPs, SQL problems and watch algorithms come to life through interactive
            visualizations. Built for students, loved by coders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/problems" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
              Start Solving <FiArrowRight />
            </Link>
            <Link to="/visualizer" className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
              <FiPlay /> Watch Visualizer
            </Link>
          </div>

          {/* Mini preview bars (decorative) */}
          <div className="mt-16 flex justify-center items-end gap-2 h-24 opacity-30">
            {[40, 70, 25, 90, 55, 80, 35, 65, 45, 85].map((h, i) => (
              <div
                key={i}
                className="w-6 rounded-t-sm bg-accent/80"
                style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-blue-50 dark:bg-navy-800 rounded-xl flex items-center justify-center">
                  <Icon className="text-accent text-lg" />
                </div>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-navy-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Everything you need to
              <span className="text-gradient"> level up</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              A complete platform for students to practice, visualize, and track their coding journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <Link key={f.title} to={f.link} className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                <div className={`w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <f.icon className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <FiArrowRight className="text-xs" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Cards */}
      <section className="py-20 px-4 bg-white dark:bg-navy-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
              Choose Your <span className="text-gradient">Topic</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Pick a domain and start your practice journey today</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topicCards.map(topic => (
              <Link
                key={topic.name}
                to={`/problems?category=${topic.name === 'Languages' ? 'Language' : topic.name}`}
                className={`${topic.color} border-2 rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-200 group`}
              >
                
                <div className="font-bold text-gray-900 dark:text-white text-lg mb-1">{topic.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{topic.desc}</div>
                <div className="text-xs font-semibold text-accent">{topic.count} problems</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to start your journey?</h2>
          <p className="text-blue-100 mb-8">Join 45,000+ students who are leveling up their coding skills every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/problems" className="bg-white text-accent font-bold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-colors">
              Start Practicing
            </Link>
            <Link to="/visualizer" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors">
              See Visualizer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

