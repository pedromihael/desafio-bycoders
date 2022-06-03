import React from 'react';
import GlobalStyles from './styles/global';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home'
import { Stores } from './pages/Stores'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route exact path='/' element={<Stores />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
