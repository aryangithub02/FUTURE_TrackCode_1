import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profilePic from '../assets/Aryan_Motghare.png';
import { SkillsInfo, education, projects, experiences } from './constants';
// import { Parallax } from 'react-scroll-parallax';
import Marquee from "react-fast-marquee";
import ScrollDownIndicator from '../components/ScrollDownIndicator';
import SectionIndicator from '../components/SectionIndicator';
import Contact from './Contact';
import ProfileCard from './ProfileCard';
import profilePicCard from '../assets/profilePhoto.png';
import Typed from 'typed.js';
import Squares from './Squares';




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
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Hi, I’m Aryan Motghare",
        "I am a MERN Stack Developer",
        "I am a Software Engineer",
        "Prominent in C, C++, JS, Python",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  const [selectedProject, setSelectedProject] = useState(null);

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
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Squares 
          direction="up"
          speed={0.5}
          borderColor="rgba(255, 255, 255, 0.1)"
          squareSize={40}
          hoverFillColor="rgba(255, 255, 255, 0.8)"
          className="opacity-100"
        />
      </div>

      <div className="relative z-10">
        {/* Scroll Down Indicator - Top Left */}
        <div className="fixed top-20 left-6 z-50">
          <ScrollDownIndicator />
        </div>

        {/* Section Indicator - Right Side */}
        <SectionIndicator />

        {/* Hero Section */}
     {/* Hero Section */}
     <section className="max-w-6xl mx-auto px-6 py-20 relative flex flex-col md:flex-row items-center gap-12">
      {/* Left Side - Hero Text */}
      
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left"
      >
        <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto flex items-center justify-center bg-gray-800"
  >
    <img
      src={profilePic}
      alt="Aryan Motghare"
      className="w-full h-full object-cover"
    />
  </motion.div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span ref={typedElement} className="text-blue-400"></span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
          A passionate Full Stack Developer eager to build scalable, efficient,
          and user-friendly applications.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all"
          onClick={() => {
            document
              .getElementById("contact")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact Me
        </motion.button>
      </motion.div>

      {/* Right Side - Profile Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center"
      >
        <ProfileCard
          avatarUrl={profilePicCard}
          miniAvatarUrl={profilePic}
          name="Aryan Motghare"
          title="Full Stack Developer"
          handle="aryan-motghare"
          status="Online"
          contactText="Hire Me"
          onContactClick={() => {
            document
              .getElementById("contact")
              .scrollIntoView({ behavior: "smooth" });
          }}
        />
      </motion.div>
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
        Hi, I’m Aryan Motghare, a Full Stack Developer based in India with over 2 years of professional experience. I specialize in building responsive, user-friendly web applications using modern technologies like React, Node.js, Express, and MongoDB.
      </p>
      <p className="text-lg text-gray-300 leading-relaxed">
        I am passionate about writing clean, efficient code and constantly improving my skills. I enjoy collaborating with teams, tackling challenging problems, and delivering software that creates a positive impact for users.
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
        <div className="text-3xl font-bold text-green-400 mb-2">3+</div>
        <div className="text-gray-300">Certifications</div>
      </div>
    </motion.div>
  </div>
</section>



        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6"></div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and
          experience
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer"
          >
            <ParallaxTilt tiltMaxAngleX={10} tiltMaxAngleY={10} className="h-full">
              <div className="relative group bg-gray-900/60 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/50 h-full flex flex-col shadow-2xl transition-all duration-500">
                
                {/* Glow border effect */}
                <div className="absolute inset-0 rounded-xl p-[2px] 
  bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 
  opacity-0 group-hover:opacity-100 blur-lg transition duration-500">
</div>

                {/* Content wrapper */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Project Image */}
                  <div className="h-48 flex items-center justify-center p-4 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-32 h-32 object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs border border-blue-700/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxTilt>
          </motion.div>
        ))}
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-700 relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedProject.title}
            </h3>
            <p className="text-gray-300 mb-6">{selectedProject.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm border border-blue-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-gray-600 text-gray-300 py-2 px-4 rounded-lg text-center hover:bg-gray-800 transition"
                >
                  GitHub
                </a>
              )}
              {selectedProject.webapp && (
                <a
                  href={selectedProject.webapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg text-center hover:from-blue-700 hover:to-cyan-700 transition"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>




{/* 🔥 Tailwind animation keyframes for chroma grid */}






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
      <div className="mt-16">
        <Marquee gradient={false} speed={60}>
          {SkillsInfo.flatMap((category) =>
            category.skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center justify-center mx-6">
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-12 h-12 mb-2 hover:scale-110 transition-transform duration-300"
                />
                <span className="text-xs text-gray-300 font-medium">{skill.name}</span>
              </div>
            ))
          )}
        </Marquee>
      </div>
      
      <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Education
      </span>
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
        className="relative group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>
        <div className="relative flex items-start gap-4">
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
              <p className="text-gray-300">
                Grade: <span className="text-yellow-400">{edu.grade}</span>
              </p>
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