import { BOOK_ROOM } from './Action';

const initialState = {
  bookings: [],
  offers: [],
  stays: [],
  events: [],
};

const hotelReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_ROOM:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    default:
      return state;
  }
};

export default hotelReducer;
