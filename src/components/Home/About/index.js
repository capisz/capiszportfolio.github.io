import "./index.scss";

const techPills = [
  { label: "React", icon: "/tech-icons/react.svg" },
  { label: "Next.js", icon: "/tech-icons/nextjs.png" },
  { label: "TypeScript", icon: "/tech-icons/typescript.png" },
  { label: "JavaScript", icon: "/tech-icons/javascript.png" },
  { label: "Node.js", icon: "/tech-icons/nodejs.png" },
  { label: "MongoDB", icon: "/tech-icons/mongodb.svg" },
  { label: "CSS / SCSS", icon: "/tech-icons/css.svg" },
  { label: "REST APIs", icon: "/tech-icons/api.png" },
];

const About = () => {
  return (
    <div id="about" className="container about-section">
      <h1 className="about-section__title">About Me:</h1>

      {/* MAIN INTRO TEXT (this should sit under the title, not on the side) */}
    <div className="about-section__intro">
 <p>
  I&apos;m Chris, a full-stack web developer based in New York City who likes turning real problems into simple, thoughtful, and actually useful, web apps.
</p>

<p>
  Most of my work centers around <span className="highlight">React</span>,{" "}
  <span className="highlight">Next.js</span>, <span className="highlight">JavaScript</span> and{" "}
  <span className="highlight">TypeScript</span> building data-driven tools like fantasy sports
  optimizers, smarter fitness tracking, and utilities for the Pokémon TCG. I care a lot about
  clear UX, performance, and writing code that&apos;s easy for the next developer to understand.
</p>

<p>
  These days I&apos;m working and building on the back end with{" "}
  <span className="highlight">Node</span>,{" "}
  <span className="highlight">REST APIs</span>, and{" "}
  <span className="highlight">MongoDB</span> collecting and using data to grow projects, handling edge cases, and
  scaling my apps to reach the needs of others.
</p>

</div>


      {/* BOTTOM ROW: PROBLEMS + TECH */}
      <div className="about-section__bottom">
        <div className="about-section__box">
          <h2>Problems I'm Solving</h2>
        <ul>
  <li>Scoping and shipping small, end-to-end features in real projects</li>
  <li>Deepening my TypeScript and testing habits</li>
  <li>Designing clean, predictable API contracts between front end and back end</li>
  <li>Leveling up performance, accessibility, and overall developer experience</li>
</ul>

        </div>

        <div className="about-section__box">
          <h2>Tech I Work With</h2>
          <div className="about-section__tech-icons">
            {techPills.map((pill) => (
              <div className="about-section__tech-pill" key={pill.label}>
                <img src={pill.icon} alt={pill.label} />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOBBIES */}
      <div className="about-section__hobbies">
  <p>
   Outside of coding, I’m usually either playing card games like Pokémon or Magic, teaching chess to elementary school kids, or lifting at the gym. I like working on projects that mix strategy, consistency, steady growth, and long-term improvement — the same things I enjoy in my hobbies and in life.
  </p>
</div>

    </div>
  );
};

export default About;
