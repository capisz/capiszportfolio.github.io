import { projectEvidence } from './projectEvidence';
// Content + derivation for the single-page portfolio redesign.
// Ported from the design handoff (design_handoff_portfolio/rendered-site support.js -> renderVals).
// Assets live in /public/assets and are referenced by absolute path so they resolve
// in both `npm start` and the production build.

const asset = (p) => "/" + p.replace(/^\/+/, "");

const TECH = {
  nextjs: "Next.js",
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  node: "Node",
  api: "REST API",
  tailwind: "Tailwind",
  mongodb: "MongoDB",
  python: "Python",
  electron: "Electron",
  swift: "Swift",
  facebook: "Facebook",
  google: "Google",
  geolocation: "Geolocation",
  css: "CSS",
  claude: "Claude AI",
  fastapi: "FastAPI",
  postgres: "Postgres",
  ai: "AI Analyst",
  statcast: "Statcast",
  firebase: "Firebase",
  git: "Git",
  vercel: "Vercel",
  docker: "Docker",
  kubernetes: "Kubernetes",
  kind: "kind",
  githubactions: "GitHub Actions",
  linux: "Linux",
};
const labels = (arr) => arr.map((t) => TECH[t] || t);

// --- background code field columns (revealed by the cursor torch) ---
const codePool = [
  "const lineup = optimize(slate)",
  "await claude.stream(zoneReport)",
  "export default function App() {",
  "  const [rows, setRows] = useState([])",
  "  useEffect(() => { fetchSlate() }, [])",
  "  return <Dashboard data={rows} />",
  "}",
  "type Catcher = { id: string; grade: number }",
  "const dva = baseline - expectedRv",
  "SELECT * FROM catchers WHERE season = 2025",
  'router.get("/live/zone-report", handler)',
  "const { data } = await db.query(sql)",
  "if (!cap.fits(player)) continue",
  "players.sort((a, b) => b.value - a.value)",
  'git commit -m "ship it" && git push',
  "npm run build   ready in 1.2s",
  'import { useState, useEffect } from "react"',
  "const score = points / (salary / 1000)",
  "<Suspense fallback={<Spinner />}>",
  "fetch(`/api/ai/live-analysis`)",
  "export const revalidate = 60",
  "await mongoose.connect(process.env.URI)",
  "const slate = await getDraftKings()",
  "return NextResponse.json(result)",
  "const grade = clamp(20, 80, percentile)",
  "const winRate = wins / Math.max(games, 1)",
];
const colAccents = ["#4fc9bd", "#e8c24a", "#e8956a", "#a98ae0", "#6fc98f"];
export const codeColumns = [];
for (let c = 0; c < 8; c++) {
  const lines = [];
  for (let k = 0; k < 120; k++) lines.push(codePool[(c * 5 + k * 3) % codePool.length]);
  codeColumns.push({
    text: lines.join("\n"),
    speed: 0.07 + (c % 4) * 0.035,
    color: colAccents[c % colAccents.length],
  });
}

export const featured = {
  title: "PrizeCheck",
  blurb: "Practice Pokémon TCG prize-checking. Built with Next.js, TypeScript and Firebase, with Docker, local Kubernetes recovery and rollback exercises, and GitHub Actions testing. Production: Vercel. Kubernetes: local via kind.",
  media: asset("assets/shots/pokemon.gif"),
  tech: [...projectEvidence.PrizeCheck.canonicalSkills, ...projectEvidence.PrizeCheck.supportingTechnologies],
  openUrl: "https://www.prizecheck.us",
  codeUrl: "https://github.com/capisz/pokemon-tcg-prize-checker",
  codeText: JSON.stringify({
    name: "PrizeCheck",
    stack: ["Next.js", "TypeScript", "Firebase"],
    production: "Vercel",
    kubernetes: "local via kind",
  }, null, 2),
};

