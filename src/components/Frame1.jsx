import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookRoom } from './Action';
//import styles from './Frame1.module.css';

export const Frame1 = () => {
  const dispatch = useDispatch();
  const { bookings, offers, stays, events } = useSelector((state) => state);

  const handleBooking = (roomType) => {
    dispatch(bookRoom(roomType));
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.hotelName}>ARAGON HOTEL</h1>
      <p className={styles.tagline}>Model of excellence and perfection</p>
      <div className={styles.menu}>
        <button className={styles.menuButton} onClick={() => handleBooking('BOOK')}>BOOK</button>
        <button className={styles.menuButton}>OFFERS</button>
        <button className={styles.menuButton}>STAYS</button>
        <button className={styles.menuButton}>EVENTS</button>
      </div>
      <div className={styles.offersSection}>
        <h2>Room Offers</h2>
        {offers.map((offer) => (
          <div key={offer.id} className={styles.offer}>
            <p>{offer.title}</p>
            <p>Price: {offer.price}</p>
          </div>
        ))}
      </div>
      <div className={styles.bookingSection}>
        <h3>Check Availability</h3>
        <button onClick={() => handleBooking('KING_SUITE')}>Book King Suite</button>
        <button onClick={() => handleBooking('QUEEN_SUITE')}>Book Queen Suite</button>
      </div>
     
    </div>
  );
};
