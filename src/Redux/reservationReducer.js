import {
    FETCH_RESERVATIONS,
    APPROVE_RESERVATION,
    REJECT_RESERVATION,
  } from '../actions/reservationActions';
  
  const initialState = {
    reservations: [],
    roomAvailability: {},
  };
  
  const reservationReducer = (state = initialState, action) => {
    console.log('Reducer received action:', action); 
  
    switch (action.type) {
      case FETCH_RESERVATIONS:
        return {
          ...state,
          reservations: action.payload,
        };
      case APPROVE_RESERVATION:
        return {
          ...state,
          reservations: state.reservations.map((res) =>
            res.id === action.payload.id ? { ...res, status: 'approved' } : res
          ),
          roomAvailability: {
            ...state.roomAvailability,
            [action.payload.roomType]: 'not available',
          },
        };
      case REJECT_RESERVATION:
        return {
          ...state,
          reservations: state.reservations.map((res) =>
            res.id === action.payload ? { ...res, status: 'rejected' } : res
          ),
        };
      default:
        return state;
    }
  };
  
  export default reservationReducer;
  