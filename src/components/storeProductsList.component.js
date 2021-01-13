import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatURL } from '../commons/url.common';
import { FirebaseContext } from "../context/firebase.context";
import StoreProductService from '../services/storeProduct.service';

const StoreProductsList = ({match}) => {
    const firebase = useContext(FirebaseContext);
    const url = formatURL(match.url);
    
    const {userId, storeId} = match.params;
    const [storeProducts, setStoreProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            StoreProductService.getAllByStoreId(userId, storeId, idToken).then(res => {
                setStoreProducts(res);
            })
        })
    }, [currentUser, userId, storeId]);

    const deleteStoreProduct = (productId) => {
        setStoreProducts(storeProducts.map(storeProduct => {
            if(storeProduct.productId === productId) {
                storeProduct.isDeleting = true;
            }
            return storeProduct;
        }));
        currentUser.getIdToken().then(idToken => {
            StoreProductService.deleteByStoreIdAndProductId(userId, storeId, productId, idToken).then(() => {
                setStoreProducts(storeProducts => storeProducts.filter(storeProduct => storeProduct.productId !== productId));
            });
        })
    }

    return(
        <div>
            <h1>Store Products</h1>
            <Link to={`${url}/add`}>Add Store Product</Link>
          
            {storeProducts && storeProducts.map(storeProduct =>
                <div key={storeProduct.id}>
                    <Link to={`/users/${userId}/stores/${storeProduct.storeId}`}>{storeProduct.storeId}</Link>
                    <Link to={`/users/${userId}/products/${storeProduct.productId}`}>{storeProduct.productId}</Link>
                    <button onClick={() => deleteStoreProduct(storeProduct.productId)} disabled={storeProduct.isDeleting}>Delete</button>
                </div>
            )}
            {!storeProducts &&
                <div>Loading...</div>
            }
            {storeProducts && !storeProducts.length &&
                <div>No Store Products To Display</div>
            }

        </div>
    );
}

export {StoreProductsList};