import React, { useState } from 'react';
import Navbar from './Navbar';
import './HomePage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const HomePage = () => {
  const [numChildren, setNumChildren] = useState(0);
  const [numAdults, setNumAdults] = useState(1);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  return (
    <div className="home-page">
      <Navbar />
      <div className="image-container">
        <img
          src="src/assets/images/unnamed.jpg"
          alt="Hotel"
          className="hotel-image"
        />
        <p className="image-message border-box">
          "First time guests typically choose Paragon because it is well situated in Brits, but they return because of the award-winning service they received. Owner Paragon."
        </p>
      </div>

     
      <div className="container">
        <div className="room-offers">
          <h2>Room Offers</h2>
          
          <div className="room-card">
            <h3>King Suite</h3>
            <img
              src="src/assets/images/unnamed (1).jpg"
              alt="King Suite"
              className="room-image"
            />
            <p className="room-price">R5000</p>
            <div className='room-description-container'>
              <p className="room-description">
                -Two bathrooms with double sink vanity<br />
                -Flat screen TV<br />
                -Full size sofa with lounge chairs<br />
                -Free Uncapped wifi<br />
                -Private Balcony
              </p>
            </div>
          </div>
         
          <div className="room-card">
            <h3>Queen Suite</h3>
            <img
              src="src/assets/images/unnamed (2).jpg"
              alt="Queen Suite"
              className="room-image"
            />
            <p className="room-price">R5100</p>
            <div className='room-description-container'>
              <p className="room-description">
                -Queen size bed with plus pillows and high-quality linens<br />
                -Spacious bathroom with separate shower and bathtub<br />
                -Flatscreen TV with premium channels
              </p>
            </div>
          </div>
        
          <div className="room-card">
            <h3>Guest Room</h3>
            <img
              src="src/assets/images/unnamed (3).jpg"
              alt="Guest Room"
              className="room-image"
            />
            <p className="room-price">R2500</p>
            <div className="room-description-container">
              <p className="room-description">
                - Comfortable bed<br />
                - Single vanity with high-end fixtures<br />
                - Complimentary breakfast<br />
                - Flat screen TV with premium channels<br />
                - Sofa bed for extra sleep
              </p>
            </div>
          </div>
        </div>
        
      
        <div className="booking-form">
         
          <div className="date-picker">
            <label>
              Check-In:
              <input type="date" />
            </label>
            <label>
              Check-Out:
              <input type="date" />
            </label>
          </div>
          <div className='guests-container'>
            <div className="guests">
              <div className="guest-group">
                <label className='Label'>Adults</label>
                <button onClick={() => decrement(setNumAdults, numAdults)}>-</button>
                <span className='number'>{numAdults}</span>
                <button onClick={() => increment(setNumAdults, numAdults)}>+</button>
              </div>
              <div className="guest-group">
                <label className='Label'>Children</label>
                <button onClick={() => decrement(setNumChildren, numChildren)}>-</button>
                <span className='number'>{numChildren}</span>
                <button onClick={() => increment(setNumChildren, numChildren)}>+</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className='footer-container'></div>
        <div className="about-us">
          <h2>About Us</h2>
          <p>[Paragon] is a premier destination for travelers seeking comfort and luxury. Our hotel offers a range of amenities to ensure a memorable stay, including [list key amenities]. Located in the heart of Brits, we are just minutes away from [local attractions].</p>
          <h3>Our Location:</h3>
          <iframe
            title="Hotel Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0236277617657!2d-122.4194156846814!3d37.77492927975961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2a7dcb43%3A0x5c0c9fdd54d7eeb5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1634131263483!5m2!1se2susn!"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p>Address: 5 Spoorweg Street Brits  0250 South Africa</p>
        </div>
        
       
        <div className="contact-us">
          <h2>Contact Us</h2>
          <form>
            <label>
              Name:
              <input type="text" />
            </label>
            <label>
              Email:
              <input type="email" />
            </label>
            <label>
              Phone Number:
              <input type="tel" />
            </label>
            <label>
              Message:
              <textarea></textarea>
            </label>
            <button className='submit-btn' type="submit">Submit</button>
          </form>
        </div>
        
        
        <div className="terms-conditions">
          <h2>Terms and Conditions</h2>
          <p>
            By using [Paragon Hotel], you agree to the following terms and conditions:
            <ul>
              <li>Booking Policy: [Details on booking procedures, cancellations, etc.]</li>
              <li>Payment Policy: [Details on payment methods, deposits, etc.]</li>
              <li>Check-in/Check-out Times: [Times for check-in and check-out]</li>
              <li>Privacy Policy: [Details on how guest information is used and protected]</li>
              <li>Liability: [Information about liability for damages, etc.]</li>
            </ul>
            <a href="[Full Terms and Conditions Document Link]" target="_blank" rel="noopener noreferrer">Read Full Terms and Conditions</a>
          </p>
        </div>
        
        
        <div className="faqs">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <h3>What time is check-in and check-out?</h3>
            
          </div>
          <div className="faq-item">
            <h3>Do you offer airport transfers?</h3>
        
          </div>
          <div className="faq-item">
            <h3>Is Wi-Fi available?</h3>
           
          </div>
          <div className="faq-item">
            <h3>What is your cancellation policy?</h3>
           
          <div className="faq-item">
            <h3>Are pets allowed?</h3>
         
          </div>
          <div className="faq-item">
            <h3>Do you have on-site parking?</h3>
            
          </div>
        </div>
      </div>
      
      
      <footer className="footer">
        <div className="social-media-links">
          <a href="https://twitter.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://facebook.com/YourHotelPage" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com/YourHotelHandle" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://youtube.com/YourHotelChannel" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <p>© 2024 Paragon International Limited. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
};

export default HomePage;
