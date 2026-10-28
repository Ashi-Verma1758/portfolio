import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Activity, ArrowUpRight, BarChart3, BatteryMedium, Check, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, Code2, Download, ExternalLink, FileText, Folder, Globe2, Grid2X2,
  HeartPulse, Layers3, Mail, Maximize2, Menu, Minus, Monitor, Move, Network, PanelTop,
  Power, Search, Send, Server, Settings2, ShieldCheck, Sparkles, Terminal as TerminalIcon, UserRound, Wifi,
  X, Zap, AtSign, BookOpen, MapPin, Command,
} from 'lucide-react'
import { apps, appById, profile, projects, skills } from './data'

const bootLines = [
  'ASHIOS v1.0',
  'Initializing workspace...',
  'Loading developer profile...',
  'Preparing project index...',
  'Starting portfolio services...',
  'System ready.',
]

const iconMap = { user: UserRound, folder: Folder, sparkles: Sparkles, file: FileText, layers: Layers3, chart: BarChart3, terminal: TerminalIcon, mail: Mail }
const Github = Code2
const Linkedin = Network
const colorMap = { cyan: '#5eead4', violet: '#a78bfa', amber: '#fbbf24', rose: '#fb7185', blue: '#60a5fa', emerald: '#34d399', slate: '#cbd5e1' }

function AppIcon({ app, size = 'normal' }) {
  const Icon = iconMap[app.icon] || Command
  return <span className={`app-icon app-icon-${app.color} ${size === 'small' ? 'app-icon-small' : ''}`}><Icon size={size === 'small' ? 16 : 19} strokeWidth={1.8} /></span>
}

