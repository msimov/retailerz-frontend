import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { StoreAddEditForm } from '../components/storeAddEditForm.component';
import { StoreInfo } from '../components/storeInfo.component';
import { StoresList } from '../components/storesList.component';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';
import StoreProducts from './storeProducts.container';

const Stores = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreAddEditForm)
            }/>
            

            <Route path={`${path}/:storeId/edit`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreAddEditForm)
            } />

            <Route path={`${path}/:storeId/store-products`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreProducts)
            } />

            <Route path={`${path}/:storeId`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreInfo)
            }/>

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoresList)
            }/>

        </Switch>
    )
}

export default Stores;