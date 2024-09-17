import React, { useState, useEffect } from 'react';
import { db } from './Firebase'; // Ensure the correct path to your Firebase config
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!queryParam) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'rooms'), // Adjust collection name as needed
          where('name', '>=', queryParam), // Example filter; adjust to your needs
          where('name', '<=', queryParam + '\uf8ff') // For partial matches
        );
        const querySnapshot = await getDocs(q);
        const fetchedResults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [queryParam]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for "{queryParam}"</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <h2>{result.name}</h2>
              <p>{result.location}</p>
              <p>Price: ${result.price}</p>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
