import React from "react";
import "./index.scss";
import useInView from "../../../hooks/useInView";

const techPills = [
  { label: "React", icon: "/tech-icons/react.svg" },
  { label: "Next.js", icon: "/tech-icons/nextjs.png" },
  { label: "TypeScript", icon: "/tech-icons/typescript.png" },
  { label: "JavaScript", icon: "/tech-icons/javascript.png" },
  { label: "Node.js", icon: "/tech-icons/nodejs.png" },
  { label: "MongoDB", icon: "/tech-icons/mongodb.svg" },
  { label: "REST APIs", icon: "/tech-icons/api.png" },
  { label: "Tailwind CSS", icon: "/tech-icons/tailwind.png" },
  { label: "Electron", icon: "/tech-icons/electron.png" },
  { label: "Python", icon: "/tech-icons/python.png" },
  { label: "Git", icon: "/tech-icons/git.png" },
  { label: "Swift", icon: "/tech-icons/swift.png"}
];

const About = () => {
  const [ref, inView] = useInView();

  return (
    <div
      id="about"
      ref={ref}
      className={`container about-section fade-section ${
        inView ? "in-view" : ""
      }`}
    >
      <h1 className="about-section__title">About Me:</h1>

      {/* MAIN INTRO TEXT (this should sit under the title, not on the side) */}
      <div className="about-section__intro">
        <p>
          I&apos;m Chris, a full-stack web developer based in New York City who
          likes turning real problems into simple, thoughtful, and actually
          useful, web apps.
        </p>

        <p>
          Most of my work centers around <span className="highlight">React</span>,{" "}
          <span className="highlight">Next.js</span>,{" "}
          <span className="highlight">JavaScript</span> and{" "}
          <span className="highlight">TypeScript</span>. Tools i use to build
          data-driven apps like my draftkings sports optimizing app, fitness
          tracking, and utilities for the Pokémon TCG. I prioritize smooth,
          clear UX, performance, and writing code that&apos;s easy for the next
          developer to understand.
        </p>

        <p>
          These days I&apos;m working and building on the back end with{" "}
          <span className="highlight">Node</span>,{" "}
          <span className="highlight">REST APIs</span>, and{" "}
          <span className="highlight">MongoDB</span> collecting and using data
          to grow projects, handling edge cases, and scaling my apps to reach
          the needs of others.
        </p>
      </div>

      {/* BOTTOM ROW: PROBLEMS + TECH */}
      <div className="about-section__bottom">
        <div className="about-section__box">
          <h2>What I&apos;m working on:</h2>
          <ul>
            <li>
              Building small, end-to-end features in real projects to streamline
              users to get where they need to be
            </li>
            <li>
              Integrating APIs into my projects to increase app capabilities
            </li>
            <li>Solving niche as well as every day problems like parking or commerce</li>
          </ul>
        </div>

        <div className="about-section__box">
          <h2>Tech I Work With:</h2>
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
          When I&apos;m not coding, I’m usually either playing card games like
          Pokémon or Magic, teaching chess to elementary school kids, or lifting
          weights at the gym. I like working on projects that mix strategy,
          consistency, steady growth, and long-term improvement — and believe
          the tools we use in these hobbies, and in life, can make or break our
          individual success.
        </p>
      </div>
    </div>
  );
};

export default About;
