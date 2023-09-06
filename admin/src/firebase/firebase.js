import firebase from 'firebase/app';
import { firestore } from "..firebase";
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyB_uiVXai4Itvw_pTM8N1opXJOF67CttBY",
    authDomain: "carecabs-fb.firebaseapp.com",
    databaseURL: "https://carecabs-fb-default-rtdb.firebaseio.com",
    projectId: "carecabs-fb",
    storageBucket: "carecabs-fb.appspot.com",
    messagingSenderId: "492568206424",
    appId: "1:492568206424:web:086dd3109ddd8687087e2d"
  };

  firebase.initializeApp(firebaseConfig);
  export const database = firebase.database();
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
 
  export default firebase;