const raw = [
  { title: "DraftKings NBA Optimizer", blurb: "Pulls the live DraftKings slate and ranks players by a transparent points-per-dollar metric. A local recommendation engine proposes the best cap-legal, position-legal swap for any slot — with reasoning. Classic & Showdown support.", media: "assets/shots/draftkings.gif", tech: ["nextjs", "typescript", "tailwind", "python", "ai"], live: "https://draftkings-optimizer.vercel.app/", code: "https://github.com/capisz/draftkings-optimizer", status: "complete" },
  { title: "Amazon Room Generator", blurb: "Enter your measurements, generate a room layout, then shop pieces that actually fit your space — no more guessing.", media: "assets/projects/amazon-room.mp4", tech: ["react", "javascript", "api"], live: "https://amazon-room-designr.vercel.app/", code: "https://github.com/capisz/amazon-room-gen", status: "complete" },
  { title: "FunkFit", blurb: "Your body changes daily, so should your logging. FunkFit recalculates your calorie needs week-to-week, even day-to-day.", media: "assets/projects/elephit.mp4", portrait: true, tech: ["React Native", "Expo", "typescript", "Expo Router", "React Navigation", "AsyncStorage", "HealthKit"], live: "", code: "https://github.com/capisz/funkfit", status: "complete" },
  { title: "CareCation", blurb: "Reimagines medical tourism by centralizing clinic selection and travel planning into one intuitive platform — bridging healthcare and vacation planning.", media: "assets/shots/carecation-hq.gif", tech: ["nextjs", "react", "typescript", "api", "tailwind", "node"], live: "https://carecation.vercel.app/", status: "complete" },
  { title: "backstop.ai", blurb: "A public-data baseball product that grades catcher pitch-calling in real time from the MLB Stats API. One click streams a Claude analyst's grounded read of each catcher's live zone report.", media: "assets/shots/backstop.gif", tech: ["nextjs", "typescript", "fastapi", "python", "postgres", "claude"], live: "https://ai-catcher-grade-app-web.vercel.app/", code: "https://github.com/capisz/ai-catcher-grade-app", status: "complete", ai: true },
  { title: "ParkNYC", blurb: "Plan a destination and compare conservative curb guidance on an interactive NYC map, with meter rules and route-aware parking options.", media: "assets/projects/parknyc.mp4", tech: ["swift", "api", "typescript"], live: "", code: "https://github.com/capisz/ParkNYCPrototype", status: "complete" },
  { title: "Contessa Shop", blurb: "A Next.js storefront concept for a three-piece essentials drop — a Skims-inspired product grid with per-item size/color selection, an auto-rotating product-angle carousel, and a PCRF impact section.", media: "assets/shots/contessa.gif", tech: ["nextjs", "react", "typescript", "tailwind"], live: "https://contessa-shop.vercel.app/", code: "https://github.com/capisz/contessa-shop", status: "complete" },
  { title: "Concrete Jungle Sports", blurb: "A standalone New York Knicks blog and podcast site — long-form posts and episodes with externally-hosted audio, built on the Next.js App Router.", media: "assets/shots/nba-blog.gif", tech: ["nextjs", "react", "typescript", "tailwind"], live: "https://concrete-jungle-sports.vercel.app/", code: "https://github.com/capisz/nba-blog", status: "complete" },
  { title: "Hudson Chess", blurb: "A chess academy site and blog — a Vite + React single-page app with hash routing, a cookie-consent system, and privacy-first analytics.", media: "assets/shots/hudson-chess.gif", tech: ["react", "javascript", "css"], live: "https://hudsonchess.com/", code: "https://github.com/capisz/hudson-chess-academy", status: "complete" },
  { title: "Dragapultist", blurb: "Import your Pokémon TCG Live export files to analyze your games, spot mistakes, and improve as a competitive player.", media: "assets/shots/dragapultist.gif", tech: ["nextjs", "react", "mongodb", "typescript", "tailwind", "node"], live: "https://dragapultist.vercel.app/", code: "https://github.com/capisz/dragapultist", status: "complete" },
  { title: "Marketplace Chrome Extension", blurb: "Save money on big-box shopping by checking Facebook Marketplace near you first — right from the product page.", media: "assets/shots/fleamarket.png", tech: ["javascript", "facebook", "google", "geolocation"], live: "", code: "https://github.com/capisz/facebook-marketplace-checker", status: "in-progress" },
  { title: "Chess Opening Driller", blurb: "Drill chess openings until you master every line — build deep, reliable repertoire knowledge through repetition.", media: "assets/shots/chess-driller.png", tech: ["react", "javascript", "css"], live: "https://chess-driller.vercel.app/", code: "https://github.com/capisz/chess-opening-driller", status: "in-progress" },
];

const accents = ["#ffd54a", "#3fd6c2", "#ff8a5c", "#b794ff", "#74e0a0"];

export const projects = raw.map((p, i) => {
  const hasMedia = !!p.media;
  const isGif = hasMedia && /\.gif$/i.test(p.media);
  const isGifPortrait = isGif && !!p.portrait;
  const isGifLandscape = isGif && !p.portrait;
  const isImage = hasMedia && !isGif && /\.(png|jpg|jpeg|webp)$/i.test(p.media);
  const isVideo = hasMedia && !isImage && !isGif;
  const isVideoPortrait = isVideo && !!p.portrait;
  const isCode = !hasMedia;
  const inProgress = p.status === "in-progress";
  const hasLive = !!p.live;
  const shortTech = (projectEvidence[p.title]?.verified ? projectEvidence[p.title].canonicalSkills : labels(p.tech))
    .slice(0, 3)
    .map((s) => '"' + s + '"')
    .join(", ");
  const codeText =
    '{\n  name: "' +
    p.title +
    '",\n  stack: [' +
    shortTech +
    '],\n  status: "' +
    (inProgress ? "in progress" : "live") +
    '",' +
    (p.ai ? "\n  ai: true," : "") +
    "\n}";
  return {
    title: p.title,
    blurb: p.blurb,
    media: hasMedia ? asset(p.media) : "",
    isVideo,
    isVideoPortrait,
    isImage,
    isGif: isGifLandscape,
    isGifPortrait,
    isCode,
    codeText,
    ai: !!p.ai,
    accent: accents[i % accents.length],
    tech: projectEvidence[p.title]?.verified ? [...projectEvidence[p.title].canonicalSkills, ...projectEvidence[p.title].supportingTechnologies] : labels(p.tech),
    openUrl: p.live || p.code,
    liveUrl: p.live || null,
    codeUrl: p.code || null,
    statusLabel: inProgress ? "In progress" : "Live",
    statusColor: inProgress ? "#e0a93b" : "#5fd07a",
    liveLabel: hasLive ? "visit live ↗" : "view repo ↗",
    liveColor: hasLive ? "#ffd700" : "#a9bfd6",
    revealDelay: (i % 3) * 80,
  };
});

