import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Education from './pages/Education';
import Resume from './pages/Resume';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  
  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col bg-dark text-gray-100 font-sans">
        <Navbar />
        <main className="flex-1">
        <ScrollProgressBar />
          <AnimatePresence mode="wait">
            <ScrollToTop />
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/education" element={<Education />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </AnimatePresence>
        </main>

      </div>
    </ParallaxProvider>
  );
}

export default App;
