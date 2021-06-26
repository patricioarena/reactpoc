import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../Contexts/AuthContext";
import { UserRole } from '../Repository/UserRole';
import Logger from '../Logger/Logger';

export default function ClientRoute({ component: Component, ...rest }) {

    const { currentUser, userProfile } = useAuth()

    // Logger(JSON.stringify(userProfile));

    if (userProfile == undefined) {


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
                    // Logger('client router ', JSON.stringify(currentUser))
                    // Logger('client router userProfile', JSON.stringify(userProfile))
                    return userProfile.userRole == UserRole.Client ? <Component {...props} /> : <Redirect to='/login' />
                }}
            ></Route>
        )
    }
}
