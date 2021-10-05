import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyDyl7TIPxVhfeZVGWjLAC_Y6QjqP86Hkzo",
  authDomain: "mobile-292605.firebaseapp.com",
  databaseURL: "https://mobile-292605.firebaseio.com",
  projectId: "mobile-292605",
  storageBucket: "mobile-292605.appspot.com",
  messagingSenderId: "436064921337",
  appId: "1:436064921337:web:a0777255edfcfb6d676428",
  measurementId: "G-LF6N8JZL14"
};

firebase.initializeApp(firebaseConfig);

// if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined){
//     firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
//     firebase.auth().useEmulator('http://localhost:9099/');
// }

// export const providers = {
//   googleProvider : new firebase.auth.GoogleAuthProvider(),
//   facebookProvider : new firebase.auth.FacebookAuthProvider(),
//   twitterProvider : new firebase.auth.TwitterAuthProvider(),
//   githubProvider : new firebase.auth.GithubAuthProvider()
// };

// export const auth = firebase.auth()
// export const firestore = firebase.firestore()
// export const messaging = firebase.messaging()
// export default firebase;
