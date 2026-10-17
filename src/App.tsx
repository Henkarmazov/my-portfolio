import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Instagram, Facebook, Mail, Download, ExternalLink, Send, Check, MessageSquare, Sun, Moon, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import defaultAvatar from './assets/images/profil.png';
import projectsData from './data/projects.json';

// Dynamically glob all asset images from ./assets/images/
const assetImages = import.meta.glob<string>('./assets/images/*', { eager: true, import: 'default' });

export interface ProjectItem {
  id: number | string;
  name?: string;
  title?: string;
  image?: string;
  description: string;
  description_id?: string;
  skills?: string[];
  tags?: string[];
  url?: string;
  link?: string;
}

const projectsList: ProjectItem[] = projectsData as ProjectItem[];

function resolveProjectImage(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const clean = path.trim();
  const filename = clean.split('/').pop() || '';

  // Match against Vite glob keys
  const candidates = [
    clean,
    clean.startsWith('./') ? clean : `./${clean.replace(/^\//, '')}`,
    `./assets/images/${filename}`,
    `/assets/images/${filename}`,
  ];

  for (const candidate of candidates) {
    if (assetImages[candidate]) {
      return assetImages[candidate];
    }
  }

  // Fallback to static URL path
  return clean.replace(/^\.?\//, '/');
}

function ProjectCardImage({ src, alt, id }: { src: string; alt: string; id: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 text-neutral-500 p-6 select-none border border-neutral-200/50">
        <span className="text-3xl sm:text-4xl font-serif font-light text-neutral-700 mb-1">
          {alt.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
  );
}

type Language = 'ID' | 'EN';

// Technology Icons (SVG)
function HtmlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M4 2L5.8 20.2L12 22L18.2 20.2L20 2H4Z" fill="#E34F26" />
      <path d="M12 3.8V20.2L16.8 18.8L18.3 3.8H12Z" fill="#EF652A" />
      <path d="M12 7.7H8.3L8.6 11.2H12V14.7H8.9L9.1 16.9L12 17.7V19.7L7.3 18.4L6.7 11.5L6.4 5.9H12V7.7ZM12 9.6H15.6L15.3 13.1H12V14.9H15.1L14.8 17.7L12 18.5V16.7L13.4 16.3L13.6 14.5H12V9.6ZM12 7.7V5.9H17.5L17.2 9.6H12V7.7Z" fill="white" />
    </svg>
  );
}

function CssIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M4 2L5.8 20.2L12 22L18.2 20.2L20 2H4Z" fill="#1572B6" />
      <path d="M12 3.8V20.2L16.8 18.8L18.3 3.8H12Z" fill="#33A9DC" />
      <path d="M12 7.7H8.4L8.7 11.2H12V14.7H8.9L9.1 16.9L12 17.7V19.7L7.3 18.4L6.7 11.5L6.4 5.9H12V7.7ZM15.7 7.7H12V5.9H17.6L16.8 14.8L12 16.2V14.3L15 13.4L15.2 11.2H12V9.4H15.5L15.7 7.7Z" fill="white" />
    </svg>
  );
}

function JsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path d="M7 17.2C7.9 17.8 9 18.2 10.1 18.2C12.3 18.2 13.5 17.1 13.5 15.3V9.8H11.5V15.2C11.5 16 11 16.5 10.1 16.5C9.4 16.5 8.7 16.2 8.2 15.8L7 17.2ZM14.8 17.2C15.8 17.9 17.2 18.3 18.6 18.3C21.1 18.3 22.5 17 22.5 15.1C22.5 13.4 21.4 12.5 19.5 11.7L18.6 11.3C17.6 10.9 17.1 10.5 17.1 9.9C17.1 9.3 17.6 8.8 18.6 8.8C19.5 8.8 20.4 9.1 21.1 9.6L22.1 8.1C21.2 7.4 20 7.1 18.6 7.1C16.4 7.1 15 8.4 15 10.2C15 11.8 16 12.8 17.8 13.5L18.7 13.9C19.8 14.4 20.3 14.9 20.3 15.5C20.3 16.2 19.6 16.7 18.5 16.7C17.3 16.7 16.1 16.1 15.3 15.5L14.8 17.2Z" fill="#18181B" />
    </svg>
  );
}

function TsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path d="M4 10.2H12V11.8H9V18.5H6.9V11.8H4V10.2ZM12.7 17.3C13.5 17.9 14.7 18.3 15.9 18.3C18.1 18.3 19.3 17.2 19.3 15.5C19.3 14 18.3 13.2 16.7 12.5L15.9 12.1C15 11.7 14.6 11.3 14.6 10.8C14.6 10.3 15 9.9 15.9 9.9C16.7 9.9 17.5 10.2 18.1 10.6L19 9.3C18.2 8.7 17.1 8.4 15.9 8.4C14 8.4 12.7 9.5 12.7 11C12.7 12.4 13.6 13.2 15.1 13.9L15.9 14.2C16.9 14.6 17.3 15.1 17.3 15.6C17.3 16.2 16.7 16.6 15.8 16.6C14.7 16.6 13.7 16.1 13 15.6L12.7 17.3Z" fill="white" />
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M12 2L3 7.2V17.6L12 22.8L21 17.6V7.2L12 2Z" fill="#339933" />
      <path d="M12 4L19.2 8.2V16.6L12 20.8L4.8 16.6V8.2L12 4Z" fill="#43853D" />
      <path d="M11.9 8.3L15.8 10.5V14.9L11.9 17.2L8 14.9V10.5L11.9 8.3Z" fill="#66CC33" />
      <path d="M11.9 9.8L14.4 11.2V14.2L11.9 15.6L9.4 14.2V11.2L11.9 9.8Z" fill="white" />
    </svg>
  );
}

function ExpressIcon() {
  return (
    <div className="w-5 h-5 rounded-md bg-neutral-900 flex items-center justify-center text-[10px] font-bold text-white tracking-tighter">
      ex
    </div>
  );
}

function MysqlIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#00758F" />
      <path d="M17.5 14.2C17.1 13.1 16.2 12.2 15.1 11.8C14.5 11.6 13.9 11.5 13.3 11.5C12.8 11.5 12.3 11.6 11.8 11.7C11.5 11.8 11.2 11.9 11 12.1C10.6 11.5 10.3 10.8 10.1 10.1C10 9.7 10 9.3 10 9C10.8 8.8 11.6 8.7 12.5 8.7C13.8 8.7 15 9 16 9.6L16.7 8.3C15.4 7.5 14 7.1 12.5 7.1C11.3 7.1 10.2 7.3 9.2 7.7C8.6 7.9 8.1 8.2 7.6 8.6C7.2 9 6.9 9.5 6.7 10C6.5 10.5 6.4 11.1 6.4 11.7C6.4 13.1 7 14.3 8 15.1C9 15.9 10.3 16.3 11.8 16.3C13.4 16.3 14.8 15.8 15.9 14.8L17.5 14.2Z" fill="#F29111" />
      <path d="M12.5 14.8C11.5 14.8 10.6 14.5 9.9 13.9C9.2 13.3 8.8 12.5 8.8 11.6C8.8 11.2 8.9 10.8 9.1 10.4C9.3 10 9.5 9.7 9.8 9.5C10.5 10.5 11.3 11.2 12.4 11.6C12.8 11.7 13.2 11.8 13.6 11.8C14.2 11.8 14.7 11.7 15.2 11.4C15.6 12.3 15.5 13.2 14.8 13.8C14.2 14.5 13.4 14.8 12.5 14.8Z" fill="white" />
    </svg>
  );
}

const skillsData = [
  { name: 'HTML', icon: HtmlIcon },
  { name: 'CSS', icon: CssIcon },
  { name: 'JavaScript', icon: JsIcon },
  { name: 'TypeScript', icon: TsIcon },
  { name: 'Nodejs', icon: NodeIcon },
  { name: 'Expressjs', icon: ExpressIcon },
  { name: 'MySQL', icon: MysqlIcon },
];

