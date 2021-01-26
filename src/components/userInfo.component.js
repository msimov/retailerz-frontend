import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import UserService from '../services/user.service';
import { FirebaseContext } from "../context/firebase.context";

const UserInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            UserService.findByUserId(userId, idToken).then(res => {
                setUser(res);
            })
        })
    }, [currentUser, userId]);


    return user ? ( 
        <div>        
            {user.userId}
            {user.userFirstName}
            {user.userLastName}
            {user.userEmail}
            <Link to={`${url}/edit`}>Edit Profile</Link>
            <Link to={`${url}/change-password`}>Change Password</Link>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {UserInfo};