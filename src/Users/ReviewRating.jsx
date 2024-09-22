
import React, { useState } from 'react';
import { db } from '../components/Firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import '../Styles/Reviewrating.css'; 

const ReviewRating = ({ bookingDetails, onReviewSubmitted }) => {
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!review) {
            setError('Review cannot be empty.');
            return;
        }

        try {
            await addDoc(collection(db, 'reviews'), {
                bookingId: bookingDetails.id,
                roomType: bookingDetails.roomType,
                rating,
                review,
                submittedAt: new Date()
            });
            setSuccess('Review submitted successfully!');
            setRating(1);
            setReview('');
            onReviewSubmitted(); 
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('Failed to submit review. Please try again.');
        }
    };

    return (
        <div className="review-rating-container">
            <h3>Leave a Review</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Review:
                    <textarea value={review} onChange={(e) => setReview(e.target.value)} required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <button className='submit-review'type="submit-review">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewRating;
