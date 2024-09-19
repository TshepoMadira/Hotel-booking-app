import { configureStore } from '@reduxjs/toolkit';
import accommodationsReducer from './accommodationsSlice';
import reservationsReducer from './reservationsSlice';
import navigationReducer from '../features/navigationSlice';


export const store = configureStore({
  reducer: {
    accommodations: accommodationsReducer,
    reservations: reservationsReducer,
    navigation: navigationReducer,
  },
});
