import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDnj8v3ejiSCrrr1J_DaDSLCAKmq3KxKhE',
  authDomain: 'family-backpack72.firebaseapp.com',
  databaseURL: 'https://family-backpack72.firebaseio.com',
  projectId: 'family-backpack72',
  storageBucket: 'family-backpack72.appspot.com',
  messagingSenderId: '74053969719',
  appId: '1:74053969719:web:1ad09a3ad1a73e85ab9cb2',
  measurementId: 'G-SMRE047VQ9'
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
