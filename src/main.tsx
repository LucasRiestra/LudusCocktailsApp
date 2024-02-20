import React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';

(ReactDOM as any).createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)