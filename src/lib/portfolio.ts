export type ProjectCategory = "web" | "tool" | "experiment";

export interface Project {
  id: number;
  title: string;
  repo: string;
  category: ProjectCategory;
  categoryLabel: string;
  stack: string;
  year: string;
  summary: string;
  detail: string;
  role: string;
  highlight: string;
  icon: string;
  color: string;
  github: string;
  live?: string;
}

export const profile = {
  name: "Aris Krisnanto",
  handle: "ARSK-11",
  role: "Fullstack & Frontend Developer",
  tagline:
    "Computer engineering enthusiast yang membangun web app, dashboard, dan tooling — dari frontend interaktif sampai REST API dan CMS.",
  github: "https://github.com/ARSK-11",
  linkedin: "https://www.linkedin.com/in/aris-krisnanto/",
  oldSite: "https://ariskrisnanto-porto.vercel.app",
};

export const projects: Project[] = [
  {
    id: 1,
    title: "EWS Dashboard",
    repo: "ews_dashboard",
    category: "web",
    categoryLabel: "Dashboard / Data viz",
    stack: "TypeScript · React · Tailwind",
    year: "2026",
    summary: "Early warning system dashboard dengan monitoring dan visualisasi data real-time.",
    detail:
      "Proyek TypeScript terbesar dan terbaru saya: dashboard early warning system dengan panel monitoring, tabel data, dan komponen visual yang responsif. Fokus pada struktur komponen yang rapi dan state management yang terukur.",
    role: "Fullstack developer",
    highlight: "Repo TypeScript terbesar (≈450KB source)",
    icon: "📊",
    color: "var(--brut-blue)",
    github: "https://github.com/ARSK-11/ews_dashboard",
  },
  {
    id: 2,
    title: "Creative Canvas Builder",
    repo: "creative-canvas-builder",
    category: "web",
    categoryLabel: "Editor / Canvas",
    stack: "TypeScript · React",
    year: "2026",
    summary: "Builder visual berbasis canvas untuk menyusun layout secara drag & drop.",
    detail:
      "Editor kanvas kreatif tempat elemen bisa disusun, dipindah, dan diatur secara visual. Latihan bagus untuk state kompleks, koordinat pointer, dan interaksi UI yang halus.",
    role: "Frontend developer",
    highlight: "Interaksi drag & drop dan state editor",
    icon: "🎨",
    color: "var(--brut-pink)",
    github: "https://github.com/ARSK-11/creative-canvas-builder",
  },
  {
    id: 3,
    title: "Top Up Game",
    repo: "topup_game",
    category: "web",
    categoryLabel: "E-commerce flow",
    stack: "TypeScript · React",
    year: "2025",
    summary: "Storefront top-up game: pilih produk, nominal, dan alur checkout.",
    detail:
      "Aplikasi top-up voucher game dengan katalog produk, pemilihan nominal, dan alur checkout. Menangani perhitungan harga, validasi input, dan tampilan katalog yang rapi di mobile.",
    role: "Frontend developer",
    highlight: "Alur checkout end-to-end",
    icon: "🎮",
    color: "var(--brut-green)",
    github: "https://github.com/ARSK-11/topup_game",
  },
  {
    id: 4,
    title: "Web 3D Console",
    repo: "web-3dconsole",
    category: "experiment",
    categoryLabel: "3D / CSS experiment",
    stack: "CSS · HTML · JS",
    year: "2025",
    summary: "Konsol game 3D yang dibangun murni dengan CSS transform — dan sudah live.",
    detail:
      "Eksperimen membangun objek konsol 3D hanya dengan CSS transform dan perspective, tanpa library 3D. Sudah dideploy dan bisa diputar-putar langsung di browser.",
    role: "Creative frontend",
    highlight: "Live di Vercel",
    icon: "🕹",
    color: "var(--brut-purple)",
    github: "https://github.com/ARSK-11/web-3dconsole",
    live: "https://web-3dconsole.vercel.app",
  },
  {
    id: 5,
    title: "GSAP UI Playground",
    repo: "project_ui_gsap",
    category: "experiment",
    categoryLabel: "Motion / Animation",
    stack: "GSAP · HTML · CSS",
    year: "2025",
    summary: "Kumpulan eksperimen UI beranimasi: scroll reveal, parallax, dan timeline GSAP.",
    detail:
      "Playground animasi web berbasis GSAP — scroll-triggered reveal, parallax, timeline, dan transisi halaman. Jadi fondasi motion design yang saya pakai di proyek produksi.",
    role: "Motion developer",
    highlight: "Koleksi eksperimen animasi terbesar",
    icon: "✨",
    color: "var(--brut-yellow)",
    github: "https://github.com/ARSK-11/project_ui_gsap",
  },
  {
    id: 6,
    title: "ImgExif Extractor",
    repo: "ImgExif",
    category: "tool",
    categoryLabel: "Python tool",
    stack: "Python · Pillow",
    year: "2023",
    summary: "Ekstraktor metadata EXIF dari gambar: kamera, GPS, dan timestamp.",
    detail:
      "Tool Python untuk membaca metadata EXIF dari file gambar — info kamera, koordinat GPS, dan waktu pengambilan. Salah satu mini project yang tampil di portfolio lama saya.",
    role: "Tool author",
    highlight: "Featured di portfolio versi pertama",
    icon: "🖼",
    color: "var(--brut-orange)",
    github: "https://github.com/ARSK-11/ImgExif",
  },
  {
    id: 7,
    title: "Lab Editor",
    repo: "lab-editor",
    category: "tool",
    categoryLabel: "Code playground",
    stack: "HTML · CSS · JS",
    year: "2025",
    summary: "Editor kode di browser dengan live preview HTML/CSS/JS.",
    detail:
      "Editor sandbox ringan untuk menulis HTML, CSS, dan JavaScript dengan preview langsung. Dibuat untuk belajar dan mengetes snippet tanpa setup apa pun.",
    role: "Frontend developer",
    highlight: "Live preview tanpa build step",
    icon: "⌨",
    color: "var(--brut-blue)",
    github: "https://github.com/ARSK-11/lab-editor",
  },
  {
    id: 8,
    title: "REST API & CMS",
    repo: "rest_api / cms_mangement",
    category: "tool",
    categoryLabel: "Backend",
    stack: "Node.js · Express · PHP · MySQL",
    year: "2025",
    summary: "REST API berbasis Express dan CMS management berbasis PHP.",
    detail:
      "Sisi backend dari pekerjaan saya: REST API dengan Node.js/Express (routing, controller, autentikasi) serta CMS management PHP dengan CRUD konten dan manajemen user.",
    role: "Backend developer",
    highlight: "CRUD, auth, dan struktur API",
    icon: "🔌",
    color: "var(--brut-green)",
    github: "https://github.com/ARSK-11/rest_api",
  },
];

