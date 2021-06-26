import React from 'react'
import { Button } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'

import { useAuth, SignInMethod } from "../Contexts/AuthContext"
import Logger from '../Logger/Logger';

export default function LoginControl() {
    const { userProfile, signOutFirebase, signInMethod } = useAuth()
    const history = useHistory()

    const resetAllx = () => {
        signOutFirebase().then((value) => {
            if (value == true) {
                if (signInMethod == SignInMethod.Google) {
                    window.gapi.auth2.getAuthInstance().signOut()
                        .then(() => {
                            history.push("/newcomershome")
                        });
                }
                history.push("/newcomershome")
            }
        });
    }

    // Logger(userProfile)
    if (userProfile == undefined) {
        return (
            <Link to="/login">
                <Button className="w-100">Log In</Button>
            </Link>
        )
    } else {
            return (
                <Button className="w-100" onClick={resetAllx}>Log Out</Button>
            )
        }



}


