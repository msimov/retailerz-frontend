import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductService from '../../services/product.service';
import { FirebaseContext } from '../Firebase';

const List = ({match}) => {
    const firebase = useContext(FirebaseContext);
    
    const {path} = match;
    const [products, setProducts] = useState(null);
    const currentUser = firebase.getCurrentUser();

    useEffect(() => {
        currentUser.getIdToken().then(idToken => {
            ProductService.getAll(currentUser.uid, idToken).then(res => {
                setProducts(res);
            })
        })
    }, [currentUser]);

    const deleteProduct = (productId) => {
        setProducts(products.map(product => {
            if(product.id === productId) {
                product.isDeleting = true;
            }
            return product;
        }));
        currentUser.getIdToken().then(idToken => {
            ProductService.deleteById(currentUser.uid, productId, idToken).then(() => {
                setProducts(products => products.filter(product => product.id !== productId));
            });
        })
    }

    return(
        <div>
            <h1>Products</h1>
            <Link to={`${path}/add`}>Add Product</Link>
            <table>
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Code</th>
                        <th>Barcode</th>
                        <th>Measure Unit</th>
                        <th>Tax Group</th>
                        <th>Retail Price</th>
                        <th>Delivery Price</th>
                        <th>Expiry Date</th>
                        <th>Store</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product.id}>
                            <td>{product.group}</td>
                            <td>{product.code}</td>
                            <td>{product.barcode}</td>
                            <td>{product.measureUnit}</td>
                            <td>{product.taxGroup}</td>
                            <td>{product.retailPrice}</td>
                            <td>{product.deliveryPrice}</td>
                            <td>{product.expiryDate}</td>
                            <td>{product.store}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`${path}/edit/${product.id}`}>Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} disabled={product.isDeleting}>
                                    {product.isDeleting 
                                        ? <span>Loading...</span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td>
                                <div>Loading...</div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
                        <tr>
                            <td>
                                <div>No Products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export {List};