import logo from '../assets/logo-bg.png';
import '../css/welcome_page.css';
import { MdLogin, MdDashboard, MdOutlineQueryStats } from 'react-icons/md';
import { BsBook, BsArchiveFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
  const { logout, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  let navbar;

  if (isLoading) {
    navbar = <nav></nav>;
  }

  if (!isLoading && !isAuthenticated) {
    navbar = (
      <nav>
        <button onClick={() => navigate('/home')}>
          <span>{t('buttons.login')}</span>
          <MdLogin />
        </button>
      </nav>
    );
  }

  if (!isLoading && isAuthenticated) {
    navbar = (
      <nav>
        <button onClick={handleLogout}>
          <span>{t('buttons.logout')}</span>
          <MdLogin />
        </button>
      </nav>
    );
  }
  let links;

  if (isLoading) {
    links = (
      <div className="link-wrapper">
        <div className="link">
          <div className="container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !isLoading) {
    links = (
      <div className="link-wrapper">
        <div className="link">
          <Link to={'/home/dashboard'}>
            <MdDashboard className="icon" />
            <span>{t('misc.dashboard')}</span>
          </Link>
        </div>
        <div className="link">
          <Link to={'/home/cards'}>
            <BsBook className="icon" />
            <span>{t('misc.cards')}</span>
          </Link>
        </div>
        <div className="link">
          <Link to={'/home/stats'}>
            <MdOutlineQueryStats className="icon" />
            <span>{t('misc.stats')}</span>
          </Link>
        </div>
        <div className="link">
          <Link to={'/home/archive'}>
            <BsArchiveFill className="icon" />
            <span>{t('misc.arch')}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="welcome-page">
      {navbar}
      <div className="image-wrapper">
        <img src={logo} alt="logo" />
        <div className="h-wrapper">
          <h4>Lite</h4>
          <span className="dot"></span>
        </div>
      </div>
      {links}
    </section>
  );
};
export default WelcomePage;
