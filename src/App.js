import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkerProfilePage from './pages/WorkerProfilePage';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='about' element={<AboutPage/>}></Route>
        <Route path='services' element={<ServicesPage/>}></Route>
        <Route path='services/:userId' element={<WorkerProfilePage/>}></Route>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
