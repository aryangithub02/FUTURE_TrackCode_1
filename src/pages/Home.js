import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profilePic from '../assets/Aryan_Motghare.png';
import { SkillsInfo, education, projects, experiences } from './constants';
import { Parallax } from 'react-scroll-parallax';
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import SectionIndicator from '../components/SectionIndicator';
import Contact from './Contact';
// Typewriter Effect Component
const TypewriterEffect = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
};

// Parallax Tilt Component for Project Cards
const ParallaxTilt = ({ children, className = "" }) => {
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Custom Parallax Component using Framer Motion
const CustomParallax = ({ children, yOffset = 50, className = "" }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, yOffset]);
  
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Floating Background Elements Component
const FloatingElements = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -20]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 30]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -15]);
  const y4 = useTransform(scrollY, [0, 1000], [0, 25]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Code Symbols */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10 text-blue-500/20 text-6xl hidden md:block">
        {'{}'}
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-40 right-20 text-blue-500/20 text-4xl hidden md:block">
        {'</>'}
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-40 left-20 text-pink-500/20 text-5xl hidden md:block">
        {'()'}
      </motion.div>
      <motion.div style={{ y: y4 }} className="absolute bottom-20 right-10 text-cyan-500/20 text-3xl hidden md:block">
        {'[]'}
      </motion.div>
      
      {/* Floating Dots */}
      {[...Array(8)].map((_, i) => (
        <CustomParallax
          key={i}
          yOffset={Math.random() * 40 - 20}
          className={`absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 hidden md:block`}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const { scrollY } = useScroll();
  const profileScale = useTransform(scrollY, [0, 300], [0.8, 1.1]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 relative overflow-x-hidden font-['Inter']">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/20 to-cyan-900/20 pointer-events-none"></div>
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10">
        {/* Scroll Down Indicator - Top Left */}
        <div className="fixed top-20 left-6 z-50">
          <ScrollDownIndicator />
        </div>

        {/* Section Indicator - Right Side */}
        <SectionIndicator />

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-20 relative">
          <FloatingElements />
          
          {/* Enhanced Parallax Background Layers */}
          {!isMobile && (
            <>
              <Parallax translateY={[-80, 80]} className="absolute inset-0 pointer-events-none parallax-element">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-transparent to-cyan-900/15"></div>
              </Parallax>
              <Parallax translateY={[-40, 40]} className="absolute inset-0 pointer-events-none parallax-element">
                <div className="absolute inset-0 bg-gradient-to-tl from-slate-900/10 via-transparent to-blue-900/10"></div>
              </Parallax>
            </>
          )}
          
          <div className="space-y-8 relative z-10">
            {!isMobile ? (
              <motion.div style={{ scale: profileScale }} className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img 
                    src={profilePic} 
                    alt="Aryan Motghare" 
                    className="h-32 w-32 rounded-full ring-4 ring-blue-500/40 shadow-lg shadow-blue-500/20 object-cover"
                  />
                  {/* Animated ring around profile */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-cyan-400/30 animate-pulse"></div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img 
                    src={profilePic} 
                    alt="Aryan Motghare" 
                    className="h-32 w-32 rounded-full ring-4 ring-blue-500/40 shadow-lg shadow-blue-500/20 object-cover"
                  />
                  {/* Animated ring around profile */}
                  <div className="absolute inset-0 rounded-full ring-2 ring-cyan-400/30 animate-pulse"></div>
                </motion.div>
              </div>
            )}
            
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center space-y-6"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Aryan Motghare
                </span>
              </motion.h1>

              <motion.h2 
                className="text-xl md:text-2xl text-gray-300 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Full Stack Developer
                </span>
              </motion.h2>

              <motion.p 
                className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <TypewriterEffect 
                  text="Passionate about creating innovative web solutions with modern technologies. I build scalable applications that deliver exceptional user experiences."
                  speed={50}
                />
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View My Work
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-full font-semibold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with expertise in modern web technologies. 
                I love creating innovative solutions that solve real-world problems and deliver 
                exceptional user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With a strong foundation in both frontend and backend development, I specialize 
                in building scalable applications using React, Node.js, and cloud technologies.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Problem Solver</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Team Player</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Continuous Learner</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-yellow-400 mb-2">10+</div>
                <div className="text-gray-300">Technologies</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-gray-300">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ParallaxTilt className="h-full">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 h-full flex flex-col shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/40 transition-shadow duration-300">
                    <div className="h-48 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 flex items-center justify-center p-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-cyan-900/10 shadow-inner"></div>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-32 h-32 object-contain relative z-10"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm border border-blue-700/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.webapp && (
                          <a
                            href={project.webapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg text-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 border border-gray-600 text-gray-300 py-2 px-4 rounded-lg text-center hover:bg-gray-700 transition-all duration-300"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SkillsInfo.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold text-white mb-6 text-center">{category.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                    >
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="text-xs text-gray-300 text-center font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My professional journey and key accomplishments
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={exp.img} 
                    alt={exp.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                        <p className="text-blue-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-gray-400 text-sm mt-2 md:mt-0">
                        {exp.date}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-sm border border-cyan-700/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My academic background and continuous learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={edu.img} 
                    alt={edu.school}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{edu.degree}</h3>
                    <p className="text-blue-400 font-medium mb-2">{edu.school}</p>
                    <p className="text-gray-400 text-sm mb-2">{edu.date}</p>
                    {edu.grade && (
                      <p className="text-gray-300">Grade: <span className="text-yellow-400">{edu.grade}</span></p>
                    )}
                    {edu.desc && (
                      <p className="text-gray-300 mt-2">{edu.desc}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <Contact/>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-gray-900/40">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Aryan Motghare. All rights reserved.
                </p>
              
              </div>
              <div className="flex gap-6 text-sm">
                <a href="#about" className="text-gray-400 hover:text-blue-400 transition-colors">About</a>
                <a href="#projects" className="text-gray-400 hover:text-blue-400 transition-colors">Projects</a>
                <a href="#skills" className="text-gray-400 hover:text-blue-400 transition-colors">Skills</a>
                <a href="#contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
</footer>
      </div>
    </div>
  );
}