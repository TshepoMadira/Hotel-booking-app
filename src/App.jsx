
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './components/SignUpPage'; 
import HomePage from './components/HomePage'; 
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQs from './components/FAQs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
       
        
      </Routes>
    </Router>
  );
}

export default App;
