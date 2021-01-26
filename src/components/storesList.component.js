import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";

const StoresList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    
    const {userId} = match.params;
    const [stores, setStores] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.getAllByUserId(userId, idToken).then(res => {
                setStores(res);
            })
        })
    }, [currentUser, userId]);

    const deleteStore = (storeId) => {
        setStores(stores.map(store => {
            if(store.storeId === storeId) {
                store.isDeleting = true;
            }
            return store;
        }));
        currentUser.getIdToken().then(idToken => {
            StoreService.deleteByStoreId(storeId, idToken).then(() => {
                setStores(stores => stores.filter(store => store.storeId !== storeId));
            });
        })
    }

    return(
        <div>
            <h1>Stores</h1>
            <Link to={`${url}/add`}>Add Store</Link>
          
            {stores && stores.map(store =>
                <div key={store.storeId}>
                    <Link to={`${url}/${store.storeId}`}>{store.storeLocation}</Link>
                    <Link to={`${url}/${store.storeId}/edit`}>Edit</Link>
                    <button onClick={() => deleteStore(store.storeId)} disabled={store.isDeleting}>Delete</button>
                </div>
            )}
            {!stores &&
                <div>Loading...</div>
            }
            {stores && !stores.length &&
                <div>No Stores To Display</div>
            }

        </div>
    );
}

export {StoresList};