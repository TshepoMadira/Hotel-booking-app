import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './accommodations.css';

const AccommodationsAdmin = () => {
  const [name, setName] = useState('');
  // const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [accommodations, setAccommodations] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'accommodations'));
      const fetchedAccommodations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccommodations(fetchedAccommodations);
    } catch (error) {
      console.error('Error fetching accommodations: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User not authenticated');
      return;
    }

    try {
      if (editId) {
        const accommodationRef = doc(db, 'accommodations', editId);
        await updateDoc(accommodationRef, {
          name,
         
          price,
          description,
        });
        alert('Accommodation updated successfully!');
      } else {
        await addDoc(collection(db, 'accommodations'), {
          name,
         
          price,
          description,
        });
        // alert('Accommodation added successfully!');
      }
      setName('');
      
      setPrice('');
      setDescription('');
      setEditId(null);
      fetchAccommodations();
    } catch (error) {
      console.error('Error adding/updating accommodation: ', error);
      alert('Failed to add/update accommodation.');
    }
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'accommodations', id));
      alert('Accommodation deleted successfully!');
      fetchAccommodations();
    } catch (error) {
      console.error('Error deleting accommodation: ', error);
      alert('Failed to delete accommodation.');
    }
  };

  return (
    <div className='Container'>
      <h2>{editId ? 'Edit Accommodation' : 'Add Accommodation'}</h2>
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
          ></textarea>
        </div>
        
        <button className='add-accommodation-btn' type="submit">
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
            <button className='edit-button'onClick={() => handleEdit(accommodation.id)}>Edit</button>
            <button className='delete-button'onClick={() => handleDelete(accommodation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationsAdmin;