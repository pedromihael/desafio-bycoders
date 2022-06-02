import React from 'react';
import GlobalStyles from './styles/global';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
