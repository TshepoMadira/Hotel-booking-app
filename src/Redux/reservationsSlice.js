

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../components/Firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';



export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const bookingsCol = collection(db, 'bookings');
      const bookingSnapshot = await getDocs(bookingsCol);
      const bookingList = bookingSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        bookedAt: docSnap.data().bookedAt?.toDate().toISOString(),
      }));
      return bookingList;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const approveReservation = createAsyncThunk(
  'reservations/approveReservation',
  async ({ id, roomType }, { rejectWithValue }) => {
    try {
      const reservationRef = doc(db, 'bookings', id);
      await updateDoc(reservationRef, { status: 'approved' });
      return { id, roomType };
    } catch (error) {
      console.error('Error approving reservation:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const rejectReservation = createAsyncThunk(
  'reservations/rejectReservation',
  async (id, { rejectWithValue }) => {
    try {
      const reservationRef = doc(db, 'bookings', id);
      await updateDoc(reservationRef, { status: 'rejected' });
      return id;
    } catch (error) {
      console.error('Error rejecting reservation:', error);
      return rejectWithValue(error.message);
    }
  }
);



const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    roomAvailability: {},
    status: 'idle',
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    
    builder
      .addCase(approveReservation.fulfilled, (state, action) => {
        const { id, roomType } = action.payload;
        const existingReservation = state.list.find((res) => res.id === id);
        if (existingReservation) {
          existingReservation.status = 'approved';
        }
        state.roomAvailability[roomType] = 'not available';
      })
      .addCase(approveReservation.rejected, (state, action) => {
        state.error = action.payload;
      });

    
    builder
      .addCase(rejectReservation.fulfilled, (state, action) => {
        const id = action.payload;
        const existingReservation = state.list.find((res) => res.id === id);
        if (existingReservation) {
          existingReservation.status = 'rejected';
        }
      })
      .addCase(rejectReservation.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export default reservationsSlice.reducer;