function BootScreen({ onDone }) {
  const [line, setLine] = useState(0)
  const prefersReduced = useReducedMotion()
  useEffect(() => {
    if (prefersReduced) return undefined
    const timer = setInterval(() => setLine((value) => Math.min(value + 1, bootLines.length - 1)), 390)
    const finish = setTimeout(onDone, 2600)
    return () => { clearInterval(timer); clearTimeout(finish) }
  }, [onDone, prefersReduced])
  return <motion.main className="boot-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: .5 }}>
    <div className="boot-grid" />
    <div className="boot-card">
      <div className="boot-mark"><span>A</span><i /></div>
      <p className="eyebrow">Developer workspace / boot sequence</p>
      <h1>Ashi<span>OS</span></h1>
      <p className="boot-version">v1.0 · Engineering Ideas into Reality</p>
      <div className="boot-log" aria-live="polite">
        {bootLines.slice(0, line + 1).map((item, index) => <div key={item} className={index === line ? 'current' : ''}><span>{index === line ? '›' : '✓'}</span>{item}</div>)}
      </div>
      <div className="boot-progress"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(16, ((line + 1) / bootLines.length) * 100)}%` }} transition={{ duration: .3 }} /></div>
      <div className="boot-footer"><span><i className="status-dot" /> System ready</span><button onClick={onDone}>Skip intro <ArrowUpRight size={14} /></button></div>
    </div>
  </motion.main>
}

function DesktopIcon({ app, onOpen }) {
  return <button className="desktop-icon" onClick={() => onOpen(app.id)} aria-label={`Open ${app.label}`}><AppIcon app={app} /><span>{app.label}</span><small>{app.group}</small></button>
}

function Window({ windowState, children, onFocus, onClose, onMinimize, onMaximize, onMove }) {
  const { app, isMaximized, zIndex, position } = windowState
  const [drag, setDrag] = useState(null)
  const headerRef = useRef(null)
  useEffect(() => {
    if (!drag) return undefined
    const move = (event) => onMove(windowState.id, { x: drag.x + event.clientX - drag.startX, y: drag.y + event.clientY - drag.startY })
    const up = () => setDrag(null)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  }, [drag, onMove, windowState.id])
  const startDrag = (event) => {
    if (isMaximized || event.target.closest('button')) return
    event.currentTarget.setPointerCapture?.(event.pointerId)
    setDrag({ startX: event.clientX, startY: event.clientY, x: position.x, y: position.y })
  }
  const style = isMaximized ? { zIndex } : { zIndex, left: position.x, top: position.y, width: `min(${app.defaultSize.width}px, calc(100vw - 32px))`, height: `min(${app.defaultSize.height}px, calc(100dvh - 108px))` }
  return <motion.section className={`window ${isMaximized ? 'window-maximized' : ''}`} style={style} initial={{ opacity: 0, scale: .96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .17 }} onMouseDown={() => onFocus(windowState.id)} role="dialog" aria-label={app.label}>
    <header className="window-titlebar" ref={headerRef} onPointerDown={startDrag}>
      <div className="window-title"><AppIcon app={app} size="small" /><span>{app.label}</span><em>running</em></div>
      <div className="window-controls"><button onClick={() => onMinimize(windowState.id)} aria-label={`Minimize ${app.label}`}><Minus size={14} /></button><button onClick={() => onMaximize(windowState.id)} aria-label={`${isMaximized ? 'Restore' : 'Maximize'} ${app.label}`}>{isMaximized ? <PanelTop size={13} /> : <Maximize2 size={13} />}</button><button className="close" onClick={() => onClose(windowState.id)} aria-label={`Close ${app.label}`}><X size={14} /></button></div>
    </header>
    <div className="window-content">{children}</div>
  </motion.section>
}

function SectionHeading({ kicker, title, description, action }) {
  return <div className="section-heading"><div><p className="eyebrow">{kicker}</p><h2>{title}</h2>{description && <p className="muted">{description}</p>}</div>{action}</div>
}

function AboutApp({ open }) {
  return <div className="app-page about-page"><div className="about-intro"><div className="avatar">AV</div><div><p className="eyebrow">Profile / 01</p><h2>Hi, I’m Ashi.</h2><p className="muted">I like turning ambiguous ideas into software that feels calm, clear, and useful.</p></div></div><div className="about-grid"><div className="info-card wide"><span className="card-label">Currently exploring</span><strong>Full-stack systems &amp; applied AI</strong><p>Strong foundations in DSA and software engineering, with a growing interest in AI/ML and generative AI.</p></div><div className="info-card"><span className="card-label">Education</span><strong>DIT University</strong><p>Computer Science &amp; Engineering</p></div></div><div className="quote-card"><span>“</span><p>My goal is to build useful software with thoughtful interfaces and a strong engineering backbone.</p></div><div className="app-actions"><a className="button button-primary" href={profile.resume} target="_blank" rel="noreferrer">Open resume <ArrowUpRight size={14} /></a><button className="button" onClick={() => open('contact')}>Get in touch <Mail size={14} /></button></div></div>
}

function ProjectsApp({ open }) {
  const [selected, setSelected] = useState(projects[0])
  return <div className="app-page projects-page"><div className="projects-sidebar"><div className="sidebar-top"><span className="card-label">Workspace</span><span className="tiny-count">{projects.length} entries</span></div>{projects.map((project, index) => <button key={project.id} className={`project-row ${selected.id === project.id ? 'selected' : ''}`} onClick={() => setSelected(project)}><span className={`project-number project-${project.accent}`}>0{index + 1}</span><span><strong>{project.name}</strong><small>{project.type}</small></span><ChevronRight size={14} /></button>)}</div><div className="project-detail"><div className="detail-top"><div><p className="eyebrow">Project / {selected.id}</p><h2>{selected.name}</h2><p className="muted">{selected.type}</p></div><span className={`status-pill status-${selected.accent}`}><i />{selected.status}</span></div><div className="project-highlight"><div className={`project-glyph glyph-${selected.accent}`}><Code2 size={34} /></div><div><span className="card-label">The problem</span><p>{selected.problem}</p></div></div><div className="detail-grid"><div><span className="card-label">What it is</span><p>{selected.purpose}</p></div><div><span className="card-label">My contribution</span><p>{selected.contribution}</p></div><div><span className="card-label">Engineering note</span><p>{selected.decisions}</p></div></div><div className="stack-row">{selected.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="app-actions"><a className="button button-primary" href={selected.repo} target="_blank" rel="noreferrer"><Github size={14} /> Repository <ExternalLink size={13} /></a>{selected.demo ? <a className="button" href={selected.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} /></a> : <button className="button" onClick={() => open('contact')}>Ask about this build <ArrowUpRight size={14} /></button>}</div></div></div>
}

function SkillsApp() {
  const [active, setActive] = useState('Frontend')
  const categories = Object.keys(skills)
  return <div className="app-page skills-page"><SectionHeading kicker="Toolkit / 06" title="Skills with context." description="A working set of tools, grounded in the projects above." /><div className="skills-layout"><nav className="skill-tabs" aria-label="Skill categories">{categories.map((category) => <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}><span>{String(categories.indexOf(category) + 1).padStart(2, '0')}</span>{category}<ChevronRight size={14} /></button>)}</nav><div className="skill-list"><div className="skill-list-head"><span className="card-label">Category</span><strong>{active}</strong><span className="tiny-count">{skills[active].length} tools</span></div>{skills[active].map((skill) => <div className="skill-item" key={skill}><span className="skill-check"><Check size={13} /></span><span>{skill}</span><small>{active === 'Core computer science' ? 'foundation' : 'used in projects'}</small></div>)}</div></div></div>
}

function ResumeApp() {
  return <div className="app-page resume-page"><div className="resume-banner"><div className="file-preview"><FileText size={26} /></div><div><p className="eyebrow">Profile / 04</p><h2>Ashi Verma · Resume</h2><p className="muted">Add your verified PDF to <code>public/resume.pdf</code> to enable the embedded preview.</p></div></div><div className="resume-empty"><FileText size={32} /><strong>Resume preview is ready for your file</strong><p>This portfolio intentionally does not fabricate a resume. Once the real PDF is added, it will appear here for recruiters.</p><div className="app-actions"><a className="button button-primary" href={profile.resume} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Open PDF</a><a className="button" href={profile.resume} download><Download size={14} /> Download</a></div></div></div>
}

function StatsApp() {
  const [state, setState] = useState('idle')
  const [data, setData] = useState(null)
  const load = async () => { setState('loading'); try { const response = await fetch(`https://api.github.com/users/${profile.githubUsername}`); if (!response.ok) throw new Error('GitHub profile unavailable'); setData(await response.json()); setState('ready') } catch { setState('error') } }
  useEffect(() => { if (profile.githubUsername !== 'YOUR_GITHUB_USERNAME') load() }, [])
  const metrics = data ? [['Public repos', data.public_repos], ['Followers', data.followers], ['Following', data.following]] : [['Public repos', '—'], ['Followers', '—'], ['Following', '—']]
  return <div className="app-page stats-page"><SectionHeading kicker="Signals / 06" title="Activity, honestly measured." description="A small live adapter for public GitHub profile data." /><div className="stats-metrics">{metrics.map(([label, value]) => <div className="metric" key={label}><span className="card-label">{label}</span><strong>{value}</strong></div>)}</div><div className={`api-notice ${state === 'ready' ? 'notice-ready' : ''}`}><div className="notice-icon">{state === 'ready' ? <Check size={17} /> : <Activity size={17} />}</div><div><strong>{state === 'loading' ? 'Connecting to GitHub…' : state === 'ready' ? `Connected to @${profile.githubUsername}` : state === 'error' ? 'GitHub data could not be loaded' : 'Live data is not configured yet'}</strong><p>{state === 'idle' ? 'Set githubUsername in src/data.js to connect this panel. Nothing is fabricated in the meantime.' : state === 'error' ? 'The public endpoint may be rate-limited. Try again later or visit the profile directly.' : state === 'ready' ? 'Public profile counts are shown above. Repository language data can be added next.' : 'Fetching public profile information.'}</p></div></div><div className="stats-footer"><a className="button button-primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> View GitHub <ArrowUpRight size={14} /></a>{state === 'idle' || state === 'error' ? <button className="button" onClick={load}>Try connection <Zap size={14} /></button> : null}</div></div>
}

