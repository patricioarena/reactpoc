import React from 'react'
import { Container, Form, Button, Card, Alert } from "react-bootstrap"

import { useAuth } from "../Contexts/AuthContext"

export default function LoginControl() {
    const { logout, currentUser } = useAuth()

        return (
            <div>
                {currentUser != undefined
                    ? <Button className="w-100"  onClick={logout}>Log Out</Button>
                    : <Button className="w-100"  href="/login">Log In</Button>
                }
            </div>
        );

}


