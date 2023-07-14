import React from 'react';
import './App.css';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='about' element={<AboutPage/>}></Route>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
