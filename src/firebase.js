//Connect database
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyADWgmS7JCH3RLuECV2W-KLMwq8cfPw8bk",
  authDomain: "whatsapp-clone-1e1a5.firebaseapp.com",
  projectId: "whatsapp-clone-1e1a5",
  storageBucket: "whatsapp-clone-1e1a5.appspot.com",
  messagingSenderId: "271091523110",
  appId: "1:271091523110:web:640d821f7fcab5503010e7",
  measurementId: "G-FVNN3W7WCF",
};

//real time database
const firebaseApp = firebase.initializeApp(firebaseConfig); //initialize app and store that data in this variable
const db = firebaseApp.firestore(); //it will access the firebase instance
const auth = firebase.auth(); //autontification
const provider = new firebase.auth.GoogleAuthProvider(); //autontification for google

export { auth, provider };
export default db; //will use quite more
