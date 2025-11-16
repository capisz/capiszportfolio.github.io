// src/components/ScrollArrow/index.js
import React from "react";
import "./index.scss";

const ScrollArrow = () => {
  const handleClick = () => {
    const portfolio = document.getElementById("portfolio");
    const contact = document.getElementById("contact");
    const current = window.scrollY || window.pageYOffset;

    const portfolioTop = portfolio ? portfolio.offsetTop : 0;
    const contactTop = contact ? contact.offsetTop : 0;

    // 1) From hero / about → scroll to portfolio
    if (current < portfolioTop - 100) {
      portfolio?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 2) From portfolio → scroll to contact
    if (current < contactTop - 100) {
      contact?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // 3) From contact (or below) → back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="scroll-arrow"
      type="button"
      onClick={handleClick}
      aria-label="Scroll"
    >
      <span className="scroll-arrow-icon">↑</span>
    </button>
  );
};

export default ScrollArrow;