function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.068-.102a2.895 2.895 0 0 1 2.373-4.513c.277 0 .544.039.798.112V9.387a6.34 6.34 0 0 0-.798-.051A6.34 6.34 0 0 0 3 15.676a6.34 6.34 0 0 0 9.874 5.253l.115-.084a6.302 6.302 0 0 0 2.8-5.173V8.825a8.21 8.21 0 0 0 4.796 1.533V6.913a4.79 4.79 0 0 1-.996-.227z" />
    </svg>
  );
}

export const connectLinks = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/hen.draprtm',
    handle: '@hen.draprtm',
    icon: Instagram,
    isExternal: true,
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@henkaramazov',
    handle: '@henkaramazov',
    icon: TikTokIcon,
    isExternal: true,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/19VnzJPFqQ/',
    handle: 'Hendra',
    icon: Facebook,
    isExternal: true,
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Henkarmazov',
    handle: '@Henkarmazov',
    icon: Github,
    isExternal: true,
  },
  {
    name: 'Gmail',
    url: 'mailto:hendraxyy@gmail.com',
    handle: 'hendraxyy@gmail.com',
    icon: Mail,
    isExternal: false,
  },
];

const content = {
  ID: {
    greetingLine1: 'Halo,',
    greetingPrefix: 'saya',
    downloadCv: 'Unduh CV',
    myProject: 'Proyek Saya',
    aboutLabel: 'Tentang',
    aboutP1: 'Saya seorang developer yang senang mengeksplorasi teknologi, mempelajari hal-hal baru, dan mewujudkan ide menjadi kenyataan.',
    aboutP2: 'Saya terus mengasah kemampuan, bereksperimen dengan berbagai pendekatan, dan menantang diri untuk menciptakan karya yang lebih baik.',
    projectsLabel: 'Proyek',
    projectsView: 'Lihat Proyek',
    skillsLabel: 'Keahlian',
    connect: 'Terhubung',
    rights: 'Hak cipta dilindungi.',
    contactLabel: 'Kontak',
    contactTitle: 'Mari Terhubung & Berkolaborasi',
    contactSubtitle: 'Tertarik bekerja sama dalam proyek baru, penawaran kerja, atau sekadar bertukar ide? Silakan hubungi saya melalui formulir di bawah atau surel langsung.',
    contactStatus: 'Tersedia untuk proyek freelance & kolaborasi baru',
    contactResponseTime: 'Waktu respons biasa: dalam 24 jam',
    contactFormName: 'Nama Lengkap',
    contactFormNamePlaceholder: 'Mis. John Doe',
    contactFormEmail: 'Alamat Email',
    contactFormEmailPlaceholder: 'nama@domain.com',
    contactFormSubject: 'Subjek',
    contactFormSubjectPlaceholder: 'Diskusi Proyek Web / Penawaran Kerja',
    contactFormMessage: 'Pesan Anda',
    contactFormMessagePlaceholder: 'Ceritakan detail proyek atau pertanyaan Anda di sini...',
    contactFormSubmit: 'Kirim Pesan',
    contactFormSending: 'Menyiapkan Pesan...',
    contactFormSuccess: 'Pesan berhasil disiapkan! Aplikasi email Anda akan terbuka.',
    contactCopyEmail: 'Salin Email',
    contactEmailCopied: 'Tersalin!',
    contactDirectMail: 'Buka di Email',
    themeLight: 'Mode Terang',
    themeDark: 'Mode Gelap',
    backToTop: 'Kembali ke atas',
    nav: [
      { label: 'Beranda', href: '#home' },
      { label: 'Tentang', href: '#about' },
      { label: 'Skill', href: '#skills' },
      { label: 'Proyek', href: '#projects' },
      { label: 'Kontak', href: '#contact' },
    ],
  },
  EN: {
    greetingLine1: 'Hi,',
    greetingPrefix: "i'm",
    downloadCv: 'Download CV',
    myProject: 'My Project',
    aboutLabel: 'About',
    aboutP1: "I'm a developer who enjoys exploring technology, learning new things, and turning ideas into reality.",
    aboutP2: "I'm constantly improving my skills, experimenting with different approaches, and challenging myself to create better things.",
    projectsLabel: 'Projects',
    projectsView: 'View Project',
    skillsLabel: 'Skills',
    connect: 'Connect',
    rights: 'All rights reserved.',
    contactLabel: 'Contact',
    contactTitle: "Let's Connect & Collaborate",
    contactSubtitle: "Interested in collaborating on a new project, an opportunity, or just want to say hi? Reach out via the form below or directly via email.",
    contactStatus: 'Available for freelance projects & new collaborations',
    contactResponseTime: 'Typical response time: within 24 hours',
    contactFormName: 'Full Name',
    contactFormNamePlaceholder: 'e.g. John Doe',
    contactFormEmail: 'Email Address',
    contactFormEmailPlaceholder: 'name@domain.com',
    contactFormSubject: 'Subject',
    contactFormSubjectPlaceholder: 'Project Discussion / Inquiry',
    contactFormMessage: 'Your Message',
    contactFormMessagePlaceholder: 'Describe your project or ideas here...',
    contactFormSubmit: 'Send Message',
    contactFormSending: 'Preparing Message...',
    contactFormSuccess: 'Message prepared! Your email application will open.',
    contactCopyEmail: 'Copy Email',
    contactEmailCopied: 'Copied!',
    contactDirectMail: 'Open in Email',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    backToTop: 'Back to top',
    nav: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact', href: '#contact' },
    ],
  },
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('henkaramazov_lang') as Language) || 'ID';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('henkaramazov_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Clean up any legacy uploaded avatar from browser localStorage
  useEffect(() => {
    localStorage.removeItem('henkaramazov_avatar');
  }, []);

  // Sync theme with document element class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('henkaramazov_theme', theme);
  }, [theme]);

  // Track scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setContactSubmitted(true);

    const subjectStr = contactSubject.trim() || (lang === 'ID' ? 'Pesan dari Portofolio' : 'Message from Portfolio');
    const bodyStr = `${lang === 'ID' ? 'Halo Henkaramazov,' : 'Hello Henkaramazov,'}\n\n${contactMessage.trim()}\n\n---\n${lang === 'ID' ? 'Pengirim' : 'Sender'}: ${contactName.trim() || '-'}\nEmail: ${contactEmail.trim() || '-'}`;

    const mailtoUrl = `mailto:hendraxyy@gmail.com?subject=${encodeURIComponent(subjectStr)}&body=${encodeURIComponent(bodyStr)}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 4500);
  };

  const t = content[lang];

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('henkaramazov_lang', newLang);
  };

  const handleDownloadCV = async () => {
    // List of candidate files that can be placed in /public/cv/
    const candidateFiles = [
      { path: '/cv/cv.pdf', filename: 'Hendra-CV.pdf' },
      { path: '/cv/CV.pdf', filename: 'Hendra-CV.pdf' },
      { path: '/cv/resume.pdf', filename: 'Hendra-Resume.pdf' },
      { path: '/cv/Resume.pdf', filename: 'Hendra-Resume.pdf' },
      { path: '/cv/Hendra-CV.pdf', filename: 'Hendra-CV.pdf' },
      { path: '/cv.pdf', filename: 'Hendra-CV.pdf' },
    ];

    for (const candidate of candidateFiles) {
      try {
        const res = await fetch(candidate.path, { method: 'HEAD' });
        const contentType = res.headers.get('content-type') || '';
        // Check if file exists and is not an HTML fallback from SPA rewrite
        if (res.ok && !contentType.includes('text/html')) {
          const link = document.createElement('a');
          link.href = candidate.path;
          link.download = candidate.filename;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      } catch {
        // continue checking next candidate
      }
    }

    const projectsSummary = projectsList
      .map((p, i) => {
        const desc = (lang === 'ID' && p.description_id) ? p.description_id : p.description;
        return `${i + 1}. ${p.name || p.title} - ${desc} (${(p.skills || p.tags || []).join(', ')})\n   URL: ${p.url || p.link || '-'}`;
      })
      .join('\n\n');

    const cvText = lang === 'ID'
      ? `HENKARAMAZOV - CURRICULUM VITAE
