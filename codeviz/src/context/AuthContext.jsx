import { createContext, useContext, useState } from 'react';

// Frontend-only demo authentication: accounts live in this browser's localStorage.
// (Real security needs a backend; this makes login/register behave properly for the project.)
const USERS_KEY = 'codeviz:users';
const SESSION_KEY = 'codeviz:session';
const AuthContext = createContext(null);

const read = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

async function hash(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = read(SESSION_KEY, null);
    return email ? (read(USERS_KEY, []).find((u) => u.email === email) || null) : null;
  });

  const register = async ({ name, email, password, college }) => {
    const mail = email.trim().toLowerCase();
    const users = read(USERS_KEY, []);
    if (users.some((u) => u.email === mail)) return 'An account with this email already exists. Please sign in.';
    const u = { name: name.trim(), email: mail, college: college.trim(), passwordHash: await hash(password) };
    write(USERS_KEY, [...users, u]); write(SESSION_KEY, mail); setUser(u);
    return null;
  };

  const login = async ({ email, password }) => {
    const mail = email.trim().toLowerCase();
    const u = read(USERS_KEY, []).find((x) => x.email === mail);
    if (!u) return 'No account found with this email. Please sign up first.';
    if (u.passwordHash !== (await hash(password))) return 'Incorrect password. Please try again.';
    write(SESSION_KEY, mail); setUser(u);
    return null;
  };

  const logout = () => { try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ } setUser(null); };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
