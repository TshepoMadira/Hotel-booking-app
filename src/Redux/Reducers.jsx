import { SET_BOOKING_DETAILS } from './actionsTypes';

const initialState = {
    bookingDetails: {}
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKING_DETAILS:
            return {
                ...state,
                bookingDetails: action.payload
            };
        default:
            return state;
    }
};

export default bookingReducer;