function TerminalApp({ open }) {
  const [history, setHistory] = useState([{ type: 'system', text: 'AshiOS terminal · simulated environment\nType “help” to see available commands.' }])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const commands = useMemo(() => ({ help: () => 'Available: about  skills  projects  experience  education  github  resume  contact  clear  date  whoami', about: () => `${profile.name} — ${profile.role}.\n${profile.focus}.`, skills: () => Object.values(skills).flat().join(' · '), projects: () => projects.map((project) => `• ${project.name} — ${project.status}`).join('\n'), experience: () => 'Project-based experience in frontend and full-stack development. See Projects.exe for evidence.', education: () => profile.education, github: () => profile.github, resume: () => `${profile.resume}\nAdd the verified file to public/resume.pdf to enable it.`, contact: () => `${profile.email}\n${profile.linkedin}`, date: () => new Date().toLocaleString(), whoami: () => 'recruiter@ashios:~$', clear: () => '' }), [])
  const execute = (value = input) => { const command = value.trim().toLowerCase(); if (!command) return; if (command === 'clear') { setHistory([]); setInput(''); return } const response = commands[command] ? commands[command]() : `Command not found: ${command}. Type “help” for available commands.`; setHistory((items) => [...items, { type: 'input', text: command }, { type: 'output', text: response }]); setCommandHistory((items) => [...items, command]); setHistoryIndex(-1); setInput('') }
  const onKeyDown = (event) => { if (event.key === 'Enter') execute(); if (event.key === 'ArrowUp') { event.preventDefault(); const next = commandHistory.length - 1 - Math.max(0, historyIndex + 1); if (commandHistory[next]) { setInput(commandHistory[next]); setHistoryIndex(historyIndex + 1) } } if (event.key === 'ArrowDown') { event.preventDefault(); const next = historyIndex - 1; setInput(next >= 0 ? commandHistory[commandHistory.length - 1 - next] || '' : ''); setHistoryIndex(next) } }
  return <div className="terminal-app" onClick={() => inputRef.current?.focus()}><div className="terminal-toolbar"><span><i />ashios shell</span><span>simulated · safe mode</span></div><div className="terminal-output">{history.map((item, index) => item.type === 'input' ? <div className="terminal-line input-line" key={`${item.text}-${index}`}><span>ashios@portfolio:~$</span> {item.text}</div> : <div className={`terminal-line ${item.type}`} key={`${item.text}-${index}`}>{item.text.split('\n').map((line, lineIndex) => <div key={lineIndex}>{line}</div>)}</div>)}<div className="terminal-line input-line active"><span>ashios@portfolio:~$</span><input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={onKeyDown} aria-label="Terminal command" autoFocus /><span className="cursor" /></div></div><div className="terminal-hint">↑↓ history <span>·</span> Enter execute <span>·</span> <button onClick={() => open('ask')}>ask assistant</button></div></div>
}

