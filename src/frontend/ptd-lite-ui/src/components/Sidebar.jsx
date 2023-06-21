import { useOutlet } from 'react-router-dom';
import logo from '../assets/logo-bg.png';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import '../css/sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const outlet = useOutlet();

  return (
    <nav className={`sidebar-nav ${showSidebar ? 'hide' : undefined}`}>
      <section className="upper-part">
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
          <span>Lite</span>
        </div>
        <div className="toggle-wrapper">
          <button onClick={() => setShowSidebar((prevState) => !prevState)}>
            <IoMdArrowDropleftCircle className="icon" />
          </button>
        </div>
      </section>
    </nav>
  );
};
export default Sidebar;
