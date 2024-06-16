import ReactDom from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

ReactDom.createRoot(document.getElementById('__react-app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
