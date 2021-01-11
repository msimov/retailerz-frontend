import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../../commons/url.common';
import UserService from '../../services/user.service';
import { FirebaseContext } from '../Firebase';

const Info = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            UserService.findById(userId, idToken).then(res => {
                setUser(res);
            })
        })
    }, [currentUser, userId]);


    return user ? ( 
        <div>        
            {user.id}
            {user.firstName}
            {user.lastName}
            {user.email}
            <Link to={`${url}/edit`}>Edit Profile</Link>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {Info};