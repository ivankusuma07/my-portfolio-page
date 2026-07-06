import { useState, useEffect } from 'react'
import PixelAvatar from './components/PixelAvatar'
import { useScrollReveal, useStaggerReveal } from './hooks/useScrollReveal'
import './App.css'

const sections = ['about', 'skills', 'experience', 'projects', 'contact']

const skills = [
  'Vue.js', 'Nuxt.js', 'React', 'TypeScript','Supabase', 'JavaScript', 'Electron.js',
  'WebSocket', 'GraphQL', 'REST API', 'Node.js', 'Tailwind CSS', 'GSAP',
  'Pinia', 'Vuex', 'CI/CD', 'Code Review', 'SEO',
  'Accessibility', 'RBAC', '2FA', 'Biometric', 'Lighthouse',
]

const experiences = [
  {
    role: 'Frontend Engineer',
    company: 'ACCU3DX — South Korea (Remote)',
    date: 'April 2024 – Present',
    desc: 'Architected ViewTLab, a web-based dental lab and clinic dashboard with RBAC, WebSocket chat, Google Calendar-style reservations, and full treatment lifecycle management. Improved Lighthouse Accessibility from 86 to 100 and SEO from 83 to 92. Led code reviews and managed production pipelines.',
  },
  {
    role: 'Frontend Engineer',
    company: 'PRIVY — Bantul, Indonesia',
    date: 'August 2022 – August 2023',
    desc: 'Maintained Liveness SDK for identity verification across merchants. Built 2FA (Biometric + OTP) authentication SDK. Developed OCR-based KTP detection and registration improvements. Implemented camera blacklist security features.',
  },
  {
    role: 'Frontend Developer',
    company: 'MYDIGILEARN — Bandung, Indonesia',
    date: 'February 2022 – June 2022',
    desc: 'Contributed to CMS architecture for a digital learning platform. Revamped Pathways UI (video, podcast, learning modules) to V3. Resolved critical production bugs and improved content management workflow.',
  },
  {
    role: 'Frontend Developer',
    company: 'WIDYA ROBOTICS — Sleman, Indonesia',
    date: 'November 2018 – December 2021',
    desc: 'Pioneered Electron.js adoption for desktop apps (MyNitro, Load Scanner, UAV LiDAR). Built Matador Tracker GPS-based heavy equipment monitoring. Integrated AI-powered CCTV for HSE/PPE compliance dashboards. Developed automated gate access with AI verification.',
  },
]

