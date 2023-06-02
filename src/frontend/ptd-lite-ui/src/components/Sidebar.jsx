import { Link, Outlet } from 'react-router-dom';
import '../css/sidebar.css';
import logo from './assets/logo-bg.png';
import CardsMini from './CardsMini';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const handleSideBarClick = (event) => {
    const sidebar = document.querySelector('nav');
    sidebar.classList.toggle('close');
  };

  const handleArrowClick = (event) => {
    const arrowParent = event.target.parentElement.parentElement;
    arrowParent.classList.toggle('showMenu');
  };

  return (
    <div className="sidebar-wrapper">
      <nav className="sidebar close">
        <header>
          <div className="logo">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>
            <span className="text">Lite</span>
          </div>
          <div className="toggle-icon">
            <i
              className="bx bx-chevron-right toggle"
              onClick={handleSideBarClick}
            ></i>
          </div>
        </header>
        <div className="menu">
          <ul>
            <li>
              <Link to={'dashboard'}>
                <div className="icon-wrapper">
                  <i className="bx bx-grid-alt icon"></i>
                </div>
                <div className="text-wrapper">Dashboard</div>
              </Link>
            </li>
            <li className="sub-link-wrapper">
              <div className="sub-link">
                <Link to={'cards'}>
                  <div className="icon-wrapper">
                    <i className="bx bx-book-open icon"></i>
                  </div>
                  <div className="text-wrapper">Cards</div>
                </Link>
                <i
                  className="bx bxs-chevron-down arrow"
                  onClick={handleArrowClick}
                ></i>
              </div>
              <div className="sub-menu">
                <CardsMini />
              </div>
            </li>
            <li>
              <Link to={'stats'}>
                <div className="icon-wrapper">
                  <i className="bx bx-line-chart icon"></i>
                </div>
                <div className="text-wrapper">Statistics</div>
              </Link>
            </li>
            <li>
              <Link to={'archive'}>
                <div className="icon-wrapper">
                  <i className="bx bx-archive icon"></i>
                </div>
                <div className="text-wrapper">Archives</div>
              </Link>
            </li>
          </ul>

          <footer>
            <LogoutButton />
          </footer>
        </div>
      </nav>

      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
};
export default Sidebar;
