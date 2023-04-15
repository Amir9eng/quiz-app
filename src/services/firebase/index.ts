// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

import {
  firebaseApiKey,
  firebaseAppId,
  firebaseAuthDomain,
  firebaseMeasurementId,
  firebaseMessageId,
  firebaseProjectId,
  firebaseStorageBucket,
} from '../../utils/config';

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessageId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const collectionRef = collection(db, 'quizzes');
const auth = getAuth();

export const loginAnonymously = async () => {
  try {
    const user = await signInAnonymously(auth);
    return user;
  } catch (error) {
    console.log({ error });
  }
};
