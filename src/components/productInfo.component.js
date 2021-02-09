import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";
import { AddToCartForm } from './addToCartForm.component';
import OperationService from '../services/operation.service';
import OperationTypeService from '../services/operationType.service';

const ProductInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const url = formatURL(match.url);
    const {userId} = match.params;
    const {productId} = match.params;
    const [product, setProduct] = useState(null);
    

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.findByProductId(productId, idToken).then(res => {
                setProduct(res);
            })
            OperationTypeService.getAll().then(res => {
                const visitedProductOperation = res.find(({operationTypeName}) => operationTypeName === "VISITED_PRODUCT")
                OperationService.create(
                    currentUser.uid,
                    {
                        operationProductId: productId, 
                        operationOperationTypeId: visitedProductOperation.operationTypeId
                    },
                    idToken
                )
            })
        })
    }, [currentUser, userId, productId]);


    return product ? ( 
        <div>
            {product.productId}
            {product.productBarcode}
            {product.productMeasureUnitId}
            {product.productGroupId}
            {product.productTaxGroupId}
            {product.productRetailPrice}
            {product.productDeliveryPrice}
            {product.productExpiryDate}
            {product.productName}
            {product.productDescription}
            <Link to={`${url}/edit`}>Edit</Link>
            <AddToCartForm product={product} userId={userId}/>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {ProductInfo};