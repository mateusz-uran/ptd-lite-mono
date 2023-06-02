import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import '../css/logout.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <section className="logout-button">
      <button onClick={handleLogout}>
        <i className="bx bx-log-out icon"></i>
        <span>Logout</span>
      </button>
    </section>
  );
};

export default LogoutButton;
