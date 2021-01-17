import React from 'react';
import { Link } from 'react-router-dom';


const SearchList = (props) => {
    
    const {products} = props;

    return(
        <div>
            <h1>Search Result</h1>
            {products && products.map(product =>
                <div key={product.id}>
                    <Link to={`users/${product.user}/products/${product.id}`}>{product.name}</Link>
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
                </div>
            )}
            {!products &&
                <div>Loading...</div>
            }
            {products && !products.length &&
                <div>No Result Were Found</div>
            }
        </div>
    );
}

export {SearchList};