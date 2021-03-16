import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";
import { AddToCartForm } from './addToCartForm.component';
import ActivityTypeService from '../services/activityType.service';
import ActivityService from '../services/activity.service';

const ProductInfo = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    const {productId} = match.params;
    const [product, setProduct] = useState(null);
    

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.findByProductId(productId, idToken).then(res => {
                setProduct(res);
            })
            ActivityTypeService.getAll().then(res => {
                const visitedProductActivity = res.find(({activityTypeName}) => activityTypeName === "VISITED_PRODUCT")
                ActivityService.create(
                    currentUser.uid,
                    {
                        activityProductId: productId,
                        activityActivityTypeId: visitedProductActivity.activityTypeId
                    },
                    idToken
                )
            })
        })
    }, [currentUser, productId]);


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
            <Link to={`/products/${product.productId}/edit`}>Edit</Link>
            <AddToCartForm product={product}/>
        </div>
    )
    : (
        <div>Loading...</div>
    )
    
    
}

export {ProductInfo};