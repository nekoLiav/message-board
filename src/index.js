import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/meyer-reset.css';
import './styles/index.css';
import App from './App';
import SubNub from './components/views/SubNublet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import All from './components/views/All';
import Home from './components/views/Home';
import PostSubmission from './components/views/PostSubmission';
import SubSubmission from './components/views/SubSubmission';
import Thread from './components/views/Thread';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="create-post" element={<PostSubmission />} />
          <Route path="create-sub" element={<SubSubmission />} />
          <Route path="n">
            <Route path="all" element={<All />} />
            <Route path=":subnublet" element={<SubNub />} />
            <Route path="comments">
              <Route path=":thread" element={<Thread />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
