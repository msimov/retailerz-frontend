import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Container } from "semantic-ui-react";
import { FirebaseContext } from "../context/firebase.context";
import ProductService from "../services/product.service";

const SearchList = () => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    
    const location = useLocation();
    
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        currentUser.getIdToken().then(idToken => {
            ProductService.search(queryParams.get('text'), idToken).then(res => {
                setProducts(res);
            });
        });
    }, [currentUser, location])

    return(
        <Container>
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
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
}

export {SearchList};