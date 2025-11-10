import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa o BrowserRouter
import App from './App';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Renderiza a aplicação na página
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
