import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCjV0p22yoT-_CfbBl2xY5JG2D5Sd3s20c",
    authDomain: "react-spas-fb0da.firebaseapp.com",
    databaseURL: "https://react-spas-fb0da.firebaseio.com",
    projectId: "react-spas-fb0da",
    storageBucket: "react-spas-fb0da.appspot.com",
    messagingSenderId: "999579816409",
    appId: "1:999579816409:web:8f2d9b593f4d54fb7649c8",
    measurementId: "G-KR5ENDBXS3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;