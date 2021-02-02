import React from 'react'
import HelloWorld from '../Components/HelloWorldHook'
import { Jumbotron, Container, Card } from "react-bootstrap"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAuth } from "../Contexts/AuthContext"
import logo from '../logo.svg';
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
                <HelloWorld name="Joaquin" />
                <p>
                    {userProfile && JSON.stringify(userProfile)}
                    {currentUser && JSON.stringify(currentUser.email)}
                </p>
            </div>
        </>
    )
}
export default ClientHome