import { useState, useEffect } from 'react'
import PixelAvatar from './components/PixelAvatar'
import { useScrollReveal, useStaggerReveal } from './hooks/useScrollReveal'
import ShapeGrid from './components/reactbits/ShapeGrid'
import DecryptedText from './components/reactbits/DecryptedText'
import ClickSpark from './components/reactbits/ClickSpark'
import CountUp from './components/reactbits/CountUp'
import LogoLoop from './components/reactbits/LogoLoop'
import SpotlightCard from './components/reactbits/SpotlightCard'
import './App.css'

const sections = ['about', 'skills', 'experience', 'projects', 'contact']

const PIXEL_GLYPHS = '█▓▒░<>/\\[]{}#$01'

const skillRows = [
  [
    'Vue.js', 'Nuxt.js', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Electron.js',
    'Pinia', 'Vuex', 'Zustand', 'Tailwind CSS', 'GSAP', 'Supabase', 'Node.js',
    'GraphQL', 'REST API', 'WebSocket',
  ],
  [
    'Robinhood Chain', 'Solana', 'EVM', 'Uniswap v4', 'ERC-404', 'Alchemy',
    'Playwright', 'Vitest', 'Lighthouse', 'SEO', 'Accessibility', 'CI/CD',
    'Code Review', 'RBAC', '2FA', 'Biometric', 'Claude', 'Cursor', 'Figma MCP',
  ],
]

