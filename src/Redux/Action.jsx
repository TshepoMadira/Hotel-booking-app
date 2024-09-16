import { SET_BOOKING_DETAILS } from './actionsTypes';
import { firestore } from '../firebase';


export const SET_BOOKING_DETAILS = 'SET_BOOKING_DETAILS';


export const setBookingDetails = (details) => ({
    type: SET_BOOKING_DETAILS,
    payload: details
});


export const bookAccommodation = (formData) => async (dispatch) => {
    try {
        const { check_in, check_out, room_type, num_rooms } = formData;
        const costPerRoom = room_type === 'single' ? 100 : 150;
        const stayDuration = Math.max(1, (new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
        const totalCost = stayDuration * costPerRoom * num_rooms;

     
        await firestore.collection('bookings').add({
            ...formData,
            totalCost,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        dispatch(setBookingDetails({ ...formData, totalCost }));
    } catch (error) {
        console.error('Error booking:', error);
    }
};
