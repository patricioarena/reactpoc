import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Contexts/AuthContext"
import { Link } from "react-router-dom"


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { sendEmailVerification, signup, signupGoogle, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        setError("")
        setSuccess("")
        setLoading(true)
        let response = await signup(emailRef.current.value, passwordRef.current.value)
        if (response == true) {
            let email = window.localStorage.getItem('email');
            setSuccess(`Success to create account!\nBefore we get started, please confirm your email address.\n${email}`)
            sendEmailVerification()
        } else {

            setError("Failed to create account!")
        }

        setLoading(false)
    }

    async function handleGoogle(e) {
        e.preventDefault()

        setError("")
        setSuccess("")
        setLoading(true)
        let response = await signupGoogle()
        if (response == true) {
            let email = window.localStorage.getItem('email');
            setSuccess(`Success to create account!\nBefore we get started, please confirm your email address.\n${email}`)
            // sendEmailVerification()
        } else {
            setError("Failed to create account!")
        }

        setLoading(false)
    }



    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Button className="w-100" onClick={handleGoogle} >Sign Up with Google</Button>
                    </Card>
                    <div className="d-flex align-items-center justify-content-center">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Link to="/forgot">Forgot password?</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}
