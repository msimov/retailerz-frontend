import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Card } from 'semantic-ui-react';
import Map from './map.component';

const StoresList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const currentUser = firebase.getCurrentUser();

    const [stores, setStores] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setStores(res);
            })
        })
    }, [currentUser]);

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
        <Card.Group>
            {stores && stores.map(store => (
                <Card key={store.storeId}>
                    <Card.Content>
                        <Card.Header>{store.storeName}</Card.Header>
                        <Card.Meta>{store.storeAddress}</Card.Meta>
                        <Card.Description>
                            <Map position={{lat: store.storeLat, lng: store.storeLng}} draggable={false}/>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button.Group fluid widths='2'>
                            <Button basic as={Link} to={`/users/${currentUser.uid}/stores/${store.storeId}/edit`} color='green'>
                                Edit
                            </Button>
                            <Button
                                onClick={() => deleteStore(store.storeId)} disabled={store.isDeleting}
                                basic color='red'
                             >
                                Delete
                            </Button>
                        </Button.Group>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );
}

export {StoresList};