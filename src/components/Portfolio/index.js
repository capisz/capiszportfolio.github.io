import React, { useState, useEffect } from "react"
import "./index.scss"
import Loader from "react-loaders"
import AnimatedLetters from "../AnimatedLetters"
import portfolioData from "../../data/portfolio.json"

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState("text-animate")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover")
    }, 3000)
    return () => clearTimeout(timer)
  }, []) // ✅ add dependency array

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
              alt={item.title}
              className="portfolio-image"
            />
          )}

          <div className="content">
            <p className="title">{item.title}</p>
            <h4 className="description">{item.description}</h4>
            <button className="btn" onClick={() => window.open(item.url)}>
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


  return (
    <>
      <div className="container portfolio-page">
        <h1 className="page-title">
          <AnimatedLetters
            letterClass={letterClass}
            strArray={"My Portfolio :".split("")}
            index={15}
          />
        </h1>

        <div>{renderPortfolio(portfolioData.portfolio)}</div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Portfolio
