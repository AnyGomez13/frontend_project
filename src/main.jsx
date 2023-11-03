import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para envolver tu aplicación
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // </BrowserRouter>
);