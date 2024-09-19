import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/Firebase';


export const FETCH_RESERVATIONS = 'FETCH_RESERVATIONS';
export const APPROVE_RESERVATION = 'APPROVE_RESERVATION';
export const REJECT_RESERVATION = 'REJECT_RESERVATION';


export const fetchReservations = () => async (dispatch) => {
  try {
    const bookingsCol = collection(db, 'bookings');
    const bookingSnapshot = await getDocs(bookingsCol);
    const bookingList = bookingSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        bookedAt: data.bookedAt?.toDate().toISOString(), 
      };
    });

    dispatch({ type: FETCH_RESERVATIONS, payload: bookingList });
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};


export const approveReservation = (id, roomType) => async (dispatch) => {
  try {
    const reservationDoc = doc(db, 'bookings', id);
    await updateDoc(reservationDoc, { status: 'approved' });

    dispatch({ type: APPROVE_RESERVATION, payload: { id, roomType } });
  } catch (error) {
    console.error('Error updating booking to approved:', error);
  }
};

export const rejectReservation = (id) => async (dispatch) => {
  try {
    const reservationDoc = doc(db, 'bookings', id);
    await updateDoc(reservationDoc, { status: 'rejected' });

    dispatch({ type: REJECT_RESERVATION, payload: id });
  } catch (error) {
    console.error('Error updating booking to rejected:', error);
  }
};
