import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import { FirebaseContext } from '../Firebase';

const Info = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const {url} = match;
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
            <h1>{user.firstName + " " + user.lastName}</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.type}</td>
                        <td>
                            <Link to={`${url}/edit`}>Edit</Link>
                        </td>
                    </tr>

                    {!user &&
                        <tr>
                            <td>
                                <div>Loading...</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {Info};