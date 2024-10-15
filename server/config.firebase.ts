import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const configFirebase = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

const app = initializeApp(configFirebase);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };
