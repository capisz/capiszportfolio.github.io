import { copyToClipboard } from "../../utils/clipboard";
import {
  DRAGAPULTIST_SAMPLE_GAME,
  PRIZE_CHECKER_SAMPLE_DECK,
} from "../../data/sampleText";
import React, { useState, useEffect } from "react";
import "./index.scss";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import portfolioData from "../../data/portfolio.json";
import useInView from "../../hooks/useInView";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

// Map tech keys to SVGs
const techIconMap = {
  react: "/tech-icons/react.svg",
  nextjs: "/tech-icons/nextjs.png",
  javascript: "/tech-icons/javascript.png",
  typescript: "/tech-icons/typescript.png",
  node: "/tech-icons/nodejs.png",
  api: "/tech-icons/api.png",
  mongodb: "/tech-icons/mongodb.svg",
  css: "/tech-icons/css.svg",
  google: "/tech-icons/google.png",
  tailwind: "/tech-icons/tailwind.png",
  facebook: "/tech-icons/facebook.png",
  geolocation: "/tech-icons/geolocation.png",
  electron: "/tech-icons/electron.png",
  python: "/tech-icons/python.png",
  amazon: "/tech-icons/aws.svg",
  swift: "/tech-icons/swift.png",
  git: "/tech-icons/git.png",
};

// Global ordering for tech icons so they’re consistent across cards
const TECH_ORDER = [
  "nextjs",
  "react",
  "typescript",
  "javascript",
  "node",
  "mongodb",
  "python",
  "api",
  "google",
  "tailwind",
  "css",
  "electron",
];

const Portfolio = () => {
  const [copiedId, setCopiedId] = useState(null);
  const [letterClass, setLetterClass] = useState("text-animate");
  const [ref, inView] = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopySample = async (id, text) => {
    try {
      await copyToClipboard(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const renderTechIcons = (techArray) => {
    if (!techArray || techArray.length === 0) return null;

    // Deduplicate + sort according to TECH_ORDER for consistent display
    const ordered = [...new Set(techArray)].sort((a, b) => {
      const ia = TECH_ORDER.indexOf(a);
      const ib = TECH_ORDER.indexOf(b);
      const safeA = ia === -1 ? 999 : ia;
      const safeB = ib === -1 ? 999 : ib;
      return safeA - safeB;
    });

    return (
      <div className="tech-stack">
        {ordered.map((tech, index) => {
          const src = techIconMap[tech];
          if (!src) return null;

          return (
            <img
              key={`${tech}-${index}`}
              src={src}
              alt={tech}
              title={tech.toUpperCase()}
            />
          );
        })}
      </div>
    );
  };

  // Renders the portfolio items
  const renderPortfolio = (portfolioArray) => {
    return (
      <div className="images-container">
        {portfolioArray.map((item, idx) => {
         const title = item.title || "";
const lowerTitle = title.toLowerCase();

const isDragapultist = lowerTitle.includes("dragapultist");
const isPrizeChecker = lowerTitle.includes("prize checker");
const isElephit = lowerTitle.includes("elephit");

// Broader match for your NBA fantasy / DraftKings app
const isDraftKings =
  lowerTitle.includes("draftkings") ||
  lowerTitle.includes("draft kings") ||
  lowerTitle.includes("nba fantasy") ||
  lowerTitle.includes("daily fantasy") ||
  lowerTitle.includes("dfs") ||
  lowerTitle.includes("lineup");

const shouldGlow =
  inView && (isElephit || isDraftKings || isDragapultist || isPrizeChecker);


          return (
            <div
              className={`image-box ${
                item.status === "in-progress" ? "in-progress" : ""
              } ${shouldGlow ? "glow-once" : ""}`}
              key={idx}
            >
              {/* LEFT COLUMN: media + tech icons */}
              <div className="left-column">
                <div className="media">
                  {item.cover.endsWith(".mp4") ? (
                    <video
                      src={item.cover}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="portfolio-video"
                    />
                  ) : (
                    <img
                      src={item.cover}
                      alt={`${item.title} preview`}
                      className="portfolio-image"
                    />
                  )}

                  {item.status === "in-progress" && (
                    <div className="badge">In Progress</div>
                  )}
                </div>

                {/* Tech icons directly under image */}
                {renderTechIcons(item.tech)}
              </div>

              {/* RIGHT COLUMN: text + buttons */}
              <div className="content">
                <p className="title">{item.title}</p>
                <h4 className="description">{item.description}</h4>

                <div className="project-buttons">
                  {item.app && (
                    <button
                      className="btn btn-app btn-small"
                      onClick={() => window.open(item.app, "_blank")}
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="app-icon"
                      />
                      <span> APP</span>
                    </button>
                  )}

                  {item.url && (
                    <button
                      className="btn btn-code btn-small"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        className="github-icon"
                      />
                      <span> CODE</span>
                    </button>
                  )}
                </div>

                {/* Sample text buttons for interactive projects */}
                {isDragapultist && (
                  <button
                    type="button"
                    className="sample-copy-btn"
                    onClick={() =>
                      handleCopySample(
                        "dragapultist-game",
                        DRAGAPULTIST_SAMPLE_GAME
                      )
                    }
                  >
                    {copiedId === "dragapultist-game"
                      ? "Copied sample game log!"
                      : "Copy sample game log"}
                  </button>
                )}

                {isPrizeChecker && (
                  <button
                    type="button"
                    className="sample-copy-btn"
                    onClick={() =>
                      handleCopySample(
                        "prize-checker-deck",
                        PRIZE_CHECKER_SAMPLE_DECK
                      )
                    }
                  >
                    {copiedId === "prize-checker-deck"
                      ? "Copied sample deck list!"
                      : "Copy sample deck list"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div
        id="portfolio"
        ref={ref}
        className={`container portfolio-page fade-section ${
          inView ? "in-view" : ""
        }`}
      >
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"My Portfolio:".split("")}
            index={15}
          />
        </h1>

       <p
  className={`portfolio-subtitle ${inView ? "subtitle-animate" : ""}`}
>
  {`↪`} Take 90 seconds to scan my finished work and decide if I’m a fit for your team.
</p>


        {renderPortfolio(portfolioData.portfolio)}
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default Portfolio;
