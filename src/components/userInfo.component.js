import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/user.service';
import { FirebaseContext } from "../context/firebase.context";
import { Card, Icon, Image } from 'semantic-ui-react';

const UserInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const [user, setUser] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            UserService.findByUserId(currentUser.uid, idToken).then(res => {
                console.log(res)
                setUser(res);
            })
        })
    }, [currentUser]);


    return ( 
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>{ user && (user.userFirstName + ' ' + user.userLastName)}</Card.Header>
                <Card.Meta>
                    <span>{user && currentUser.email}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/users/${currentUser.uid}/edit`}>
                    <Icon name='edit'/>
                    Edit Profile
                </Link>
            </Card.Content>
            <Card.Content extra>
                <Link to={`/users/${currentUser.uid}/change-password`}>
                    <Icon name='lock'/>
                    Change password
                </Link>
            </Card.Content>
        </Card>
    )
    
    
}

export {UserInfo};