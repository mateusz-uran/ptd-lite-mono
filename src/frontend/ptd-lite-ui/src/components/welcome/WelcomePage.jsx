import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-bg.png';
import '../../css/misc.css';

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <div className="wrapper">
        <div className="left-side">
          <div className="logo">
            <img src={logo} alt="logo-ptd" />
            <span className="text">Lite</span>
          </div>
          <div className="desc">
            Professional Truck Driver management system.
          </div>
        </div>
        <div className="right-side">
          <button className="login" onClick={() => navigate('/home')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;
