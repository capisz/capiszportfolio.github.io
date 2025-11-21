import './index.scss';

const Home = () => {
  return (
    <div id="home" className="container home-page">
      {/* Text on the LEFT */}
      <div className="text-zone">
        <h1>
          Hi,
          <br />
          I'm <span className="highlight-c">Chris</span>,
          <br />
          Software Engineer & Full-stack Developer
        </h1>

        <p className="subheading">
I build fast, modern web applications with React, Next.js, TypeScript, and scalable APIs.        </p>

        <p className="roles">
Focused on thoughtful UI, creative solutions to complex problems, and building tools that make people's lives easier.      </p>

        <div className="button-row">
         <a href="#contact" className="flat-button">
  <img src="/icons/mail.svg" alt="Mail" className="btn-icon" />
  CONTACT ME
</a>

          <a
            href="/chris_capizzuto_resume.pdf"
            className="flat-button secondary"
            download="christopher-capizzuto-resume.pdf"
            aria-label="Download my resume as a PDF"

          >
            DOWNLOAD RESUME <span className="btn-icon">⬇</span>
          </a>
        </div>
      </div>

      {/* Illustration on the RIGHT */}
      <div className="hero-illustration">
        <img
          src="/dev-hero.gif"
          alt="Developer at desk with dual monitors"
        />
      </div>
    </div>
  );
};

export default Home;
