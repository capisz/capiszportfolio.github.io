import { useEffect } from "react";

// Ports the design's support.js componentDidMount interaction logic to a React
// effect that operates on the mounted DOM via the given root ref. Everything is
// gated on prefers-reduced-motion.
export default function usePortfolioEffects(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const q = (sel) => Array.from(root.querySelectorAll(sel));
    const cleanups = [];

    // ---- reveal on scroll (force-show once in view) ----
    const forceShow = (el) => {
      if (el.__shown) return;
      el.__shown = true;
      el.style.animation = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    };

    const revealEls = q("[data-reveal]");
    if (reduce) {
      revealEls.forEach(forceShow);
    } else {
      const revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target;
              const d = parseInt(el.getAttribute("data-delay") || "0", 10);
              el.style.opacity = "0";
              el.style.animation =
                "pf-reveal .7s cubic-bezier(.2,.7,.2,1) " + d + "ms both";
              el.addEventListener(
                "animationend",
                () => {
                  el.style.animation = "none";
                  el.style.opacity = "1";
                  el.style.transform = "none";
                },
                { once: true }
              );
              el.__shown = true;
              revealIO.unobserve(el);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
      );
      const vh = window.innerHeight || 800;
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.97) {
          forceShow(el);
        } else {
          el.style.opacity = "0";
          revealIO.observe(el);
        }
      });
      cleanups.push(() => revealIO.disconnect());
      // hard safety: never leave anything hidden
      const safety = setTimeout(() => revealEls.forEach(forceShow), 1400);
      cleanups.push(() => clearTimeout(safety));
    }

    // ---- count-up stats ----
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute("data-countup"), 10);
      if (isNaN(target)) return;
      const dur = 1000;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const val = Math.round(target * (1 - Math.pow(1 - t, 3)));
        el.textContent = String(val);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            countIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    q("[data-countup]").forEach((el) => countIO.observe(el));
    cleanups.push(() => countIO.disconnect());

    // ---- videos: freeze a representative frame (static) or play while in view ----
    const playIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) v.play && v.play().catch(() => {});
          else v.pause && v.pause();
        });
      },
      { threshold: 0.2 }
    );
    q("video[data-pv]").forEach((v) => {
      if (v.hasAttribute("data-static")) {
        v.removeAttribute("loop");
        v.addEventListener(
          "loadeddata",
          () => {
            try {
              v.currentTime = Math.min(0.6, (v.duration || 2) / 4);
            } catch (err) {}
            v.pause();
          },
          { once: true }
        );
        v.addEventListener("seeked", () => v.pause(), { once: true });
        v.load();
      } else {
        playIO.observe(v);
      }
    });
    cleanups.push(() => playIO.disconnect());

    // ---- card 3D tilt + media zoom + code overlay reveal ----
    if (!reduce && window.matchMedia("(hover: hover)").matches) {
      q("[data-tilt]").forEach((card) => {
        const max = parseFloat(card.getAttribute("data-tilt")) || 5;
        const accent = card.getAttribute("data-accent") || "#ffd54a";
        const media = card.querySelector("[data-media]");
        const overlay = card.querySelector("[data-codeoverlay]");
        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            "perspective(900px) rotateY(" +
            (px * max).toFixed(2) +
            "deg) rotateX(" +
            (-py * max).toFixed(2) +
            "deg) translateY(-5px)";
          card.style.borderColor = accent;
          card.style.boxShadow =
            "0 24px 48px -26px rgba(0,0,0,0.6), 0 0 0 1px " + accent + "55";
          if (media && media.tagName !== "PRE") media.style.transform = "scale(1.07)";
          if (overlay) overlay.style.opacity = "1";
        };
        const onLeave = () => {
          card.style.transform = "";
          card.style.borderColor = "";
          card.style.boxShadow = "";
          if (media) media.style.transform = "";
          if (overlay) overlay.style.opacity = "0";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    // ---- code waterfall: cursor torch mask ----
    const codebg = root.querySelector("[data-codebg]");
    if (codebg && !reduce) {
      const setMask = (x, y) => {
        const m =
          "radial-gradient(circle 210px at " +
          x +
          "px " +
          y +
          "px,#000 0%,rgba(0,0,0,0.55) 48%,transparent 74%)";
        codebg.style.webkitMaskImage = m;
        codebg.style.maskImage = m;
      };
      const onMouseMove = (e) => setMask(e.clientX, e.clientY);
      const onMouseLeave = () => setMask(-400, -400);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
      cleanups.push(() => {
        window.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
      });
    }

    // ---- parallax + nav shadow + scroll-progress bar ----
    const plx = q("[data-parallax]").map((el) => ({
      el,
      speed: parseFloat(el.getAttribute("data-parallax")) || 0,
    }));
    const nav = root.querySelector("[data-nav]");
    const bar = root.querySelector("[data-progress]");
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (!reduce)
        plx.forEach((p) => {
          p.el.style.transform = "translate3d(0," + (y * p.speed).toFixed(1) + "px,0)";
        });
      if (nav) {
        if (y > 8) {
          nav.style.boxShadow = "0 10px 30px -16px rgba(0,0,0,0.7)";
          nav.style.borderBottomColor = "rgba(255,255,255,0.12)";
        } else {
          nav.style.boxShadow = "none";
          nav.style.borderBottomColor = "rgba(255,255,255,0.07)";
        }
      }
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1;
        bar.style.width = Math.min(100, (y / max) * 100) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // ---- marquee: randomly glow items as they travel ----
    if (!reduce) {
      const glowAccents = ["#ffd54a", "#3fd6c2", "#b794ff", "#ff8a5c", "#74e0a0"];
      const items = q("[data-marquee] > div");
      items.forEach((it) => {
        const label = it.querySelector("span:last-child");
        const icon = it.querySelector("span:first-child");
        if (label) label.style.transition = "color .5s ease, text-shadow .5s ease";
        if (icon) icon.style.transition = "opacity .5s ease, filter .5s ease";
      });
      const glowOne = () => {
        if (!items.length) return;
        const it = items[Math.floor(Math.random() * items.length)];
        const c = glowAccents[Math.floor(Math.random() * glowAccents.length)];
        const label = it.querySelector("span:last-child");
        const icon = it.querySelector("span:first-child");
        if (label) {
          label.style.color = c;
          label.style.textShadow = "0 0 14px " + c;
        }
        if (icon) {
          icon.style.opacity = "1";
          icon.style.filter = "drop-shadow(0 0 8px " + c + ")";
        }
        setTimeout(() => {
          if (label) {
            label.style.color = "";
            label.style.textShadow = "";
          }
          if (icon) {
            icon.style.opacity = "";
            icon.style.filter = "";
          }
        }, 1400);
      };
      const glowTimer = setInterval(glowOne, 900);
      cleanups.push(() => clearInterval(glowTimer));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
