import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SectionIndicator = () => {
  const [currentSection, setCurrentSection] = useState('hero');

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'experience', name: 'Experience' },
    { id: 'education', name: 'Education' },
    { id: 'contact', name: 'Contact' }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1 // lowered threshold to make detection easier
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id || 'hero';
          console.log(`✅ Intersecting: ${sectionId}`); // Debug log
          setCurrentSection(sectionId);
        } else {
          console.log(`❌ Not Intersecting: ${entry.target.id}`); // Debug log
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
      const element =
        section.id === 'hero'
          ? document.querySelector('section') // First <section> for hero
          : document.getElementById(section.id);

      if (element) {
        observer.observe(element);
        console.log(`👀 Observing section: ${section.id}`); // Debug log
      } else {
        console.warn(`⚠️ Missing section in DOM: ${section.id}`); // Debug log
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.div
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="flex flex-col items-center space-y-3">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === section.id
                ? 'bg-purple-500 border-purple-500 scale-125'
                : 'border-gray-400 hover:border-purple-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <motion.div
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none ${
                currentSection === section.id
                  ? 'opacity-100'
                  : 'opacity-0 hover:opacity-100'
              }`}
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: currentSection === section.id ? 1 : 0,
                x: currentSection === section.id ? 0 : 10
              }}
              transition={{ duration: 0.2 }}
            >
              {section.name}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Current Section Label */}
      <motion.div
        className="mt-6 text-center"
        key={currentSection}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-xs text-gray-400 font-medium">
          {sections.find((s) => s.id === currentSection)?.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectionIndicator;
