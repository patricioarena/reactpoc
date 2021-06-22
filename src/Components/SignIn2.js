import React, { Component, useContext, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

const SignIn2 = () => {

    const { loginGoogle } = useAuth()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(googleUser) {

        try {
            setError("")
            setSuccess("")
            setLoading(true)
            let response = await loginGoogle(googleUser)
            if (response == true) {
                setSuccess(`Success login!`)
                history.push("/newcomershome")
            } else {
                setError("Failed to log in")
            }
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)

    }

    useEffect( () => {

        const clientId = '436064921337-pdu1pag3mte2vqhkpchimks3np46vp94.apps.googleusercontent.com';

        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
            client_id: clientId
        }).then(() => {
            window.gapi.signin2.render('my-signIn', {
              'scope': 'profile email',
              'width': 240,
              'height': 40,
              'longtitle': false,
              'theme': 'dark',
              'onsuccess': handleSubmit,
              'onfailure': console.log('this.onFailure')
            })
          })
        })
    },[])

    // const signOut = () => {
    //     window.gapi.auth2.getAuthInstance().signOut();
    //    }

    return <div id="my-signIn"/>


}

export default SignIn2