import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV === 'development') {
  //window.location.hostname === "localhost"がSSRの影響で使えないので。。。
  console.log(
    "testing locally -- hitting local functions and firestore emulators"
  );

  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}

export const db = firebase.firestore();
export const fieldval = firebase.firestore.FieldValue;
export default firebase;
