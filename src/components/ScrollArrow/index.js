// src/components/ScrollArrow/index.js
import React, { useEffect, useState } from "react";
import "./index.scss";

const SECTION_IDS = ["about", "portfolio", "contact"];

const ScrollArrow = () => {
  const [direction, setDirection] = useState("down"); // "down" or "up"

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // If we’re near the bottom of the page, show UP arrow
      if (scrollY + viewportHeight >= docHeight - 150) {
        setDirection("up");
        return;
      }

      // Otherwise, look at which section we’re in
      const positions = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return el.offsetTop;
      });

      const currentIndex = positions.reduce((acc, pos, idx) => {
        if (pos === null) return acc;
        if (scrollY + 120 >= pos) return idx;
        return acc;
      }, 0);

      if (currentIndex >= SECTION_IDS.length - 1) {
        setDirection("up");
      } else {
        setDirection("down");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offsetTop = el.offsetTop - 70; // small offset for nav
    window.scrollTo({
      top: offsetTop < 0 ? 0 : offsetTop,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    if (direction === "up") {
      // Always go back to top when arrow is up
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const scrollY = window.scrollY;
    const positions = SECTION_IDS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return el.offsetTop;
    });

    // Find "next" section based on current scroll
    let nextIndex = 0;
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      if (pos === null) continue;
      if (scrollY + 120 < pos) {
        nextIndex = i;
        break;
      }
      // If we’re past portfolio, go to contact
      nextIndex = SECTION_IDS.length - 1;
    }

    scrollToSection(SECTION_IDS[nextIndex]);
  };

  return (
    <button
      type="button"
      className={`scroll-arrow scroll-arrow--${direction}`}
      onClick={handleClick}
      aria-label={direction === "down" ? "Scroll down" : "Scroll to top"}
    >
      <span className={`arrow-icon arrow-icon--${direction}`} />
    </button>
  );
};

export default ScrollArrow;
