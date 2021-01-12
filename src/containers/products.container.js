import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductAddEditForm } from '../components/productAddEditForm.component';
import { ProductInfo } from '../components/productInfo.component';
import { ProductsList } from '../components/productsList.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';

const Products = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(ProductAddEditForm)
            }/>

            <Route path={`${path}/:productId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(ProductAddEditForm)
            } />

            <Route path={`${path}/:productId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(ProductInfo)
            }/>

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(ProductsList)
            }/>
        </Switch>
    )
}

export default Products;