import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import ContactUsPage from './pages/ContactUsPage';
import ContactsPage from './pages/ContactsPage';
import AccountPage from './pages/AccountPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchServices } from './features/services/servicesSlice';
import { fetchUsers } from './features/users/usersSlice';
import { selectCurrentUser } from "./features/user/userSlice";
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchUsers());
  }, [dispatch]);
  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='about' element={<AboutPage/>}></Route>
        <Route path='contactus' element={<ContactUsPage/>}></Route>
        <Route path='services' element={<ServicesPage/>}></Route>
        <Route path='services/:userId' element={<WorkerProfilePage/>}></Route>
        <Route path='contacts' element={<ContactsPage/>}></Route>
        <Route path='account' element={(currentUser == null || currentUser == undefined) ? <HomePage/> : <AccountPage/>}></Route>
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