const stackBase = [
  { name: "React", icon: asset("assets/tech/react.svg") },
  { name: "React Native", icon: asset("assets/tech/react-native.svg") },
  { name: "Next.js", icon: asset("assets/tech/nextjs.svg") },
  { name: "TypeScript", icon: asset("assets/tech/typescript.svg") },
  { name: "JavaScript", icon: asset("assets/tech/javascript.svg") },
  { name: "Node.js", icon: asset("assets/tech/node.svg") },
  { name: "MongoDB", icon: asset("assets/tech/mongodb.svg") },
  { name: "Claude AI", icon: asset("assets/tech/claude.svg") },
  { name: "Google Gemini", icon: asset("assets/tech/gemini.svg") },
  { name: "Cursor AI", icon: asset("assets/tech/cursor.svg") },
  { name: "Framer", icon: asset("assets/tech/framer.svg") },
  { name: "LottieLab", icon: asset("assets/tech/lottielab.svg") },
  { name: "Lottie", icon: asset("assets/tech/lottie.svg") },
  { name: "Tailwind", icon: asset("assets/tech/tailwind.svg") },
  { name: "Python", icon: asset("assets/tech/python.png") },
  { name: "Electron", icon: asset("assets/tech/electron.svg") },
  { name: "Webpack", icon: asset("assets/tech/webpack.svg") },
  { name: "Swift", icon: asset("assets/tech/swift.png") },
  { name: "GitHub Actions", icon: asset("assets/tech/github-actions.svg") },
  { name: "GitHub", icon: asset("assets/tech/github.svg") },
  { name: "Xcode", icon: asset("assets/tech/xcode.svg") },
  { name: "Visual Studio", icon: asset("assets/tech/visual-studio.svg") },
  { name: "Figma", icon: asset("assets/tech/figma.svg") },
  { name: "Canva", icon: asset("assets/tech/canva.svg") },
  { name: "Vite.js", icon: asset("assets/tech/vite.svg") },
  { name: "Ubuntu", icon: asset("assets/tech/ubuntu.svg") },
  { name: "Linux", icon: asset("assets/tech/linux.svg") },
  { name: "Kubernetes", icon: asset("assets/tech/kubernetes.svg") },
  { name: "Firebase", icon: asset("assets/tech/firebase.svg") },
  { name: "Docker", icon: asset("assets/tech/docker.svg") },
  { name: "AWS", icon: asset("assets/tech/aws.svg") },
  { name: "Vercel", icon: asset("assets/tech/vercel.svg") },
  { name: "Cloudflare", icon: asset("assets/tech/cloudflare.svg") },
  { name: "Azure SQL Database", icon: asset("assets/tech/azure-sql-database.svg") },
  { name: "kind", icon: asset("assets/tech/kind.jpg") },
  { name: "Git", icon: asset("assets/tech/git.svg") },
  { name: "Codex", icon: asset("assets/tech/codex.svg") },
  { name: "Redis", icon: asset("assets/tech/redis.svg") },
  { name: "Mongoose.js", icon: asset("assets/tech/mongoose.svg") },
  { name: "PostgreSQL", icon: asset("assets/tech/postgresql.svg") },
  { name: "Postman", icon: asset("assets/tech/postman.svg") },
  { name: "Supabase", icon: asset("assets/tech/supabase.svg") },
  { name: "C++", icon: asset("assets/tech/cpp.svg") },
];

export const stack = stackBase.map((s, i) => ({ ...s, delay: (i % 5) * 60 }));
export const marquee = stackBase.concat(stackBase);

export const links = {
  email: "mailto:chriszcodes@gmail.com",
  emailLabel: "chriszcodes@gmail.com",
  github: "https://github.com/capisz",
  githubLabel: "github.com/capisz",
  linkedin: "https://www.linkedin.com/in/chriszcodes/",
  linkedinLabel: "in/chriszcodes",
  resume: asset("assets/christopher-capizzuto-resume.pdf"),
};
