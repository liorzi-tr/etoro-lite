import { initializeApp, getApps } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDZ3NsiZCBXBN7PO3HwTjzUz1li_xNwvL0",
  authDomain: "etoro-lite.firebaseapp.com",
  projectId: "etoro-lite",
  storageBucket: "etoro-lite.firebasestorage.app",
  messagingSenderId: "1067056427289",
  appId: "1:1067056427289:web:98b82b4f40e1051e6c1588"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, app };
