import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { fetchAccommodations, addAccommodation, updateAccommodation, deleteAccommodation } from '../Redux/accommodationsSlice';
import '../Styles/accommodations.css';

const AccommodationsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accommodations = useSelector((state) => state.accommodations.list); 

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchAccommodations()); 
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccommodation = { name, price, description };

    if (editId) {
      dispatch(updateAccommodation({ id: editId, updatedData: newAccommodation }));
    } else {
      dispatch(addAccommodation(newAccommodation));
    }

    setName('');
    setPrice('');
    setDescription('');
    setEditId(null);
  };

  const handleEdit = (id) => {
    const accommodation = accommodations.find(accom => accom.id === id);
    if (accommodation) {
      setName(accommodation.name);
      setPrice(accommodation.price);
      setDescription(accommodation.description);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteAccommodation(id));
  };

  const handleNavigateToReservations = () => {
    navigate('/reservations'); 
  };

  return (
    <div className='Container'>
      <button 
        className='navigate-button' 
        onClick={handleNavigateToReservations}
        title='Go to Reservations'
      >
        ➔
      </button>
      <h2>{editId ? 'Edit Accommodation' : 'Add Accommodation'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='Namee'
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className='price-number'
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='Description'
          ></textarea>
        </div>
        <button className='add-accommodation-btnn' type="submit">
          {editId ? 'Update Accommodation' : 'Add Accommodation'}
        </button>
      </form>
      <h3>Accommodation List</h3>
      <ul>
        {accommodations.map(accommodation => (
          <li key={accommodation.id}>
            <h4>{accommodation.name}</h4>
            <p>R{accommodation.price}</p>
            <p>{accommodation.description}</p>
            <button className='edit-btnn' onClick={() => handleEdit(accommodation.id)}>Edit</button>
            <button className='delete-btnn' onClick={() => handleDelete(accommodation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationsAdmin;
