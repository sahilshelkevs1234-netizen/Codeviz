import { useRef } from 'react';

// Simple, dependency-free code editor: line numbers, Tab indentation, Ctrl/Cmd+Enter to run.
export default function CodeEditor({ value, onChange, onRun, fileName }) {
  const taRef = useRef(null);
  const gutterRef = useRef(null);
  const lines = value.split('\n').length;

  const syncScroll = () => {
    if (gutterRef.current && taRef.current) gutterRef.current.scrollTop = taRef.current.scrollTop;
  };

  const onKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); onRun?.(); return; }
    const ta = e.target;
    const { selectionStart: s, selectionEnd: en } = ta;
    if (e.key === 'Tab') {
      e.preventDefault();
      onChange(value.slice(0, s) + '  ' + value.slice(en));
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 2; });
    } else if (e.key === 'Enter') {
      // keep the indentation of the current line
      e.preventDefault();
      const lineStart = value.lastIndexOf('\n', s - 1) + 1;
      const indent = (value.slice(lineStart, s).match(/^\s*/) || [''])[0];
      const extra = /[{([]\s*$/.test(value.slice(lineStart, s)) ? '  ' : '';
      const insert = '\n' + indent + extra;
      onChange(value.slice(0, s) + insert + value.slice(en));
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + insert.length; });
    }
  };

  return (
    <div className="rounded-lg overflow-hidden border border-navy-700 bg-navy-900">
      <div className="px-4 py-2 bg-navy-950 border-b border-navy-700 text-xs text-gray-400 font-mono flex justify-between">
        <span>{fileName}</span>
        <span className="hidden sm:block text-gray-500">Tab = indent  |  Ctrl+Enter = run</span>
      </div>
      <div className="flex h-[340px]">
        <div ref={gutterRef} aria-hidden className="select-none overflow-hidden text-right text-xs font-mono leading-6 text-gray-500 bg-navy-950 py-3 px-3 min-w-[3rem]">
          {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          aria-label="Code editor"
          className="flex-1 resize-none bg-transparent text-gray-100 font-mono text-[13px] leading-6 p-3 outline-none whitespace-pre overflow-auto scrollbar-thin"
        />
      </div>
    </div>
  );
}
