import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// ⬆️ Scroll to top when pathname changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// ⬇️ Scroll to hash (#about, #projects etc.)
function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hash]);

  return null;
}

function App() {
  const location = useLocation();

  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-dark text-gray-100 font-sans">
        <ScrollToTop />
        <ScrollToHashElement />
        <Navbar />
        <main className="flex-1">
          <ScrollProgressBar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ParallaxProvider>
  );
}

export default App;
