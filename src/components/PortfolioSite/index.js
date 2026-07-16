import { useRef } from "react";
import "./index.scss";
import usePortfolioEffects from "./effects";
import {
  featured,
  projects,
  stack,
  marquee,
  codeColumns,
  links,
} from "../../data/portfolioContent";

function ProjectMedia({ project }) {
  if (project.isVideo) {
    return (
      <video
        data-media
        data-pv
        data-static
        src={project.media}
        muted
        loop
        playsInline
        preload="auto"
        className="pf-media-el pf-media-video"
      />
    );
  }
  if (project.isImage) {
    return (
      <div
        data-media
        role="img"
        aria-label={project.title}
        className="pf-media-el pf-media-image"
        style={{ backgroundImage: `url('${project.media}')` }}
      />
    );
  }
  if (project.isGifPortrait) {
    return (
      <div data-media className="pf-media-el pf-media-gifportrait">
        <img src={project.media} alt={project.title} />
      </div>
    );
  }
  if (project.isGif) {
    return (
      <div data-media className="pf-media-el pf-media-gif">
        <img src={project.media} alt={project.title} />
      </div>
    );
  }
  // isCode
  return (
    <pre data-media className="pf-media-el pf-media-code">
      {project.codeText}
    </pre>
  );
}

export default function PortfolioSite() {
  const rootRef = useRef(null);
  usePortfolioEffects(rootRef);

  return (
    <div className="pf-root" ref={rootRef}>
      {/* scroll progress */}
      <div className="pf-progress-track">
        <div data-progress className="pf-progress-bar" />
      </div>

      {/* code waterfall — base (always faint) + cursor-revealed torch layer */}
      <div data-codebg-base className="pf-codebg pf-codebg-base">
        {codeColumns.map((col, i) => (
          <pre
            key={i}
            data-codecol
            data-parallax={col.speed}
            className="pf-codecol"
            style={{ color: col.color }}
          >
            {col.text}
          </pre>
        ))}
      </div>
      <div data-codebg className="pf-codebg pf-codebg-torch">
        {codeColumns.map((col, i) => (
          <pre
            key={i}
            data-codecol
            data-parallax={col.speed}
            className="pf-codecol"
            style={{ color: col.color }}
          >
            {col.text}
          </pre>
        ))}
      </div>

      {/* async illuminating background patches */}
      <div aria-hidden="true" className="pf-glows">
        <span className="pf-glow pf-glow-1" />
        <span className="pf-glow pf-glow-2" />
        <span className="pf-glow pf-glow-3" />
        <span className="pf-glow pf-glow-4" />
        <span className="pf-glow pf-glow-5" />
        <span className="pf-glow pf-glow-6" />
        <span className="pf-glow pf-glow-7" />
      </div>

      <div className="pf-content">
        {/* NAV */}
        <header data-nav className="pf-nav">
          <div className="pf-nav-inner">
            <a href="#top" className="pf-brand">
              <span className="pf-monogram">CC</span>
              <span className="pf-brand-name">Chris Capizzuto</span>
            </a>
            <nav className="pf-nav-links">
              <a href="#work" className="pf-navlink">work</a>
              <a href="#about" className="pf-navlink">about</a>
              <a href="#stack" className="pf-navlink">stack</a>
              <a href="#contact" className="pf-navlink">contact</a>
              <a href={links.resume} download className="pf-resume-btn">
                Résumé ↓
              </a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section id="top" data-hero className="pf-hero">
          <div className="pf-hero-left">
            <div aria-hidden="true" className="pf-hero-backdrop" />
            <div data-reveal className="pf-pill">
              <span className="pf-pill-dot" />
              Open to software engineering roles
            </div>
            <h1 data-reveal data-delay="60" className="pf-h1">
              Software engineer building
              <br />
              <span className="pf-teal">useful</span>, data-driven
              <br />
              <span className="pf-yellow">web apps.</span>
            </h1>
            <p data-reveal data-delay="120" className="pf-hero-sub">
              I'm Chris — a full-stack developer in New York who turns real
              problems into simple, fast products with{" "}
              <span className="pf-strong">React</span>,{" "}
              <span className="pf-strong">Next.js</span>,{" "}
              <span className="pf-strong">TypeScript</span> and{" "}
              <span className="pf-strong">Node</span> — increasingly with{" "}
              <span className="pf-strong pf-strong-yellow">AI</span> woven in.
            </p>
            <div data-reveal data-delay="180" className="pf-hero-ctas">
              <a href="#work" className="pf-btn pf-btn-yellow">
                View my work →
              </a>
              <a href={links.email} className="pf-btn pf-btn-outline">
                Get in touch
              </a>
            </div>
            <div data-reveal data-delay="240" className="pf-stats">
              <div aria-hidden="true" className="pf-stats-backdrop" />
              <div className="pf-stat">
                <div data-countup="13" className="pf-stat-num pf-stat-yellow">13</div>
                <div className="pf-stat-label">projects shipped</div>
              </div>
              <div className="pf-stat-div" />
              <div className="pf-stat">
                <div data-countup="11" className="pf-stat-num pf-stat-teal">11</div>
                <div className="pf-stat-label">live in production</div>
              </div>
              <div className="pf-stat-div" />
              <div className="pf-stat">
                <div data-countup="2" className="pf-stat-num pf-stat-orange">2</div>
                <div className="pf-stat-label">AI integrations</div>
              </div>
            </div>
          </div>

          {/* code card */}
          <div aria-hidden="true" className="pf-card-backdrop" />
          <div data-reveal data-delay="120" data-parallax="-0.05" className="pf-codecard">
            <div className="pf-codecard-bar">
              <span className="pf-dot pf-dot-r" />
              <span className="pf-dot pf-dot-y" />
              <span className="pf-dot pf-dot-g" />
              <span className="pf-codecard-title">chris.ts</span>
            </div>
            <pre className="pf-codecard-body">
              <span className="c-key">const</span>{" "}
              <span className="c-var">chris</span> = {"{"}
              {"\n  role: "}
              <span className="c-str">"Software Engineer"</span>,{"\n  location: "}
              <span className="c-str">"New York, NY"</span>,{"\n  stack: ["}
              <span className="c-str">"React"</span>,{" "}
              <span className="c-str">"Next.js"</span>,{" "}
              <span className="c-str">"TS"</span>
              {"],\n  backend: ["}
              <span className="c-str">"Node"</span>,{" "}
              <span className="c-str">"FastAPI"</span>,{" "}
              <span className="c-str">"Postgres"</span>
              {"],\n  ai: ["}
              <span className="c-str">"Claude"</span>,{" "}
              <span className="c-str">"recommenders"</span>
              {"],\n  status: "}
              <span className="c-status">"available"</span>,{"\n}"}
              <span className="pf-cursor" />
            </pre>
          </div>
        </section>

        {/* TECH MARQUEE */}
        <div className="pf-marquee-wrap">
          <div data-marquee className="pf-marquee">
            {marquee.map((m, i) => (
              <div key={i} className="pf-marquee-item">
                <span
                  aria-hidden="true"
                  className="pf-marquee-icon"
                  style={{ backgroundImage: `url('${m.icon}')` }}
                />
                <span className="pf-marquee-label">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WORK */}
        <section id="work" className="pf-section pf-work">
          <div data-reveal className="pf-work-head">
            <div aria-hidden="true" className="pf-work-head-backdrop" />
            <div>
              <div className="pf-eyebrow">
                <span className="pf-eyebrow-bar pf-bar-yellow" />
                <span className="pf-eyebrow-text pf-txt-yellow">Selected work</span>
              </div>
              <h2 className="pf-h2">Things I've built</h2>
            </div>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="pf-work-gh"
            >
              github.com/capisz ↗
            </a>
          </div>

          {/* featured */}
          <a
            data-reveal
            data-tilt="3"
            data-accent="#ffd700"
            href={featured.openUrl}
            target="_blank"
            rel="noreferrer"
            className="pf-featured"
          >
            <div className="pf-featured-media">
              <div data-media className="pf-featured-media-inner">
                <img src={featured.media} alt={featured.title} />
              </div>
              <pre data-codeoverlay className="pf-codeoverlay pf-codeoverlay-lg">
                {featured.codeText}
              </pre>
            </div>
            <div className="pf-featured-body">
              <div className="pf-badges">
                <span className="pf-badge-live">
                  <span className="pf-badge-live-dot" />
                  Live
                </span>
                <span className="pf-badge-featured">★ Featured</span>
              </div>
              <h3 className="pf-featured-title">{featured.title}</h3>
              <p className="pf-featured-blurb">{featured.blurb}</p>
              <div className="pf-chips">
                {featured.tech.map((t) => (
                  <span key={t} className="pf-chip pf-chip-lg">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pf-featured-links">
                <span className="pf-link-yellow">Visit live ↗</span>
                <span className="pf-link-muted">View code ↗</span>
              </div>
            </div>
          </a>

          {/* grid */}
          <div className="pf-grid">
            {projects.map((project, i) => (
              <a
                key={i}
                data-reveal
                data-tilt="6"
                data-accent={project.accent}
                data-delay={project.revealDelay}
                href={project.openUrl}
                target="_blank"
                rel="noreferrer"
                className="pf-card"
              >
                <div className="pf-card-media">
                  <ProjectMedia project={project} />
                  <span className="pf-status-pill">
                    <span
                      className="pf-status-dot"
                      style={{ background: project.statusColor }}
                    />
                    {project.statusLabel}
                  </span>
                  {project.ai && <span className="pf-ai-badge">✦ AI</span>}
                  <pre data-codeoverlay className="pf-codeoverlay">
                    {project.codeText}
                  </pre>
                  <span
                    data-accentbar
                    className="pf-accentbar"
                    style={{ background: project.accent }}
                  />
                </div>
                <div className="pf-card-body">
                  <h3 className="pf-card-title">{project.title}</h3>
                  <p className="pf-card-blurb">{project.blurb}</p>
                  <div className="pf-chips">
                    {project.tech.map((t) => (
                      <span key={t} className="pf-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pf-card-foot">
                    <span
                      className="pf-card-foot-live"
                      style={{ color: project.liveColor }}
                    >
                      {project.liveLabel}
                    </span>
                    <span className="pf-card-foot-code">code ↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="pf-section pf-about">
          <div className="pf-about-grid">
            <div data-reveal className="pf-about-left">
              <div aria-hidden="true" className="pf-about-backdrop" />
              <div className="pf-eyebrow">
                <span className="pf-eyebrow-bar pf-bar-teal" />
                <span className="pf-eyebrow-text pf-txt-teal">About</span>
              </div>
              <h2 className="pf-h2">A bit about me</h2>
              <p className="pf-about-p">
                I'm a full-stack web developer based in New York who likes turning
                real problems into simple, thoughtful, genuinely useful web apps.
              </p>
              <p className="pf-about-p">
                Most of my work centers on <span className="pf-strong">React</span>,{" "}
                <span className="pf-strong">Next.js</span> and{" "}
                <span className="pf-strong">TypeScript</span> — building data-driven
                products like a DraftKings lineup optimizer, a real-time
                catcher-grading dashboard, and analysis tools for the Pokémon TCG. I
                care about smooth UX, performance, and code the next developer can
                actually read.
              </p>
              <p className="pf-about-p pf-about-p-last">
                Lately I've been pairing <span className="pf-strong">Node</span>,{" "}
                <span className="pf-strong">FastAPI</span> and{" "}
                <span className="pf-strong">Postgres</span> back ends with{" "}
                <span className="pf-strong pf-strong-yellow">AI</span> — a streamed
                Claude analyst in backstop.ai and a local recommendation model in my
                DraftKings optimizer — to turn raw data into clear, grounded
                decisions.
              </p>
            </div>
            <div className="pf-about-right">
              <div data-reveal data-delay="80" className="pf-about-card">
                <h3 className="pf-about-card-title">What I'm working on</h3>
                <ul className="pf-about-list">
                  <li>
                    <span className="pf-arrow">→</span>Grounding AI features in real
                    data so the output stays trustworthy
                  </li>
                  <li>
                    <span className="pf-arrow">→</span>Integrating public + live APIs
                    to extend what my apps can do
                  </li>
                  <li>
                    <span className="pf-arrow">→</span>Solving niche and everyday
                    problems alike — from parking to commerce
                  </li>
                </ul>
              </div>
              <div data-reveal data-delay="160" className="pf-about-card pf-about-card-yellow">
                <h3 className="pf-about-card-title">Outside of code</h3>
                <p className="pf-about-card-p">
                  When I'm not building, I'm playing Pokémon or Magic, teaching chess
                  to elementary-school kids, or lifting at the gym. I'm drawn to
                  things that reward strategy, consistency, and steady long-term
                  improvement — the same instincts I bring to engineering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section id="stack" className="pf-section pf-stack">
          <div data-reveal className="pf-stack-head">
            <div aria-hidden="true" className="pf-stack-backdrop" />
            <div className="pf-eyebrow">
              <span className="pf-eyebrow-bar pf-bar-purple" />
              <span className="pf-eyebrow-text pf-txt-purple">Toolkit</span>
            </div>
            <h2 className="pf-h2">Tech I work with</h2>
          </div>
          <div className="pf-stack-grid">
            {stack.map((s, i) => (
              <div key={i} data-reveal data-delay={s.delay} className="pf-stack-tile">
                <span
                  aria-hidden="true"
                  className="pf-stack-icon"
                  style={{ backgroundImage: `url('${s.icon}')` }}
                />
                <span className="pf-stack-name">{s.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pf-section pf-contact">
          <div data-reveal className="pf-contact-card">
            <div className="pf-contact-left">
              <div className="pf-eyebrow">
                <span className="pf-eyebrow-bar pf-bar-orange" />
                <span className="pf-eyebrow-text pf-txt-orange">Contact</span>
              </div>
              <h2 className="pf-contact-title">
                Let's build
                <br />
                something <span className="pf-orange">good.</span>
              </h2>
              <p className="pf-contact-blurb">
                Open to software engineering roles and interesting projects. The
                fastest way to reach me is email — I usually reply within a day.
              </p>
              <div className="pf-contact-ctas">
                <a href={links.email} className="pf-btn pf-btn-yellow">
                  {links.emailLabel}
                </a>
                <a href={links.resume} download className="pf-btn pf-btn-outline">
                  Download résumé ↓
                </a>
              </div>
            </div>
            <div className="pf-contact-right">
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="pf-contact-row"
              >
                <span className="pf-contact-row-text">
                  <span className="pf-contact-row-label">GitHub</span>
                  <span className="pf-contact-row-val">{links.githubLabel}</span>
                </span>
                <span className="pf-contact-row-arrow">↗</span>
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="pf-contact-row"
              >
                <span className="pf-contact-row-text">
                  <span className="pf-contact-row-label">LinkedIn</span>
                  <span className="pf-contact-row-val">{links.linkedinLabel}</span>
                </span>
                <span className="pf-contact-row-arrow">↗</span>
              </a>
              <a href={links.email} className="pf-contact-row">
                <span className="pf-contact-row-text">
                  <span className="pf-contact-row-label">Email</span>
                  <span className="pf-contact-row-val">{links.emailLabel}</span>
                </span>
                <span className="pf-contact-row-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pf-footer">
          <span className="pf-footer-text">© 2026 Chris Capizzuto</span>
          <span className="pf-footer-text">New York, NY · Built from scratch</span>
        </footer>
      </div>
    </div>
  );
}
