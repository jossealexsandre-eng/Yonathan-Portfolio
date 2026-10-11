/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  Check,
  Menu,
  X,
  FileText,
  ChevronUp,
  Download,
  Printer,
  MessageSquare,
  Trophy,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ASSET GAMBAR PROYEK (Warna Asli Alami, Tanpa Filter Grayscale)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const IMAGES = {
  // Solo & Studio Portraits
  heroCutout: '/yonathan-hero-cutout.png',
  fullPortrait: '/yonathan-portrait-full.jpg',
  minimalistStudio: '/img/IMG_5039.JPG.jpeg',
  himamaSoloUniform: '/img/IMG_5035.JPG.jpeg',

  // Basketball Championships & Visuals
  pom2025Champion: '/img/IMG_5045.JPG.jpeg',
  perbasiBandungDiv1: '/img/IMG_5037.JPG.jpeg',
  maranathaSportsWeek: '/img/IMG_5042.JPG.jpeg',
  mcuTeamLineup: '/img/IMG_5043.JPG.jpeg',
  fastbreakDispora: '/img/IMG_5048.JPG.jpeg',
  matchJumpShot: '/img/IMG_5041.JPG.jpeg',
  gameVsSmanila: '/img/IMG_5036.JPG.jpeg',
  courtMatchOfficiating: '/img/IMG_5040.JPG.jpeg',
  trainingConditioning: '/img/IMG_5038.JPG.jpeg',

  // Organization & Campus Documentation
  himamaCommittee: '/img/IMG_5049.JPG.jpeg',
  socialActionPanti: '/img/IMG_5046.JPG.jpeg',
  academicDelegation: '/img/IMG_5047.JPG.jpeg',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   AESTHETIC SHATTER & MEMORY PARTICLE SYSTEM
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
// 1. Serpihan Geometris Siluet Portrait Yonathan
const HERO_PORTRAIT_SHARDS = [
  // Pucuk kiri atas (rambut kiri)
  {
    clip: 'polygon(0% 0%, 50% 0%, 38% 30%, 0% 24%)',
    x: -110,
    y: -95,
    z: 25,
    r: -24,
    s: 0.88,
    delay: 0.0,
  },
  // Pucuk kanan atas (rambut kanan)
  {
    clip: 'polygon(48% 0%, 100% 0%, 100% 32%, 36% 30%)',
    x: 120,
    y: -90,
    z: 30,
    r: 26,
    s: 0.9,
    delay: 0.02,
  },
  // Wajah tengah & dahi (face focus)
  {
    clip: 'polygon(30% 12%, 70% 12%, 66% 46%, 28% 44%)',
    x: -14,
    y: -50,
    z: 15,
    r: -8,
    s: 0.86,
    delay: 0.04,
  },
  // Bahu kiri luar
  {
    clip: 'polygon(0% 22%, 36% 28%, 32% 62%, 0% 56%)',
    x: -145,
    y: 12,
    z: 20,
    r: -22,
    s: 0.92,
    delay: 0.03,
  },
  // Dada tengah & kemeja
  {
    clip: 'polygon(28% 42%, 72% 44%, 66% 76%, 24% 72%)',
    x: 20,
    y: 40,
    z: 10,
    r: 10,
    s: 0.85,
    delay: 0.05,
  },
  // Bahu kanan luar & lengan
  {
    clip: 'polygon(64% 28%, 100% 30%, 100% 64%, 60% 58%)',
    x: 150,
    y: 18,
    z: 35,
    r: 24,
    s: 0.91,
    delay: 0.04,
  },
  // Jas kiri bawah
  {
    clip: 'polygon(0% 54%, 34% 60%, 28% 100%, 0% 100%)',
    x: -125,
    y: 120,
    z: 18,
    r: -28,
    s: 0.88,
    delay: 0.06,
  },
  // Bagian tengah bawah jas
  {
    clip: 'polygon(24% 70%, 68% 74%, 62% 100%, 24% 100%)',
    x: 14,
    y: 135,
    z: 12,
    r: 16,
    s: 0.9,
    delay: 0.07,
  },
  // Jas kanan bawah
  {
    clip: 'polygon(58% 56%, 100% 62%, 100% 100%, 56% 100%)',
    x: 135,
    y: 115,
    z: 26,
    r: 30,
    s: 0.86,
    delay: 0.06,
  },
  // Pecahan prisma tajam (aksen tengah)
  {
    clip: 'polygon(38% 24%, 62% 26%, 54% 42%, 36% 38%)',
    x: 45,
    y: -35,
    z: 40,
    r: 38,
    s: 0.8,
    delay: 0.02,
  },
  // Pecahan sayap kiri
  {
    clip: 'polygon(12% 40%, 32% 38%, 26% 56%, 8% 54%)',
    x: -85,
    y: -18,
    z: 22,
    r: -34,
    s: 0.78,
    delay: 0.03,
  },
  // Pecahan sayap kanan
  {
    clip: 'polygon(66% 44%, 88% 46%, 82% 62%, 62% 58%)',
    x: 95,
    y: 50,
    z: 28,
    r: 32,
    s: 0.82,
    delay: 0.05,
  },
];

// 2. Memory Shards (Storytelling shards dengan foto kegiatan basket & organisasi)
const HERO_MEMORY_SHARDS = [
  {
    id: 'basket-jumpshot',
    image: IMAGES.matchJumpShot,
    category: 'BASKETBALL',
    title: 'Match Jump Shot',
    subtitle: 'Pekan Olahraga Mahasiswa',
    description: 'Aksi jumping shoot Yonathan dalam laga kompetisi basket resmi mahasiswa.',
    targetX: 200,
    targetY: -125,
    targetZ: 40,
    targetRotate: 9,
    startProgress: 0.06,
    peakProgress: 0.42,
    endProgress: 0.88,
  },
  {
    id: 'org-himama',
    image: IMAGES.himamaCommittee,
    category: 'LEADERSHIP',
    title: 'HIMAMA Maranatha',
    subtitle: 'Himpunan Mahasiswa Manajemen',
    description: 'Kepanitiaan & kepengurusan aktif HIMAMA Universitas Kristen Maranatha.',
    targetX: -205,
    targetY: -115,
    targetZ: 30,
    targetRotate: -11,
    startProgress: 0.08,
    peakProgress: 0.44,
    endProgress: 0.88,
  },
  {
    id: 'basket-perbasi',
    image: IMAGES.perbasiBandungDiv1,
    category: 'CHAMPIONSHIP',
    title: 'Perbasi Bandung Div. 2',
    subtitle: 'Divisi 2 Kota Bandung',
    description: 'Kompetisi resmi tingkat kota Bandung bersama klub divisi utama.',
    targetX: 235,
    targetY: 35,
    targetZ: 45,
    targetRotate: -7,
    startProgress: 0.12,
    peakProgress: 0.52,
    endProgress: 0.90,
  },
  {
    id: 'org-social',
    image: IMAGES.socialActionPanti,
    category: 'COMMUNITY',
    title: 'Aksi Sosial Panti',
    subtitle: 'Bakti Sosial & Outreach',
    description: 'Kegiatan pengabdian masyarakat dan kepedulian sosial bersama anak-anak panti asuhan.',
    targetX: -235,
    targetY: 45,
    targetZ: 25,
    targetRotate: 13,
    startProgress: 0.14,
    peakProgress: 0.54,
    endProgress: 0.90,
  },
  {
    id: 'basket-champion',
    image: IMAGES.pom2025Champion,
    category: 'GOLD MEDAL',
    title: 'Juara 1 POM 2025',
    subtitle: 'Gold Medalist Jawa Barat',
    description: 'Kemenangan medali emas dan trofi juara 1 POM Jabar 2025 bersama Maranatha Basketball.',
    targetX: 185,
    targetY: 195,
    targetZ: 35,
    targetRotate: 14,
    startProgress: 0.18,
    peakProgress: 0.62,
    endProgress: 0.94,
  },
  {
    id: 'org-delegation',
    image: IMAGES.academicDelegation,
    category: 'DELEGATION',
    title: 'Delegasi Kampus',
    subtitle: 'Universitas Kristen Maranatha',
    description: 'Perwakilan formal mahasiswa dalam forum dan agenda kehormatan akademik kampus.',
    targetX: -185,
    targetY: 200,
    targetZ: 20,
    targetRotate: -15,
    startProgress: 0.20,
    peakProgress: 0.64,
    endProgress: 0.94,
  },
];

// 3. Partikel Kristal Kemilau (Glints & Stardust)
const HERO_STARDUST_PARTICLES = [
  { x: -180, y: -90, z: 40, r: -45, size: 7, left: '25%', top: '22%' },
  { x: 190, y: -110, z: 30, r: 60, size: 8, left: '75%', top: '18%' },
  { x: -160, y: 30, z: 20, r: -35, size: 6, left: '15%', top: '48%' },
  { x: 180, y: 50, z: 50, r: 45, size: 9, left: '85%', top: '52%' },
  { x: -140, y: 140, z: 15, r: -50, size: 8, left: '20%', top: '78%' },
  { x: 150, y: 150, z: 35, r: 55, size: 7, left: '80%', top: '82%' },
  { x: 20, y: -130, z: 45, r: 25, size: 6, left: '50%', top: '8%' },
  { x: -40, y: 170, z: 25, r: -30, size: 8, left: '46%', top: '92%' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT CAROUSEL ITEMS (Foto Solo & Studio Yonathan)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ABOUT_SLIDES: Array<{
  image: string;
  category: string;
  title: string;
  context: string;
  period: string;
  caption: string;
  position?: string;
}> = [
    {
      image: IMAGES.fullPortrait,
      category: 'PERSONAL PORTFOLIO',
      title: 'Mahasiswa Aktif',
      context: 'Universitas Kristen Maranatha',
      period: '2023',
      caption: 'Yonathan Cavien Gabriel Piri, mahasiswa Manajemen Pemasaran angkatan 2023.',
      position: 'center 12%',
    },
    {
      image: IMAGES.minimalistStudio,
      category: 'PERSONAL POTO',
      title: 'PAS POTO',
      context: 'Universitas Kristen Maranatha',
      period: '2023',
      caption: 'Pas Foto resmi Universitas Kristen Maranatha',
    },
    {
      image: IMAGES.himamaSoloUniform,
      category: 'PENGURUS HIMA',
      title: 'Pengurus Pengabdian Masyarakat',
      context: 'Himpunan Mahasiswa Manajemen',
      period: '2024 - 2025',
      caption: 'Foto resmi kepengurusan HIMAMA Divisi Pengabdian Masyarakat, Universitas Kristen Maranatha.',
    },
  ];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ORGANIZATION CAROUSEL ITEMS (Dokumentasi Kegiatan Organisasi)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ORG_SLIDES = [
  {
    image: IMAGES.himamaCommittee,
    category: 'HIMAMA COMMITTEE',
    title: 'Pengurus Himpunan Mahasiswa Manajemen',
    context: 'Pengabdian Masyarakat HIMAMA',
    period: '2024 - 2025',
    caption: 'Dokumentasi jajaran pengurus HIMAMA Divisi Pengabdian Masyarakat Universitas Kristen Maranatha.',
  },
  {
    image: IMAGES.socialActionPanti,
    category: 'COMMUNITY SERVICE',
    title: 'Pengabdian Masyarakat Panti Senjarawi',
    context: 'The Salvation Army Bandung',
    period: '2024',
    caption: 'Penyaluran bantuan logistik, kebutuhan pokok, dan interaksi sosial bersama para lansia di Panti Sosial Tresna Werdha Senjarawi.',
  },
  {
    image: IMAGES.academicDelegation,
    category: 'ACADEMIC DELEGATION',
    title: 'Perencanaan dan Pengelolaan Keuangan Bagi Tenaga Kependidikan dan Pendidik BPK PENABUR Tasikmalaya',
    context: 'Fakultas Hukum dan Bisnis Digital',
    period: '2024',
    caption: 'Melakukan seminar edukasi bagi tenaga pendidik di BPK Penabur Kota Tasikmalaya.',
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WORK EXPERIENCES (Data Resmi Sesuai Prompt)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const WORK_EXPERIENCES = [
  {
    number: '01',
    company: 'Renao Homebakery',
    position: 'Bakery Administration & Delivery Staff',
    period: '2019 - 2023',
    responsibilities: [
      'Mengelola database pelanggan, pemrosesan pesanan, dan koordinasi inventaris.',
      'Memastikan pesanan pelanggan dikirim dengan tepat waktu dan sesuai kebutuhan.',
    ],
  },
  {
    number: '02',
    company: 'Renao FarmHouse',
    position: 'Broiler Farm Operational Staff',
    period: '2019 - 2023',
    responsibilities: [
      'Membantu aktivitas operasional harian dan pemeliharaan ternak broiler.',
      'Mendukung administrasi serta pengawasan inventaris operasional.',
    ],
  },
  {
    number: '03',
    company: 'Divisi Pengabdian Masyarakat HIMAMA',
    position: 'Community Impact & Social Outreach',
    period: '2024 - 2026',
    responsibilities: [
      'Memimpin program bakti sosial, pembagian sembako, dan kunjungan panti wreda.'
    ],
  },
  {
    number: '04',
    company: 'Kepanitiaan EX CLASS HIMAMA 2025',
    position: 'Project Execution Coordinator',
    period: '2025',
    responsibilities: [
      'Sinkronisasi lintas divisi acara, logistik, dan publikasi pelatihan.'
    ],
  },
  {
    number: '05',
    company: 'Operasional Lapangan HIMAMA',
    position: 'Event & Field Operations Staff',
    period: '2024 to 2025',
    responsibilities: [
      'Manajemen kebutuhan logistik dan mitigasi kendala operasional selama acara.'
    ],
  },
  {
    number: '06',
    company: 'Program Rekrutmen HIMAMA',
    position: 'Talent Development & Interviewer',
    period: '2025',
    responsibilities: [
      'Pendampingan dan wawancara terstruktur bagi calon pengurus baru.',
      'Menyusun penilaian objektif dan kualifikasi peserta rekrutmen.',
    ],
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACHIEVEMENTS (Subbagian di dalam Work Experience - Singkat & Padat)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ORG_ACHIEVEMENTS = [
  {
    title: 'Program Sosial & Pengabdian Masyarakat',
    category: 'Community Impact',
    context: 'HIMAMA Maranatha',
    description: 'Bakti sosial, pembagian sembako, dan kunjungan panti wreda.',
  },
  {
    title: 'Koordinasi Lintas Divisi Sesuai Timeline',
    category: 'Project Execution',
    context: 'EX CLASS HIMAMA 2025',
    description: 'Sinkronisasi divisi acara, logistik, dan publikasi pelatihan.',
  },
  {
    title: 'Kelancaran Operasional & Mitigasi Acara',
    category: 'Event Operations',
    context: 'Operasional HIMAMA',
    description: 'Manajemen logistik dan kelancaran arus peserta acara kampus.',
  },
  {
    title: 'Pendampingan & Evaluasi Rekrutmen',
    category: 'Talent Development',
    context: 'Rekrutmen HIMAMA 2025',
    description: 'Bimbingan, wawancara terstruktur, dan penilaian calon pengurus.',
  },
];

const COMPETITION_ACHIEVEMENTS = [
  {
    title: 'POM 2025 Champions 5x5 Men Basketball',
    badge: 'Juara 1',
    event: 'Pekan Olahraga Mahasiswa, Universitas Kristen Maranatha',
    year: '2025',
    image: IMAGES.pom2025Champion,
    description: 'Meraih gelar Juara 1 turnamen basket putra 5x5 tingkat Universitas Kristen Maranatha.',
  },
  {
    title: 'Juara 1 Kejuaraan Antar Klub Divisi 2 PERBASI Kota Bandung',
    badge: 'Juara 1',
    event: 'Kejuaraan Antar Klub Divisi 2 (SRIWIJAYA - BERNS)',
    year: '2025',
    image: IMAGES.perbasiBandungDiv1,
    description: 'Menjuarai kompetisi divisi 2 bola basket antar klub resmi PERBASI Kota Bandung bersama Sriwijaya - Berns.',
  },
  {
    title: 'POM 2026 Champions Basket Men 5x5',
    badge: 'Juara 1',
    event: 'Pekan Olahraga Mahasiswa, Universitas Kristen Maranatha',
    year: '2026',
    image: IMAGES.maranathaSportsWeek,
    description: 'Meraih gelar Juara 1 POM Basket Men 5x5 tingkat Universitas Kristen Maranatha tahun 2026.',
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BASKETBALL VISUALS (Dipisah: Portrait 9:16 Carousel & Landscape 16:9)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const BASKETBALL_PORTRAIT_PHOTOS = [
  {
    image: IMAGES.matchJumpShot,
    caption: 'POM MARANATHA FINAL',
    subtitle: 'JUARA 1',
    description: 'Final turnamen basket putra 5x5 tingkat Universitas Kristen Maranatha',
  },
  {
    image: IMAGES.fastbreakDispora,
    caption: 'TOURNAMENT',
    subtitle: 'ICE BEARS VS ITHB',
    description: 'Laga kompetisi bola basket antara tim Ice Bears melawan ITHB, menunjukkan intensitas dan kerjasama tim dalam merebut posisi unggul di klasemen.',
  },
  {
    image: IMAGES.gameVsSmanila,
    caption: 'SPARING',
    subtitle: 'SPARING ANTAR FAKULTAS',
    description: 'Latihan persahabatan antar fakultas.',
  },
  {
    image: IMAGES.courtMatchOfficiating,
    caption: 'MATCH DAY',
    subtitle: 'MARANATHA VS TELKOM',
    description: 'Pertandingan basket antar universitas',
  },
  {
    image: IMAGES.trainingConditioning,
    caption: 'TRAINING',
    subtitle: 'TAPPING',
    description: 'Latihan rutin',
  },
];

const BASKETBALL_LANDSCAPE_PHOTO = {
  image: IMAGES.mcuTeamLineup,
  caption: 'ICE BEARS MARANATHA',
  subtitle: 'TOURNAMENT   ',
  description: 'Skuad resmi tim bola basket Universitas Kristen Maranatha.',
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ORGANIZATIONAL EXPERIENCES (Data 3 Peran Resmi Sesuai Prompt)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ORG_ROLES = [
  {
    role: 'Vice Head of Community Service Division',
    organization: 'Himpunan Mahasiswa Manajemen • Universitas Kristen Maranatha',
    period: '2024 - 2026',
    description:
      'Memimpin perencanaan kegiatan kemasyarakatan, menjalin relasi dengan mitra panti asuhan dan panti jompo, serta mengkoordinasikan distribusi bantuan logistik kemanusiaan mahasiswa.',
  },
  {
    role: 'Vice Coordinator of EX CLASS HIMAMA 2025',
    organization: 'Himpunan Mahasiswa Manajemen • Universitas Kristen Maranatha',
    period: '2025',
    description:
      'Bertanggung jawab mendampingi koordinator dalam penyusunan silabus kelas pelatihan, sinkronisasi jadwal pemateri profesional, serta memastikan keaktifan peserta mahasiswa Manajemen Pemasaran.',
  },
  {
    role: 'Mentor of HIMAMA 2025 Recruitment Program',
    organization: 'Himpunan Mahasiswa Manajemen • Universitas Kristen Maranatha',
    period: '2025',
    description:
      'Membimbing calon pengurus baru, memandu sesi wawancara, serta memfasilitasi masa orientasi budaya kerja organisasi.',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lightboxData, setLightboxData] = useState<{
    image: string;
    title: string;
    subtitle?: string;
    description: string;
  } | null>(null);

  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroShatterProgress, setHeroShatterProgress] = useState(0);
  const [heroShatterVelocity, setHeroShatterVelocity] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Carousel States
  const [aboutSlideIndex, setAboutSlideIndex] = useState(0);
  const [aboutIsHovered, setAboutIsHovered] = useState(false);
  const aboutTouchStartX = useRef<number | null>(null);

  const [orgSlideIndex, setOrgSlideIndex] = useState(0);
  const [orgIsHovered, setOrgIsHovered] = useState(false);
  const orgTouchStartX = useRef<number | null>(null);

  // Basketball 9:16 Portrait Carousel States
  const [basketSlideIndex, setBasketSlideIndex] = useState(0);
  const [basketIsHovered, setBasketIsHovered] = useState(false);
  const basketTouchStartX = useRef<number | null>(null);

  // Contact Form
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Auto-slide for About Carousel (~2s)
  useEffect(() => {
    if (aboutIsHovered) return;
    const timer = setInterval(() => {
      setAboutSlideIndex((prev) => (prev + 1) % ABOUT_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [aboutIsHovered]);

  // Auto-slide for Organization Carousel (~2s)
  useEffect(() => {
    if (orgIsHovered) return;
    const timer = setInterval(() => {
      setOrgSlideIndex((prev) => (prev + 1) % ORG_SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [orgIsHovered]);

  // Auto-slide for Basketball 9:16 Portrait Carousel (2s)
  useEffect(() => {
    if (basketIsHovered) return;
    const timer = setInterval(() => {
      setBasketSlideIndex((prev) => (prev + 1) % BASKETBALL_PORTRAIT_PHOTOS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [basketIsHovered]);

  // Touch Swipe Handlers for About
  const handleAboutTouchStart = (e: React.TouchEvent) => {
    aboutTouchStartX.current = e.touches[0].clientX;
  };
  const handleAboutTouchEnd = (e: React.TouchEvent) => {
    if (aboutTouchStartX.current === null) return;
    const diff = aboutTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setAboutSlideIndex((prev) => (prev + 1) % ABOUT_SLIDES.length);
    } else if (diff < -50) {
      setAboutSlideIndex((prev) => (prev - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);
    }
    aboutTouchStartX.current = null;
  };

  // Touch Swipe Handlers for Org
  const handleOrgTouchStart = (e: React.TouchEvent) => {
    orgTouchStartX.current = e.touches[0].clientX;
  };
  const handleOrgTouchEnd = (e: React.TouchEvent) => {
    if (orgTouchStartX.current === null) return;
    const diff = orgTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setOrgSlideIndex((prev) => (prev + 1) % ORG_SLIDES.length);
    } else if (diff < -50) {
      setOrgSlideIndex((prev) => (prev - 1 + ORG_SLIDES.length) % ORG_SLIDES.length);
    }
    orgTouchStartX.current = null;
  };

  // Touch Swipe Handlers for Basketball
  const handleBasketTouchStart = (e: React.TouchEvent) => {
    basketTouchStartX.current = e.touches[0].clientX;
  };
  const handleBasketTouchEnd = (e: React.TouchEvent) => {
    if (basketTouchStartX.current === null) return;
    const diff = basketTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setBasketSlideIndex((prev) => (prev + 1) % BASKETBALL_PORTRAIT_PHOTOS.length);
    } else if (diff < -50) {
      setBasketSlideIndex((prev) => (prev - 1 + BASKETBALL_PORTRAIT_PHOTOS.length) % BASKETBALL_PORTRAIT_PHOTOS.length);
    }
    basketTouchStartX.current = null;
  };

  // Responsive screen & reduced motion detection
  useEffect(() => {
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', motionHandler);
    };
  }, []);

  // Detect scroll for blurred fixed header & Cinematic Damped Hero Shatter Animation
  useEffect(() => {
    let animId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;

    const updateLoop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0008) {
        currentProgress += diff * 0.14; // smooth fluid damping
        const vel = Math.abs(diff);
        setHeroShatterProgress(currentProgress);
        setHeroShatterVelocity(vel);
        animId = requestAnimationFrame(updateLoop);
      } else {
        currentProgress = targetProgress;
        setHeroShatterProgress(currentProgress);
        setHeroShatterVelocity(0);
        isRunning = false;
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrolled = window.scrollY;
      const maxScroll = 440; // Progressive shatter over 440px scroll
      targetProgress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(updateLoop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Scroll Reveal & Active Section Observer with Smooth Replay
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale, .divider-expand'
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // Replay smooth animation when scrolling away and back
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight * 0.85 || rect.bottom < 0) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    const sections = ['hero', 'about', 'experience', 'organization', 'contact'];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const mailtoLink = `mailto:piri.yonathan@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(
      senderName || 'Visitor'
    )}&body=${encodeURIComponent(`Halo Yonathan,\n\n${messageText}\n\nPengirim: ${senderName} (${senderEmail})`)}`;

    setMessageSent(true);
    setTimeout(() => {
      window.location.href = mailtoLink;
      setIsContactModalOpen(false);
      setMessageSent(false);
      setSenderName('');
      setSenderEmail('');
      setMessageText('');
    }, 600);
  };

  const currentAboutSlide = ABOUT_SLIDES[aboutSlideIndex];
  const currentOrgSlide = ORG_SLIDES[orgSlideIndex];

  return (
    <div className="bg-[#F7F7F4] text-[#111111] min-h-screen selection:bg-[#111111] selection:text-[#F7F7F4] overflow-x-hidden">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. NAVIGATION BAR (Logo YONA. Gede & Tegas, Fixed & Blur)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#F7F7F4]/80 backdrop-blur-xl shadow-sm border-b border-[#D0D0CC]/80 py-1'
          : 'bg-[#F7F7F4]/95 backdrop-blur-md border-b border-[#D0D0CC] py-2'
          }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 h-20 sm:h-24 flex items-center justify-between">
          {/* Logo YONA. Resmi (Gede & Menonjol) */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="hover:opacity-85 transition-opacity select-none flex items-center"
            aria-label="YONA."
          >
            <img
              src="/yona-logo.png"
              alt="YONA."
              className="h-12 sm:h-16 lg:h-18 w-auto object-contain"
              style={{ maxWidth: '220px' }}
            />
          </a>

          {/* Navigasi Utama: Home, About, Work Experience, Organization, Contact */}
          <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#666666]">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Work Experience' },
              { id: 'organization', label: 'Organization' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative py-1 transition-colors ${isActive ? 'text-[#111111]' : 'hover:text-[#111111]'
                    }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111] rounded-full transition-all" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-sans tracking-[0.14em] uppercase hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <span>CONTACT ME</span>
              <span className="font-sans text-xs">→</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2 text-[#111111] hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F7F4]/95 backdrop-blur-xl px-6 py-5 border-t border-[#D0D0CC] shadow-md">
            <nav className="flex flex-col gap-3 font-sans text-xs font-semibold tracking-[0.16em] uppercase text-[#555555]">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Work Experience' },
                { id: 'organization', label: 'Organization' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`py-1.5 transition-colors ${activeSection === link.id ? 'text-[#111111] font-bold' : 'hover:text-[#111111]'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── MAIN CONTENT (Offset for Fixed Header) ── */}
      <main className="pt-24 sm:pt-28 lg:pt-24">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. HERO SECTION (Centered Symmetrical Clean Layout)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="hero"
          className="relative max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 lg:pt-4 pb-4 sm:pb-6 lg:pb-16 hairline-b overflow-hidden min-h-[calc(100svh-6rem)] lg:min-h-0 flex flex-col justify-center lg:block"
        >
          {/* Tipografi Raksasa YONATHAN di Atas Tengah */}
          <div className="w-full text-center select-none relative z-10 px-2 reveal-on-scroll">
            <h1
              className="font-giant text-[clamp(2.6rem,11.2vw,12.5rem)] text-[#111111] w-full block text-center leading-[0.85] tracking-[-0.04em] select-none"
              aria-label="Yonathan Piri"
            >
              YONATHAN
            </h1>
          </div>

          {/* 3-Part Hero Grid: Kiri | Tengah (Portrait + PIRI) | Kanan */}
          <div className="relative w-full mt-2 sm:mt-4 z-20 grid grid-cols-1 lg:grid-cols-12 items-center gap-5 sm:gap-6 lg:gap-0">

            {/* ── KIRI: Marketing Management + Tagline ── */}
            <div className="lg:col-span-3 z-30 flex flex-col justify-center items-center lg:items-start order-2 lg:order-1 pt-0 sm:pt-2 lg:pt-0 reveal-on-scroll">
              <p className="font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-[#111111] leading-relaxed mb-3 lg:mb-3 text-center lg:text-left">
                MARKETING MANAGEMENT
              </p>

              <div className="flex flex-col items-center lg:items-start gap-3">
                <a
                  href="#experience"
                  onClick={(e) => handleNavClick(e, 'experience')}
                  className="hidden lg:inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-sans tracking-[0.14em] uppercase hover:bg-neutral-800 transition-colors shadow-xs whitespace-nowrap"
                >
                  <span>VIEW WORK EXPERIENCE</span>
                  <span className="font-sans">→</span>
                </a>

                {/* Desktop: Download CV here | Mobile: tagline here */}
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="hidden lg:inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border border-[#D0D0CC] text-[#111111] text-xs font-sans tracking-[0.14em] uppercase hover:bg-white transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>DOWNLOAD CV</span>
                </button>

                <p className="lg:hidden font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-[#111111] leading-relaxed text-center">
                  "OPEN TO WORK"
                </p>
              </div>
            </div>

            {/* ── TENGAH: PIRI & Portrait Terpusat Sempurna ── */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2 min-h-0 lg:min-h-[560px] overflow-visible reveal-scale mx-auto">
              {/* Latar Tipografi PIRI Tepat di Tengah */}
              <div className="absolute top-0 sm:top-2 lg:top-4 inset-x-0 flex items-center justify-center pointer-events-none select-none z-10">
                <span className="font-giant text-[clamp(3.6rem,15vw,15rem)] text-[#111111] tracking-[-0.04em] leading-[0.8] opacity-100 text-center">
                  PIRI
                </span>
              </div>

              {/* Portrait Cutout with Cinematic Scroll Shatter & Memory Particles */}
              <div
                className="relative z-20 -mt-6 sm:-mt-12 md:-mt-16 lg:-mt-24 w-[240px] xs:w-[270px] sm:w-[320px] md:w-[360px] lg:w-[420px] max-w-[82vw] cursor-pointer group mx-auto select-none"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d',
                }}
                onClick={() =>
                  setLightboxData({
                    image: IMAGES.fullPortrait,
                    title: 'Yonathan Cavien Gabriel Piri',
                    subtitle: 'Universitas Kristen Maranatha, Class of 2023',
                    description: 'Foto portrait studio formal Yonathan Cavien Gabriel Piri.',
                  })
                }
              >
                {/* 1. Base Intact Portrait (fades smoothly as scroll increases) */}
                <img
                  src={IMAGES.heroCutout}
                  alt="Yonathan Piri Formal Portrait"
                  className="w-full h-auto object-contain portrait-reference-shadow select-none mx-auto block transition-transform duration-500 group-hover:scale-[1.01]"
                  style={{
                    opacity: heroShatterProgress === 0 ? 1 : Math.max(0, 1 - heroShatterProgress * 2.8),
                    transition: 'opacity 0.15s ease-out',
                  }}
                  fetchPriority="high"
                />

                {/* 2. Dynamic Dispersion Shards & Memory Particles (Aktif Saat Scroll) */}
                {heroShatterProgress > 0 && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      opacity: heroShatterProgress < 0.88 ? 1 : Math.max(0, 1 - (heroShatterProgress - 0.88) / 0.12),
                    }}
                  >
                    {/* A. Silhouette Polygon Shards */}
                    {HERO_PORTRAIT_SHARDS.map((shard, idx) => {
                      const localProgress = Math.max(0, (heroShatterProgress - (shard.delay || 0)) / (1 - (shard.delay || 0)));
                      const eased = localProgress <= 0 ? 0 : 1 - Math.pow(1 - localProgress, 2.4);
                      const moveMult = isMobileScreen ? 0.6 : 1;
                      const curX = reducedMotion ? 0 : shard.x * eased * moveMult;
                      const curY = reducedMotion ? 0 : shard.y * eased * moveMult;
                      const curZ = reducedMotion ? 0 : shard.z * eased;
                      const curR = reducedMotion ? 0 : shard.r * eased;
                      const curS = reducedMotion ? 1 : 1 - (1 - shard.s) * eased;
                      const motionBlur = reducedMotion ? 0 : Math.min(4, heroShatterVelocity * 28);

                      return (
                        <div
                          key={idx}
                          className="absolute inset-0 will-change-transform"
                          style={{
                            clipPath: shard.clip,
                            WebkitClipPath: shard.clip,
                            transform: `translate3d(${curX}px, ${curY}px, ${curZ}px) rotate(${curR}deg) scale(${curS})`,
                            filter: `drop-shadow(${curX * 0.08}px ${curY * 0.08}px 12px rgba(0,0,0,${0.34 * (1 - heroShatterProgress * 0.4)})) blur(${motionBlur}px)`,
                            transition: 'transform 0.05s linear',
                          }}
                        >
                          <img
                            src={IMAGES.heroCutout}
                            alt=""
                            className="w-full h-auto object-contain select-none block"
                            draggable={false}
                          />
                        </div>
                      );
                    })}

                    {/* B. Storytelling Memory Shards (Basket & Organisasi) */}
                    {HERO_MEMORY_SHARDS.map((shard) => {
                      let memOpacity = 0;
                      if (heroShatterProgress > shard.startProgress && heroShatterProgress < shard.endProgress) {
                        if (heroShatterProgress < shard.peakProgress) {
                          memOpacity = (heroShatterProgress - shard.startProgress) / (shard.peakProgress - shard.startProgress);
                        } else {
                          memOpacity = 1 - (heroShatterProgress - shard.peakProgress) / (shard.endProgress - shard.peakProgress);
                        }
                      }
                      if (memOpacity <= 0) return null;

                      const progressSpan = shard.endProgress - shard.startProgress;
                      const localP = Math.min(Math.max((heroShatterProgress - shard.startProgress) / progressSpan, 0), 1);
                      const easedP = 1 - Math.pow(1 - localP, 2.2);

                      const moveMult = isMobileScreen ? 0.55 : 1;
                      const posX = reducedMotion ? 0 : shard.targetX * easedP * moveMult;
                      const posY = reducedMotion ? 0 : shard.targetY * easedP * moveMult;
                      const posZ = reducedMotion ? 0 : shard.targetZ * easedP;
                      const rot = reducedMotion ? 0 : shard.targetRotate * easedP;
                      const scale = reducedMotion ? 1 : 0.65 + 0.35 * easedP;
                      const motionBlur = reducedMotion ? 0 : Math.min(3, heroShatterVelocity * 18);

                      return (
                        <div
                          key={shard.id}
                          className="absolute z-30 pointer-events-auto cursor-pointer group/card transition-transform duration-300 hover:scale-105 hover:z-40"
                          style={{
                            left: '50%',
                            top: '50%',
                            width: isMobileScreen ? '116px' : '150px',
                            opacity: memOpacity,
                            transform: `translate3d(calc(-50% + ${posX}px), calc(-50% + ${posY}px), ${posZ}px) rotate(${rot}deg) scale(${scale})`,
                            filter: `drop-shadow(0 14px 26px rgba(0,0,0,0.24)) blur(${motionBlur}px)`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxData({
                              image: shard.image,
                              title: shard.title,
                              subtitle: shard.subtitle,
                              description: shard.description,
                            });
                          }}
                        >
                          <div className="relative rounded-xs overflow-hidden border border-[#E0E0DB] bg-white/95 shadow-xl transition-all duration-200 group-hover/card:border-[#111111] group-hover/card:shadow-2xl">
                            <div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-100">
                              <img
                                src={shard.image}
                                alt={shard.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                                draggable={false}
                              />
                              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-[2px] bg-black/80 backdrop-blur-xs text-[7px] sm:text-[8px] font-mono tracking-widest text-white uppercase select-none">
                                {shard.category}
                              </div>
                            </div>
                            <div className="px-2 py-1 bg-white/95 flex items-center justify-between border-t border-[#EFEFEA]">
                              <span className="font-sans font-semibold text-[8px] sm:text-[9px] text-[#111111] truncate max-w-[85px] sm:max-w-[105px]">
                                {shard.title}
                              </span>
                              <span className="text-[8px] font-mono text-[#888888] group-hover/card:text-[#111111] transition-colors">↗</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* C. Stardust Particles & Micro-Crystals */}
                    {HERO_STARDUST_PARTICLES.map((crystal, cIdx) => {
                      const eased = 1 - Math.pow(1 - heroShatterProgress, 2);
                      const curX = reducedMotion ? 0 : crystal.x * eased * (isMobileScreen ? 0.6 : 1);
                      const curY = reducedMotion ? 0 : crystal.y * eased * (isMobileScreen ? 0.6 : 1);
                      const curZ = reducedMotion ? 0 : crystal.z * eased;
                      const curR = reducedMotion ? 0 : crystal.r * eased * 2.2;
                      const opacity = heroShatterProgress > 0.05 ? Math.sin(heroShatterProgress * Math.PI) * 0.85 : 0;
                      const motionBlur = reducedMotion ? 0 : Math.min(3, heroShatterVelocity * 16);

                      return (
                        <div
                          key={cIdx}
                          className="absolute pointer-events-none rounded-[1px] bg-gradient-to-tr from-white/90 via-neutral-200/80 to-black/30 border border-white/50 shadow-xs"
                          style={{
                            width: `${crystal.size}px`,
                            height: `${crystal.size}px`,
                            left: crystal.left,
                            top: crystal.top,
                            opacity,
                            transform: `translate3d(${curX}px, ${curY}px, ${curZ}px) rotate(${curR}deg)`,
                            filter: `blur(${motionBlur}px)`,
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Mobile/Tablet CTA button anchored directly to bottom of portrait */}
                <div className="lg:hidden absolute bottom-[-6px] sm:bottom-[-4px] inset-x-0 flex justify-center z-40 pointer-events-none">
                  <a
                    href="#experience"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick(e, 'experience');
                    }}
                    className="pointer-events-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-[#111111] text-white text-[11px] sm:text-xs font-sans tracking-[0.14em] uppercase hover:bg-neutral-800 transition-colors shadow-lg whitespace-nowrap active:scale-95"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                  >
                    <span>VIEW WORK EXPERIENCE</span>
                    <span className="font-sans">→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ── KANAN: Tagline (desktop) / Download CV (mobile) ── */}
            <div className="lg:col-span-3 z-30 flex flex-col justify-center items-center lg:items-end text-center lg:text-right order-3 reveal-on-scroll">
              <p className="hidden lg:block font-sans font-bold text-xs sm:text-sm lg:text-base tracking-[0.2em] uppercase text-[#111111] leading-relaxed max-w-[260px]">
                "OPEN TO WORK"
              </p>

              <button
                onClick={() => setIsCvModalOpen(true)}
                className="lg:hidden inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#D0D0CC] text-[#111111] text-xs font-sans tracking-[0.14em] uppercase hover:bg-white transition-colors whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD CV</span>
              </button>
            </div>

          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. ABOUT SECTION (CAROUSEL OTOMATIS FOTO SOLO & STUDIO)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="about"
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-24 hairline-b"
        >
          <div className="mb-12 reveal-on-scroll">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#555555] block mb-2">
              BIOGRAPHY &amp; PROFILE
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-6xl text-[#111111] uppercase leading-none tracking-tight">
              ABOUT ME
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Kolom Kiri: Carousel Otomatis Foto Individual & Studio */}
            <div
              className="lg:col-span-5 reveal-on-scroll"
              onMouseEnter={() => setAboutIsHovered(true)}
              onMouseLeave={() => setAboutIsHovered(false)}
              onTouchStart={handleAboutTouchStart}
              onTouchEnd={handleAboutTouchEnd}
            >
              <div className="border border-[#D0D0CC] p-3 bg-white shadow-xs group">
                {/* Frame Foto Berwarna Asli dengan Animasi Slide */}
                <div className="aspect-[3/4] overflow-hidden bg-neutral-100 relative select-none">
                  {/* Sliding Track Animasi */}
                  <div
                    className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
                    style={{ transform: `translateX(-${aboutSlideIndex * 100}%)` }}
                  >
                    {ABOUT_SLIDES.map((slide, idx) => (
                      <div
                        key={slide.image + idx}
                        className="w-full h-full flex-shrink-0 relative cursor-zoom-in overflow-hidden"
                        onClick={() =>
                          setLightboxData({
                            image: slide.image,
                            title: slide.title,
                            subtitle: `${slide.context} (${slide.period})`,
                            description: slide.caption,
                          })
                        }
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          style={{ objectPosition: slide.position || 'center' }}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Kategori Badge */}
                  <div className="absolute top-3 left-3 bg-[#111111]/90 text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest pointer-events-none z-10">
                    <span>{currentAboutSlide.category}</span>
                  </div>

                  {/* Tombol Navigasi Manual */}
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAboutSlideIndex(
                          (prev) => (prev - 1 + ABOUT_SLIDES.length) % ABOUT_SLIDES.length
                        );
                      }}
                      className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAboutSlideIndex((prev) => (prev + 1) % ABOUT_SLIDES.length);
                      }}
                      className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <span className="px-2.5 py-1 bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase">
                      ZOOM PHOTO
                    </span>
                  </div>
                </div>

                {/* Caption Sesuai Foto & Indikator Pagination */}
                <div className="pt-3 px-1 border-t border-[#E8E8E4] mt-2.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555] block">
                        {currentAboutSlide.context}
                      </span>
                      <h4 className="font-editorial-heading text-base text-[#111111] uppercase">
                        {currentAboutSlide.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-[#555555] uppercase">
                      {aboutSlideIndex + 1} / {ABOUT_SLIDES.length}
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed">
                    {currentAboutSlide.caption}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    {ABOUT_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAboutSlideIndex(idx)}
                        className={`h-1 rounded-full transition-all ${aboutSlideIndex === idx ? 'w-8 bg-[#111111]' : 'w-2 bg-[#D0D0CC]'
                          }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Narasi Personal & Tabel Informasi */}
            <div className="lg:col-span-7 space-y-8 reveal-on-scroll">
              <div className="space-y-4">
                <p className="font-sans text-lg sm:text-xl lg:text-2xl text-[#111111] font-medium leading-relaxed">
                  Saya adalah mahasiswa aktif Jurusan Manajemen, Fakultas Hukum dan Bisnis Digital, Universitas Kristen Maranatha, angkatan 2023. Memiliki minat dalam komunikasi pemasaran,
                  olahraga basket, dan kepemimpinan, serta menjunjung tinggi kedisiplinan dan kerja sama tim.
                </p>

              </div>

              {/* Data Profil Rapi Tanpa Dash Dekoratif */}
              <div className="border-t border-[#D0D0CC] pt-1 space-y-2.5 font-mono text-xs sm:text-sm">
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">NAMA LENGKAP</span>
                  <span className="font-semibold text-[#111111]">Yonathan Cavien Gabriel Piri</span>
                </div>
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">UNIVERSITAS</span>
                  <span className="font-semibold text-[#111111]">Universitas Kristen Maranatha</span>
                </div>
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">FAKULTAS</span>
                  <span className="font-semibold text-[#111111]">Fakultas Hukum dan Bisnis Digital</span>
                </div>
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">PROGRAM STUDI</span>
                  <span className="font-semibold text-[#111111]">Manajemen Pemasaran</span>
                </div>
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">ANGKATAN</span>
                  <span className="font-semibold text-[#111111]">Class of 2023</span>
                </div>
                <div className="py-2.5 flex justify-between items-center border-b border-[#D0D0CC]">
                  <span className="uppercase tracking-widest text-[#555555]">LOKASI</span>
                  <span className="font-semibold text-[#111111]">Bandung, Jawa Barat</span>
                </div>
              </div>

              {/* CV Callout Box */}
              <div className="p-6 border border-[#D0D0CC] bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#555555]">
                  <FileText className="w-4 h-4 text-[#111111]" />
                  <span>CURRICULUM VITAE</span>
                </div>
                <h3 className="font-editorial-heading text-xl text-[#111111] uppercase tracking-wide">
                  CV RESUME LENGKAP
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#555555] leading-relaxed">
                  Lihat CV lengkap untuk meninjau riwayat akademik, pengalaman profesional Bekerja serta kontribusi organisasi HIMAMA.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCvModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white font-sans text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    <span>BUKA RESUME</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. WORK EXPERIENCE & ACHIEVEMENT (SATU SECTION UTAMA)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="experience"
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-24 hairline-b overflow-x-clip"
        >
          {/* Header Section */}
          <div className="mb-14 reveal-left">
            <h2 className="font-editorial-heading text-4xl sm:text-6xl text-[#111111] uppercase leading-none tracking-tight">
              WORK EXPERIENCE
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-wider mt-1 max-w-xl">
              Pengalaman kerja operasional   administrasi pesanan, dan pencapaian terverifikasi.
            </p>
          </div>

          {/* ── BAGIAN 1: WORK EXPERIENCE LIST (BERGANTIAN KIRI & KANAN) ── */}
          <div className="border-t border-[#D0D0CC] mb-20">
            {WORK_EXPERIENCES.map((exp, expIdx) => (
              <div
                key={exp.company}
                className={`py-10 border-b border-[#D0D0CC] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-white/60 px-4 -mx-4 transition-colors ${expIdx % 2 === 0 ? 'reveal-left stagger-1' : 'reveal-right stagger-2'
                  }`}
              >
                {/* Nomor Urut & Periode */}
                <div className="lg:col-span-3 space-y-1.5">
                  <span className="font-mono text-2xl font-bold text-[#111111] block">
                    {exp.number}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#555555]">
                    <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Nama Perusahaan & Posisi */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="font-editorial-heading text-2xl sm:text-3xl text-[#111111] uppercase tracking-wide">
                    {exp.company}
                  </h3>
                  <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#555555]">
                    {exp.position}
                  </p>
                </div>

                {/* Tanggung Jawab */}
                <div className="lg:col-span-5 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555] block">
                    RESPONSIBILITIES
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#333333] leading-relaxed">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#111111] font-mono mt-1 text-xs">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ── BAGIAN 2: SUBHEADING ACHIEVEMENT (BASKETBALL ONLY) ── */}
          <div className="pt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#D0D0CC] reveal-left">
              <div>

                <h3 className="font-editorial-heading text-3xl sm:text-4xl text-[#111111] uppercase tracking-tight">
                  ACHIEVEMENT
                </h3>
              </div>
              <p className="font-mono text-xs text-[#555555] uppercase tracking-wider max-w-md">
                Pencapaian kejuaraan bola basket resmi tingkat universitas dan klub kota Bandung.
              </p>
            </div>

            {/* Pencapaian Kejuaraan Basket Resmi (Bergantian Kiri & Kanan) */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COMPETITION_ACHIEVEMENTS.map((ach, achIdx) => (
                  <div
                    key={ach.title}
                    onClick={() =>
                      setLightboxData({
                        image: ach.image,
                        title: ach.title,
                        subtitle: `${ach.event} (${ach.year})`,
                        description: ach.description,
                      })
                    }
                    className={`border border-[#D0D0CC] bg-white p-3 cursor-pointer group hover:shadow-md transition-all ${achIdx % 2 === 0 ? 'reveal-left' : 'reveal-right'
                      } ${achIdx === 0 ? 'stagger-1' : achIdx === 1 ? 'stagger-2' : 'stagger-3'}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-100 relative mb-3">
                      <img
                        src={ach.image}
                        alt={ach.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 bg-[#111111] text-white px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                        {ach.badge}
                      </span>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="p-1 rounded-full bg-[#111111] text-white flex items-center justify-center">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 px-1">
                      <div className="flex justify-between text-[10px] font-mono text-[#555555]">
                        <span className="truncate">{ach.event}</span>
                        <span>{ach.year}</span>
                      </div>
                      <h5 className="font-editorial-heading text-sm text-[#111111] uppercase leading-tight group-hover:text-black">
                        {ach.title}
                      </h5>
                      <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dokumentasi Aksi Basket (Dipisah: Portrait 9:16 Carousel & Landscape 16:9) */}
              <div className="pt-8 border-t border-[#E8E8E4] mt-8">
                <div className="flex items-center justify-between mb-4 reveal-left">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#555555] block">
                    BASKETBALL IN ACTION
                  </span>
                  <span className="font-mono text-[10px] text-[#777777] uppercase tracking-wider">
                    DOKUMENTASI LAPANGAN
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  {/* Kolom Kiri: 4:3 Carousel dengan Animasi Slide ke Kanan 2 Detik */}
                  <div
                    className="reveal-left stagger-1 h-full"
                    onMouseEnter={() => setBasketIsHovered(true)}
                    onMouseLeave={() => setBasketIsHovered(false)}
                    onTouchStart={handleBasketTouchStart}
                    onTouchEnd={handleBasketTouchEnd}
                  >
                    <div className="border border-[#D0D0CC] p-3 bg-white shadow-xs group h-full flex flex-col justify-between">
                      {/* Frame Foto 4:3 Carousel */}
                      <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative select-none">
                        {/* Sliding Track Animasi */}
                        <div
                          className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
                          style={{ transform: `translateX(-${basketSlideIndex * 100}%)` }}
                        >
                          {BASKETBALL_PORTRAIT_PHOTOS.map((photo, i) => (
                            <div
                              key={photo.image + i}
                              className="w-full h-full flex-shrink-0 relative cursor-zoom-in overflow-hidden"
                              onClick={() =>
                                setLightboxData({
                                  image: photo.image,
                                  title: photo.caption,
                                  subtitle: photo.subtitle,
                                  description: photo.description,
                                })
                              }
                            >
                              <img
                                src={photo.image}
                                alt={photo.caption}
                                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                                loading={i === 0 ? 'eager' : 'lazy'}
                              />
                            </div>
                          ))}
                        </div>



                        {/* Indikator Slide */}
                        <div className="absolute top-3 right-3 bg-[#111111]/80 text-white px-2 py-0.5 text-[9px] font-mono tracking-wider pointer-events-none z-10">
                          <span>
                            {basketSlideIndex + 1} / {BASKETBALL_PORTRAIT_PHOTOS.length}
                          </span>
                        </div>

                        {/* Tombol Navigasi Manual */}
                        <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBasketSlideIndex(
                                (prev) =>
                                  (prev - 1 + BASKETBALL_PORTRAIT_PHOTOS.length) %
                                  BASKETBALL_PORTRAIT_PHOTOS.length
                              );
                            }}
                            className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                            aria-label="Previous basketball slide"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setBasketSlideIndex(
                                (prev) => (prev + 1) % BASKETBALL_PORTRAIT_PHOTOS.length
                              );
                            }}
                            className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                            aria-label="Next basketball slide"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Zoom Badge */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <span className="px-2.5 py-1 bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase">
                            ZOOM PHOTO
                          </span>
                        </div>
                      </div>

                      {/* Info & Caption Slide */}
                      <div className="pt-3 px-1 border-t border-[#E8E8E4] mt-2.5 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
                              {BASKETBALL_PORTRAIT_PHOTOS[basketSlideIndex].subtitle}
                            </span>
                            <span className="font-mono text-[10px] text-[#555555] uppercase">
                              SLIDE 2S
                            </span>
                          </div>
                          <h4 className="font-editorial-heading text-base text-[#111111] uppercase">
                            {BASKETBALL_PORTRAIT_PHOTOS[basketSlideIndex].caption}
                          </h4>
                          <p className="text-xs text-[#555555] leading-relaxed">
                            {BASKETBALL_PORTRAIT_PHOTOS[basketSlideIndex].description}
                          </p>
                        </div>

                        {/* Dot Indicators */}
                        <div className="flex items-center gap-1.5 pt-2">
                          {BASKETBALL_PORTRAIT_PHOTOS.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setBasketSlideIndex(idx)}
                              className={`h-1 rounded-full transition-all ${basketSlideIndex === idx
                                ? 'w-8 bg-[#111111]'
                                : 'w-2 bg-[#D0D0CC]'
                                }`}
                              aria-label={`Slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kolom Kanan: 4:3 Landscape Dipisah (Rata & Sejajar) */}
                  <div className="reveal-right stagger-2 h-full">
                    <div className="border border-[#D0D0CC] p-3 bg-white shadow-xs group h-full flex flex-col justify-between">
                      {/* Frame Foto 4:3 Skuad */}
                      <div
                        className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative select-none cursor-zoom-in"
                        onClick={() =>
                          setLightboxData({
                            image: BASKETBALL_LANDSCAPE_PHOTO.image,
                            title: BASKETBALL_LANDSCAPE_PHOTO.caption,
                            subtitle: BASKETBALL_LANDSCAPE_PHOTO.subtitle,
                            description: BASKETBALL_LANDSCAPE_PHOTO.description,
                          })
                        }
                      >
                        <img
                          src={BASKETBALL_LANDSCAPE_PHOTO.image}
                          alt={BASKETBALL_LANDSCAPE_PHOTO.caption}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                          loading="lazy"
                        />


                        {/* Zoom Badge */}
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <span className="px-2.5 py-1 bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase">
                            ZOOM PHOTO
                          </span>
                        </div>
                      </div>

                      {/* Info & Caption Landscape */}
                      <div className="pt-3 px-1 border-t border-[#E8E8E4] mt-2.5 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
                              {BASKETBALL_LANDSCAPE_PHOTO.subtitle}
                            </span>

                          </div>
                          <h4 className="font-editorial-heading text-base text-[#111111] uppercase">
                            {BASKETBALL_LANDSCAPE_PHOTO.caption}
                          </h4>
                          <p className="text-xs text-[#555555] leading-relaxed">
                            {BASKETBALL_LANDSCAPE_PHOTO.description}
                          </p>
                        </div>

                        {/* Spacer sejajar dengan baris dot indicator di kolom kiri */}
                        <div className="h-1 pt-2 opacity-0 select-none">
                          <span className="h-1 block" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. ORGANIZATIONAL EXPERIENCE (CAROUSEL DOKUMENTASI & 3 PERAN)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="organization"
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-24 hairline-b overflow-x-clip"
        >
          {/* Section Heading: Masuk dari KANAN sesuai konsep prompt */}
          <div className="mb-14 reveal-right">

            <h2 className="font-editorial-heading text-4xl sm:text-6xl text-[#111111] uppercase leading-none tracking-tight">
              ORGANIZATION
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#555555] uppercase tracking-wider mt-2.5 max-w-xl">
              Pengalaman organisasi di Himpunan Mahasiswa Manajemen Universitas Kristen Maranatha.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Kolom Kiri: Auto-Sliding Carousel Dokumentasi Kegiatan (Masuk Kiri) */}
            <div
              className="lg:col-span-6 reveal-left stagger-1"
              onMouseEnter={() => setOrgIsHovered(true)}
              onMouseLeave={() => setOrgIsHovered(false)}
              onTouchStart={handleOrgTouchStart}
              onTouchEnd={handleOrgTouchEnd}
            >
              <div className="border border-[#D0D0CC] p-3.5 bg-white shadow-xs group">
                {/* Frame Foto Dokumentasi dengan Animasi Slide */}
                <div className="aspect-[16/11] overflow-hidden bg-neutral-100 relative select-none">
                  {/* Sliding Track Animasi */}
                  <div
                    className="flex h-full w-full transition-transform duration-700 ease-out will-change-transform"
                    style={{ transform: `translateX(-${orgSlideIndex * 100}%)` }}
                  >
                    {ORG_SLIDES.map((slide, idx) => (
                      <div
                        key={slide.image + idx}
                        className="w-full h-full flex-shrink-0 relative cursor-zoom-in overflow-hidden"
                        onClick={() =>
                          setLightboxData({
                            image: slide.image,
                            title: slide.title,
                            subtitle: `${slide.context} (${slide.period})`,
                            description: slide.caption,
                          })
                        }
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Kategori Badge */}
                  <div className="absolute top-3 left-3 bg-[#111111]/90 text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 pointer-events-none z-10">
                    <Users className="w-3.5 h-3.5" />
                    <span>{currentOrgSlide.category}</span>
                  </div>

                  {/* Tombol Navigasi Manual */}
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrgSlideIndex(
                          (prev) => (prev - 1 + ORG_SLIDES.length) % ORG_SLIDES.length
                        );
                      }}
                      className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrgSlideIndex((prev) => (prev + 1) % ORG_SLIDES.length);
                      }}
                      className="p-1.5 rounded-full bg-white/95 text-[#111111] shadow-md pointer-events-auto hover:bg-white transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <span className="px-2.5 py-1 bg-[#111111] text-white text-[9px] font-mono tracking-widest uppercase">
                      ZOOM PHOTO
                    </span>
                  </div>
                </div>

                {/* Caption Dinamis Berdasarkan Foto Aktif */}
                <div className="pt-3.5 px-1 border-t border-[#E8E8E4] mt-2.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555] block">
                        {currentOrgSlide.context} • {currentOrgSlide.period}
                      </span>
                      <h4 className="font-editorial-heading text-lg text-[#111111] uppercase">
                        {currentOrgSlide.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[10px] text-[#555555] uppercase">
                      {orgSlideIndex + 1} / {ORG_SLIDES.length}
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed">
                    {currentOrgSlide.caption}
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">
                    {ORG_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setOrgSlideIndex(idx)}
                        className={`h-1 rounded-full transition-all ${orgSlideIndex === idx ? 'w-8 bg-[#111111]' : 'w-2 bg-[#D0D0CC]'
                          }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Tiga Peran Resmi HIMAMA (Masuk Kanan & Bergantian) */}
            <div className="lg:col-span-6 space-y-6 reveal-right stagger-2">
              <div className="border-t border-[#D0D0CC]">
                {ORG_ROLES.map((roleItem, index) => (
                  <div
                    key={index}
                    className={`py-6 border-b border-[#D0D0CC] space-y-2 group hover:bg-white/60 px-4 -mx-4 transition-colors ${index % 2 === 0 ? 'reveal-right' : 'reveal-left'
                      } ${index === 0 ? 'stagger-1' : index === 1 ? 'stagger-2' : 'stagger-3'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="font-editorial-heading text-xl text-[#111111] uppercase group-hover:text-black">
                        {roleItem.role}
                      </h4>
                      <span className="font-mono text-xs text-[#555555] shrink-0">
                        {roleItem.period}
                      </span>
                    </div>

                    <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#111111]">
                      {roleItem.organization}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {roleItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. CONTACT SECTION (MINIMALIS & ELEGAN - TANPA TABRAKAN)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section
          id="contact"
          className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 py-20 sm:py-24 overflow-x-clip"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Kolom Kiri: Headline LET'S CONNECT (Masuk Kiri Sesuai Konsep Prompt) */}
            <div className="lg:col-span-5 space-y-6 reveal-left stagger-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#555555] block">
                TERTARIK?<br />
              </span>
              <h2 className="font-giant text-5xl sm:text-7xl lg:text-7xl xl:text-8xl text-[#111111] leading-[0.9] tracking-tight uppercase break-words">
                HIT ME UP!<br />

              </h2>
              <p className="font-sans text-sm sm:text-base text-[#555555] leading-relaxed max-w-md">
                Terbuka untuk proyek pemasaran, program sponsorship olahraga, maupun komunikasi profesional.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white font-sans text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Kirim Pesan Langsung</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Kolom Kanan: Baris Kontak (Bergantian Kiri & Kanan) */}
            <div className="lg:col-span-7 border-t border-[#D0D0CC] reveal-right stagger-2">
              {/* WhatsApp Row (Masuk Kiri) */}
              <div className="group py-6 border-b border-[#D0D0CC] flex items-center justify-between gap-4 hover:bg-white/60 px-3 -mx-3 transition-colors reveal-left stagger-1">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D0D0CC] bg-white flex items-center justify-center shrink-0 text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-xs">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-mono uppercase tracking-widest text-[#555555] mb-1">
                      WHATSAPP
                    </span>
                    <a
                      href="https://wa.me/6281355458544"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-lg sm:text-xl font-bold text-[#111111] hover:underline truncate block"
                    >
                      081355458544
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCopy('081355458544', 'phone')}
                    title="Salin nomor WhatsApp"
                    className="p-2 rounded-full border border-[#D0D0CC] hover:bg-white text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    {copiedKey === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="https://wa.me/6281355458544"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-2xl text-[#111111] group-hover:translate-x-2 transition-transform inline-block"
                  >
                    →
                  </a>
                </div>
              </div>

              {/* Email Row (Masuk Kanan) */}
              <div className="group py-6 border-b border-[#D0D0CC] flex items-center justify-between gap-4 hover:bg-white/60 px-3 -mx-3 transition-colors reveal-right stagger-2">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D0D0CC] bg-white flex items-center justify-center shrink-0 text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-xs">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-mono uppercase tracking-widest text-[#555555] mb-1">
                      GMAIL
                    </span>
                    <a
                      href="mailto:piri.yonathan@gmail.com"
                      className="font-sans text-lg sm:text-xl font-bold text-[#111111] hover:underline break-all block"
                    >
                      piri.yonathan@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCopy('piri.yonathan@gmail.com', 'email')}
                    title="Salin alamat email"
                    className="p-2 rounded-full border border-[#D0D0CC] hover:bg-white text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="mailto:piri.yonathan@gmail.com"
                    className="font-sans text-2xl text-[#111111] group-hover:translate-x-2 transition-transform inline-block"
                  >
                    →
                  </a>
                </div>
              </div>

              {/* Instagram Row (Masuk Kiri) */}
              <div className="group py-6 border-b border-[#D0D0CC] flex items-center justify-between gap-4 hover:bg-white/60 px-3 -mx-3 transition-colors reveal-left stagger-3">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D0D0CC] bg-white flex items-center justify-center shrink-0 text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-xs">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">

                    <a
                      href="https://www.instagram.com/yonathanpiri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-lg sm:text-xl font-bold text-[#111111] hover:underline truncate block"
                    >
                      @yonathanpiri
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCopy('@yonathanpiri', 'ig')}
                    title="Salin username Instagram"
                    className="p-2 rounded-full border border-[#D0D0CC] hover:bg-white text-[#555555] hover:text-[#111111] transition-colors"
                  >
                    {copiedKey === 'ig' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="https://www.instagram.com/yonathanpiri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-2xl text-[#111111] group-hover:translate-x-2 transition-transform inline-block"
                  >
                    →
                  </a>
                </div>
              </div>

              {/* LinkedIn Row (Masuk Kanan) */}
              <div className="group py-6 border-b border-[#D0D0CC] flex items-center justify-between gap-4 hover:bg-white/60 px-3 -mx-3 transition-colors reveal-right stagger-4">
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D0D0CC] bg-white flex items-center justify-center shrink-0 text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-all shadow-xs">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">

                    <a
                      href="https://www.linkedin.com/in/yonathan-piri-60917540b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-lg sm:text-xl font-bold text-[#111111] hover:underline truncate block"
                    >
                      Yonathan Piri
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="https://www.linkedin.com/in/yonathan-piri-60917540b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-2xl text-[#111111] group-hover:translate-x-2 transition-transform inline-block"
                  >
                    →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="hairline-t py-12 px-6 sm:px-10 lg:px-12 max-w-[1360px] mx-auto text-xs font-mono text-[#555555] uppercase tracking-widest">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <img
              src="/yona-logo.png"
              alt="YONA."
              className="h-9 sm:h-11 w-auto object-contain"
              style={{ maxWidth: '160px' }}
            />
            <span className="font-mono text-xs text-[#777777]">© 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8">
            <a
              href="https://www.instagram.com/yonathanpiri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors group"
            >
              <Instagram className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#111111] transition-colors" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yonathan-piri-60917540b"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors group"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#111111] transition-colors" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:piri.yonathan@gmail.com"
              className="flex items-center gap-2 hover:text-[#111111] transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#111111] transition-colors" />
              <span>Gmail</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-1 hover:text-[#111111] transition-colors flex items-center gap-1.5"
              title="Kembali ke atas"
            >
              <span>TOP</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LIGHTBOX MODAL (FOTO RESOLUSI PENUH & TEKS KONTEKSTUAL)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {lightboxData && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxData(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#F7F7F4] p-4 sm:p-6 border border-[#D0D0CC] shadow-2xl max-h-[92vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxData(null)}
              className="absolute top-4 right-4 z-10 p-2 text-[#111111] hover:opacity-70 transition-opacity bg-white/80 rounded-full"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[66vh] overflow-hidden flex items-center justify-center bg-black/5 p-2">
              <img
                src={lightboxData.image}
                alt={lightboxData.title}
                className="max-h-[62vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="pt-4 border-t border-[#D0D0CC] mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="space-y-1">
                {lightboxData.subtitle && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
                    {lightboxData.subtitle}
                  </span>
                )}
                <h4 className="font-editorial-heading text-lg sm:text-xl text-[#111111] uppercase">
                  {lightboxData.title}
                </h4>
              </div>
              <p className="font-sans text-xs sm:text-[13px] text-[#555555] max-w-md leading-relaxed">
                {lightboxData.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CURRICULUM VITAE MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isCvModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsCvModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#F7F7F4] p-6 sm:p-10 border border-[#D0D0CC] shadow-2xl space-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#D0D0CC] pb-6">
              <div>
                <span className="font-mono text-xs text-[#555555] uppercase tracking-widest block mb-1">
                  OFFICIAL RESUME
                </span>
                <h3 className="font-editorial-heading text-3xl sm:text-4xl text-[#111111] uppercase">
                  YONATHAN CAVIEN GABRIEL PIRI
                </h3>
                <p className="font-mono text-xs text-[#555555] uppercase tracking-wider mt-1">
                  Bandung City, West Java • +6281355458544 • piri.yonathan@gmail.com
                </p>
              </div>
              <button
                onClick={() => setIsCvModalOpen(false)}
                className="p-2 text-[#111111] hover:opacity-60 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  RINGKASAN PROFIL
                </h4>
                <p className="text-[#555555] leading-relaxed">
                  Final-year Management student at Maranatha Christian University with a strong interest in marketing and business operations. An adaptive and communicative individual who collaborates well within a team. Experienced in organizational activities and field operations, which have developed strong coordination skills, time management, and a sense of responsibility in executing tasks effectively.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  PENDIDIKAN
                </h4>
                <div className="border-t border-[#D0D0CC] pt-3 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between font-medium text-[#111111]">
                      <span>Maranatha Christian University Bandung</span>
                      <span className="font-mono text-xs text-[#555555]">2023 to Present</span>
                    </div>
                    <p className="text-[#555555]">Bachelor Of Management • Current GPA: 3.47</p>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-[#E8E8E4]">
                    <div className="flex justify-between font-medium text-[#111111]">
                      <span>Christian HighSchool Eben Haezar Manado</span>
                      <span className="font-mono text-xs text-[#555555]">2019 to 2022</span>
                    </div>
                    <p className="text-[#555555]">Represented the school in basketball competitions, enhancing teamwork and discipline skills.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  PENGALAMAN KERJA
                </h4>
                <div className="border-t border-[#D0D0CC] pt-2 divide-y divide-[#E0E0DC] text-xs">
                  {WORK_EXPERIENCES.map((item) => (
                    <div key={item.company} className="py-2.5 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-[#111111]">{item.company}</span>
                        <span className="font-mono text-[#888888]">{item.period}</span>
                      </div>
                      <p className="text-[#555555] font-medium">{item.position}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  PENGALAMAN ORGANISASI
                </h4>
                <div className="border-t border-[#D0D0CC] pt-2 divide-y divide-[#E0E0DC] text-xs">
                  {ORG_ROLES.map((r, i) => (
                    <div key={i} className="py-2.5 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-[#111111]">{r.role}</span>
                        <span className="font-mono text-[#888888]">{r.period}</span>
                      </div>
                      <p className="text-[#555555]">{r.organization}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  KEAHLIAN &amp; BAHASA
                </h4>
                <div className="border-t border-[#D0D0CC] pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555555]">
                  <div>• Empathetic &amp; Team-Oriented</div>
                  <div>• Adaptable to Fast-Paced Environments</div>
                  <div>• Detail-Oriented &amp; Organized</div>
                  <div>• Languages: Indonesian, English</div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111] mb-2">
                  KONTAK
                </h4>
                <div className="border-t border-[#D0D0CC] pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-[#555555]">
                  <div>WhatsApp: 081355458544</div>
                  <div>Email: piri.yonathan@gmail.com</div>
                  <div>Instagram: @yonathanpiri</div>
                  <div>LinkedIn: Yonathan Piri</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#D0D0CC] pt-6">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D0D0CC] text-[#111111] font-mono text-xs uppercase tracking-wider hover:bg-white transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dokumen</span>
              </button>
              <a
                href="mailto:piri.yonathan@gmail.com?subject=Permintaan CV Resmi Yonathan Piri"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#111111] text-white font-mono text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Minta File PDF</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DIRECT MESSAGE MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-[#F7F7F4] p-6 sm:p-8 border border-[#D0D0CC] shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#D0D0CC] pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#555555] block">
                  SALURAN KOMUNIKASI
                </span>
                <h3 className="font-editorial-heading text-2xl text-[#111111] uppercase mt-1">
                  KIRIM PESAN LANGSUNG
                </h3>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="p-1.5 text-[#111111] hover:opacity-60 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#555555] mb-1.5">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D0D0CC] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#555555] mb-1.5">
                  Email Anda
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D0D0CC] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#555555] mb-1.5">
                  Pesan
                </label>
                <textarea
                  required
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Halo Yonathan, saya ingin berdiskusi mengenai..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D0D0CC] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={messageSent}
                className="w-full py-3 rounded-full bg-[#111111] text-white font-mono uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xs"
              >
                {messageSent ? 'Membuka Email Client...' : 'KIRIM PESAN →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
