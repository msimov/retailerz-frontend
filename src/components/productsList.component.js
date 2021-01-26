import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import ProductService from '../services/product.service';
import { FirebaseContext } from "../context/firebase.context";

const ProductsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    const {userId} = match.params;
    const [products, setProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAllByUserId(userId, idToken).then(res => {
                setProducts(res);
            })
        })
    }, [currentUser, userId]);

    const deleteProduct = (productId) => {
        setProducts(products.map(product => {
            if(product.productId === productId) {
                product.isDeleting = true;
            }
            return product;
        }));
        currentUser.getIdToken().then(idToken => {
            ProductService.deleteByProductId(productId, idToken).then(() => {
                setProducts(products => products.filter(product => product.productId !== productId));
            });
        })
    }

    return(
        <div>
            <h1>Products</h1>
            <Link to={`${url}/add`}>Add Product</Link>
            {products && products.map(product =>
                <div key={product.productId}>
                    <Link to={`${url}/${product.productId}`}>{product.productName}</Link>
                    {product.productDescription}
                    {product.productMeasureUnitId}
                    {product.productDeliveryPrice}
                    {product.productRetailPrice}
                    {product.productGroupId}
                    {product.productCode}
                    {product.productBarcode}
                    {product.productTaxGroupId}
                    <Link to={`${url}/${product.productId}/edit`}>Edit</Link>
                    <button onClick={() => deleteProduct(product.productId)} disabled={product.isDeleting}>Delete</button>
                </div>
            )}
            {!products &&
                <div>Loading...</div>
            }
            {products && !products.length &&
                <div>No Products To Display</div>
            }
        </div>
    );
}

export {ProductsList};