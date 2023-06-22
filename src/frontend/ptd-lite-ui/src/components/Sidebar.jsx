import { Link, useOutlet } from 'react-router-dom';
import logo from '../assets/logo-bg.png';
import { IoMdArrowDropleftCircle } from 'react-icons/io';
import {
  MdLogout,
  MdDashboard,
  MdOutlineQueryStats,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { BsBook, BsArchiveFill } from 'react-icons/bs';
import { RiArrowDropLeftLine, RiArrowDropDownLine } from 'react-icons/ri';
import { RxDoubleArrowUp } from 'react-icons/rx';
import '../css/sidebar.css';
import { useState } from 'react';
import CardsMini from '../features/cards/CardsMini';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const outlet = useOutlet();

  return (
    <div className="sidebar-wrapper">
      <nav className={`sidebar ${showSidebar ? '' : 'close'}`}>
        <header>
          <div className="logo">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <span className="text">Lite</span>
          </div>
          <div className="toggle-icon">
            <RiArrowDropLeftLine
              className="toggle"
              onClick={() => setShowSidebar((prevState) => !prevState)}
            />
          </div>
        </header>
        <div className="menu">
          <ul>
            <li>
              <Link to={'dashboard'}>
                <div className="icon-wrapper">
                  <MdDashboard className="icon" />
                </div>
                <div className="text-wrapper">Dashboard</div>
              </Link>
            </li>
            <li className={`sub-link-wrapper ${showSubMenu ? 'showMenu' : ''}`}>
              <div className="sub-link">
                <Link to={'cards'}>
                  <div className="icon-wrapper">
                    <BsBook className="icon" />
                  </div>
                  <div className="text-wrapper">Cards</div>
                </Link>
                <RiArrowDropDownLine
                  onClick={() => setShowSubMenu((prevState) => !prevState)}
                  className="arrow"
                />
              </div>
              <div className="sub-menu">
                <CardsMini />
              </div>
            </li>
            <li>
              <Link to={'stats'}>
                <div className="icon-wrapper">
                  <MdOutlineQueryStats className="icon" />
                </div>
                <div className="text-wrapper">Statistics</div>
              </Link>
            </li>
            <li>
              <Link to={'archive'}>
                <div className="icon-wrapper">
                  <BsArchiveFill className="icon" />
                </div>
                <div className="text-wrapper">Archives</div>
              </Link>
            </li>
          </ul>

          <footer className="logout-button">
            <button>
              <MdLogout className="icon" />
              <span>Logout</span>
            </button>
          </footer>
        </div>
      </nav>

      <div className="outlet-wrapper">{outlet}</div>
    </div>
  );
};
export default Sidebar;
