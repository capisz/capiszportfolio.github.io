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
Building fast, modern-looking apps with React, Next.js, and TypeScript, that feel alive and solve real world problems.        </p>

      

        <div className="button-row">
         <a href="#contact" className="flat-button">
  <img src="/icons/mail.svg" alt="Mail" className="btn-icon" />
  CONTACT ME
</a>

       <a
  href="/christopher-capizzuto-resume.pdf"
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
