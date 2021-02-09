import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";

const RecommendedProductsList = () => {
    const firebase = useContext(FirebaseContext);
    const [products, setProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllRecommendedByUserId(currentUser.uid, idToken).then(res => {
                setProducts(res);
            })
        })
    }, [currentUser]);

    return(
        <div>
            <h1>Recommended</h1>
            {products && products.map(product =>
                <div key={product.productId}>
                    <Link to={`users/${product.productUserId}/products/${product.productId}`}>{product.productName}</Link>
                </div>
            )}
            {!products &&
                <div>Loading...</div>
            }
            {products && !products.length &&
                <div>No Recommended products To Display</div>
            }
        </div>
    );
}

export {RecommendedProductsList};