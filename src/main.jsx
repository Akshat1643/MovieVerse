import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-4ywzawabtfuyrpoa.us.auth0.com"
    clientId="LHkyt3X2ImGDdgeIwNft2nSOKyX6kHYu"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);