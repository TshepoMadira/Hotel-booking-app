import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, approveReservation, rejectReservation } from '../Redux/reservationActions';
import './AdminReservations.css';

const AdminReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.list) || [];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [roomAvailability, setRoomAvailability] = React.useState({});

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredReservations = reservations.filter(reservation => {
    if (!reservation) return false; // Skip undefined reservations
  
    const searchLower = searchQuery.toLowerCase();
    return (
      (reservation.id && reservation.id.toLowerCase().includes(searchLower)) || 
      (reservation.accommodationName && reservation.accommodationName.toLowerCase().includes(searchLower))
    ) && (
      selectedStatus ? reservation.status === selectedStatus : true
    );
  });

  const handleApprove = (id) => {
    const roomType = reservations.find(res => res.id === id)?.roomType;
    if (roomType) {
      dispatch(approveReservation(id, roomType));
    }
  };

  const handleReject = (id) => {
    dispatch(rejectReservation(id));
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
            <p>Check-in: {res.checkinDate}</p>
            <p>Check-out: {res.checkoutDate}</p>
            <p>RoomType: {res.roomType}</p>
            <p>Status: {res.status}</p>
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