Pengembang Kreatif & Desainer
Situs: https://henkaramazov.dev
Email: hendraxyy@gmail.com

TENTANG
Seorang pengembang kreatif dan desainer yang berdedikasi pada minimalisme, tipografi bersih, dan pengalaman digital hening yang berbicara lewat kejelasan dan presisi.

PROYEK UTAMA (TOTAL: ${projectsList.length} PROYEK)
${projectsSummary}

KEAHLIAN UTAMA (SKILLS)
• HTML, CSS, JavaScript, TypeScript
• Node.js, Express.js, MySQL
• Desain UI/UX & Interaksi
• Arsitektur Frontend Modern & Minimalis
`
      : `HENKARAMAZOV - CURRICULUM VITAE
Creative Developer & Designer
Website: https://henkaramazov.dev
Email: hendraxyy@gmail.com

ABOUT
A creative developer and designer devoted to minimalism, clean typography, and quiet digital experiences that speak through clarity and precision.

FEATURED PROJECTS (TOTAL: ${projectsList.length} PROJECTS)
${projectsSummary}

CORE SKILLS
• HTML, CSS, JavaScript, TypeScript
• Node.js, Express.js, MySQL
• UI/UX & Interaction Design
• Modern Frontend Architecture & Clean Code
`;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Henkaramazov-CV-${lang}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Repeated lists for seamless infinite marquee loop
  const row1Skills = [...skillsData, ...skillsData, ...skillsData, ...skillsData];
  const row2Skills = [...skillsData].reverse().concat([...skillsData].reverse(), [...skillsData].reverse(), [...skillsData].reverse());

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 relative transition-colors duration-300">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          {/* Left Brand */}
          <a
            href="#home"
            className="text-lg sm:text-xl font-medium tracking-tight text-neutral-900 dark:text-white hover:opacity-75 transition-opacity"
          >
            Henkaramazov
          </a>

          {/* Right Section: Theme Toggle Button + Language Toggle Button + Burger Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="h-8 w-8 rounded-full border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-2xs"
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 stroke-[2.2]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-700 stroke-[2]" />
              )}
            </button>

            {/* Single Language Toggle Button (Toggles between ID and EN) */}
            <button
              type="button"
              onClick={() => handleLanguageChange(lang === 'ID' ? 'EN' : 'ID')}
              className="h-8 px-3 rounded-full border border-neutral-200/90 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-[11px] font-semibold tracking-wider transition-all flex items-center justify-center cursor-pointer active:scale-95 shadow-2xs"
              aria-label={`Ubah bahasa ke ${lang === 'ID' ? 'English' : 'Indonesia'}`}
              title={`Klik untuk ubah bahasa ke ${lang === 'ID' ? 'EN' : 'ID'}`}
            >
              <span>{lang}</span>
            </button>

            {/* Burger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 -mr-2 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer"
              aria-label={menuOpen ? 'Tutup navigasi' : 'Buka menu navigasi'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-6 h-6 stroke-[1.75]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Overlay from the Left */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop with Fade Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-0 bg-neutral-950/25 backdrop-blur-[2px]"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-in Drawer from Ujung Kiri (Left Edge) */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'spring',
                damping: 32,
                stiffness: 320,
                mass: 0.85,
              }}
              className="relative mr-auto w-full max-w-sm sm:max-w-md bg-white dark:bg-[#0e0e0e] h-full shadow-2xl p-8 sm:p-10 flex flex-col justify-between z-10 border-r border-neutral-100 dark:border-neutral-800"
              aria-label="Menu Navigasi Utama"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-8 border-b border-neutral-100 dark:border-neutral-800">
                  <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
                    Henkaramazov
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
                      title={theme === 'dark' ? t.themeLight : t.themeDark}
                    >
                      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400 stroke-[2.2]" /> : <Moon className="w-4 h-4 stroke-[2]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMenuOpen(false)}
                      className="p-2 -mr-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      aria-label="Tutup menu"
                    >
                      <X className="w-5 h-5 stroke-[1.75]" />
                    </button>
                  </div>
                </div>

                {/* Animated Navigation Links */}
                <ul className="mt-10 space-y-5">
                  {t.nav.map((link, idx) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + idx * 0.05,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between text-2xl sm:text-3xl font-light tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-colors py-1.5"
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                          {link.label}
                        </span>
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-neutral-400 dark:text-neutral-500" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Drawer Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="pt-8 border-t border-neutral-100 dark:border-neutral-800"
              >
                <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4 tracking-wider uppercase font-medium">
                  {t.connect}
                </p>
                <div className="flex items-center gap-2 sm:gap-2.5 text-neutral-600 dark:text-neutral-400 flex-wrap">
                  {connectLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noreferrer" : undefined}
                        className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
                        aria-label={item.name}
                        title={item.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>

      {/* Main Landing Page Hero Section (Full Viewport Scroll Page) */}
      <main id="home" className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-6 sm:px-10 py-10 sm:py-20 relative">
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
          
          {/* Row: Profile on Left, Greeting on Right (always side-by-side on all devices) */}
          <div className="flex flex-row items-center gap-4 sm:gap-8 md:gap-12 w-full">
            
            {/* Circular Profile Photo */}
            <div className="shrink-0">
              <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 ring-1 ring-neutral-200/90 dark:ring-neutral-800 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                <img
                  src={defaultAvatar}
                  alt="Henkaramazov"
                  className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Greeting Text on the right */}
            <div className="text-left flex-1 min-w-0">
              <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-white leading-[1.15] sm:leading-[1.12]">
                <span className="block text-neutral-800 dark:text-neutral-300">{t.greetingLine1}</span>
                <span className="block mt-0.5 sm:mt-2 text-neutral-900 dark:text-neutral-100 font-normal">
                  {t.greetingPrefix} <span className="font-medium text-neutral-950 dark:text-white">Henkaramazov</span>
                </span>
              </h1>

              {/* Action Buttons: Situated only directly underneath the text with compact mobile size */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 mt-3 sm:mt-7">
                <button
                  type="button"
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 rounded-full text-[11px] sm:text-sm font-medium tracking-wide transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-[0.98]"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" />
                  <span>{t.downloadCv}</span>
                </button>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-1 px-3 py-1.5 sm:px-5 sm:py-2.5 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded-full text-[11px] sm:text-sm font-medium tracking-wide transition-all cursor-pointer active:scale-[0.98]"
                >
                  <span>{t.myProject}</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2] text-neutral-500 dark:text-neutral-400" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* About Section (Clean cohesive spacing) */}
      <section id="about" className="w-full border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col justify-center items-center px-5 sm:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors">
        <div className="w-full max-w-4xl mx-auto">
          {/* Section Label: Gentle entrance from the left */}
          <motion.div
            key={`about-label-${lang}`}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center gap-3 mb-8 sm:mb-10"
          >
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
              {t.aboutLabel}
            </span>
            <div className="h-px bg-neutral-100 dark:bg-neutral-800 flex-1" />
          </motion.div>

          {/* Elegant Bio Text: Gentle, unhurried slide in from the left */}
          <motion.div
            key={`about-text-${lang}`}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 dark:text-neutral-100 leading-relaxed sm:leading-[1.4]">
              {t.aboutP1}{' '}
              <span className="text-neutral-500 dark:text-neutral-400">
                {t.aboutP2}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Section (Positioned closely below About, Slower Marquee & Slower Entrance) */}
      <section id="skills" className="w-full border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col justify-center items-center pt-16 sm:pt-20 pb-16 sm:pb-24 bg-white dark:bg-[#0a0a0a] overflow-hidden relative transition-colors">
        <motion.div
          key={`skills-section-${lang}`}
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="w-full max-w-4xl mx-auto px-5 sm:px-10"
        >
          {/* Skill Header */}
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
              {t.skillsLabel}
            </span>
            <div className="h-px bg-neutral-100 dark:bg-neutral-800 flex-1" />
          </div>
        </motion.div>

        {/* Animated Marquee Container */}
        <div className="w-full space-y-3.5 sm:space-y-4 overflow-hidden relative">
          {/* Row 1: Slow, gentle entrance from the Right, continuing marquee leftwards */}
          <motion.div
            initial={{ opacity: 0, x: 160 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex w-full overflow-hidden select-none"
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                duration: 48,
                ease: 'linear',
              }}
              className="flex items-center gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4"
            >
              {row1Skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`row1-${skill.name}-${index}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-white dark:bg-[#121212] border border-neutral-200/90 dark:border-neutral-800 rounded-full shadow-2xs hover:border-neutral-900 dark:hover:border-neutral-500 transition-all cursor-default shrink-0 group"
                  >
                    <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Icon />
                    </span>
                    <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Row 2: Slow, gentle entrance from the Left, continuing marquee rightwards */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="flex w-full overflow-hidden select-none"
          >
            <motion.div
              animate={{ x: ['-50%', '0%'] }}
              transition={{
                repeat: Infinity,
                duration: 48,
                ease: 'linear',
              }}
              className="flex items-center gap-3 sm:gap-4 shrink-0 pr-3 sm:pr-4"
            >
              {row2Skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={`row2-${skill.name}-${index}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 bg-white dark:bg-[#121212] border border-neutral-200/90 dark:border-neutral-800 rounded-full shadow-2xs hover:border-neutral-900 dark:hover:border-neutral-500 transition-all cursor-default shrink-0 group"
                  >
                    <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Icon />
                    </span>
                    <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section (Sticky Stacking Cards on Scroll) */}
      <section id="projects" className="w-full border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col items-center px-5 sm:px-10 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-white dark:bg-[#0a0a0a] relative transition-colors">
        <div className="w-full max-w-4xl mx-auto">
          {/* Projects Header Label */}
          <motion.div
            key={`projects-label-${lang}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center gap-3 mb-12 sm:mb-16"
          >
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
              {t.projectsLabel}
            </span>
            <div className="h-px bg-neutral-100 dark:bg-neutral-800 flex-1" />
          </motion.div>

          {/* Stacking Project Cards: each card sticks and subsequent cards stack directly on top */}
          <div className="relative w-full space-y-16 sm:space-y-28">
            {projectsList.map((project, idx) => {
              const formattedId = String(project.id).padStart(2, '0');
              const projectTitle = project.name || project.title || `Project ${formattedId}`;
              const projectUrl = project.url || project.link || '#';
              const projectSkills = project.skills || project.tags || [];
              const imageSrc = resolveProjectImage(project.image);

              return (
                <article
                  key={project.id}
                  style={{
                    top: `calc(5.5rem + ${idx * 20}px)`,
                    zIndex: 10 + idx,
                  }}
                  className="sticky w-full rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121212] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_-4px_24px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.35),0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center p-5 sm:p-7 md:p-8">
                    {/* Project Image Column */}
                    <div className="md:col-span-6 lg:col-span-7">
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 group">
                        <ProjectCardImage
                          src={imageSrc}
                          alt={projectTitle}
                          id={formattedId}
                        />
                        {/* Project ID Tag */}
                        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 shadow-2xs">
                          {formattedId}
                        </div>
                        {/* Quick Link Indicator */}
                        {projectUrl !== '#' && (
                          <a
                            href={projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:scale-110 transition-all shadow-2xs cursor-pointer"
                            aria-label={`${projectTitle} external link`}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Details Column */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
                      <div>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-neutral-900 dark:text-white mb-3">
                          {projectTitle}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                          {lang === 'ID' && project.description_id ? project.description_id : project.description}
                        </p>

                        {/* Tech Tags */}
                        {projectSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-5">
                            {projectSkills.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Button: "Lihat Proyek" / "View Project" */}
                      <div className="pt-6 mt-5 border-t border-neutral-100 dark:border-neutral-800">
                        <a
                          href={projectUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-full border border-neutral-200/90 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-2xs hover:shadow-sm active:scale-[0.98] group/btn cursor-pointer"
                        >
                          <span>{t.projectsView}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-neutral-300 dark:text-neutral-700 group-hover/btn:text-white dark:group-hover/btn:text-neutral-950 transition-colors" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="contact" className="w-full border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col items-center px-5 sm:px-10 pt-10 sm:pt-14 pb-24 sm:pb-32 bg-neutral-50/40 dark:bg-[#080808] relative transition-colors">
        <div className="w-full max-w-4xl mx-auto">
          {/* Section Header Label */}
          <motion.div
            key={`contact-label-${lang}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="flex items-center gap-3 mb-10 sm:mb-12"
          >
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
              {t.contactLabel}
            </span>
            <div className="h-px bg-neutral-100 dark:bg-neutral-800 flex-1" />
          </motion.div>

          {/* Heading and Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-neutral-900 dark:text-white mb-3">
              {t.contactTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              {t.contactSubtitle}
            </p>
          </motion.div>

          {/* Contact Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Social Channels */}
            <div className="lg:col-span-4 space-y-4">
              {/* Social Channels Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-3">
                  {t.connect}
                </span>
                <div className="space-y-1.5">
                  {connectLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noreferrer" : undefined}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white" />
                          <span className="text-xs sm:text-sm font-medium">{item.name}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 font-mono truncate max-w-[150px]">
                          {item.handle} ↗
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Message Form */}
            <div className="lg:col-span-8">
              <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121212] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs">
                <h3 className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  {lang === 'ID' ? 'Kirim Pesan Langsung' : 'Send a Direct Message'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                  {lang === 'ID'
                    ? 'Tuliskan kebutuhan Anda di bawah ini untuk memulai percakapan.'
                    : 'Write down your details below to start a conversation.'}
                </p>

                {contactSubmitted && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{t.contactFormSuccess}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        {t.contactFormName}
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={t.contactFormNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/60 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 focus:border-neutral-900 dark:focus:border-neutral-400 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                        {t.contactFormEmail}
                      </label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={t.contactFormEmailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/60 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 focus:border-neutral-900 dark:focus:border-neutral-400 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      {t.contactFormSubject}
                    </label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      placeholder={t.contactFormSubjectPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/60 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 focus:border-neutral-900 dark:focus:border-neutral-400 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
                      {t.contactFormMessage} <span className="text-neutral-400 dark:text-neutral-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t.contactFormMessagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-750 bg-neutral-50/50 dark:bg-neutral-900/60 focus:bg-white dark:focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 dark:focus:ring-white/10 focus:border-neutral-900 dark:focus:border-neutral-400 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950 text-xs sm:text-sm font-medium tracking-wide transition-all shadow-2xs hover:shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{contactSubmitted ? t.contactFormSending : t.contactFormSubmit}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-lg hover:shadow-xl hover:border-neutral-900 dark:hover:border-neutral-500 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-sm"
            aria-label={t.backToTop}
            title={t.backToTop}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.2]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Clean minimal footer */}
      <footer className="w-full border-t border-neutral-100 dark:border-neutral-800/80 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500 transition-colors">
        <p className="tracking-wide">© {new Date().getFullYear()} Henkaramazov. {t.rights}</p>
      </footer>
    </div>
  );
}
