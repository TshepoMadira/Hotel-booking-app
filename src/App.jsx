
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import Offers from './components/Offers';
import SignUpPage from './Authentication/SignUpPage'; 
import LoginPage from './Authentication/LoginPage';
import HomePage from './Pages/HomePage'; 
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import FAQs from './components/FAQs';
import KingSuitesDetails from './components/KingSuitesDetails';
import QueenSuiteDetails from './components/QueenSuiteDetails';
import GuestRoomDetails from './components/GuestRoomDetails';
import ForgotPassword from './Users/ForgortPassword';
import Accommodations from './AdminPanel/AccommodationsAdmin';
import Reservations from './AdminPanel/Reservations';
import BookingForm from './Users/BookingPlatform';
import Reservationhistory from './Users/Reservationhistory';
import PayPalButton from './Users/PayPalButton';
import './App.css';
import UserProfile from './Users/UserProfile';
import SearchResults from './components/SearchResults'; 



function App() {
  return (
    <Router>
     
      
      <Routes>
      
       
        <Route path="/" element={<HomePage />} />
        
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path='login' element={<LoginPage />} />
        <Route path="termsandconditions" element={<TermsAndConditions />} />
        {/* <Route path="offers" element={<Offers />} /> */}
        <Route path="/king-suite-details" element={<KingSuitesDetails />} />
        <Route path="/queen-suite-details" element={<QueenSuiteDetails />} />
        <Route path="guest-room-details" element={<GuestRoomDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/accommodations' element={<Accommodations />} />
        <Route path='reservations' element={<Reservations />} />
        <Route path='booking' element={<BookingForm />} />
        <Route path="/reservationhistory" element={<Reservationhistory />} />
        <Route path='paypal' element={<PayPalButton />} />
        <Route path='userprofile' element={<UserProfile />} />
        <Route path='/search' element={<SearchResults />} />
        



      </Routes>
    </Router>
  );
}

export default App;
