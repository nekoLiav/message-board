import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/meyer-reset.css';
import './styles/index.css';
import App from './App';
import SubNub from './components/SubNub';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import All from './components/All';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<All />} />
          <Route path="n/:subnub" element={<SubNub />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
