import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Grid, Menu } from 'semantic-ui-react';
import { FirebaseContext } from "../context/firebase.context";
import StoreProductService from '../services/storeProduct.service';

const StoreProductsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const {storeId} = match.params;
    const [storeProducts, setStoreProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreProductService.getAllByStoreId(storeId, idToken).then(res => {
                setStoreProducts(res);
            })
        })
    }, [currentUser, storeId]);

    const deleteStoreProduct = (storeProductProductId) => {
        setStoreProducts(storeProducts.map(storeProduct => {
            if(storeProduct.storeProductProductId === storeProductProductId) {
                storeProduct.isDeleting = true;
            }
            return storeProduct;
        }));
        currentUser.getIdToken().then(idToken => {
            StoreProductService.deleteByStoreIdAndProductId(storeId, storeProductProductId, idToken).then(() => {
                setStoreProducts(storeProducts => storeProducts.filter(storeProduct => storeProduct.storeProductProductId !== storeProductProductId));
            });
        })
    }

    return(
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Store Products</Menu.Item>
                        <Menu.Item 
                            as={Link} 
                            to={`/stores/${storeId}/store-products/add`}
                        >
                            Add Product To Store
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Card.Group centered>
                        {storeProducts && storeProducts.map(storeProduct => (
                            <Card key={storeProduct.productId}>
                                <Card.Content
                                    href={`/products/${storeProduct.productId}`}
                                >
                                    <Card.Header>{storeProduct.productName}</Card.Header>
                                    <Card.Meta>{storeProduct.productRetailPrice}$</Card.Meta>
                                    <Card.Description>{storeProduct.productDescription}</Card.Description>
                                </Card.Content>
                                <Menu className='ui bottom attached' widths='2'>
                                    <Menu.Item 
                                        as={Button}
                                        onClick={() => deleteStoreProduct(storeProduct.storeProductProductId)} disabled={storeProduct.isDeleting}
                                    >
                                        Remove From Store
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

export {StoreProductsList};