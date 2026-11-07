import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiZap, FiClock, FiAward, FiPlay, FiCheck, FiX } from 'react-icons/fi';
import { problems } from '../../data/problems';
import { getProblemSpec, LANG_LABEL, LANG_EXT } from '../../data/problemSpec';
import { runTests } from '../../utils/runner';
import { getSolved, markSolved, loadCode, saveCode, clearCode } from '../../utils/progress';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import ArrayVisualizer from '../../components/Visualizer/ArrayVisualizer';

const diffBadge = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };
const chip = 'text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-navy-700 px-2 py-0.5 rounded';

export default function ProblemDetail() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === parseInt(id));
  const spec = useMemo(() => (problem ? getProblemSpec(problem) : null), [problem]);

  const [activeTab, setActiveTab] = useState('description');
  const [lang, setLang] = useState('javascript');
  const [code, setCode] = useState('');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [openHints, setOpenHints] = useState(0);
  const [output, setOutput] = useState(null); // { mode, data } | { running }
  const [solved, setSolved] = useState(false);
  const runId = useRef(0);

  // reset per-problem state
  useEffect(() => {
    if (!spec) return;
    setLang(spec.langs[0]);
    setActiveTab('description'); setShowSolution(false); setOpenHints(0);
    setOutput(null); setShowVisualizer(false);
    setSolved(getSolved().has(problem.id));
  }, [problem?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // load saved code (or starter) whenever the language / problem changes
  useEffect(() => {
    if (!spec) return;
    setCode(loadCode(problem.id, lang) ?? spec.starters[lang] ?? '');
    setOutput(null);
  }, [problem?.id, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCode = (v) => { setCode(v); saveCode(problem.id, lang, v); };
  const reset = () => { clearCode(problem.id, lang); setCode(spec.starters[lang]); setOutput(null); };

  const canExecute = spec?.runnable && lang === 'javascript';

  const execute = async (mode) => {
    if (!canExecute) return;
    const myRun = ++runId.current;
    setOutput({ running: true });
    const data = await runTests(code, spec, mode === 'run', 3000);
    if (myRun !== runId.current) return;
    setOutput({ mode, data });
    if (mode === 'submit' && data.results && data.results.every((r) => r.pass)) {
      markSolved(problem.id); setSolved(true);
    }
  };

  if (!problem || !spec) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Problem not found</h2>
        <Link to="/problems" className="text-accent hover:underline">Back to Problems</Link>
      </div>
    );
  }

  const visible = (spec.tests || []).filter((t) => !t.hidden);
  const showCase = (t) => (spec.kind === 'class'
    ? `${spec.fn}(${JSON.stringify(t.init).slice(1, -1)}) then ${t.ops.map((o) => `${o[0]}(${o.slice(1).map((a) => JSON.stringify(a)).join(', ')})`).join(', ')}`
    : t.args.map((a) => JSON.stringify(a)).join(', '));
  const res = output?.data;
  const passed = res?.results?.filter((r) => r.pass).length ?? 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
        <Link to="/problems" className="hover:text-accent flex items-center gap-1"><FiArrowLeft className="text-xs" /> Problems</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium truncate">{problem.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ───────── Left: problem ───────── */}
        <div className="lg:w-1/2 xl:w-5/12 shrink-0">
          <div className="card">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {problem.id}. {problem.title} {solved && <span className="text-xs font-semibold text-green-600 ml-1">Solved</span>}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={diffBadge[problem.difficulty]}>{problem.difficulty}</span>
                  <span className={chip}>{problem.category}</span>
                  <span className={chip}>{problem.topic}</span>
                </div>
              </div>
              {spec.visualizerType && (
                <button onClick={() => setShowVisualizer((v) => !v)} className="flex items-center gap-1.5 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-200 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors shrink-0">
                  <FiZap className="text-sm" /> Visualize
                </button>
              )}
            </div>

            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-navy-700">
              <span className="flex items-center gap-1"><FiClock /> {problem.acceptance}% acceptance</span>
              <span className="flex items-center gap-1"><FiAward /> {problem.submissions.toLocaleString()} submissions</span>
            </div>

            <div className="flex border-b border-gray-100 dark:border-navy-700 mb-4">
              {['description', 'hints', 'solution'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-accent text-accent' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
              {activeTab === 'description' && (
                <>
                  <p>{spec.desc}</p>
                  {spec.schema && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Table schema</h3>
                      <pre className="bg-gray-50 dark:bg-navy-900 rounded-lg p-3 text-xs font-mono overflow-x-auto">{spec.schema}</pre>
                    </div>
                  )}
                  {spec.sample && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Expected output (sample)</h3>
                      <pre className="bg-gray-50 dark:bg-navy-900 rounded-lg p-3 text-xs font-mono overflow-x-auto">{spec.sample}</pre>
                    </div>
                  )}
                  {spec.ex.map((e, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Example {i + 1}</h3>
                      <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-3 text-xs font-mono space-y-1 overflow-x-auto">
                        <div><span className="text-gray-500">Input:</span> {e[0]}</div>
                        <div><span className="text-gray-500">Output:</span> {e[1]}</div>
                        {e[2] && <div><span className="text-gray-500">Note:</span> {e[2]}</div>}
                      </div>
                    </div>
                  ))}
                  {spec.cons.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Constraints</h3>
                      <ul className="list-disc pl-5 space-y-0.5 font-mono text-xs">{spec.cons.map((c) => <li key={c}>{c}</li>)}</ul>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'hints' && (
                <div className="space-y-3">
                  {spec.hints.slice(0, openHints).map((h, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-navy-900 rounded-lg px-4 py-3"><span className="font-semibold text-gray-900 dark:text-white">Hint {i + 1}. </span>{h}</div>
                  ))}
                  {openHints < spec.hints.length
                    ? <button onClick={() => setOpenHints((n) => n + 1)} className="btn-secondary text-sm py-1.5">Show hint {openHints + 1} of {spec.hints.length}</button>
                    : <p className="text-xs text-gray-500">All hints shown.</p>}
                </div>
              )}

              {activeTab === 'solution' && (
                !showSolution ? (
                  <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-4">
                    <p className="mb-3">Try the problem and the hints first. You learn more when you struggle a little.</p>
                    <button onClick={() => setShowSolution(true)} className="btn-secondary text-sm py-1.5">Reveal solution</button>
                  </div>
                ) : (
                  <>
                    <div><h3 className="font-semibold text-gray-900 dark:text-white mb-1">Approach</h3><p>{spec.how}</p></div>
                    {spec.cx && <p className="font-mono text-xs">{spec.cx}</p>}
                    <pre className="bg-navy-900 text-gray-100 rounded-lg p-4 text-xs font-mono overflow-x-auto">{spec.sol}</pre>
                  </>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-gray-100 dark:border-navy-700">
              {problem.tags.map((tag) => <span key={tag} className="text-xs bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">{tag}</span>)}
            </div>
          </div>
        </div>

        {/* ───────── Right: editor + tests ───────── */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-navy-600">
                {spec.langs.map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className={`px-4 py-2 text-xs font-semibold transition-colors ${lang === l ? 'bg-accent text-white' : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'}`}>
                    {LANG_LABEL[l]}
                  </button>
                ))}
              </div>
              <button onClick={reset} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors">Reset code</button>
            </div>

            <CodeEditor value={code} onChange={updateCode} onRun={() => execute('run')}
              fileName={`${spec.kind === 'class' ? spec.cls : spec.fn}.${LANG_EXT[lang]}`} />

            {!canExecute && (
              <p className="mt-3 text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-900 rounded-lg px-3 py-2">
                {spec.runnable
                  ? `Automatic running is available for JavaScript only (this app runs fully in your browser, with no server). You can still write your ${LANG_LABEL[lang]} solution here and compare it with the examples and the reference solution.`
                  : `${LANG_LABEL[lang]} code cannot be executed in this browser-only version. Write your answer, compare it with the sample output, then check the solution tab.`}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              {canExecute ? (
                <>
                  <button onClick={() => execute('run')} disabled={output?.running} className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2 disabled:opacity-50"><FiPlay /> Run Tests</button>
                  <button onClick={() => execute('submit')} disabled={output?.running} className="flex-1 btn-primary text-sm disabled:opacity-50">Submit</button>
                </>
              ) : (
                <button onClick={() => { markSolved(problem.id); setSolved(true); }} className="flex-1 btn-primary text-sm">{solved ? 'Marked as solved' : 'Mark as solved'}</button>
              )}
            </div>
          </div>

          {/* Test cases / results */}
          {spec.runnable && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{res?.results ? (output.mode === 'submit' ? 'Submission result' : 'Test results') : 'Test cases'}</h4>
                {res?.results && (
                  <span className={`text-xs font-semibold ${passed === res.results.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passed === res.results.length && output.mode === 'submit' ? 'Accepted: ' : ''}{passed}/{res.results.length} passed
                  </span>
                )}
              </div>

              {output?.running && <p className="text-sm text-gray-500">Running...</p>}
              {res?.error && <pre className="text-xs font-mono bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg p-3 whitespace-pre-wrap">{res.error}</pre>}

              {!res?.results && !output?.running && !res?.error && (
                <div className="space-y-2">
                  {visible.map((t, i) => (
                    <div key={i} className="text-xs font-mono p-2.5 rounded-lg bg-gray-50 dark:bg-navy-900 border border-gray-100 dark:border-navy-700 overflow-x-auto">
                      <div className="text-gray-500 mb-1">Case {i + 1}</div>
                      <div>Input: {showCase(t)}</div>
                      <div>Expected: {JSON.stringify(t.expected)}</div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">{(spec.tests.length - visible.length)} more hidden case(s) run when you press Submit.</p>
                </div>
              )}

              {res?.results && (
                <div className="space-y-2">
                  {res.results.map((r, i) => {
                    const hidden = res.tests[i].hidden;
                    const t = spec.tests.filter((x) => (output.mode === 'run' ? !x.hidden : true))[i];
                    return (
                      <div key={i} className={`text-xs font-mono p-2.5 rounded-lg border overflow-x-auto ${r.pass ? 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-900/10' : 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/10'}`}>
                        <div className="flex items-center gap-2 mb-1 font-sans font-semibold">
                          {r.pass ? <FiCheck className="text-green-600" /> : <FiX className="text-red-600" />}
                          <span className="text-gray-800 dark:text-gray-200">{hidden ? `Hidden case ${i + 1}` : `Case ${i + 1}`}</span>
                          <span className="text-gray-400 font-normal ml-auto">{r.ms} ms</span>
                        </div>
                        {!hidden && <div>Input: {showCase(t)}</div>}
                        {!hidden && <div>Expected: {JSON.stringify(t.expected)}</div>}
                        {!hidden && !r.error && <div>Output: {r.actual}</div>}
                        {r.error && <div className="text-red-600 dark:text-red-400">{r.error}</div>}
                        {hidden && !r.pass && !r.error && <div className="text-gray-500">Your output did not match the expected output.</div>}
                      </div>
                    );
                  })}
                </div>
              )}

              {res?.logs?.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">console.log output</div>
                  <pre className="text-xs font-mono bg-gray-50 dark:bg-navy-900 rounded-lg p-3 overflow-x-auto">{res.logs.join('\n')}</pre>
                </div>
              )}
            </div>
          )}

          {showVisualizer && spec.visualizerType && (
            <div className="animate-slide-up"><ArrayVisualizer algorithmType={spec.visualizerType} /></div>
          )}
        </div>
      </div>
    </div>
  );
}
