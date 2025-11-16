import './index.scss';
import Sidebar from '../Sidebar';
import Home from '../Home';
import About from '../Home/About';
import Portfolio from '../Portfolio';
import Contact from '../Contact';
import ScrollArrow from '../ScrollArrow';

const Layout = () => {
  return (
    <div className="App">
      <Sidebar />

      <div className="page">
        <span className="tags top-tags">&lt;body&gt;</span>

        <Home />
        <About />
        <Portfolio />
        <Contact />

        <span className="tags bottom-tags">
          &lt;/body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>

        {/* Floating scroll arrow in bottom-right */}
        <ScrollArrow />
      </div>
    </div>
  );
};

export default Layout;
