import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Heart,
  Mail,
  Menu,
  MousePointer2,
  Sparkles,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, type MotionProps, type Variants } from 'framer-motion'
import { navigation, profile } from './portfolio'

const appear: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}

function HeroPortrait() {
  return (
    <img
      className="hero-photo"
      src="/images/bhargavi-hero.webp"
      alt="Bhargavi Ravulapally beside a car overlooking a city at dusk"
      fetchPriority="high"
      decoding="async"
    />
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const motionProps: MotionProps = {
    initial: shouldReduceMotion ? false : 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.16 },
    variants: appear,
  }

  const emailHref = profile.email ? `mailto:${profile.email}` : undefined
  const hasResume = Boolean(profile.resumePath)
  const activeProjectData = profile.projects.find((project) => project.title === activeProject)

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (!activeProject) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialogRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null)
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable.item(0)
      const last = focusable.item(focusable.length - 1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [activeProject])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        {!shouldReduceMotion && <motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} aria-hidden="true" />}
        <a className="brand" href="#home" aria-label="Bhargavi Ravulapally, home">{profile.monogram}</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={15} /></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}<ArrowUpRight size={15} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <HeroPortrait />
          <div className="hero-overlay" />
          <div className="hero-speed" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="hero-content">
            <motion.div
              className="hero-copy"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              <p className="hero-kicker"><span /> Developer portfolio <span className="kicker-line" /> 2026</p>
              <p className="hero-pretitle">The next chapter starts with an idea.</p>
              <h1 id="hero-title">BHARGAVI<br /><span>RAVULAPALLY</span><b>.</b></h1>
              <p className="hero-tagline">{profile.tagline}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore my work <ArrowDownRight size={17} /></a>
                {hasResume ? (
                  <a className="button button-ghost" href={profile.resumePath} download>Download resume <ArrowDown size={16} /></a>
                ) : (
                  <button className="button button-ghost" type="button" disabled title="Add the genuine resume PDF path in src/portfolio.ts">
                    Resume PDF pending <ArrowDown size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
          <div className="hero-index"><span>01</span><i /> 05</div>
          <a className="scroll-cue" href="#about"><span>Scroll to discover</span><ChevronDown size={15} /></a>
          <div className="hero-caption">AN ORIGINAL DIGITAL PORTRAIT <span>—</span> NO FILM ASSETS</div>
        </section>

        <section className="intro-section section-shell" id="about">
          <motion.div className="intro-index" {...motionProps}>
            <span className="eyebrow"><span className="eyebrow-dot" /> 01 / A little about me</span>
            <div className="intro-stamp"><span>IT</span><i>student<br />2023—27</i></div>
          </motion.div>
          <motion.div className="intro-copy" {...motionProps}>
            <h2>Curious by nature.<br /><em>Developer by choice.</em></h2>
            <p>{profile.about}</p>
            <a className="text-link" href="#journey">A little more about my journey <ArrowRight size={16} /></a>
          </motion.div>
          <motion.aside className="intro-aside" {...motionProps}>
            <figure className="about-portrait">
              <img
                src="/images/bhargavi-about.webp"
                alt="Portrait of Bhargavi Ravulapally"
                loading="lazy"
                decoding="async"
              />
              <figcaption>BHARGAVI / PORTRAIT</figcaption>
            </figure>
            <div className="aside-note">
            <Sparkles size={19} />
            <p>Good work starts with paying attention—to people, details, and the small things that make an experience feel right.</p>
            <span className="aside-signoff">— BHARGAVI</span>
            </div>
          </motion.aside>
        </section>

        <section className="skills-section section-shell" id="skills">
          <motion.div {...motionProps}>
            <SectionHeading eyebrow="02 / My toolkit" title={<>Good ideas need<br /><em>the right tools.</em></>} subtitle="A growing toolkit for taking ideas from first sketch to working software." />
          </motion.div>
          <div className="skills-grid">
            {profile.skills.map((category, index) => (
              <motion.article className="skill-card" key={category.name} {...motionProps} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}>
                <div className="skill-card-top"><span>0{index + 1}</span><Code2 size={17} /></div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <div className="skill-tags">
                  {category.items.length > 0
                    ? category.items.map((skill) => <span key={skill}>{skill}</span>)
                    : <span className="skill-placeholder">Add verified skills in portfolio data</span>}
                </div>
              </motion.article>
            ))}
          </div>
          <div className="skills-footnote"><span className="footnote-mark">+</span> Always learning. Always building.</div>
        </section>

        <section className="projects-section section-shell" id="projects">
          <motion.div className="projects-heading" {...motionProps}>
            <SectionHeading eyebrow="03 / Selected work" title={<>Ideas, meet<br /><em>implementation.</em></>} subtitle="A couple of projects from my learning journey." />
            <span className="project-count">02 <i>PROJECTS</i></span>
          </motion.div>
          <div className="project-list">
            {profile.projects.map((project, index) => (
              <motion.article className={`project-card project-${project.accent}`} key={project.number} {...motionProps}>
                <div className="project-art" aria-hidden="true">
                  <div className="art-grid" />
                  <span className="art-orbit art-orbit-one" />
                  <span className="art-orbit art-orbit-two" />
                  <div className="art-window">
                    <div className="art-window-bar"><i /><i /><i /><span>{project.number} / PROJECT</span></div>
                    {index === 0 ? (
                      <div className="portal-art">
                        <div className="portal-sidebar"><b>STUDENT<br />SPACE</b><i /><i /><i /></div>
                        <div className="portal-content"><span>COMMUNITY / 01</span><b>Ideas grow<br />when shared.</b><i /><i /><i /></div>
                      </div>
                    ) : (
                      <div className="expense-art">
                        <span>OVERVIEW / THIS MONTH</span><b>₹ —</b><i>SPENDING</i>
                        <div className="expense-bars"><i /><i /><i /><i /><i /><i /><i /></div>
                        <div className="expense-line"><i /><i /><i /><i /></div>
                      </div>
                    )}
                  </div>
                  <span className="art-label">{index === 0 ? 'COMMUNITY / CONNECTION' : 'PERSONAL / CLARITY'}</span>
                </div>
                <div className="project-info">
                  <div className="project-meta"><span>{project.number} / {project.category}</span><span>—</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="project-bottom">
                    <div className="project-tech">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <button className="round-arrow" type="button" aria-label={`Read about ${project.title}`} onClick={() => setActiveProject(project.title)}>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="project-disclaimer"><MousePointer2 size={14} /> Project descriptions and technologies are editable in <code>src/portfolio.ts</code>; no demo or repository links have been supplied.</p>
        </section>

        <section className="journey-section section-shell" id="journey">
          <motion.div {...motionProps}>
            <SectionHeading eyebrow="04 / The journey so far" title={<>Learning is<br /><em>the long game.</em></>} subtitle="Every chapter adds a new perspective." />
          </motion.div>
          <div className="journey-layout">
            <div className="education-list">
              {profile.education.map((education, index) => (
                <motion.article className={`education-item ${education.current ? 'education-current' : ''}`} key={education.institution} {...motionProps}>
                  <div className="education-marker"><span>{education.current ? <span className="marker-pulse" /> : `0${index + 1}`}</span></div>
                  <div className="education-detail">
                    <div className="education-top"><span>{education.dates}</span>{education.current && <span className="current-badge">IN PROGRESS</span>}</div>
                    <h3>{education.degree}</h3>
                    <p>{education.institution}</p>
                    <span className="education-result">{education.result}</span>
                  </div>
                </motion.article>
              ))}
            </div>
            <motion.aside className="journey-aside" {...motionProps}>
              <GraduationCap size={25} strokeWidth={1.4} />
              <span className="eyebrow">A NOTE TO SELF</span>
              <p>Stay curious. Keep showing up. Let the work speak.</p>
              <span className="journey-location">INFORMATION TECHNOLOGY / 2023—27</span>
            </motion.aside>
          </div>
        </section>

        <section className="more-section section-shell">
          <motion.div className="cert-panel" {...motionProps}>
            <div className="more-panel-heading">
              <div><span className="eyebrow"><span className="eyebrow-dot" /> 05 / Learning beyond class</span><h2>Credentials &amp;<br /><em>curiosity.</em></h2></div>
              <Award size={24} strokeWidth={1.3} />
            </div>
            {profile.certifications.length > 0 ? (
              <ul className="cert-list">
                {profile.certifications.map((cert) => (
                  <li key={`${cert.name}-${cert.issuer}`}><span className="cert-check"><Check size={13} /></span><span><b>{cert.name}</b><small>{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</small></span><ArrowUpRight size={15} /></li>
                ))}
              </ul>
            ) : (
              <div className="empty-note"><span className="empty-note-number">—</span><p>Certification details haven’t been supplied yet.<br /><small>Add the five verified entries in <code>src/portfolio.ts</code>.</small></p></div>
            )}
          </motion.div>
          <motion.div className="strength-panel" {...motionProps}>
            <span className="eyebrow"><span className="eyebrow-dot" /> 06 / How I work</span>
            <h2>Strengths<br /><em>in practice.</em></h2>
            <p>More than a list—these are habits I try to bring to every challenge.</p>
            {profile.strengths.length > 0 ? (
              <div className="strength-list">{profile.strengths.map((strength, index) => <span key={strength}><i>0{index + 1}</i>{strength}</span>)}</div>
            ) : (
              <div className="empty-note"><span className="empty-note-number">—</span><p>Add personal strengths to <code>src/portfolio.ts</code>.</p></div>
            )}
          </motion.div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <motion.div className="contact-inner section-shell" {...motionProps}>
            <span className="eyebrow"><span className="eyebrow-dot" /> 07 / The next move</span>
            <p className="contact-pretitle">Have a good idea?</p>
            <h2>Let’s make<br /><em>something matter.</em></h2>
            <p className="contact-copy">Open to learning, collaborating, and building something thoughtful together.</p>
            {emailHref ? (
              <a className="button button-primary contact-button" href={emailHref}>Start a conversation <ArrowUpRight size={17} /></a>
            ) : (
              <a className="button button-primary contact-button" href="#contact-links">Contact details pending <ArrowDownRight size={17} /></a>
            )}
            <div className="contact-links" id="contact-links">
              {profile.email ? <a href={emailHref}><Mail size={16} /> Email <ArrowUpRight size={14} /></a> : <span><Mail size={16} /> Add email in portfolio data</span>}
              {profile.links.github ? <a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ExternalLink size={13} /></a> : <span><Github size={16} /> Add GitHub in portfolio data</span>}
              {profile.links.linkedin ? <a href={profile.links.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={16} /> LinkedIn <ExternalLink size={13} /></a> : <span><BriefcaseBusiness size={16} /> Add LinkedIn in portfolio data</span>}
            </div>
          </motion.div>
          <div className="contact-giant" aria-hidden="true">BR.</div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">{profile.monogram}</a>
        <span>Designed with intention. Built with curiosity.</span>
        <span className="footer-credit">© {new Date().getFullYear()} {profile.name} <Heart size={12} /></span>
      </footer>

      <AnimatePresence>
        {activeProjectData && (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.section
              className="project-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              ref={dialogRef}
              tabIndex={-1}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="modal-close" type="button" aria-label="Close project details" onClick={() => setActiveProject(null)}><X size={19} /></button>
              <span className="eyebrow"><span className="eyebrow-dot" /> {activeProjectData.number} / {activeProjectData.category}</span>
              <h2 id="project-dialog-title">{activeProjectData.title}</h2>
              <p>{activeProjectData.summary}</p>
              <div className="modal-note"><span>PROJECT NOTE</span>{activeProjectData.note}</div>
              <div className="project-tech">{activeProjectData.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
