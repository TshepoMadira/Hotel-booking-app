export const BOOK_ROOM = 'BOOK_ROOM';

export const bookRoom = (roomType) => ({
  type: BOOK_ROOM,
  payload: roomType,
});
