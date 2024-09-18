
import { db } from './Firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';


export const getUserProfile = async (userId) => {
    if (!userId) throw new Error('No user ID provided');
    const userDoc = doc(db, 'users', userId);
    const docSnap = await getDoc(userDoc);
    return docSnap.exists() ? docSnap.data() : null;
};


export const updateUserProfile = async (userId, profileData) => {
    if (!userId) throw new Error('No user ID provided');
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, profileData, { merge: true });
};


export const getUserBookings = async (userId) => {
    if (!userId) throw new Error('No user ID provided');
    const bookingsRef = collection(db, 'bookings');
    const q = query(bookingsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};


export const getUserFavorites = async (userId) => {
    if (!userId) throw new Error('No user ID provided');
    const favoritesRef = collection(db, 'favorites');
    const q = query(favoritesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};
