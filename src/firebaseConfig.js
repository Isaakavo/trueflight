import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRzmS1Mqy_mpArS6NUxgg4Iv0Tene74-Y",
  authDomain: "trueflight-90e12.firebaseapp.com",
  projectId: "trueflight-90e12",
  storageBucket: "trueflight-90e12.appspot.com",
  messagingSenderId: "828539233689",
  appId: "1:828539233689:web:1ea5a623bcfc2acfa3df08"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
// Initialize firestore
export const firestore = fb.firestore();

export default firebaseConfig;
