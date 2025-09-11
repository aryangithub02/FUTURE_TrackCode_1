import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from './PillNav';
import logo from '../assets/logo.png';

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

  const items = [
    { label: 'Home', href: '/#' },
    { label: 'About', href: '/#about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Resume', href: '/resume' },
    { label: 'Education', href: '/#education' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 flex justify-end">
        <PillNav
          logo={logo}
          logoAlt="My Portfolio"
          items={items}
          activeHref={location.pathname}
          className="text-white"
          pillColor="#000"
          hoveredPillTextColor="#000"
          baseColor="#fff"
          pillTextColor="#fff"
        />
      </div>
    </nav>
  );
}
