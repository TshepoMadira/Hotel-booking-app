import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/Firebase';

import './AdminReservations.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsCol = collection(db, 'reservations');
        const reservationSnapshot = await getDocs(reservationsCol);
        const reservationList = reservationSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched reservations: ", reservationList);
        setReservations(reservationList);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
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
    const searchLower = searchQuery.toLowerCase();
    return (
      reservation.userName.toLowerCase().includes(searchLower) ||
      reservation.accommodationName.toLowerCase().includes(searchLower)
    ) && (
      selectedStatus ? reservation.status === selectedStatus : true
    );
  });

  const handleApprove = async (id) => {
    try {
      const reservationDoc = doc(db, 'reservations', id);
      await updateDoc(reservationDoc, { status: 'approved' });
      setReservations(reservations.map(res => res.id === id ? { ...res, status: 'approved' } : res));
    } catch (error) {
      console.error("Error updating reservation to approved: ", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const reservationDoc = doc(db, 'reservations', id);
      await updateDoc(reservationDoc, { status: 'rejected' });
      setReservations(reservations.map(res => res.id === id ? { ...res, status: 'rejected' } : res));
    } catch (error) {
      console.error("Error updating reservation to rejected: ", error);
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
            <p>User: {res.userName}</p>
            <p>Check-in: {res.checkInDate}</p>
            <p>Check-out: {res.checkOutDate}</p>
            <p>Guests: {res.numberOfGuests}</p>
            <p>Status: {res.status}</p>
            <button className='approve-btn' onClick={() => handleApprove(res.id)}>Approve</button>
            <button className='reject-btn' onClick={() => handleReject(res.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReservations;