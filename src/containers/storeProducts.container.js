import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';
import { StoreProductAddForm } from '../components/storeProductAddForm.component';
import { StoreProductsList } from '../components/storeProductsList.component';

const StoreProducts = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route exact path={`${path}/add`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreProductAddForm)
            }/>

            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(StoreProductsList)
            }/>

        </Switch>
    )
}

export default StoreProducts;