import React from 'react'
import { Jumbotron, Container } from "react-bootstrap"
import { useAuth } from "../Contexts/AuthContext"
import '../App.css';

function ClientHome() {
    const { currentUser, userProfile } = useAuth()

    return (
        <>
            <Jumbotron fluid>
                <Container>
                    <h1>Client Home.</h1>
                    <p>
                        This is a modified jumbotron that occupies the entire horizontal space of
                        its parent.
                </p>
                </Container>
            </Jumbotron>
            <div>
                <p>
                    {userProfile && JSON.stringify(userProfile)}
                    {currentUser && JSON.stringify(currentUser.email)}
                </p>
            </div>
        </>
    )
}
export default ClientHome