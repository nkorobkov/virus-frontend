import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

// The previous Create React App build registered a service worker. Vite does
// not, so unregister any lingering one to stop returning visitors being served
// a stale, cached bundle.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}