function AskAshiApp() {
  const starter = ['Tell me about Ashi', 'What has she built?', 'Which technologies does she use?']
  const [messages, setMessages] = useState([{ from: 'ashi', text: 'Hey — I’m a local portfolio assistant. Ask me about Ashi’s projects, toolkit, or how to connect.' }])
  const [input, setInput] = useState('')
  const answer = (question) => { const q = question.toLowerCase(); if (q.includes('project') || q.includes('built') || q.includes('unimate') || q.includes('carefinder')) return `Ashi’s current project set includes ${projects.map((project) => project.name).join(', ')}. Unimate explores student collaboration, while CareFinder looks at clearer healthcare availability information.`; if (q.includes('tech') || q.includes('skill') || q.includes('stack')) return `Her toolkit spans ${Object.values(skills).flat().slice(0, 12).join(', ')}, with a focus on frontend systems, full-stack fundamentals, and strong CS foundations.`; if (q.includes('resume')) return 'The resume viewer is ready at Resume.pdf. Add the verified PDF to public/resume.pdf to make the file available.'; if (q.includes('contact') || q.includes('reach')) return `The configured contact points are ${profile.email} and LinkedIn. Use Contact.exe for the direct links.`; if (q.includes('experience') || q.includes('strong')) return 'Her strongest relevant experience is project-based: turning product ideas into responsive frontend and full-stack builds while learning the reasoning behind the systems.'; return `Ashi is a Computer Science & Engineering student at DIT University focused on ${profile.focus.toLowerCase()}. Try asking about projects, skills, resume, or contact.` }
  const ask = (value = input) => { if (!value.trim()) return; setMessages((items) => [...items, { from: 'you', text: value }, { from: 'ashi', text: answer(value) }]); setInput('') }
  return <div className="app-page ask-page"><div className="assistant-head"><div className="assistant-orb"><Sparkles size={22} /></div><div><p className="eyebrow">Local assistant / grounded data</p><h2>AskAshi</h2><p className="muted">Recruiter-ready answers, without invented facts.</p></div><span className="online-pill"><i />online</span></div><div className="chat-messages">{messages.map((message, index) => <div key={`${message.from}-${index}`} className={`chat-message ${message.from}`}><span className="message-avatar">{message.from === 'ashi' ? 'A' : 'Y'}</span><p>{message.text}</p></div>)}</div><div className="starter-prompts">{starter.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<ArrowUpRight size={13} /></button>)}</div><form className="chat-form" onSubmit={(event) => { event.preventDefault(); ask() }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a project, skill, or next step…" aria-label="Ask Ashi a question" /><button type="submit" aria-label="Send question"><Send size={16} /></button></form></div>
}

