import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENTID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    useRefreshTokens: true,
    cacheLocation: "memory"
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>
)
