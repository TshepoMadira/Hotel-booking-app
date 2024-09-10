import React from 'react';
import './FAQs.css';

const FAQs = () => {
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <h3>What time is check-in and check-out?</h3>
        <p>Check-in time is typically from 3 PM, and check-out time is usually by 11 AM. However, these times can vary by hotel, so it’s always a good idea to confirm with the specific hotel.</p>
      </div>
      <div className="faq-item">
        <h3>Do you offer airport transfers?</h3>
        <p>Yes we do offer our guests airport transfers but theres a fee to pay</p>
      </div>
      <div className="faq-item">
        <h3>Is Wi-Fi available?</h3>
        <p>Unlimited wifi is there at there hotel you dont have to pay for it</p>
      </div>
      <div className="faq-item">
        <h3>What is your cancellation policy?</h3>
        <p>You will be charged 50% of the total price if you cancel after reservation and the total price of the reservationif you cancel in the 30 days before arrival.</p>
      </div>
      <div className="faq-item">
        <h3>Are pets allowed?</h3>
        <p>Pets are allowed Note! dangerous dogs like pitbull are not allowed youll be fined</p>
      </div>
      <div className="faq-item">
        <h3>Do you have on-site parking?</h3>
        <p>On site parking is available for only R30 per night with maximum security</p>
      </div>
    </div>
  );
};

export default FAQs;
