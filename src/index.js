import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Mainpage from './Components/Mainpage';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Mainpage />
  </BrowserRouter>
  )