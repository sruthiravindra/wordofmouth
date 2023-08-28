import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const getImageSRC = async (storageURL) => {
    const storageRef = ref(storage, storageURL);
    if (storageRef) {
        try {
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error('Error retreiving downloadURL:', error);
        }
    }
    return '';
}