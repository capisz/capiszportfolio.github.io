import { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../../AnimatedLetters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngular,
  faCss3,
  faGit,
  faHtml5,
  faJsSquare,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import useInView from "../../../hooks/useInView";
import "./index.scss";

const About = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [ref, inView] = useInView();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        id="about"
        ref={ref}
        className={`container about-page fade-section ${
          inView ? "in-view" : ""
        }`}
      >
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"A little about me".split("")}
              index={15}
            />
          </h1>
          <p>
           I’m a full-stack developer who loves turning ideas into fast, clean, and usable interfaces. I work primarily with React, Next.js, TypeScript, and modern CSS, and I enjoy building data-driven apps that actually solve real problems—whether that’s a DraftKings NBA lineup recommender, a smarter calorie-tracking app, or tools for the Pokémon TCG.
          </p>
          <p>
            My background in digital marketing taught me how to think from the user’s perspective, test ideas quickly, and communicate clearly with teammates. I’m comfortable debugging weird edge cases, refactoring messy code, and iterating on designs until they feel right.
          </p>
          <p>
           Outside of coding, I’m usually practicing fingerstyle guitar, doing portrait art in charcoal and graphite, shooting 35mm film, learning new languages, playing card games like Pokemon, RiftBound or Magic the Gathering, hiking or biking, or at the gym. I like challenging myself in and out of tech, and I bring that same curiosity and persistence to every project I work on.
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faAngular} color="#dd0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#f06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28a4d9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ed4f4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#efd81d" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGit} color="#ec4d28" />
            </div>
          </div>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default About;
