import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { store } from './store.js';
import { Provider } from 'react-redux';
import Auth0Wrapper from './features/auth/Auth0Wrapper.jsx';
import './i18n.js';

const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENTID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    useRefreshTokens: true,
    cacheLocation: 'memory',
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider {...providerConfig}>
    <React.StrictMode>
      <Provider store={store}>
        <Auth0Wrapper>
          <App />
        </Auth0Wrapper>
      </Provider>
    </React.StrictMode>
  </Auth0Provider>
);
