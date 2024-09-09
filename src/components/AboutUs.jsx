import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>[Paragon] is a premier destination for travelers seeking comfort and luxury. Our hotel offers a range of amenities to ensure a memorable stay, including [list key amenities]. Located in the heart of Brits, we are just minutes away from [local attractions].</p>
      <iframe
        title="Hotel Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0236277617657!2d-122.4194156846814!3d37.77492927975961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2a7dcb43%3A0x5c0c9fdd54d7eeb5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1634131263483!5m2!1sen!2sus"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <p>Address: 5 Spoorweg Street Brits 0250 South Africa</p>
    </div>
  );
};

export default AboutUs;
