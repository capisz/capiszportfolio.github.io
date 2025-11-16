import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const SECTION_IDS = ['home', 'about', 'portfolio', 'contact'];

const ScrollArrow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) {
              setCurrentIndex(idx);
            }
          }
        });
      },
      {
        threshold: 0.4, // section is "current" when ~40% visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const nextIndex = (currentIndex + 1) % SECTION_IDS.length;
    const nextId = SECTION_IDS[nextIndex];
    const el = document.getElementById(nextId);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const isLast = currentIndex === SECTION_IDS.length - 1;
  const icon = isLast ? faArrowUp : faArrowDown;

  return (
    <button
      className="scroll-arrow"
      onClick={handleClick}
      aria-label={isLast ? 'Scroll to top' : 'Scroll to next section'}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default ScrollArrow;
