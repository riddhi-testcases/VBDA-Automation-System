import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { getAnalytics } from '@firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCrKpz2Va5RNjUxVn1QU_4Vmp9P9Mz0y10",
  authDomain: "vbda-2025-ai-invitation-system.firebaseapp.com",
  projectId: "vbda-2025-ai-invitation-system",
  storageBucket: "vbda-2025-ai-invitation-system.firebasestorage.app",
  messagingSenderId: "75650726694",
  appId: "1:75650726694:web:7e2517e6c28d2cb6441fe7",
  measurementId: "G-ZPCY4MBS58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;