export const filters: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "web", label: "Web app" },
  { key: "tool", label: "Tools & API" },
  { key: "experiment", label: "Eksperimen" },
];

export const stats = [
  { label: "Public repositories", value: 55, caption: "proyek di GitHub", bg: "bg-brut-yellow" },
  { label: "Bahasa dikuasai", value: 7, caption: "TS, JS, PHP, Python, Java, Vue, React", bg: "bg-brut-blue" },
  { label: "Featured project", value: 8, caption: "pilihan terbaik di halaman ini", bg: "bg-brut-pink" },
  { label: "Tahun ngoding", value: 5, caption: "sejak bangku vokasi sampai sekarang", bg: "bg-brut-green" },
];

export const skills = [
  { name: "TypeScript", level: 88, bg: "bg-brut-blue" },
  { name: "React", level: 90, bg: "bg-brut-yellow" },
  { name: "JavaScript", level: 90, bg: "bg-brut-green" },
  { name: "Node.js / Express", level: 78, bg: "bg-brut-pink" },
  { name: "PHP / MySQL", level: 74, bg: "bg-brut-purple" },
  { name: "Python", level: 70, bg: "bg-brut-orange" },
  { name: "Tailwind / CSS", level: 92, bg: "bg-brut-blue" },
  { name: "GSAP / Motion", level: 82, bg: "bg-brut-yellow" },
];

export const services = [
  {
    number: "01",
    eyebrow: "Frontend",
    title: "Interface yang tajam dan responsif.",
    body: "React + TypeScript + Tailwind, dengan motion yang punya maksud — bukan cuma dekorasi.",
    bg: "bg-brut-blue",
  },
  {
    number: "02",
    eyebrow: "Backend",
    title: "API dan CMS yang gampang dirawat.",
    body: "Express, PHP, dan MySQL: routing bersih, autentikasi, CRUD, dan struktur data yang jelas.",
    bg: "bg-brut-yellow",
  },
  {
    number: "03",
    eyebrow: "Tooling",
    title: "Script kecil yang menghemat jam kerja.",
    body: "Automasi Python, parser metadata, generator, dan playground untuk mempercepat eksperimen.",
    bg: "bg-brut-pink",
  },
];