const experiences = [
  {
    role: 'Software Engineer',
    company: 'PT. Gemilang Pendidikan Nusantara (Wealthy People ID)',
    location: 'Indonesia (Remote)',
    date: 'September 2026 – Present',
    bullets: [
      'Built 7 Web3 products end-to-end across Robinhood Chain (Arbitrum Orbit L2), Solana, and EVM networks, with 5 launched or launch-ready on custom domains via Vercel.',
      'Developed REDSTRING, a multi-chain token supply analyzer that maps the top 250 holders, links related wallets through transfers, shared gas funders, and launch-block buys, and produces a shareable score.',
      'Built hood.exe, a memecoin launchpad for Robinhood Chain delivered as a full Windows XP Luna-style desktop interface.',
      'Built Vladar with Next.js 15 and React 19 — a live radar of Robinhood Chain tokens and liquidity pools aggregating CoinGecko, subgraph, and Alchemy data.',
      'Shipped VERACITY, a monthly public register rating tokenized-stock trading venues on Robinhood Chain mainnet.',
      'Building STAMPD, Mochipump (Solana + Live2D, token-gated content), and Arrowsmith (ERC-404 with on-chain art and a Uniswap v4 custom-hook pool).',
    ],
    impact: "Rapidly took multiple on-chain products from idea to public launch, expanding the company's Web3 portfolio across several chains.",
  },
  {
    role: 'Frontend Engineer',
    company: 'Accu3DX',
    location: 'Gyeonggi, South Korea (Remote)',
    date: 'April 2024 – May 2026',
    bullets: [
      'Architected and launched ViewTLab, a web-based dental lab and clinic dashboard powering patient and treatment management for an international clinic network.',
      'Designed and implemented Role-Based Access Control (RBAC) supporting multiple user roles and layered permissions.',
      'Built a Google Calendar-style reservation system with dynamic, conflict-aware scheduling logic.',
      'Developed a real-time WebSocket-based chat system enabling instant clinic-to-lab communication.',
      'Engineered a full project lifecycle module: prescriptions, activity logs, treatment tracking, order management, and team assignment.',
      'Improved landing page Accessibility from 86 to 100 and SEO from 83 to 92.',
      'Led code reviews and managed merge-to-production pipelines for a fully remote, async-first team.',
    ],
    impact: 'Delivered a scalable, multi-role architecture for a medical platform serving clinics and labs internationally.',
  },
  {
    role: 'Frontend Engineer',
    company: 'Privy',
    location: 'Bantul, Indonesia',
    date: 'August 2022 – August 2023',
    bullets: [
      'Maintained and enhanced the Liveness SDK powering identity verification across merchant integrations.',
      'Resolved merchant-reported SDK integration issues, reducing technical escalations.',
      'Implemented a third-party camera blacklist security feature to prevent SDK misuse.',
      'Developed OCR-based registration improvements streamlining onboarding flows.',
      'Built and released Two-Factor Authentication (Biometric + OTP).',
      'Conducted structured code reviews and managed production deployments.',
    ],
    impact: 'Improved security compliance and strengthened fraud prevention in a fintech-grade identity product.',
  },
  {
    role: 'Frontend Developer',
    company: 'MyDigilearn',
    location: 'Bandung, Indonesia',
    date: 'February 2022 – June 2022',
    bullets: [
      'Contributed to CMS architecture and feature development for a digital learning platform.',
      'Revamped the Pathways UI (video, podcast, and learning modules) to Version 3.',
      'Improved CMS usability across multiple menus, streamlining the content workflow.',
      'Identified and resolved critical and minor production bugs.',
    ],
    impact: 'Improved platform usability and content publishing efficiency.',
  },
  {
    role: 'Frontend Developer',
    company: 'Widya Robotics',
    location: 'Sleman, Indonesia',
    date: 'November 2018 – December 2021',
    bullets: [
      'Initiated adoption of Electron.js to power desktop apps (MyNitro, Load Scanner, UAV LiDAR).',
      'Built Matador Tracker, a GPS-based heavy equipment monitoring web app for construction projects.',
      'Integrated AI-powered CCTV systems into HSE dashboards for PPE compliance detection.',
      'Developed an automated gate access system triggered by AI-based PPE verification.',
      'Integrated a SmartWarehouse system with RFID APIs for automated inventory counting.',
    ],
    impact: 'Delivered AI-integrated industrial monitoring systems that improved operational visibility and automation.',
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
    desc: 'My portfolio page built with React, Vite, and GSAP, with interactive React Bits components powered by Motion. Retro pixel theme showcasing my skills, experience, and projects.',
    tech: ['React', 'Vite', 'GSAP', 'Motion', 'React Bits'],
    images: ['/images/16_my_portfolio_page.png'],
    links: {
      live: 'https://ivan-kusuma.netlify.app/',
      github: 'https://github.com/ivankusuma07/my-portfolio-page',
    },
    category: 'Web',
  },
  {
    title: 'Pattampa',
    desc: 'Digital wedding invitation SaaS — create personalized invitations with live preview, photo gallery management, RSVP & guest tracking, digital gifts, and background music. Features real-time editor with auto-save and shareable personal links.',
    tech: ['React', 'Next.js', 'Tailwind', 'Zod', 'Vitest', 'Supabase'],
    images: ['/images/17_pattampa_landing.png', '/images/18_pattampa_editor.png'],
    links: {
      live: 'https://pattampa-invitation-saas.vercel.app/',
    },
    category: 'Web',
  },
  {
    title: 'Vladar',
    desc: 'Parody community web app for Robinhood Chain. Its home "Scout" is a live radar of tokens and liquidity pools, pulling data from CoinGecko, a subgraph, or Alchemy and flagging pools with thin liquidity.',
    tech: ['Next.js 15', 'React 19', 'Robinhood Chain', 'Alchemy'],
    images: ['/images/19_vladar.png'],
    links: {
      live: 'https://www.vladar.site/',
    },
    category: 'Web3',
  },
  {
    title: 'STAMPD',
    desc: "Puts every crypto influencer's call on the record: a dated call on X becomes a YES/NO market, the crowd prices it, the chain settles it, and the receipt stays forever.",
    tech: ['Next.js', 'React', 'Robinhood Chain'],
    images: ['/images/20_stampd.png'],
    links: {
      live: 'https://www.stampd.tech/',
    },
    category: 'Web3',
  },
  {
    title: 'FOMOD',
    desc: '"Post your call. Get your card." A thesis-to-mint dynamic NFT on Robinhood Chain — each card records a market call and shows over time whether the call was right.',
    tech: ['Next.js', 'React', 'Dynamic NFT', 'Robinhood Chain'],
    images: ['/images/21_fomod.png'],
    links: {
      live: 'https://fomod-app.vercel.app/',
    },
    category: 'Web3',
  },
  {
    title: 'Veracity',
    desc: 'Monthly public register that rates every venue on Robinhood Chain where tokenized stocks trade, scoring how far each venue is from being a genuine stock venue rather than a memecoin launcher.',
    tech: ['Next.js', 'React', 'Robinhood Chain'],
    images: ['/images/22_veracity.png'],
    links: {
      live: 'https://useveracity.site',
    },
    category: 'Web3',
  },
  {
    title: 'hood.exe',
    desc: "Memecoin launchpad for Robinhood Chain (Arbitrum Orbit L2) with the whole interface built as a Windows XP Luna-style desktop — draggable windows, taskbar, and start menu.",
    tech: ['Next.js', 'React', 'Robinhood Chain'],
    images: ['/images/23_hoodexe.png'],
    links: {
      live: 'https://www.hoodexe.site/',
    },
    category: 'Web3',
  },
  {
    title: 'Mochipump',
    desc: 'Non-custodial market-watching app on Solana with a Live2D companion (Zundamon) beside live market data. Holding $MOCHI unlocks extra content via wallet sign-in — never asks to sign a transaction.',
    tech: ['Next.js', 'React', 'Live2D', 'Solana'],
    images: ['/images/25_mochipump.png'],
    links: {
      live: 'https://www.mochipump.fun/',
    },
    category: 'Web3',
  },
  {
    title: 'Redstring',
    desc: 'Token supply forensics across Robinhood Chain, Base, Ethereum, BNB Chain and Arbitrum. Paste a contract to map the top 250 holders, link wallets by transfers, shared gas funders, or same-block buys, and get a shareable score.',
    tech: ['Next.js', 'React', 'EVM', 'Data Viz'],
    images: ['/images/26_redstring.png'],
    links: {
      live: 'https://www.redstringmap.site/',
    },
    category: 'Web3',
  },
  {
    title: 'Arrowsmith',
    desc: 'Fair-launch ERC-404 collection on Robinhood Chain — every whole $SMITH is an on-chain arrow NFT that earns a share of buy fees. Trading runs through a Uniswap v4 pool with a custom hook and anti-sniper tax.',
    tech: ['Next.js', 'React', 'ERC-404', 'Uniswap v4'],
    images: ['/images/27_arrowsmith.png'],
    links: {
      live: 'https://arrowsmith-sigma.vercel.app/',
    },
    category: 'Web3',
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

function SectionTitle({ children }) {
  return (
    <h2 className="section-title">
      <DecryptedText
        text={children}
        animateOn="inViewHover"
        sequential
        speed={45}
        characters={PIXEL_GLYPHS}
        encryptedClassName="decrypt-glyph"
      />
    </h2>
  )
}

function Navbar() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {sections.map((s) => (
          <a key={s} href={`#${s}`} className={active === s ? 'active' : ''}>
            {s}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-grid">
        <ShapeGrid
          shape="square"
          cellSize={32}
          direction="diagonal"
          speed={0.25}
          lineColor="#d6d6d6"
          hoverColor="#1a1a1a"
          hoverFillColor="#1a1a1a"
          fillOpacity={0.12}
          radius={2}
          trail={0.5}
          glow={0}
        />
      </div>
      <div className="hero-content">
        <PixelAvatar />
        <h1>
          <TypeWriter text="> Ivan Kusuma Aulia" />
          <span className="cursor" />
        </h1>
        <p className="hero-subtitle">
          <DecryptedText
            text="Senior Frontend Engineer — Vue | Nuxt | React | Next.js | Web3"
            animateOn="inViewHover"
            sequential
            speed={30}
            characters={PIXEL_GLYPHS}
            encryptedClassName="decrypt-glyph"
          />
        </p>
        <p className="hero-tagline">
          7+ years building scalable web apps, SDKs, real-time systems — and now on-chain products
        </p>
        <div className="hero-links">
          <a href="#projects" className="pixel-btn pixel-btn-primary">View Work</a>
          <a href="#contact" className="pixel-btn">Contact Me</a>
        </div>
      </div>
      <p className="hero-hint">hover the grid · click anywhere</p>
    </section>
  )
}

const stats = [
  { to: 7, suffix: '+', label: 'Years Exp' },
  { to: projectsCount(), suffix: '+', label: 'Projects' },
  { to: 5, suffix: '', label: 'Companies' },
  { to: 3, suffix: '+', label: 'Chains Shipped' },
]

function projectsCount() {
  return Math.floor(projects.length / 5) * 5
}

function About() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} id="about" className="section about">
      <SectionTitle>About Me</SectionTitle>
      <div className="about-content">
        <p className="about-text">
          Senior Frontend Engineer based in Sukoharjo, Indonesia, with 7+ years of
          experience designing, building, and scaling production web applications —
          including 2+ years fully remote with a distributed team in South Korea.
          Deep specialization in Vue.js and Nuxt.js (5+ years), now shipping Web3
          products end-to-end on Robinhood Chain and Solana: launchpads, on-chain
          analytics, and wallet-connected apps.
        </p>
        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat-number">
                <CountUp to={s.to} suffix={s.suffix} duration={1.6} replayOnHover />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <SectionTitle>Skills</SectionTitle>
      <div className="skills-loops">
        {skillRows.map((row, i) => (
          <LogoLoop
            key={i}
            logos={row.map((s) => ({ node: <span className="skill-badge">{s}</span>, title: s }))}
            speed={i === 0 ? 50 : 40}
            direction={i === 0 ? 'left' : 'right'}
            logoHeight={20}
            gap={12}
            hoverSpeed={0}
            fadeOut
            fadeOutWidth={0.08}
            ariaLabel={i === 0 ? 'Frontend skills' : 'Web3, quality and tooling skills'}
          />
        ))}
      </div>
    </section>
  )
}

