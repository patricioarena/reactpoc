import React, { useRef, useState } from "react"
import { Container, Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../Contexts/AuthContext"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setSuccess("")
            setLoading(true)
            let response = await login(emailRef.current.value, passwordRef.current.value)
            if (response == true) {
                setSuccess(`Success login!`)
                history.push("/home")
            } else {
                setError("Failed to log in")
            }
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)

    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }} >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Log in</h2>
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
                                <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="d-flex align-items-center justify-content-center">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                        <Link to="/forgot">Forgot password?</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}
