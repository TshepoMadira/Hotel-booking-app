import React from 'react';
import './ContactUs.css';



const ContactUs = () => {
  return (
    <div>
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
        <button  className='submit-btn'type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
