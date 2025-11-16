import { useState, useEffect } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const SECTION_IDS = ["about", "portfolio", "contact"];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const viewportCenter = viewportHeight / 2;

      let current = "";

      // Which section covers the center of the screen?
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        if (top <= viewportCenter && bottom >= viewportCenter) {
          current = id;
        }
      });

      // If nothing matched and we're basically at the bottom,
      // force "contact" active so it highlights while using the form.
      const nearBottom = scrollY + viewportHeight >= docHeight - 5;
      if (!current && nearBottom) {
        current = "contact";
      }

      setActiveSection(current);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="nav-bar">
      {/* Left: name/brand */}
      <div className="brand">
        <span className="brand-name"></span>
      </div>

      {/* Center: HTML-style section links */}
      <nav>
        <a
          href="#about"
          onClick={scrollToSection("about")}
          className={`nav-link ${activeSection === "about" ? "active" : ""}`}
        >
          &lt;About&gt;
        </a>
        <a
          href="#portfolio"
          onClick={scrollToSection("portfolio")}
          className={`nav-link ${activeSection === "portfolio" ? "active" : ""}`}
        >
          &lt;Portfolio&gt;
        </a>
        <a
          href="#contact"
          onClick={scrollToSection("contact")}
          className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
        >
          &lt;Contact&gt;
        </a>
      </nav>

      {/* Right: socials */}
      <ul>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com" 
            // TODO: replace with your real LinkedIn URL
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/capisz"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://discord.com"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Sidebar;
