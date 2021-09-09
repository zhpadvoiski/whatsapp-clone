//Connect database
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDyamkO-hFkMAi2ZWAcFReDZi-0DlhMc18",
    authDomain: "whatsapp-clone-34161.firebaseapp.com",
    projectId: "whatsapp-clone-34161",
    storageBucket: "whatsapp-clone-34161.appspot.com",
    messagingSenderId: "469958437826",
    appId: "1:469958437826:web:8162472b7617f8abf5045b",
    measurementId: "G-2Q9HZHDBT3"
};

//real time database
const firebaseApp = firebase.initializeApp(firebaseConfig); //initialize app and store that data in this variable
const db = firebaseApp.firestore(); //it will access the firebase instance 
const auth = firebase.auth(); //autontification
const provider = new firebase.auth.GoogleAuthProvider(); //autontification for google

export { auth, provider };
export default db; //will use quite more