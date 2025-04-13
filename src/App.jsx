import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import SymptomChecker from './components/SymptomChecker';
import Dashboard from './components/Dashboard';
import EmergencyButton from './components/EmergencyButton';
import Resources from './components/Resources';
import Community from './components/Community';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="navbar">
            <Link to="/" className="logo" onClick={closeMenu}>
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="#ff5252"
                  strokeWidth="2"
                />
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="#ff5252"
                />
              </svg>
              HeartGuard
            </Link>
            <button
              className="hamburger"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className="mobile-nav"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/checker" onClick={closeMenu}>Symptom Checker</Link>
                  <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                  <Link to="/resources" onClick={closeMenu}>Resources</Link>
                  <Link to="/community" onClick={closeMenu}>Community</Link>
                  <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                  </button>
                </motion.nav>
              )}
            </AnimatePresence>
            <nav className="desktop-nav">
              <Link to="/checker">Symptom Checker</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/resources">Resources</Link>
              <Link to="/community">Community</Link>
              <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </nav>
          </div>
        </motion.header>
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Routes>
            <Route path="/checker" element={<SymptomChecker />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/community" element={<Community />} />
            <Route path="/" element={<SymptomChecker />} />
          </Routes>
        </motion.main>
        <EmergencyButton />
        <motion.footer
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Disclaimer: This tool is not a substitute for professional medical advice.</p>
        </motion.footer>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;