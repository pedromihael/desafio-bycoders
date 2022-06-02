import React from 'react';
import GlobalStyles from './styles/global';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/Home'

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
