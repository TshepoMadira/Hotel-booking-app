// uploadImage.js
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig'; // Make sure to adjust the path to your firebaseConfig file

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */
export const uploadImage = async (file) => {
  if (!file) return null;

  // Create a storage reference
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};


