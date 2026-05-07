import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found — check that index.html contains <div id="root">');
}
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
