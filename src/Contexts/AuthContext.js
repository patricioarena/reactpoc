import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(function () {
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
            setLoading(false)
        });
        return unsubcribe;
    }, [])

    const value = {
        currentUser,
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
