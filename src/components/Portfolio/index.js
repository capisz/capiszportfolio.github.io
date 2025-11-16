import React, { useState, useEffect } from "react";
import "./index.scss";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import portfolioData from "../../data/portfolio.json";
import useInView from "../../hooks/useInView";

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [ref, inView] = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const renderPortfolio = (portfolioArray) => {
    return (
      <div className="images-container">
        {portfolioArray.map((item, idx) => (
          <div
            className={`image-box ${
              item.status === "in-progress" ? "in-progress" : ""
            }`}
            key={idx}
          >
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

            <div className="content">
              <p className="title">{item.title}</p>
              <h4 className="description">{item.description}</h4>
              {item.tag && <h5 className="tag">{item.tag}</h5>}

              {/* View App (Vercel) + View Code (GitHub) */}
              <div className="project-buttons">
                {item.url && (
                  <button
                    className="btn"
                    onClick={() => window.open(item.url, "_blank")}
                  >
                    App
                  </button>
                )}

                {item.codeUrl && (
                  <button
                    className="btn"
                    onClick={() => window.open(item.codeUrl, "_blank")}
                  >
                    Code
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
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

        {renderPortfolio(portfolioData.portfolio)}
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default Portfolio;