function ContactApp() {
  const contacts = [{ label: 'Email', value: profile.email, icon: AtSign, href: `mailto:${profile.email}` }, { label: 'GitHub', value: 'github.com/Ashi-Verma1758', icon: Github, href: profile.github }, { label: 'LinkedIn', value: 'linkedin.com/in/ashi-verma-aa8b41230', icon: Linkedin, href: profile.linkedin }]
  return <div className="app-page contact-page"><div className="contact-title"><p className="eyebrow">Connect / 08</p><h2>Let’s build something useful.</h2><p className="muted">For opportunities, collaborations, or a thoughtful technical conversation.</p></div><div className="contact-list">{contacts.map(({ label, value, icon: Icon, href }) => <a key={label} className="contact-row" href={href} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer"><span className="contact-icon"><Icon size={18} /></span><span><small>{label}</small><strong>{value}</strong></span><ArrowUpRight size={16} /></a>)}</div><div className="contact-note"><MapPin size={15} /><span>Based in India · Open to software engineering and AI/ML opportunities.</span></div></div>
}

function Taskbar({ openIds, activeId, onOpen, onLauncher }) {
  const [time, setTime] = useState(new Date())
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer) }, [])
  return <footer className="taskbar"><button className="brand-button" onClick={onLauncher} aria-label="Open app launcher"><span className="mini-mark">A</span><span className="brand-copy"><strong>AshiOS</strong><small>v1.0</small></span></button><div className="task-apps">{apps.slice(0, 6).map((app) => <button key={app.id} className={`task-app ${activeId === app.id ? 'active' : ''} ${openIds.includes(app.id) ? 'running' : ''}`} onClick={() => onOpen(app.id)} aria-label={`Open ${app.label}`}><AppIcon app={app} size="small" /><i /></button>)}</div><div className="system-tray"><span className="tray-item"><Wifi size={14} /> <span>safe mode</span></span><span className="tray-item"><BatteryMedium size={15} /> <span>simulated</span></span><time>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<small>{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</small></time></div></footer>
}

