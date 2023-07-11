import { Link, useOutlet } from 'react-router-dom';
import logo from '../assets/logo-bg.png';
import { MdLogout, MdDashboard, MdOutlineQueryStats } from 'react-icons/md';
import { BsBook, BsArchiveFill } from 'react-icons/bs';
import { RiArrowDropLeftLine, RiArrowDropDownLine } from 'react-icons/ri';
import '../css/sidebar.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearAuthContext } from '../features/auth/auth0Slice';
import { useAuth0 } from '@auth0/auth0-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const outlet = useOutlet();

  const handleLogout = () => {
    logout();
    dispatch(clearAuthContext());
  };

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
                <div className="text-wrapper">{t('misc.dashboard')}</div>
              </Link>
            </li>
            <li>
              <Link to={'cards'}>
                <div className="icon-wrapper">
                  <BsBook className="icon" />
                </div>
                <div className="text-wrapper">{t('misc.cards')}</div>
              </Link>
            </li>
            <li>
              <Link to={'stats'}>
                <div className="icon-wrapper">
                  <MdOutlineQueryStats className="icon" />
                </div>
                <div className="text-wrapper">{t('misc.stats')}</div>
              </Link>
            </li>
            <li>
              <Link to={'archive'}>
                <div className="icon-wrapper">
                  <BsArchiveFill className="icon" />
                </div>
                <div className="text-wrapper">{t('misc.arch')}</div>
              </Link>
            </li>
          </ul>

          <footer className="logout-button">
            <button onClick={handleLogout}>
              <MdLogout className="icon" />
              <span>{t('buttons.logout')}</span>
            </button>
          </footer>
        </div>
      </nav>

      <div className="outlet-wrapper">{isAuthenticated && outlet}</div>
    </div>
  );
};
export default Sidebar;
