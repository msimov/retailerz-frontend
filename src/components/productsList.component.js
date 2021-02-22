import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";
import { Button, Card, Container, Grid, Menu } from 'semantic-ui-react';

const ProductsList = () => {
    const firebase = useContext(FirebaseContext);
    const [products, setProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(currentUser.uid, idToken).then(res => {
                setProducts(res);
            })
        })
    }, [currentUser]);

    const deleteProduct = (productId) => {
        setProducts(products.map(product => {
            if(product.productId === productId) {
                product.isDeleting = true;
            }
            return product;
        }));
        currentUser.getIdToken().then(idToken => {
            ProductService.deleteByProductId(productId, idToken).then(() => {
                setProducts(products => products.filter(product => (product.productId !== productId)));
            });
        })
    }

    return(
        <Container>
            <Grid divided="vertically">
                <Grid.Row columns={1}>
                    <Menu>
                        <Menu.Item header>Products</Menu.Item>
                        <Menu.Item 
                            as={Link} 
                            to={`/users/${currentUser.uid}/products/add`}
                        >
                            Add New Product
                        </Menu.Item>
                    </Menu>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Card.Group centered>
                        {products && products.map(product => (
                            <Card key={product.productId}>
                                <Card.Content
                                    href={`/users/${currentUser.uid}/products/${product.productId}`}
                                >
                                    <Card.Header>{product.productName}</Card.Header>
                                    <Card.Meta>{product.productRetailPrice}$</Card.Meta>
                                    <Card.Description>{product.productDescription}</Card.Description>
                                </Card.Content>
                                <Menu className='ui bottom attached' widths='2'>
                                    <Menu.Item
                                        as={Link}
                                        to={`/users/${currentUser.uid}/products/${product.productId}/edit`}
                                    >
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item 
                                        as={Button}
                                        onClick={() => deleteProduct(product.productId)} disabled={product.isDeleting}
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

export {ProductsList};