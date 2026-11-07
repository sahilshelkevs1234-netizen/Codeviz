// Runs user JavaScript against test cases inside a Web Worker (so infinite loops can be stopped).
// executeTests must stay self-contained: it is stringified and sent to the worker.

export function executeTests(code, spec, onlyVisible) {
  class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }
  class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } }
  const toList = (a) => { let h = null; for (let i = a.length - 1; i >= 0; i--) h = new ListNode(a[i], h); return h; };
  const fromList = (h) => { const o = []; let n = 0; while (h && n++ < 100000) { o.push(h.val); h = h.next; } return o; };
  const toTree = (a) => {
    if (!a.length || a[0] === null) return null;
    const root = new TreeNode(a[0]); const q = [root]; let i = 1;
    while (q.length && i < a.length) {
      const n = q.shift();
      if (i < a.length && a[i] !== null) { n.left = new TreeNode(a[i]); q.push(n.left); } i++;
      if (i < a.length && a[i] !== null) { n.right = new TreeNode(a[i]); q.push(n.right); } i++;
    }
    return root;
  };
  const fmt = (x) => { try { return x === undefined ? 'undefined' : JSON.stringify(x); } catch (e) { return String(x); } };
  const logs = [];
  const fakeConsole = { log: (...a) => { if (logs.length < 50) logs.push(a.map(x => (typeof x === 'string' ? x : fmt(x))).join(' ')); } };

  let target;
  try {
    const factory = new Function('ListNode', 'TreeNode', 'console',
      'return (function(){\n' + code + '\n;return (typeof ' + spec.fn + ' !== "undefined") ? ' + spec.fn + ' : undefined;})();');
    target = factory(ListNode, TreeNode, fakeConsole);
  } catch (e) {
    return { error: e.name + ': ' + e.message, logs };
  }
  if (typeof target !== 'function') {
    return { error: 'Could not find "' + spec.fn + '". Keep the starter name and do not delete it.', logs };
  }

  const tests = onlyVisible ? spec.tests.filter(t => !t.hidden) : spec.tests;
  const results = tests.map((t) => {
    const start = Date.now();
    try {
      let actual;
      if (spec.kind === 'class') {
        const init = JSON.parse(JSON.stringify(t.init || []));
        const obj = spec.factory ? target(...init) : new target(...init);
        actual = t.ops.map(([m, ...args]) => {
          if (typeof obj[m] !== 'function') throw new Error('Missing method: ' + m + '()');
          const r = obj[m](...args);
          return r === undefined ? null : r;
        });
      } else {
        let args = JSON.parse(JSON.stringify(t.args));
        if (spec.build === 'cycle') {
          const head = toList(args[0]);
          if (args[1] >= 0 && head) {
            let tail = head, node = head, i = 0;
            while (tail.next) tail = tail.next;
            while (i++ < args[1]) node = node.next;
            tail.next = node;
          }
          args = [head];
        } else if (spec.argTypes) {
          args = args.map((a, i) => (spec.argTypes[i] === 'list' ? toList(a) : spec.argTypes[i] === 'tree' ? toTree(a) : a));
        }
        actual = target(...args);
        if (spec.ret === 'list') actual = fromList(actual);
      }
      const pass = fmt(actual) === fmt(t.expected);
      return { pass, actual: fmt(actual), ms: Date.now() - start };
    } catch (e) {
      return { pass: false, error: e.name + ': ' + e.message, ms: Date.now() - start };
    }
  });
  return { results, logs, tests: tests.map(t => ({ hidden: !!t.hidden })) };
}

export function runTests(code, spec, onlyVisible = true, timeoutMs = 3000) {
  return new Promise((resolve) => {
    const src = 'const core = ' + executeTests.toString() + ';\n' +
      'onmessage = (e) => { postMessage(core(e.data.code, e.data.spec, e.data.onlyVisible)); };';
    const url = URL.createObjectURL(new Blob([src], { type: 'text/javascript' }));
    const worker = new Worker(url);
    const done = (value) => { clearTimeout(timer); worker.terminate(); URL.revokeObjectURL(url); resolve(value); };
    const timer = setTimeout(() => done({ error: 'Time Limit Exceeded: your code ran longer than ' + timeoutMs / 1000 + ' seconds (possible infinite loop).' }), timeoutMs);
    worker.onmessage = (e) => done(e.data);
    worker.onerror = (e) => done({ error: e.message || 'Unexpected error while running your code.' });
    worker.postMessage({ code, spec, onlyVisible });
  });
}
