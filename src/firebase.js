import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/messaging"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

// if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined){
//     firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
//     firebase.auth().useEmulator('http://localhost:9099/');
// }

export const providers = {
  googleProvider : new firebase.auth.GoogleAuthProvider(),
  facebookProvider : new firebase.auth.FacebookAuthProvider(),
  twitterProvider : new firebase.auth.TwitterAuthProvider(),
  githubProvider : new firebase.auth.GithubAuthProvider()
};

// export const auth = firebase.auth()
// export const firestore = firebase.firestore()
// export const messaging = firebase.messaging()
// export default firebase;
