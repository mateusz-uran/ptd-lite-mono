import React from 'react';
import './sidebar.css';
import logo from './assets/logo-bg.png';

function Sidebar(props) {

    const handleSideBarClick = (event) => {
        const sidebar = document.querySelector('nav');
        sidebar.classList.toggle("close");
    }

    const handleArrowClick = (event) => {
        const arrowParent = event.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    };

    return (
        <div>
            <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src={logo} alt='logo' />
                        </span>
                        <div className="text logo-text">
                            <span className="name">Lite</span>
                        </div>
                    </div>
                    <i class='bx bx-chevron-right toggle' onClick={handleSideBarClick}></i>
                </header>

                <ul className="nav-links">
                    <li>
                        <div className="nav-item">
                            <a href="#">
                                <i class='bx bx-grid-alt icon'></i>
                                <span className="text">Dashboard</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item">
                            <a href="#">
                                <i class='bx bx-book-open icon'></i>
                                <span className="text">Cards</span>
                            </a>
                            <i className="bx bxs-chevron-down arrow" onClick={handleArrowClick}></i>
                        </div>
                        <ul className="sub-links">
                            <li>
                                <a href="#">
                                    <span className="text">1/01/2023</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="text">1/01/2023</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="text">1/01/2023</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="nav-item">
                            <a href="#">
                                <i class='bx bx-line-chart icon'></i>
                                <span className="text">Statistics</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="nav-item">
                            <a href="#">
                                <i class='bx bx-archive icon'></i>
                                <span className="text">Archives</span>
                            </a>
                        </div>
                    </li>
                </ul>

            </nav>
            <section class="home">
                <div class="text">Dashboard Sidebar</div>
            </section>
        </div>
    );
}

export default Sidebar;