function ExperienceItem({ exp, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`timeline-item ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="timeline-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="timeline-toggle" aria-hidden="true">{open ? '[-]' : '[+]'}</span>
        <span className="timeline-head-text">
          <span className="timeline-role">{exp.role}</span>
          <span className="timeline-company">{exp.company}</span>
          <span className="timeline-meta">
            {exp.date} · {exp.location}
          </span>
        </span>
      </button>
      <p className="timeline-impact">{exp.impact}</p>
      <div className="timeline-body">
        <ul className="timeline-bullets">
          {exp.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Experience() {
  const timelineRef = useStaggerReveal(experiences.length, { stagger: 0.15 })
  return (
    <section id="experience" className="section experience">
      <SectionTitle>Experience</SectionTitle>
      <div ref={timelineRef} className="timeline">
        {experiences.map((exp, i) => (
          <ExperienceItem key={exp.company} exp={exp} defaultOpen={i === 0} />
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

const CATEGORY_ORDER = ['Web3', 'Web', 'SDK', 'Desktop']
const projectCategories = [
  'All',
  ...[...new Set(projects.map((p) => p.category))].sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  ),
]

function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = (filter === 'All' ? projects : projects.filter((p) => p.category === filter))
    .slice()
    .reverse()
  const gridRef = useStaggerReveal(`${filter}-${visible.length}`, { stagger: 0.06, y: 40 })
  return (
    <section id="projects" className="section">
      <SectionTitle>Projects</SectionTitle>
      <div className="project-filters" role="tablist" aria-label="Filter projects by category">
        {projectCategories.map((c) => {
          const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={filter === c}
              className={`filter-btn ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c} <span className="filter-count">{count}</span>
            </button>
          )
        })}
      </div>
      <div ref={gridRef} className="projects-grid">
        {visible.map((p) => (
          <SpotlightCard
            key={p.title}
            className="project-card"
            theme="light"
            spotlightColor="rgba(26, 26, 26, 0.18)"
            spotlightSize={220}
            flare={false}
          >
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
          </SpotlightCard>
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
    <ClickSpark
      className="app"
      sparkColor="#1a1a1a"
      sparkSize={10}
      sparkRadius={22}
      sparkCount={8}
      sparkWidth={3}
      duration={420}
    >
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </ClickSpark>
  )
}
