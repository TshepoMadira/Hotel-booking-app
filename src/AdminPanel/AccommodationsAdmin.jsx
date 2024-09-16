import React, { useState } from 'react';
import { db } from '../components/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './accommodations.css';

const AccommodationsAdmin = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User not authenticated');
      return;
    }

    try {
      await addDoc(collection(db, 'accommodations'), {
        name,
        location,
        price,
        description,
      });
      alert('Accommodation added successfully!');
      setName('');
      setLocation('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error adding accommodation: ', error);
      alert('Failed to add accommodation.');
    }
  };

  return (
    <div>
      <h2>Add Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Accommodation</button>
      </form>
    </div>
  );
};

export default AccommodationsAdmin;
