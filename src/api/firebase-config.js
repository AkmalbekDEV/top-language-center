// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA0aXIMZbf75Lx7g3UGmp5JJCISCPrmz4E',
  authDomain: 'toplc-f8140.firebaseapp.com',
  projectId: 'toplc-f8140',
  storageBucket: 'toplc-f8140.appspot.com',
  messagingSenderId: '413939336423',
  appId: '1:413939336423:web:d8ab7af4b501ae94718e42',
  measurementId: 'G-QP6145FDZ6',
};

// Initialize Firebase
const app = initializeApp (firebaseConfig);
const db = getFirestore (app);

export {db};
