import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../components/Firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const fetchAccommodations = createAsyncThunk('accommodations/fetch', async () => {
  const querySnapshot = await getDocs(collection(db, 'accommodations'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});


export const addAccommodation = createAsyncThunk(
  'accommodations/add',
  async (newAccommodation, { rejectWithValue }) => {
    const storage = getStorage();
    const { name, price, description, image } = newAccommodation;
    
    let imageUrl = '';
    
   
    if (image) {
      const storageRef = ref(storage, `accommodations/${Date.now()}_${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        return rejectWithValue('Image upload failed');
      }
    }
    
   
    const accommodationData = {
      name,
      price,
      description,
      imageUrl, 
    };
    
    try {
      const docRef = await addDoc(collection(db, 'accommodations'), accommodationData);
      return { id: docRef.id, ...accommodationData };
    } catch (error) {
      return rejectWithValue('Failed to add accommodation');
    }
  }
);


export const updateAccommodation = createAsyncThunk(
  'accommodations/update',
  async ({ id, updatedData }, { rejectWithValue }) => {
    const storage = getStorage();
    const { name, price, description, image } = updatedData;
    
    let imageUrl = '';
    
   
    if (image) {
      const storageRef = ref(storage, `accommodations/${Date.now()}_${image.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (error) {
        return rejectWithValue('Image upload failed');
      }
    }
   
    const accommodationUpdates = {
      name,
      price,
      description,
    };
    
    if (imageUrl) {
      accommodationUpdates.imageUrl = imageUrl;
    }
    
    try {
      const accommodationRef = doc(db, 'accommodations', id);
      await updateDoc(accommodationRef, accommodationUpdates);
      return { id, updatedData: accommodationUpdates };
    } catch (error) {
      return rejectWithValue('Failed to update accommodation');
    }
  }
);


export const deleteAccommodation = createAsyncThunk('accommodations/delete', async (id) => {
  await deleteDoc(doc(db, 'accommodations', id));
  return id;
});

const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      
      .addCase(addAccommodation.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addAccommodation.rejected, (state, action) => {
        state.error = action.payload;
      })
      
     
      .addCase(updateAccommodation.fulfilled, (state, action) => {
        const index = state.list.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload.updatedData };
        }
      })
      .addCase(updateAccommodation.rejected, (state, action) => {
        state.error = action.payload;
      })
      
    
      .addCase(deleteAccommodation.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item.id !== action.payload);
      })
      .addCase(deleteAccommodation.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default accommodationsSlice.reducer;
