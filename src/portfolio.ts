export const profile = {
  name: 'Bhargavi Ravulapally',
  monogram: 'BR.',
  role: 'Developer in the making',
  tagline: 'I build interfaces that turn ideas into experiences.',
  about:
    'An Information Technology student at Anurag University, learning by building and drawn to thoughtful, useful digital experiences. I enjoy bringing ideas to life across the stack and keep growing my skills one project at a time.',
  email: '',
  links: {
    github: '',
    linkedin: '',
  },
  resumePath: '',
  education: [
    {
      degree: 'B.Tech — Information Technology',
      institution: 'Anurag University',
      dates: '2023 — 2027',
      result: 'CGPA 7.71 / 10',
      current: true,
    },
    {
      degree: 'Intermediate — MPC',
      institution: 'Rishi Junior College',
      dates: '2021 — 2023',
      result: '81%',
      current: false,
    },
    {
      degree: 'SSC',
      institution: 'Little Scholars School',
      dates: '2020 — 2021',
      result: 'CGPA 10 / 10',
      current: false,
    },
  ],
  skills: [
    {
      name: 'Languages',
      description: 'The building blocks',
      items: ['JavaScript', 'Java', 'Python', 'C'],
    },
    {
      name: 'Frontend',
      description: 'Interfaces & experiences',
      items: ['React', 'HTML', 'CSS'],
    },
    {
      name: 'Backend',
      description: 'Services & application logic',
      items: ['Node.js', 'Spring Boot'],
    },
    {
      name: 'Data & tools',
      description: 'Working environments',
      items: ['MySQL', 'MongoDB', 'GitHub', 'Linux'],
    },
    {
      name: 'Computer science',
      description: 'Core concepts',
      items: [],
    },
  ],
  projects: [
    {
      number: '01',
      title: 'Student Discussion Portal',
      category: 'Project',
      summary: 'A project focused on student discussion and knowledge sharing.',
      note: 'Project details and links can be added here.',
      technologies: [],
      accent: 'orange',
    },
    {
      number: '02',
      title: 'Expense Tracker',
      category: 'Project',
      summary: 'A project for tracking and keeping everyday expenses organized.',
      note: 'Project details and links can be added here.',
      technologies: [],
      accent: 'blue',
    },
  ],
  certifications: [] as { name: string; issuer: string; date?: string }[],
  strengths: [] as string[],
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
