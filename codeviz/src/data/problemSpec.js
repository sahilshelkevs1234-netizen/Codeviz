import { content } from './problemContent';

const snake = (s) => s.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());

function parseSig(sig = '') {
  const [left, ret = 'void'] = sig.split('->').map((x) => x.trim());
  const args = left ? left.split(',').map((a) => { const p = a.trim().split(/\s+/); return { name: p.pop(), type: p.join(' ') }; }) : [];
  return { args, ret };
}

function starter(spec, lang) {
  if (spec.starter?.[lang]) return spec.starter[lang];
  if (spec.kind === 'class') {
    const m = spec.methods || [];
    if (lang === 'javascript') {
      return `class ${spec.cls} {\n  constructor(${(spec.ctor || '').split(' ').pop() || ''}) {\n    // Set up your fields here\n  }\n\n${m.map(([n, a]) => `  ${n}(${a.split(',').map((x) => x.trim().split(' ').pop()).filter(Boolean).join(', ')}) {\n    // Your code here\n  }`).join('\n\n')}\n}`;
    }
    if (lang === 'python') {
      return `class ${spec.cls}:\n    def __init__(self${spec.ctor ? ', ' + spec.ctor.split(' ').pop() : ''}):\n        pass\n\n${m.map(([n, a]) => `    def ${snake(n)}(self${a ? ', ' + a.split(',').map((x) => x.trim().split(' ').pop()).join(', ') : ''}):\n        pass`).join('\n\n')}`;
    }
    return `class ${spec.cls} {\n    public ${spec.cls}(${spec.ctor || ''}) {\n        // Set up your fields here\n    }\n\n${m.map(([n, a, r]) => `    public ${r} ${n}(${a}) {\n        // Your code here\n    }`).join('\n\n')}\n}`;
  }
  const { args, ret } = parseSig(spec.sig);
  const names = args.map((a) => a.name).join(', ');
  if (lang === 'javascript') {
    const note = spec.argTypes?.includes('list') ? '// ListNode: { val, next }\n' : spec.argTypes?.includes('tree') ? '// TreeNode: { val, left, right }\n' : '';
    return `${note}function ${spec.fn}(${names}) {\n  // Your code here\n  \n}`;
  }
  if (lang === 'python') return `def ${snake(spec.fn)}(${names}):\n    # Your code here\n    pass`;
  return `class Solution {\n    public ${ret} ${spec.fn}(${args.map((a) => `${a.type} ${a.name}`).join(', ')}) {\n        // Your code here\n    }\n}`;
}

export function getProblemSpec(problem) {
  const c = content[problem.id];
  if (!c) return null;
  const spec = { ...c, id: problem.id, langs: c.langs || ['javascript', 'python', 'java'] };
  spec.runnable = Array.isArray(c.tests) && c.tests.length > 0;
  spec.starters = Object.fromEntries(spec.langs.map((l) => [l, starter(spec, l)]));
  // Only a visualisation that really exists is linked.
  spec.visualizerType = c.viz || null;
  return spec;
}

export const LANG_LABEL = { javascript: 'JavaScript', python: 'Python', java: 'Java', sql: 'SQL' };
export const LANG_EXT = { javascript: 'js', python: 'py', java: 'java', sql: 'sql' };
