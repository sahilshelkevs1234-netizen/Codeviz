import { useState, useEffect, useRef, useMemo } from 'react';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { generateBubbleSortSteps, generateMergeSortSteps, algorithmInfo } from '../../data/visualizations';

const DEFAULT_ARRAY = [64, 34, 25, 12, 22, 11, 90];
const SPEEDS = { Slow: 1200, Medium: 600, Fast: 200 };

function ArrayBar({ value, maxValue, state, index }) {
  const heightPct = Math.max(8, (value / maxValue) * 100);

  const barColors = {
    comparing: 'bg-amber-400 shadow-amber-200',
    swapped:   'bg-red-400 shadow-red-200',
    sorted:    'bg-green-400 shadow-green-200',
    default:   'bg-accent shadow-blue-200',
  };

  const color = barColors[state] || barColors.default;

  return (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 hidden sm:block">{value}</span>
      <div
        className={`w-full rounded-t-md transition-all duration-300 shadow-md ${color}`}
        style={{ height: `${heightPct}%` }}
      />
      <span className="text-xs text-gray-400 font-mono hidden md:block">{index}</span>
    </div>
  );
}

export default function ArrayVisualizer({ algorithmType = 'bubble-sort', initialArray = DEFAULT_ARRAY }) {
  const [customInput, setCustomInput] = useState(initialArray.join(', '));
  const [arr, setArr] = useState(initialArray);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('Medium');
  const intervalRef = useRef(null);

  const info = algorithmInfo[algorithmType];

  const steps = useMemo(() => {
    if (algorithmType === 'bubble-sort') return generateBubbleSortSteps(arr);
    if (algorithmType === 'merge-sort') return generateMergeSortSteps(arr);
    return generateBubbleSortSteps(arr);
  }, [algorithmType, arr]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, SPEEDS[speed]);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  const step = steps[currentStep] || steps[0];
  const maxValue = Math.max(...(step?.array || arr));

  const getBarState = (index) => {
    if (!step) return 'default';
    if (step.sorted?.includes(index)) return 'sorted';
    if (step.swapped?.includes(index)) return 'swapped';
    if (step.comparing?.includes(index)) return 'comparing';
    if (step.merging?.includes(index)) return 'sorted';
    if (step.left?.includes(index)) return 'comparing';
    if (step.right?.includes(index)) return 'swapped';
    return 'default';
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleApplyInput = () => {
    const parsed = customInput
      .split(/[\s,]+/)
      .map(Number)
      .filter(n => !isNaN(n) && n > 0)
      .slice(0, 12);
    if (parsed.length >= 2) {
      setArr(parsed);
      setCurrentStep(0);
      setIsPlaying(false);
    }
  };

  const handleRandomize = () => {
    const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    setCustomInput(rand.join(', '));
    setArr(rand);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-navy-700 overflow-hidden">
      {/* Header */}
      <div className="bg-accent px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-white font-bold text-lg">{info?.name} Visualizer</h2>
            <p className="text-gray-400 text-sm">{info?.description}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-400 text-xs">Time</div>
              <div className="text-cyan font-mono font-semibold">{info?.timeComplexity.average}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs">Space</div>
              <div className="text-cyan font-mono font-semibold">{info?.spaceComplexity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="p-6">
        {/* Array Bars */}
        <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 mb-4" style={{ height: '200px' }}>
          <div className="flex items-end gap-1.5 h-full">
            {(step?.array || arr).map((value, index) => (
              <ArrayBar
                key={index}
                value={value}
                maxValue={maxValue}
                state={getBarState(index)}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-xs">
          {[
            { color: 'bg-accent', label: 'Unsorted' },
            { color: 'bg-amber-400', label: 'Comparing' },
            { color: 'bg-red-400', label: 'Swapping' },
            { color: 'bg-green-400', label: 'Sorted' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <div className={`w-3 h-3 rounded ${item.color}`}></div>
              {item.label}
            </div>
          ))}
        </div>

        {/* Step Description */}
        <div className="bg-blue-50 dark:bg-navy-900 border-l-4 border-accent rounded-r-lg px-4 py-3 mb-4 min-h-[56px] flex items-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {step?.description || 'Press Play to start visualization'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>Pass {step?.pass ?? '—'}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="p-2.5 rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-600 dark:text-gray-300 transition-colors" title="Reset">
              <FiSkipBack />
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-40"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => setIsPlaying(p => !p)}
              className="px-6 py-2.5 rounded-lg bg-accent hover:bg-blue-600 text-white font-semibold flex items-center gap-2 transition-colors shadow-md"
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button
              onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={currentStep >= steps.length - 1}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-40"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => setCurrentStep(steps.length - 1)}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-gray-600 dark:text-gray-300 transition-colors"
              title="Skip to end"
            >
              <FiSkipForward />
            </button>
          </div>

          {/* Speed */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Speed:</span>
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-navy-600">
              {Object.keys(SPEEDS).map(s => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    speed === s
                      ? 'bg-accent text-white'
                      : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Input */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-navy-700">
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-48">
              <input
                type="text"
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="e.g. 64, 34, 25, 12, 22"
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-navy-600 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent font-mono"
              />
            </div>
            <button onClick={handleApplyInput} className="btn-primary text-sm py-2">Apply</button>
            <button onClick={handleRandomize} className="btn-secondary text-sm py-2 flex items-center gap-1.5">
              <FiRefreshCw className="text-sm" /> Random
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Enter up to 12 numbers separated by commas</p>
        </div>
      </div>

      {/* Pseudocode Panel */}
      <div className="border-t border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-900 px-6 py-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pseudocode</h3>
        <div className="font-mono text-xs space-y-1">
          {info?.pseudocode.map((line, i) => (
            <div
              key={i}
              className="px-3 py-1 rounded text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-navy-800 transition-colors"
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

