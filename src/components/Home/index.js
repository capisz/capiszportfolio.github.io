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
          Fullstack Developer.
        </h1>
        <h2>FULLSTACK DEVELOPER / JAVASCRIPT, TYPESCRIPT, HTML/CSS, REACT</h2>

        <div className="button-row">
          <a href="#contact" className="flat-button">
            CONTACT ME
          </a>
          <a href="/chris_capizzuto_resume.pdf" className="flat-button secondary" download="christopher-capizzuto-resume.pdf">
            DOWNLOAD RESUME  <span className="btn-icon">⬇</span>
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
