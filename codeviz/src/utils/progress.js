const SOLVED_KEY = 'codeviz:solved';
const codeKey = (id, lang) => `codeviz:code:${id}:${lang}`;

export function getSolved() {
  try { return new Set(JSON.parse(localStorage.getItem(SOLVED_KEY) || '[]')); } catch { return new Set(); }
}
export function markSolved(id) {
  const s = getSolved(); s.add(id);
  try { localStorage.setItem(SOLVED_KEY, JSON.stringify([...s])); } catch { /* storage unavailable */ }
}
export function loadCode(id, lang) {
  try { return localStorage.getItem(codeKey(id, lang)); } catch { return null; }
}
export function saveCode(id, lang, code) {
  try { localStorage.setItem(codeKey(id, lang), code); } catch { /* storage unavailable */ }
}
export function clearCode(id, lang) {
  try { localStorage.removeItem(codeKey(id, lang)); } catch { /* storage unavailable */ }
}
