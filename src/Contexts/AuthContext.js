import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userProfile, setUserProfile] = useState()

    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(function (cred) {
                console.log("user created with credential", JSON.stringify(cred));
                firestore.collection('users').doc(cred.user.uid).set({
                    role: 1
                })
                    .then((dbDocument)=> {
                        console.log("Document user writen with id", dbDocument.uid);
                        return true;
                    })
                    .catch((error)=>{
                        console.log("Error adding document: ", error);
                        return false;
                    })
                return true;
            })
            .catch(function (error) {
                return false;
            });
    }

    function sendEmailVerification() {
        return auth.currentUser.sendEmailVerification()
            .then(function () {
                // Email sent && signout currentUser
                return auth.signOut()
                    .then(function () {
                        // Sign-out successful.
                        return true;
                    })
            })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .then(function () {
                if (currentUser.emailVerified) {
                    return true;
                }
                auth.signOut().then(function () {
                    // Sign-out successful.
                    return false;
                })
            })
            .catch(function (error) {
                return false;
            });
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
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


    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            // levanta el perfil del firestore
            if (user) {
                var docRef = firestore.collection('users').doc(user.uid);
                docRef.get()
                    .then(function(doc) {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            setUserProfile(doc.data());
                            setLoading(false)
                        } else {
                            console.log("No user in user collection");
                        }
                    }).catch(function(error) {
                        console.log("Error getting document in user collection:", error);
                    });
            }
        });
        return unsubcribe;
    }, [])

    const value = {
        currentUser,
        userProfile,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        sendEmailVerification
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
