
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, 
  menuItems: ['Sign-Up', 'Stays', 'Offers', 'About Us'],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleLogin: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    updateMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { toggleLogin, updateMenuItems } = navigationSlice.actions;

export default navigationSlice.reducer;
