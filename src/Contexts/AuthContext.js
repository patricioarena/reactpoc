import React, { useContext, useRef, useState, useEffect } from 'react'
import firebase from "firebase/app";
import { UserRole } from "../Repository/UserRole";
import { UserCredentials } from "../Repository/UserCredentials";
import "../firebase"

const AuthContext = React.createContext()
const db = firebase.firestore();

export function useAuth() {
    return useContext(AuthContext);
}

export const SignInMethod = {
    EmailAndPassword: 'EmailAndPassword',
    Phone: 'Phone',
    Google: 'Google',
    Facebook: 'Facebook',
    Twitter: 'Twitter',
    GitHub: 'GitHub',
    Yahoo: 'Yahoo',
    Microsoft: 'Microsoft',
    Apple: 'Apple',
    Anonymous: 'Anonymous'
};

export function AuthProvider({ children }) {
    const mountedRef = useRef(true);

    const [currentUser, setCurrentUser] = useState()
    const [userProfile, setUserProfile] = useState()
    const [loading, setLoading] = useState()
    const [signInMethod, setSignInMethod] = useState()

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

    function loginGoogle(googleUser) {
        var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
        return firebase.auth().signInWithCredential(credential)
            .then(function (result) {
                var user = result.user;
                db.collection('users').doc(user.uid)
                    .get()
                    .then(function (doc) {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data());
                            setUserProfile(doc.data());
                            setSignInMethod(SignInMethod.Google);
                            setLoading(true)
                            return true;
                        } else {
                            console.log("No user in user collection");
                            window.localStorage.setItem('email', user.email);
                            var newDoc = new UserCredentials(user.uid, user.email, UserRole.Client);
                            return insertIncollection('users', newDoc).then((value) => { return value; });
                        }
                    }).catch(function (error) {
                        console.error("Error getting document in user collection:", error);
                    });

                if (userProfile != undefined) {
                    return true;
                }
                return true;
            })
        return false;
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
            .then(function (result) {
                var user = result.user;
                if (user.emailVerified) {
                    setSignInMethod(SignInMethod.EmailAndPassword);
                    return true;
                }
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
    }

    function signOutFirebase() {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut().then(() => {
                resetAll()
                resolve(true);
            }).catch((error) => {
                console.error("Error: ", error);
                reject(false);
            })
        })
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
                    console.error("Error adding document: ", error);
                    reject(false);
                })
        });
    }

    function resetAll() {
        setCurrentUser(undefined)
        setUserProfile(undefined)
        setSignInMethod(undefined)
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            if (user == null)
                return;

            // levanta el perfil del firestore
            if (user.emailVerified) {
                setCurrentUser(user)
                var docRef = db.collection('users').doc(user.uid);
                docRef.get()
                    .then(function (doc) {
                        if (doc.exists) {
                            if (mountedRef.current) {
                                // console.log("Document data:", doc.data())
                                setUserProfile(doc.data());
                                setLoading(false)
                            };
                        } else {
                            // console.log("No user in user collection");
                        }
                    }).catch(function (error) {
                        console.error("Error getting document in user collection:", error);
                    });
            }
        });
        return () => {
            mountedRef.current = false;
            unsubscribe();
        }
    }, [])

    const value = {
        currentUser,
        userProfile,
        insertIncollection,
        login,
        signup,
        signOutFirebase,
        resetPassword,
        updateEmail,
        updatePassword,
        sendEmailVerification,
        loginGoogle,
        signInMethod,
        resetAll
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
