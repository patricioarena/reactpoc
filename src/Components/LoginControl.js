import React from 'react'
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { Redirect, Route, Link } from 'react-router-dom'

import { useAuth } from "../Contexts/AuthContext"
import Login from './Login'

export default function LoginControl() {
    // const { logout, currentUser } = useAuth()
    const { currentUser, userProfile } = useAuth()

    if (userProfile == undefined) {
        console.log(userProfile);
        return (
            <Link to="/login">
                <Button className="w-100">Log In</Button>
            </Link>
        )
    } else {
        return (
            <Button className="w-100" onClick={console.log('logout')}>Log Out</Button>
        )
    }

}


