import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
const linkClasses = ({ isActive }) =>
  `${linkBase} ${
    isActive
      ? 'bg-purple-600 text-white shadow-md'
      : 'text-gray-200 hover:text-white hover:bg-purple-800/40'
  }`;

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      const dark = stored === 'dark';
      setIsDark(dark);
      document.documentElement.classList.toggle('dark', dark);
      return;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#0f172a]/90 via-[#1e1b4b]/90 to-[#312e81]/90 border-b border-purple-500/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <NavLink to="/#" className="text-lg font-semibold text-white">
            My Portfolio
          </NavLink>
          <div className="flex items-center gap-2">
            <NavLink to="/#" className={linkClasses}>
              Home
            </NavLink>
            <button
              onClick={() => scrollToSection('about')}
              className={linkBase + ' text-gray-200 hover:text-white hover:bg-purple-800/40'}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={linkBase + ' text-gray-200 hover:text-white hover:bg-purple-800/40'}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={linkBase + ' text-gray-200 hover:text-white hover:bg-purple-800/40'}
            >
              Skills
            </button>
            <NavLink to="/resume" className={linkClasses}>
              Resume
            </NavLink>
            <button
              onClick={() => scrollToSection('education')}
              className={linkBase + ' text-gray-200 hover:text-white hover:bg-purple-800/40'}
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={linkBase + ' text-gray-200 hover:text-white hover:bg-purple-800/40'}
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
