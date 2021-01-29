import React from 'react'
import HelloWorld from '../Components/HelloWorldHook'
import { useAuth } from "../Contexts/AuthContext"
function ClientHome() {
    const { currentUser, userProfile } = useAuth()

    return(
        <div>
            <h1>Client Home</h1>
            <HelloWorld name="Joaquin"/>
            <p>
            { userProfile && JSON.stringify(userProfile)}
            { currentUser && JSON.stringify(currentUser.email)}
            </p>
        </div>
    )
}
export default ClientHome