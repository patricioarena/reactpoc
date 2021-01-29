import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../Contexts/AuthContext";
import { UserRole } from '../Repository/UserRole';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser, userProfile } = useAuth()
    if (userProfile == undefined) {
        console.log(userProfile);
        return (
            <Route
                {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to='/login' />
                }}
            ></Route>
        )
    } else {
        return (
            <Route
                {...rest}
                render={props => {
                    // console.log('client router ', JSON.stringify(currentUser))
                    // console.log('client router userProfile', JSON.stringify(userProfile))
                    return userProfile.role === UserRole.Client ? <Component {...props} /> : <Redirect to='/login' />
                }}
            ></Route>
        )
    }
}