import React, { useState, useEffect } from 'react';
import { db } from '../components/Firebase';
import { storagel } from '../components/Firebase';

import './Accommodations.css';

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); 

  useEffect(() => {
    const fetchAccommodations = async () => {
      const snapshot = await db.collection('accommodations').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAccommodations(data);
    };

    fetchAccommodations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.imageUrl;

    if (selectedFile) {
     
      const storageRef = storage.ref(`accommodation_images/${selectedFile.name}`);
      await storageRef.put(selectedFile);
      imageUrl = await storageRef.getDownloadURL(); 
    }

    if (editing) {
      await db.collection('accommodations').doc(form.id).update({
        name: form.name,
        price: form.price,
        description: form.description,
        imageUrl: imageUrl,
      });
      setEditing(false);
    } else {
      await db.collection('accommodations').add({
        name: form.name,
        price: form.price,
        description: form.description,
        imageUrl: imageUrl,
      });
    }

    setForm({ id: '', name: '', price: '', description: '', imageUrl: '' });
    setSelectedFile(null);

    
    const snapshot = await db.collection('accommodations').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAccommodations(data);
  };    

  const handleDelete = async (id) => {
    await db.collection('accommodations').doc(id).delete();
    setAccommodations(accommodations.filter(acc => acc.id !== id));
  };

  const handleEdit = (acc) => {
    setForm(acc);
    setEditing(true);
  };

  return (
    <div className="accommodations">
      <h1>Accommodations</h1>
      <form className="accommodation-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">{editing ? 'Update Accommodation' : 'Add Accommodation'}</button>
      </form>
      <ul className="accommodation-list">
        {accommodations.map(acc => (
          <li key={acc.id}>
            <h4>{acc.name}</h4>
            <p>Price: ${acc.price}</p>
            <p>{acc.description}</p>
            {acc.imageUrl && <img src={acc.imageUrl} alt={acc.name} style={{ width: '200px', height: 'auto' }} />}
            <button onClick={() => handleEdit(acc)}>Edit</button>
            <button onClick={() => handleDelete(acc.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accommodations;
