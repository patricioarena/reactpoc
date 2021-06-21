import React, { useContext, useState, useEffect } from 'react'
import firebase from "firebase/app";
import { providers } from "../firebase"
import { UserRole } from "../Repository/UserRole";
import { UserCredentials } from "../Repository/UserCredentials";

const AuthContext = React.createContext()
const db = firebase.firestore();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState()

    function signup(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                // console.log("user created with credential", JSON.stringify(result));
                // var credential = result.credential;
                // var token = credential.accessToken;
                var user = result.user;
                window.localStorage.setItem('email', user.email);
                return new UserCredentials(user.uid, user.email, UserRole.Client);
            }).then((res) => {
                return insertIncollection('users', res).then((value) => { return value; });
            })
            .catch(function (error) {
                return false;
            });
    }

    function signupGoogle() {


        // Start a sign in process for an unauthenticated user.
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        // firebase.auth().signInWithRedirect(provider);


        return firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                // console.log("user created with google", JSON.stringify(result));
                // var credential = result.credential;
                // var token = credential.accessToken;
                console.log(result);
                var user = result.user;
                window.localStorage.setItem('email', user.email);
                return new UserCredentials(user.uid, user.email, UserRole.Client);
            }).then((data) => {
                return insertIncollection('users', data).then((value) => { return value; });
            })
            .catch((error) => {
                return false;
            });

    }

    function sendEmailVerification() {
        return firebase.auth().currentUser.sendEmailVerification()
            .then(function () {
                // Email sent && signout currentUser
                window.localStorage.removeItem('email');
                return firebase.auth().signOut()
                    .then(function () {
                        // Sign-out successful.
                        return true;
                    })
            })
    }

    function login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                if (currentUser.emailVerified) {
                    return true;
                }
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                    return false;
                })
            })
            .catch(function (error) {
                return false;
            });
    }

    function logout() {
        setUserProfile(undefined)
        return firebase.auth().signOut()
    }

    function resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                return true;
            })
            .catch(function (error) {
                return false;
            });
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    async function insertIncollection(collectionName, data) {
        return new Promise(function (resolve, reject) {
            const obj = JSON.parse(JSON.stringify(data));

            db.collection(collectionName).doc(obj.uid).set(obj)
                .then(() => {
                    console.log("Document user writen with id", obj.uid);
                    resolve(true);
                })
                .catch((error) => {
                    console.log("Error adding document: ", error);
                    reject(false);
                })
        });
    }

    useEffect(() => {
        const unsubcribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            // levanta el perfil del firestore
            if (user) {
                var docRef = db.collection('users').doc(user.uid);
                docRef.get()
                    .then(function (doc) {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            setUserProfile(doc.data());
                            setLoading(false)
                        } else {
                            console.log("No user in user collection");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document in user collection:", error);
                    });
            }
        });
        return unsubcribe;
    }, [])

    const value = {
        currentUser,
        userProfile,
        insertIncollection,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        sendEmailVerification,
        signupGoogle
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
