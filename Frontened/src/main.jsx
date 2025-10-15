import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './redux/store.js'; // 👈 import your store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* 👈 Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