function Launcher({ onOpen, onClose }) {
  return <motion.div className="launcher-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="launcher" initial={{ opacity: 0, y: 20, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()}><div className="launcher-head"><div><p className="eyebrow">AshiOS / applications</p><h2>Open a workspace</h2></div><button className="icon-button" onClick={onClose} aria-label="Close launcher"><X size={17} /></button></div><div className="launcher-grid">{apps.map((app) => <button key={app.id} className="launcher-app" onClick={() => { onOpen(app.id); onClose() }}><AppIcon app={app} /><span><strong>{app.label}</strong><small>{app.group}</small></span><ArrowUpRight size={14} /></button>)}</div><div className="launcher-footer"><span><Command size={13} /> + K</span><span>Use the desktop or taskbar anytime</span></div></motion.div></motion.div>
}

function Desktop() {
  const [windows, setWindows] = useState([{ id: 'about', isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 96, y: 74 } }])
  const [launcher, setLauncher] = useState(false)
  const [nextZ, setNextZ] = useState(20)
  const prefersReduced = useReducedMotion()
  const focus = useCallback((id) => { setNextZ((z) => z + 1); setWindows((items) => items.map((item) => item.id === id ? { ...item, isMinimized: false, zIndex: nextZ } : item)) }, [nextZ])
  const open = useCallback((id) => { const existing = windows.find((item) => item.id === id); if (existing) { focus(id); return } const offset = windows.length * 28; const app = appById[id]; setNextZ((z) => z + 1); setWindows((items) => [...items, { id, isMinimized: false, isMaximized: false, zIndex: nextZ, position: { x: Math.min(120 + offset, 280), y: Math.min(82 + offset, 170) }, app }]) }, [focus, nextZ, windows])
  const close = (id) => setWindows((items) => items.filter((item) => item.id !== id))
  const minimize = (id) => setWindows((items) => items.map((item) => item.id === id ? { ...item, isMinimized: true } : item))
  const maximize = (id) => setWindows((items) => items.map((item) => item.id === id ? { ...item, isMaximized: !item.isMaximized } : item))
  const move = useCallback((id, position) => setWindows((items) => items.map((item) => item.id === id ? { ...item, position: { x: Math.max(12, Math.min(position.x, window.innerWidth - 240)), y: Math.max(12, Math.min(position.y, window.innerHeight - 150)) } } : item)), [])
  const renderApp = (id) => { const props = { open }; return ({ about: <AboutApp {...props} />, projects: <ProjectsApp {...props} />, skills: <SkillsApp />, resume: <ResumeApp />, stats: <StatsApp />, terminal: <TerminalApp {...props} />, ask: <AskAshiApp />, contact: <ContactApp /> })[id] }
  useEffect(() => { const onKey = (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setLauncher((value) => !value) } if (event.key === 'Escape') setLauncher(false) }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
  return <main className="desktop-shell"><div className="wallpaper"><div className="wallpaper-grid" /><div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="wallpaper-monogram">A</div><div className="wallpaper-copy"><p className="eyebrow">AshiOS / private workspace</p><h1>Engineering ideas<br /><span>into reality.</span></h1><p>Interactive developer portfolio · {new Date().getFullYear()}</p></div><div className="wallpaper-status"><span><i className="status-dot" /> all systems nominal</span><span>08 / 08 apps ready</span></div></div><div className="desktop-icons">{apps.map((app) => <DesktopIcon app={app} onOpen={open} key={app.id} />)}</div><AnimatePresence>{windows.filter((windowState) => !windowState.isMinimized).map((windowState) => <Window key={windowState.id} windowState={{ ...windowState, app: appById[windowState.id] }} onFocus={focus} onClose={close} onMinimize={minimize} onMaximize={maximize} onMove={move}>{renderApp(windowState.id)}</Window>)}</AnimatePresence><Taskbar openIds={windows.map((item) => item.id)} activeId={windows.slice().sort((a, b) => b.zIndex - a.zIndex)[0]?.id} onOpen={open} onLauncher={() => setLauncher(true)} /><AnimatePresence>{launcher && <Launcher onOpen={open} onClose={() => setLauncher(false)} />}</AnimatePresence></main>
}

export default function App() {
  const [booted, setBooted] = useState(false)
  return <AnimatePresence mode="wait">{!booted ? <BootScreen key="boot" onDone={() => setBooted(true)} /> : <Desktop key="desktop" />}</AnimatePresence>
}
