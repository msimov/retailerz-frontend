import React from 'react';
import { Link } from 'react-router-dom';


const SearchList = (props) => {
    
    const {products} = props;

    return(
        <div>
            <h1>Search Result</h1>
            {products && products.map(product =>
                <div key={product.productId}>
                    <Link to={`users/${product.productUserId}/products/${product.productId}`}>{product.productName}</Link>
                    {product.productDescription}
                    {product.productMeasureUnitId}
                    {product.productDeliveryPrice}
                    {product.productRetailPrice}
                    {product.productGroupId}
                    {product.productBarcode}
                    {product.productTaxGroupId}
                    {product.productStoreId}
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