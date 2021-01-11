import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../../commons/url.common';
import StoreService from '../../services/store.service';
import { FirebaseContext } from '../Firebase';

const Info = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const {storeId} = match.params;
    const [store, setStore] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.findById(userId, storeId, idToken).then(res => {
                setStore(res);
            })
        })
    }, [currentUser, userId, storeId]);


    return store ? ( 
        <div>
            {store.id}
            {store.location}
            {store.location}
            <Link to={`${url}/edit`}>Edit Store</Link>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {Info};