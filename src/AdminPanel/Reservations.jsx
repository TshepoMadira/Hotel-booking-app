import React, { useState, useEffect } from 'react';
// import { db } from '../firebase'; 
import './AdminReservations.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      const snapshot = await db.collection('reservations').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(data);
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
    return (
      reservation.userName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus ? reservation.status === selectedStatus : true)
    );
  });

  const handleApprove = async (id) => {
    await db.collection('reservations').doc(id).update({ status: 'approved' });
    setReservations(reservations.map(res => res.id === id ? { ...res, status: 'approved' } : res));
  };

  const handleReject = async (id) => {
    await db.collection('reservations').doc(id).update({ status: 'rejected' });
    setReservations(reservations.map(res => res.id === id ? { ...res, status: 'rejected' } : res));
  };

  return (
    <div className="admin-reservations">
      <h1>Admin Reservations</h1>
      <input
        type="text"
        placeholder="Search by user name"
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
            <button onClick={() => handleApprove(res.id)}>Approve</button>
            <button onClick={() => handleReject(res.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReservations;