const projects = [
  {
    title: 'My Nitro',
    desc: 'Self-service nitrogen filling desktop app on mini PC. Select vehicle type, choose service, set pressure target, pay via digital wallet — machine fills tires automatically.',
    tech: ['Electron.js', 'Nuxt.js'],
    images: ['/images/01_my_nitro.jpg'],
    category: 'Desktop',
  },
  {
    title: 'Load Scanner App',
    desc: 'Truck-load measurement app using LIDAR. Calculates volume from Gross/Tare readings. Saves local data for repeat usage.',
    tech: ['Electron.js', 'Nuxt.js'],
    images: ['/images/02_load_scanner_app.jpg'],
    category: 'Desktop',
  },
  {
    title: 'QHSE Gate',
    desc: 'Worker safety data-logging web app. Logs AI detection data from CCTV cameras at construction project entrance gates for PPE compliance.',
    tech: ['Vue.js'],
    images: ['/images/03_qhse_gate.jpg'],
    category: 'Web',
  },
  {
    title: 'QHSE Monitoring',
    desc: 'Monitoring and reporting dashboard for QHSE AI detection across multiple CCTV zones inside construction projects.',
    tech: ['Vue.js'],
    images: ['/images/04_qhse_monitoring.jpg'],
    category: 'Web',
  },
  {
    title: 'Mydigilearn CMS',
    desc: 'Content management system for Mydigilearn platform. Manages video, podcast, webinar, articles, courses, pathways, class, and digilib menus.',
    tech: ['Vue.js'],
    images: ['/images/05_mydigilearn_cms.jpg'],
    category: 'Web',
  },
  {
    title: 'Liveness SDK',
    desc: 'Passive liveness detection SDK used by Privy Registration, Bank Raya, and Danamon. Integrated via iframe with credentialed URLs.',
    tech: ['Nuxt 2', 'Vuex', 'Crypto'],
    images: ['/images/06_liveness_sdk.jpg'],
    category: 'SDK',
  },
  {
    title: 'Liveness Video',
    desc: 'Video-based passive liveness detection (8-second cap). Similar to Liveness SDK but uses video input for identity verification.',
    tech: ['Nuxt 2', 'Vuex', 'Crypto'],
    images: ['/images/07_liveness_video.jpg'],
    category: 'SDK',
  },
  {
    title: '2FA SDK',
    desc: 'Two-factor authentication SDK with OTP and biometric options. Configurable auth methods, logo, button colors, and styling.',
    tech: ['Nuxt 2', 'Vuex', 'Crypto'],
    images: ['/images/08_2fa_sdk.jpg'],
    category: 'SDK',
  },
  {
    title: 'OCR SDK',
    desc: 'KTP text detection app. Scans Indonesian ID cards and extracts structured data — default 3 fields (name, NIK, DOB) or full extended set.',
    tech: ['Nuxt 2', 'Vuex'],
    images: ['/images/09_ocr_sdk.jpg'],
    category: 'SDK',
  },
  {
    title: 'Priventory',
    desc: 'Asset management system with document/template upload. Built from scratch during Privy acceleration program, focused on document templates.',
    tech: ['Nuxt 3', 'Pinia', 'Tailwind', 'TypeScript', 'TinyMCE'],
    images: ['/images/10_priventory.jpg'],
    category: 'Web',
  },
  {
    title: 'Pokedex',
    desc: 'Pokémon catalog app with search and detailed stat viewing, powered by GraphQL (PokeAPI).',
    tech: ['Nuxt 3', 'Tailwind', 'TypeScript', 'GraphQL'],
    images: ['/images/11_pokedex.jpg'],
    links: {
      live: 'https://pokedex-nuxt3-graphql.netlify.app/',
      github: 'https://github.com/ivankusuma07/nuxt3-graphql-pokedex',
    },
    category: 'Web',
  },
  {
    title: 'ViewTLab',
    desc: 'Dental clinic and lab management platform. Real-time WebSocket chat, 3D patient scan viewer, Google Calendar-style reservations, RBAC, activity logging, and aligner ordering.',
    tech: ['Nuxt 3', 'Tailwind', 'TypeScript', 'WebSocket'],
    images: [
      '/images/12_viewtlab_3d_scan.jpg',
      '/images/13_viewtlab_reservation_calendar.jpg',
      '/images/14_viewtlab_aligners_order.jpg',
    ],
    links: {
      live: 'https://www.viewtlab.com/',
    },
    category: 'Web',
  },
  {
    title: 'POS Sanbercode',
    desc: 'Point-of-sale system with dashboard reporting, transaction history, and print. Built for Sanbercode coding test.',
    tech: ['Vue','Supabase', 'Typescript', 'Tailwind', 'Pinia'],
    images: ['/images/15_pos_sanbercode.png'],
    links: {
      // live: 'https://pokedex-nuxt3-graphql.netlify.app/',
      gitlab: 'https://gitlab.com/ivankusuma07/pos-sanbercode',
    },
    category: 'Web',
  },
  {
    title: 'My Portfolio Page',
    desc: 'My portfolio page built with React, Typescript, Vite, and GSAP for animations. Showcases my skills, experience, and projects in a visually appealing manner.',
    tech: ['React', 'Typescript', 'Vite', 'GSAP'],
    images: ['/images/16_my_portfolio_page.png'],
    links: {
      live: 'https://ivan-kusuma.netlify.app/',
      github: 'https://github.com/ivankusuma07/my-portfolio-page',
    },
    category: 'Web',
  },
]

function TypeWriter({ text, speed = 80 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <>{displayed}</>
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {sections.map((s) => (
          <a key={s} href={`#${s}`}>{s}</a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <PixelAvatar />
      <h1>
        <TypeWriter text="> Ivan Kusuma Aulia" />
        <span className="cursor" />
      </h1>
      <p className="hero-subtitle">Frontend Engineer — Vue | Nuxt | React</p>
      <p className="hero-tagline">
        7+ years building scalable web apps, SDKs, and real-time systems
      </p>
      <div className="hero-links">
        <a href="#projects" className="pixel-btn pixel-btn-primary">View Work</a>
        <a href="#contact" className="pixel-btn">Contact Me</a>
      </div>
    </section>
  )
}

function About() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} id="about" className="section about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <p className="about-text">
          Senior Frontend Engineer based in Yogyakarta, Indonesia, with 7+ years
          of experience building scalable, high-performance web applications and
          5+ years specializing in Vue.js ecosystems. Experienced in architecting
          dashboards, real-time systems, SDK integrations, and enterprise-grade
          web platforms for clinics, fintech, and AI-driven industrial systems.
        </p>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">7+</span>
            <span className="stat-label">Years Exp</span>
          </div>
          <div className="stat">
            <span className="stat-number">12+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">4</span>
            <span className="stat-label">Companies</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const gridRef = useStaggerReveal(skills.length, { stagger: 0.05 })
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <div ref={gridRef} className="skills-grid">
        {skills.map((s) => (
          <span key={s} className="skill-badge">{s}</span>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const timelineRef = useStaggerReveal(experiences.length, { stagger: 0.15 })
  return (
    <section id="experience" className="section experience">
      <h2 className="section-title">Experience</h2>
      <div ref={timelineRef} className="timeline">
        {experiences.map((exp, i) => (
          <div key={i} className="timeline-item">
            <h3 className="timeline-role">{exp.role}</h3>
            <p className="timeline-company">{exp.company}</p>
            <p className="timeline-date">{exp.date}</p>
            <p className="timeline-desc">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCarousel({ images }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className="carousel">
      <div className="carousel-track">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className={`carousel-img ${i === active ? 'active' : ''}`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <button
          className="carousel-dot-nav"
          onClick={() => setActive((prev) => (prev + 1) % images.length)}
        >
          {images.map((_, i) => (
            <span key={i} className={`carousel-dot ${i === active ? 'active' : ''}`} />
          ))}
        </button>
      )}
    </div>
  )
}

function Projects() {
  const gridRef = useStaggerReveal(projects.length, { stagger: 0.08, y: 60 })
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <div ref={gridRef} className="projects-grid">
        {projects.map((p, i) => (
          <div key={i} className="project-card">
            <div className="project-images">
              <ProjectCarousel images={p.images} />
            </div>
            <div className="category-tag">{p.category}</div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tech">
              {p.tech.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.links?.live && (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer">
                  &lt;Live /&gt;
                </a>
              )}
              {p.links?.github && (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer">
                  &lt;GitHub /&gt;
                </a>
              )}
              {p.links?.gitlab && (
                <a href={p.links.gitlab} target="_blank" rel="noopener noreferrer">
                  &lt;GitLab /&gt;
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2 className="section-title">Contact</h2>
      <p className="contact-text">
        Got a project or just want to say hi? Drop me a message.
      </p>
      <div className="contact-links">
        <a href="mailto:ivankusuma07@gmail.com" className="contact-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 4l-10 8L2 4" />
          </svg>
          Email
        </a>
        <a href="https://github.com/ivankusuma07" target="_blank" rel="noopener noreferrer" className="contact-link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/ivankusumaa/" target="_blank" rel="noopener noreferrer" className="contact-link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {new Date().getFullYear()} ivankusuma07 
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
