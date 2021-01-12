import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";

const ProductInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const {productId} = match.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.findById(userId, productId, idToken).then(res => {
                setProduct(res);
            })
        })
    }, [currentUser, userId, productId]);


    return product ? ( 
        <div>
            {product.id}
            {product.location}
            {product.barcode}
            {product.code}
            {product.measureUnit}
            {product.group}
            {product.taxGroup}
            {product.retailPrice}
            {product.deliveryPrice}
            {product.expiryDate}
            {product.store}
            {product.name}
            {product.description}
            <Link to={`${url}/edit`}>Edit</Link>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {ProductInfo};