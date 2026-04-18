import { useEffect, useRef, useState } from 'react';
import profilePic from './assets/profile.jpg';
import BubbleBackground from './BubbleBackground.jsx';
import Cursor from './Cursor.jsx';

function App() {
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    let frameId = null;

    const updatePosition = (event) => {
      if (!shell) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 26;
      const y = (event.clientY / window.innerHeight - 0.5) * 26;
      shell.style.setProperty('--tx', `${x.toFixed(2)}px`);
      shell.style.setProperty('--ty', `${y.toFixed(2)}px`);
    };

    const handleMove = (event) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => updatePosition(event));
    };

    const handleLeave = () => {
      if (!shell) return;
      shell.style.setProperty('--tx', '0px');
      shell.style.setProperty('--ty', '0px');
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleMusic = async () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        audioRef.current.load(); // Ensure loaded
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
        // Could show a user message here
      }
    }
  };

  const education = [
    {
      institution: 'Dr. Sixto Antonio Elementary School',
      subtitle: 'Elementary School',
      date: '2011 - 2018',
    },
    {
      institution: 'La Immaculada Concepcion School',
      subtitle: 'Junior High School (With Honors)',
      date: '2018 - 2022',
    },
    {
      institution: 'Arellano University',
      subtitle: 'Senior High School (With Honors)',
      date: '2022 - 2024',
      achievements: ['Academic Excellence Award', 'Best in Mathematics', 'Science Fair Winner'],
    },
    {
      institution: 'T.I.P Manila',
      subtitle: 'BS Computer Engineering',
      date: '2024 - 2029',
    },
  ];

  const workshops = [
    {
      title: 'Introduction to Robotics and Embedded Systems',
      date: '2023',
      organizer: 'TIP Manila Engineering Department',
    },
    {
      title: 'Web Development Bootcamp',
      date: '2023',
      organizer: 'Google Developers Student Club',
    },
    {
      title: 'Cybersecurity Fundamentals Seminar',
      date: '2024',
      organizer: 'Arellano University',
    },
    {
      title: 'Mobile App Design Sprint',
      date: '2024',
      organizer: 'University Tech Hub',
    },
  ];

  const seminars = [
    {
      title: 'Future of AI in Engineering',
      date: '2023',
      organizer: 'Philippine Society of Mechanical Engineers',
    },
    {
      title: 'Sustainable Technology Solutions',
      date: '2024',
      organizer: 'TIP Manila',
    },
    {
      title: 'Data Science for Smart Cities',
      date: '2024',
      organizer: 'TIP Manila',
    },
  ];

  const highlights = [
    'Graduated Senior High School with honors at Arellano University',
    'Honored with academic excellence, math, and science fair awards',
    'Joined robotics and cybersecurity student events',
    'Supported peer learning through club activities and study groups',
  ];

  const activities = [
    'Member of the campus tech club and peer mentoring circle',
    'Organized study sessions for math, physics, and programming courses',
    'Volunteered in school technology outreach programs',
    'Prepared and presented technical demos during open campus events',
  ];

  const skills = [
    'C/C++',
    'Python',
    'Java',
    'React',
    'HTML/CSS',
    'Embedded Systems',
    'Circuit Design',
    'Problem Solving',
  ];

  const contact = {
    location: 'Taguig City, Philippines',
    availability: 'Open to internships, student research, and collaborative engineering projects.',
    facebook: 'https://www.facebook.com/Simon-Osorio-Pagkaliwangan',
    linkedin: 'https://www.linkedin.com/in/art-simon-pagkaliwangan',
    phone: '09910671516',
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
  ];

  const projects = [
    {
      title: 'React Laboratory',
      description: 'A web-based lab management system for students to book equipment, access resources, and view schedules.',
      tags: ['React', 'CSS', 'Web Design'],
      demoUrl: 'https://react-es6-lab-coral.vercel.app/',
      githubUrl: 'https://github.com/masterPagkaliwangan/react-es6-lab-.git',
    },
    {
      title: 'Front End Task',
      description: 'A basic task for Emerging Technology',
      tags: ['UI/UX', 'JavaScript', 'Productivity'],
      demoUrl: 'https://example.com/campus-task-tracker',
      githubUrl: 'https://github.com/masterPagkaliwangan/git-frontend-project..git',
    },
    {
      title: 'University Enrollment Form',
      description: 'A concept app for controlling lab access, tracking equipment, and visualizing campus tech resources.',
      tags: ['Systems', 'Engineering', 'Concept'],
      demoUrl: 'https://example.com/smart-lab-panel',
      githubUrl: 'https://github.com/masterPagkaliwangan/University-Enrollment-Form.git',
    },
    {
      title: 'OOP Game Project',
      description: 'A game project built using Object-Oriented Programming principles, showcasing design patterns and modular code structure.',
      tags: ['IoT', 'Python', 'Embedded Systems'],
      demoUrl: 'c:\\Users\\Lance Kelly\\Downloads\\PIX RUN.exe',
      githubUrl: 'https://drive.google.com/drive/folders/1DfUfRDimdE9Q3DQSWgDTjUump9gApA60?usp=sharing',
    },
  ];

  return (
    <div className={`app-shell ${isDarkMode ? '' : 'light-mode'}`} ref={shellRef}>
      <BubbleBackground />
      <Cursor />
      <div className="grid-overlay" />
      <audio ref={audioRef} loop preload="none">
        <source src="/background-music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <nav className="top-nav">
        <div className="brand-tag">ART SIMON</div>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-controls">
          <button onClick={toggleMusic} className="control-btn">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={toggleTheme} className="control-btn">
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>
      <header className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Tech Portfolio</p>
          <h1>Art Simon O. Pagkaliwangan</h1>
          <p className="hero-text">
            A 19-year-old Computer Engineering student from Taguig City with a cyberpunk-inspired passion for technology,
            design, and future-ready solutions.
          </p>
          <div className="hero-highlight-list">
            <span>Fast learner with hands-on engineering mindset</span>
            <span>Design-driven projects with real student use cases</span>
            <span>Future-ready portfolio built in React + Vite</span>
            <span>Campus-ready systems designed for real student needs</span>
          </div>
          <div className="hero-meta">
            <span>Second-year BS Computer Engineering</span>
            <span>Technological Institute of the Philippines - Manila</span>
          </div>
        </div>

        <div className="hero-card-right">
          <div className="hero-image-container">
            <img src={profilePic} alt="Art Simon Pagkaliwangan" />
            <div className="hero-image-badge">TIP Manila · Cyber Tech</div>
          </div>
          <div className="hero-card-stats">
            <div>
              <h2>Bio</h2>
              <p>
                Born May 10, 2006. Son of Marites and Van Clyde Pagkaliwangan. Brother to Ryan and Eric.
              </p>
            </div>
            <div>
              <h2>Focus</h2>
              <p>Computing, technology, engineering, and building a strong foundation for the tech industry.</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section-panel" id="about">
          <div className="section-header">
            <span className="section-label">About</span>
            <h2>Profile & Journey</h2>
          </div>
          <div className="content-grid">
            <article className="bio-card">
              <h3>Biography</h3>
              <p>
                Art Simon Pagkaliwangan is a passionate and dedicated Computer Engineering student at the Technological Institute of the Philippines - Manila, currently in his second year of pursuing a Bachelor of Science degree. Born on May 10, 2006, in Taguig City, Philippines, he has always been fascinated by the intersection of technology and innovation. His academic journey began at Dr. Sixto Antonio Elementary School, where he developed a strong foundation in basic sciences, followed by La Immaculada Concepcion School for junior high school with honors, and Arellano University for senior high school, also graduating with honors and earning awards in mathematics and science.
              </p>
              <p>
                Driven by a deep curiosity for how things work, Art Simon has immersed himself in various technical fields, including programming, embedded systems, and circuit design. He actively participates in workshops, seminars, and student activities to broaden his knowledge and skills. His hands-on approach to learning is evident in his projects, which focus on practical solutions for real-world problems, particularly in educational and campus environments.
              </p>
              <p>
                <strong>Objective:</strong> To leverage my engineering expertise and innovative mindset to contribute to cutting-edge technology projects, particularly in areas like IoT, cybersecurity, and sustainable tech solutions, while pursuing opportunities for growth through internships and collaborative research at leading tech companies.
              </p>
            </article>
            <article className="bio-card">
              <h3>Education Timeline</h3>
              <ul className="timeline-list">
                {education.map((item) => (
                  <li key={item.institution}>
                    <strong>{item.institution}</strong>
                    <span>{item.subtitle}</span>
                    <small>{item.date}</small>
                    {item.achievements && (
                      <div className="achievements-list">
                        <strong>Achievements:</strong>
                        <ul>
                          {item.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </article>
            <article className="bio-card">
              <h3>Workshops & Seminars</h3>
              <div className="workshops-list">
                <h4>Workshops Attended</h4>
                <ul>
                  {workshops.map((workshop) => (
                    <li key={workshop.title}>
                      <strong>{workshop.title}</strong>
                      <span>{workshop.organizer} - {workshop.date}</span>
                    </li>
                  ))}
                </ul>
                <h4>Seminars Attended</h4>
                <ul>
                  {seminars.map((seminar) => (
                    <li key={seminar.title}>
                      <strong>{seminar.title}</strong>
                      <span>{seminar.organizer} - {seminar.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            <article className="bio-card">
              <h3>Student Highlights</h3>
              <ul className="highlight-list">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="bio-card">
              <h3>Student Activities</h3>
              <ul className="activity-list">
                {activities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section-panel projects-panel" id="projects">
          <div className="section-header">
            <span className="section-label">Projects</span>
            <h2>Recent Work</h2>
          </div>
          <p className="section-note">Click the buttons to view live demos or the project source on GitHub.</p>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-card-top">
                  <h3>{project.title}</h3>
                  <span className="project-status">Live</span>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="project-action">
                      View Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-action secondary">
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-panel skills-panel" id="skills">
          <div className="section-header">
            <span className="section-label">Skills</span>
            <h2>Technical Profile</h2>
          </div>
          <div className="skills-grid">
            <article className="bio-card">
              <h3>Core Skills</h3>
              <div className="skill-pill-grid">
                {skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
            <article className="bio-card contact-card">
              <h3>Contact</h3>
              <p>{contact.availability}</p>
              <div className="contact-details">
                <div>
                  <strong>Location</strong>
                  <span>{contact.location}</span>
                </div>
                <div>
                  <strong>Facebook</strong>
                  <a href={contact.facebook} target="_blank" rel="noreferrer">Simon Osorio Pagkaliwangan</a>
                </div>
                <div>
                  <strong>LinkedIn</strong>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer">ART SIMON PAGKALIWANGAN</a>
                </div>
                <div>
                  <strong>Contact #</strong>
                  <span>{contact.phone}</span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer-panel">
        <p>Designed with a blue cyberpunk palette to reflect a modern tech identity.</p>
        <p>Portfolio built with Vite + React for a polished student showcase.</p>
      </footer>
    </div>
  );
}

export default App;
