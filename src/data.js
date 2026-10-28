export const profile = {
  name: 'Ashi Verma',
  initials: 'AV',
  role: 'Computer Science & Engineering student',
  focus: 'Software engineering · Full-stack development · AI/ML',
  education: 'B.Tech Computer Science & Engineering · DIT University',
  email: 'ashiverma1758@gmail.com',
  github: 'https://github.com/Ashi-Verma1758',
  githubUsername: 'Ashi-Verma1758',
  linkedin: 'https://www.linkedin.com/in/ashi-verma-aa8b41230/',
  resume: '/resume.pdf',
}

export const projects = [
  {
    id: 'unimate',
    name: 'Unimate',
    type: 'Collaboration platform concept',
    status: 'In progress',
    accent: 'cyan',
    problem: 'Students need a clearer way to find teammates, discover events, and move promising ideas from conversation to collaboration.',
    purpose: 'A focused platform concept for projects, hackathons, and campus events.',
    contribution: 'Product framing, interface architecture, and frontend exploration.',
    decisions: 'Designed around intent-first discovery: people can browse opportunities or make their own project brief without navigating a dense social feed.',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    repo: 'https://github.com/Ashi-Verma1758/unimate',
    demo: '',
  },
  {
    id: 'carefinder',
    name: 'CareFinder',
    type: 'Healthcare availability project',
    status: 'Prototype',
    accent: 'violet',
    problem: 'When care is time-sensitive, people need an easier way to understand hospital and bed availability.',
    purpose: 'A project exploring a simpler information layer for locating care resources.',
    contribution: 'Frontend development, data presentation, and responsive interaction design.',
    decisions: 'Prioritized scannable availability states and clear location context so users can compare options quickly.',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    repo: 'https://github.com/Ashi-Verma1758/CareFinder-MasterRepo',
    demo: '',
  },
]

export const skills = {
  Languages: ['Java', 'Python', 'JavaScript', 'C'],
  Frontend: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'Vite', 'Responsive design'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT authentication'],
  Databases: ['MongoDB', 'SQL'],
  'Core computer science': ['Data structures & algorithms', 'Object-oriented programming', 'Operating systems', 'DBMS', 'Computer networks', 'Distributed systems'],
  Tools: ['Git', 'GitHub', 'Postman'],
}

export const apps = [
  { id: 'about', label: 'About.exe', group: 'Identity', icon: 'user', color: 'cyan', defaultSize: { width: 630, height: 500 } },
  { id: 'projects', label: 'Projects.exe', group: 'Work', icon: 'folder', color: 'violet', defaultSize: { width: 820, height: 590 } },
  { id: 'ask', label: 'AskAshi.exe', group: 'Assistant', icon: 'sparkles', color: 'amber', defaultSize: { width: 600, height: 560 } },
  { id: 'resume', label: 'Resume.pdf', group: 'Profile', icon: 'file', color: 'rose', defaultSize: { width: 700, height: 560 } },
  { id: 'skills', label: 'Skills.exe', group: 'Toolkit', icon: 'layers', color: 'blue', defaultSize: { width: 720, height: 560 } },
  { id: 'stats', label: 'Stats.exe', group: 'Signals', icon: 'chart', color: 'emerald', defaultSize: { width: 700, height: 520 } },
  { id: 'terminal', label: 'Terminal.exe', group: 'Utilities', icon: 'terminal', color: 'slate', defaultSize: { width: 650, height: 430 } },
  { id: 'contact', label: 'Contact.exe', group: 'Connect', icon: 'mail', color: 'cyan', defaultSize: { width: 560, height: 440 } },
]

export const appById = Object.fromEntries(apps.map((app) => [app.id, app]))
