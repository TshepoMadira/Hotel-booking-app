
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/SignUpPage'; 
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'; 
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TermsAndConditions from './components/TermsAndConditions';
import FAQs from './components/FAQs';
import './App.css';


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

      </Routes>
    </Router>
  );
}

export default App;
