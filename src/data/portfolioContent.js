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
  title: "CareCation",
  blurb:
    "Reimagines medical tourism by centralizing clinic selection and travel planning into one intuitive platform — bridging healthcare and vacation planning.",
  media: asset("assets/shots/carecation-hq.gif"),
  tech: labels(["nextjs", "react", "typescript", "api", "tailwind", "node"]),
  openUrl: "https://carecation.vercel.app/",
  codeText: '{\n  name: "CareCation",\n  stack: ["Next.js", "React", "Node"],\n  status: "live",\n}',
};

const raw = [
  { title: "DraftKings NBA Optimizer", blurb: "Pulls the live DraftKings slate and ranks players by a transparent points-per-dollar metric. A built-in AI analyst proposes the best cap-legal, position-legal swap for any slot — with reasoning. Classic & Showdown support.", media: "assets/shots/draftkings.gif", tech: ["nextjs", "typescript", "tailwind", "python", "ai"], live: "https://draftkings-optimizer.vercel.app/", code: "https://github.com/capisz/draftkings-optimizer", status: "complete", ai: true },
  { title: "backstop.ai", blurb: "A public-data baseball product that grades catcher pitch-calling in real time from the MLB Stats API. One click streams a Claude analyst's grounded read of each catcher's live zone report.", media: "assets/shots/backstop.gif", tech: ["nextjs", "typescript", "fastapi", "python", "postgres", "claude"], live: "https://ai-catcher-grade-app-web.vercel.app/", code: "https://github.com/capisz/ai-catcher-grade-app", status: "complete", ai: true },
  { title: "Contessa Shop", blurb: "A Next.js storefront concept for a three-piece essentials drop — a Skims-inspired product grid with per-item size/color selection, an auto-rotating product-angle carousel, and a PCRF impact section.", media: "assets/shots/contessa.gif", tech: ["nextjs", "react", "typescript", "tailwind"], live: "https://contessa-shop.vercel.app/", code: "https://github.com/capisz/contessa-shop", status: "complete" },
  { title: "Concrete Jungle Sports", blurb: "A standalone New York Knicks blog and podcast site — long-form posts and episodes with externally-hosted audio, built on the Next.js App Router.", media: "assets/shots/nba-blog.gif", tech: ["nextjs", "react", "typescript", "tailwind"], live: "https://concrete-jungle-sports.vercel.app/", code: "https://github.com/capisz/nba-blog", status: "complete" },
  { title: "Hudson Chess", blurb: "A chess academy site and blog — a Vite + React single-page app with hash routing, a cookie-consent system, and privacy-first analytics.", media: "assets/shots/hudson-chess.gif", tech: ["react", "javascript", "css"], live: "https://hudsonchess.com/", code: "https://github.com/capisz/hudson-chess-academy", status: "complete" },
  { title: "Pokémon Prize Checker", blurb: "A tool to simulate and perfect your Pokémon TCG prize-checking without physical cards — any time, any place, zero setup.", media: "assets/shots/pokemon.gif", tech: ["nextjs", "react", "typescript", "api", "tailwind", "mongodb"], live: "https://prizecheck.us/", code: "https://github.com/capisz/pokemon-tcg-prize-checker", status: "complete" },
  { title: "Dragapultist", blurb: "Import your Pokémon TCG Live export files to analyze your games, spot mistakes, and improve as a competitive player.", media: "assets/shots/dragapultist.gif", tech: ["nextjs", "react", "mongodb", "typescript", "tailwind", "node"], live: "https://dragapultist.vercel.app/", code: "https://github.com/capisz/dragapultist", status: "complete" },
  { title: "Elephit Fitness App", blurb: "Your body changes daily, so should your logging. Elephit recalculates your calorie needs week-to-week, even day-to-day.", media: "assets/projects/elephit.mp4", tech: ["nextjs", "react", "typescript", "tailwind", "api", "mongodb"], live: "https://elephit-fitness-app.vercel.app/user-profile", code: "https://github.com/capisz/elephit-fitness-app", status: "complete" },
  { title: "iPhone Parking App", blurb: "See where and when it's safe to park wherever you are — meter times and more, on a native Apple Maps interface.", media: "assets/shots/pidge.gif", portrait: true, tech: ["swift", "api", "typescript"], live: "", code: "https://github.com/capisz/ParkNYCPrototype", status: "complete" },
  { title: "Amazon Room Generator", blurb: "Enter your measurements, generate a room layout, then shop pieces that actually fit your space — no more guessing.", media: "assets/shots/amazon.gif", tech: ["react", "javascript", "api"], live: "https://amazon-room-designr.vercel.app/", code: "https://github.com/capisz/amazon-room-gen", status: "in-progress" },
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
  const isCode = !hasMedia;
  const inProgress = p.status === "in-progress";
  const hasLive = !!p.live;
  const shortTech = labels(p.tech)
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
    isImage,
    isGif: isGifLandscape,
    isGifPortrait,
    isCode,
    codeText,
    ai: !!p.ai,
    accent: accents[i % accents.length],
    tech: labels(p.tech),
    openUrl: p.live || p.code,
    statusLabel: inProgress ? "In progress" : "Live",
    statusColor: inProgress ? "#e0a93b" : "#5fd07a",
    liveLabel: hasLive ? "visit live ↗" : "view repo ↗",
    liveColor: hasLive ? "#ffd700" : "#a9bfd6",
    revealDelay: (i % 3) * 80,
  };
});

const stackBase = [
  { name: "React", icon: asset("assets/tech/react.svg") },
  { name: "Next.js", icon: asset("assets/tech/nextjs.png") },
  { name: "TypeScript", icon: asset("assets/tech/typescript.svg") },
  { name: "JavaScript", icon: asset("assets/tech/javascript.svg") },
  { name: "Node.js", icon: asset("assets/tech/node.svg") },
  { name: "MongoDB", icon: asset("assets/tech/mongodb.svg") },
  { name: "Tailwind", icon: asset("assets/tech/tailwind.svg") },
  { name: "Python", icon: asset("assets/tech/python.png") },
  { name: "Electron", icon: asset("assets/tech/electron.png") },
  { name: "Swift", icon: asset("assets/tech/swift.png") },
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
