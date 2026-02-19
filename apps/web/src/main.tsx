import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth.context.tsx'
import React from 'react';
 
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App></App>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
