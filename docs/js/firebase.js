const firebaseConfig = {
    apiKey: "AIzaSyBflFx0wZMcpB6psuXbJsv8VAJJfo7Jw1s",
    authDomain: "osaka-univ-ojousama-club.firebaseapp.com",
    projectId: "osaka-univ-ojousama-club",
    storageBucket: "osaka-univ-ojousama-club.appspot.com",
    messagingSenderId: "596856472288",
    appId: "1:596856472288:web:3482cd84f84f2c044cc685",
    measurementId: "G-F9DWM1FRLR"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
var db = firebase.firestore(app);