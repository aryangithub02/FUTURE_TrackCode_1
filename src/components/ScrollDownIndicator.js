import React from 'react';
import { motion } from 'framer-motion';

const ScrollDownIndicator = () => {
  const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'contact'];
  
  const getCurrentSection = () => {
    const scrollPosition = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      if (sectionId === 'hero') {
        if (scrollPosition < 300) return 0;
        continue;
      }
      
      const element = document.getElementById(sectionId);
      if (element && scrollPosition >= element.offsetTop - 200) {
        return i;
      }
    }
    return 0;
  };

  const scrollToNext = () => {
    const currentIndex = getCurrentSection();
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSectionId = sections[nextIndex];
    
    if (nextSectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(nextSectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.div
      className="cursor-pointer"
      onClick={scrollToNext}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition-colors"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-medium mb-1 hidden sm:block">Scroll</span>
        <motion.div
          className="w-4 h-6 border-2 border-current rounded-full flex justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-0.5 h-2 bg-current rounded-full mt-1"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.svg
          className="w-4 h-4 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default ScrollDownIndicator;
