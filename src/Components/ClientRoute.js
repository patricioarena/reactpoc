import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../Contexts/AuthContext";

export default function ClientRoute({ component: Component, ...rest }) {
    const { currentUser, userProfile } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                // console.log('client router ', JSON.stringify(currentUser))
                // console.log('client router userProfile', JSON.stringify(userProfile))
                return userProfile.role === 1 ? <Component {...props} /> : <Redirect to='/login' />
            }}
        ></Route>
    )
}
