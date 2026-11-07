import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Problems from './pages/Problems/Problems';
import ProblemDetail from './pages/ProblemDetail/ProblemDetail';
import VisualizerPage from './pages/Visualizer/VisualizerPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import About from './pages/About/About';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';

// Layout wrapper (with Navbar + Footer)
function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-navy-950">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

// Full-screen layout (for auth pages, no navbar/footer)
function FullScreenLayout({ children }) {
  return <div>{children}</div>;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Pages — no navbar */}
          <Route path="/login" element={<FullScreenLayout><Login /></FullScreenLayout>} />
          <Route path="/register" element={<FullScreenLayout><Register /></FullScreenLayout>} />

          {/* Main App Pages */}
          <Route path="/" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Home />
            </Layout>
          } />
          <Route path="/problems" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Problems />
            </Layout>
          } />
          <Route path="/problems/:id" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <ProblemDetail />
            </Layout>
          } />
          <Route path="/visualizer" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <VisualizerPage />
            </Layout>
          } />
          <Route path="/dashboard" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <RequireAuth><Dashboard /></RequireAuth>
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <RequireAuth><Profile /></RequireAuth>
            </Layout>
          } />
          <Route path="/leaderboard" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Leaderboard />
            </Layout>
          } />

          <Route path="/about" element={
            <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
              <About />
            </Layout>
          } />

          {/* 404 redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
