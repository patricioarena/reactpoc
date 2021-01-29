import React from 'react'
import HelloWorld from '../Components/HelloWorldHook'
import { useAuth } from "../Contexts/AuthContext"
function Home() {
    const { currentUser, userProfile } = useAuth()
    
    return(
        <div>
            <h1>All Profile Home Page</h1>
            <p>
            { userProfile && JSON.stringify(userProfile)}
            { currentUser && JSON.stringify(currentUser.email)}
            </p>
        </div>
    )
}
export default Home