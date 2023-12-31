import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchServices } from './features/services/servicesSlice';
import { selectCurrentUser } from "./features/user/userSlice";
import { fetchRequests } from './features/requests/requestsSlice';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import WorkerSearchPage from './pages/WorkerSearchPage';
import WorkerProfilePage from './pages/WorkerProfilePage';
import ContactUsPage from './pages/ContactUsPage';
import ContactsPage from './pages/ContactsPage';
import AccountPage from './pages/AccountPage';
import Footer from './components/Footer';
import NavMenu from './components/NavMenu';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchRequests());
    }
  }, [currentUser, dispatch])

  return (
    <div className="App">
      <ToastContainer theme="dark" autoClose={3000} />
      <NavMenu />
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='about' element={<AboutPage />}></Route>
        <Route path='contactus' element={<ContactUsPage />}></Route>
        <Route path='search' element={<WorkerSearchPage />}></Route>
        <Route path='search/:keyword' element={<WorkerSearchPage />}></Route>
        <Route path='worker/:userId' element={<WorkerProfilePage />}></Route>
        <Route path='contacts' element={currentUser === null || currentUser === undefined ? <HomePage /> : <ContactsPage />}></Route>
        <Route path='account' element={currentUser === null || currentUser === undefined ? <HomePage /> : <AccountPage />}></Route>
      </Routes>
      <Footer />
    </div>

  );
}

export default App;