// import { firestore } from './Firebase';

// export async function getUserProfile() {
//     const userId = 'currentUserId'; 
//     const userProfileDoc = await firestore.collection('users').doc(userId).get();
//     return userProfileDoc.data();
// }

// export async function updateUserProfile(profileData) {
//     const userId = 'currentUserId'; 
//     await firestore.collection('users').doc(userId).update(profileData);
// }

// export async function getUserBookings() {
//     const userId = 'currentUserId'; 
//     const bookingsSnapshot = await firestore.collection('bookings').where('userId', '==', userId).get();
//     return bookingsSnapshot.docs.map(doc => doc.data());
// }

// export async function getUserFavorites() {
//     const userId = 'currentUserId'; 
//     const favoritesSnapshot = await firestore.collection('favorites').where('userId', '==', userId).get();
//     return favoritesSnapshot.docs.map(doc => doc.data());
// }

// export async function removeFavorite(id) {
//     const userId = 'currentUserId';
//     await firestore.collection('favorites').doc(id).delete();
// }
