import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StoreService from '../services/store.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Card, Container, Grid, Menu } from 'semantic-ui-react';
import Map from './map.component';

const StoresList = () => {
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
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Stores</Menu.Item>
                        <Menu.Item 
                            as={Link} 
                            to={`/users/${currentUser.uid}/stores/add`}
                        >
                            Add New Store
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Card.Group centered>
                        {stores && stores.map(store => (
                            <Card 
                                key={store.storeId}
                            >
                                <Card.Content>
                                    <Card.Header
                                        href={`/users/${currentUser.uid}/stores/${store.storeId}`}
                                    >
                                        {store.storeName}
                                    </Card.Header>
                                    <Card.Meta>{store.storeAddress}</Card.Meta>
                                    <Card.Description>
                                        <Map position={{lat: store.storeLat, lng: store.storeLng}} draggable={false}/>
                                    </Card.Description>
                                </Card.Content>
                                <Menu className='ui bottom attached' widths='2'>
                                    <Menu.Item
                                        as={Link}
                                        to={`/users/${currentUser.uid}/stores/${store.storeId}/edit`}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item 
                                        as={Button}
                                        onClick={() => deleteStore(store.storeId)} disabled={store.isDeleting}
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Row>
            </Grid>
        </Container>

    );
}

export {StoresList};