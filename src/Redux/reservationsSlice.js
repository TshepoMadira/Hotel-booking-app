import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../components/Firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Async actions using Thunk
export const fetchReservations = createAsyncThunk('reservations/fetch', async () => {
  const querySnapshot = await getDocs(collection(db, 'reservations'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addReservation = createAsyncThunk('reservations/add', async (newReservation) => {
  await addDoc(collection(db, 'reservations'), newReservation);
  return newReservation;
});

export const updateReservation = createAsyncThunk('reservations/update', async ({ id, updatedData }) => {
  const reservationRef = doc(db, 'reservations', id);
  await updateDoc(reservationRef, updatedData);
  return { id, updatedData };
});

export const deleteReservation = createAsyncThunk('reservations/delete', async (id) => {
  await deleteDoc(doc(db, 'reservations', id));
  return id;
});

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload.updatedData };
        }
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item.id !== action.payload);
      });
  },
});

export default reservationsSlice.reducer;