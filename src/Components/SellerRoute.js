import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from "../Contexts/AuthContext";
import Logger from '../Logger/Logger';
import { UserRole } from '../Repository/UserRole';

export default function SellerRoute({ component: Component, ...rest }) {
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
                    return userProfile.userRole === UserRole.Seller ? <Component {...props} /> : <Redirect to='/login' />
                }}
            ></Route>
        )
    }
}
