import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../components/Firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// Async actions using Thunk
export const fetchAccommodations = createAsyncThunk('accommodations/fetch', async () => {
  const querySnapshot = await getDocs(collection(db, 'accommodations'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addAccommodation = createAsyncThunk('accommodations/add', async (newAccommodation) => {
  await addDoc(collection(db, 'accommodations'), newAccommodation);
  return newAccommodation;
});

export const updateAccommodation = createAsyncThunk('accommodations/update', async ({ id, updatedData }) => {
  const accommodationRef = doc(db, 'accommodations', id);
  await updateDoc(accommodationRef, updatedData);
  return { id, updatedData };
});

export const deleteAccommodation = createAsyncThunk('accommodations/delete', async (id) => {
  await deleteDoc(doc(db, 'accommodations', id));
  return id;
});

const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload.updatedData };
        }
      })
      .addCase(deleteAccommodation.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item.id !== action.payload);
      });
  },
});

export default accommodationsSlice.reducer;
