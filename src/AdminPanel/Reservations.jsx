import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/Firebase';

import './AdminReservations.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [roomAvailability, setRoomAvailability] = useState({}); 

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const bookingsCol = collection(db, 'bookings');
        const bookingSnapshot = await getDocs(bookingsCol);
        const bookingList = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched bookings: ", bookingList); 
        setReservations(bookingList);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchReservations();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredReservations = reservations.filter(reservation => {
    if (!reservation) return false; 
  
    const searchLower = searchQuery.toLowerCase();
    return (
      (reservation.id && reservation.id.toLowerCase().includes(searchLower)) || 
      (reservation.accommodationName && reservation.accommodationName.toLowerCase().includes(searchLower))
    ) && (
      selectedStatus ? reservation.status === selectedStatus : true
    );
  });

  const handleApprove = async (id) => {
    try {
      const reservationDoc = doc(db, 'bookings', id); 
      await updateDoc(reservationDoc, { status: 'approved' });
      setReservations(reservations.map(res => res.id === id ? { ...res, status: 'approved' } : res));
      
      
      const roomType = reservations.find(res => res.id === id).roomType;
      setRoomAvailability(prevState => ({ ...prevState, [roomType]: 'not available' }));
    } catch (error) {
      console.error("Error updating booking to approved: ", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const reservationDoc = doc(db, 'bookings', id); 
      await updateDoc(reservationDoc, { status: 'rejected' });
      setReservations(reservations.map(res => res.id === id ? { ...res, status: 'rejected' } : res));
    } catch (error) {
      console.error("Error updating booking to rejected: ", error);
    }
  };

  return (
    <div className="admin-reservations">
      <h1>Admin Reservations</h1>
      <input
        type="text"
        placeholder="Search by user name or accommodation name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <ul className="reservation-list">
        {filteredReservations.map(res => (
          <li key={res.id}>
            <h4>{res.accommodationName}</h4>
            <p>FullName: {res.fullName}</p>
            {/* <p>User: {res.id}</p> */}
            <p>Check-in: {res.checkinDate}</p>
            <p>Check-out: {res.checkoutDate}</p>
            {/* <p>Guests: {res.numberOfGuests}</p> */}
            <p>RoomType: {res.roomType}</p>
            <p>Status: {res.status}</p>
            {/* <p>Review: {res.review}</p> */}
            <p>Email: {res.email}</p>
            <p>Room Availability: {roomAvailability[res.roomType] === 'not available' ? 'Not Available' : 'Available'}</p>
            <button className='approve-btn' onClick={() => handleApprove(res.id)}>Approve</button>
            <button className='reject-btn' onClick={() => handleReject(res.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReservations;