import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../../commons/url.common';
import ProductService from '../../services/product.service';
import { FirebaseContext } from '../Firebase';

const List = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    const {userId} = match.params;
    const [products, setProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAll(userId, idToken).then(res => {
                setProducts(res);
            })
        })
    }, [currentUser, userId]);

    const deleteProduct = (productId) => {
        setProducts(products.map(product => {
            if(product.id === productId) {
                product.isDeleting = true;
            }
            return product;
        }));
        currentUser.getIdToken().then(idToken => {
            ProductService.deleteById(userId, productId, idToken).then(() => {
                setProducts(products => products.filter(product => product.id !== productId));
            });
        })
    }

    return(
        <div>
            <h1>Products</h1>
            <Link to={`${url}/add`}>Add Product</Link>
            {products && products.map(product =>
                <div key={product.id}>
                    <Link to={`${url}/${product.id}`}>{product.name}</Link>
                    {product.description}
                    {product.measureUnit}
                    {product.deliveryPrice}
                    {product.retailPrice}
                    {product.group}
                    {product.code}
                    {product.barcode}
                    {product.taxGroup}
                    {product.expiryDate}
                    {product.store}
                    <Link to={`${url}/${product.id}/edit`}>Edit</Link>
                    <button onClick={() => deleteProduct(product.id)} disabled={product.isDeleting}>Delete</button>
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

export {List};