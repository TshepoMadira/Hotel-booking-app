

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchReservations,approveReservation,rejectReservation,} from '../Redux/reservationsSlice'; // Updated import path
import './AdminReservations.css';

const AdminReservations = () => {
  const dispatch = useDispatch();

 
  const reservations = useSelector((state) => state.reservations.list) || [];
  const fetchStatus = useSelector((state) => state.reservations.status);
  const error = useSelector((state) => state.reservations.error);
  const roomAvailability = useSelector(
    (state) => state.reservations.roomAvailability
  );


  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchReservations());
    }
  }, [fetchStatus, dispatch]);

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (!reservation) return false;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (reservation.id &&
        reservation.id.toLowerCase().includes(searchLower)) ||
      (reservation.accommodationName &&
        reservation.accommodationName.toLowerCase().includes(searchLower));

    const matchesStatus = selectedStatus
      ? reservation.status === selectedStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  
  const handleApprove = (id) => {
    const reservation = reservations.find((res) => res.id === id);
    if (reservation && reservation.roomType) {
      dispatch(
        approveReservation({ id: reservation.id, roomType: reservation.roomType })
      );
    }
  };

  const handleReject = (id) => {
    dispatch(rejectReservation(id));
  };

 
  let content;

  if (fetchStatus === 'loading') {
    content = <p>Loading reservations...</p>;
  } else if (fetchStatus === 'succeeded') {
    content = (
      <ul className="reservation-list">
        {filteredReservations.map((res) => (
          <li key={res.id} className="reservation-item">
            <h4>{res.accommodationName}</h4>
            <p><strong>Full Name:</strong> {res.fullName}</p>
            <p><strong>Check-in:</strong> {new Date(res.checkinDate).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(res.checkoutDate).toLocaleDateString()}</p>
            <p><strong>Room Type:</strong> {res.roomType}</p>
            <p><strong>Status:</strong> {res.status}</p>
            <p><strong>Email:</strong> {res.email}</p>
            <p>
              <strong>Room Availability:</strong>{' '}
              {roomAvailability[res.roomType] === 'not available'
                ? 'Not Available'
                : 'Available'}
            </p>
            <div className="action-buttons">
              {res.status === 'pending' && (
                <>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(res.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(res.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  } else if (fetchStatus === 'failed') {
    content = <p>Error: {error}</p>;
  }

  return (
    <div className="admin-reservations">
      <h1>Admin Reservations</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by reservation ID or accommodation name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {content}
    </div>
  );
};

export default AdminReservations;
