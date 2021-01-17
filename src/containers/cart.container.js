import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withProtectedRoute from '../hoc/withProtectedRoute.hoc';
import * as CONDITIONS from '../constants/conditions.constants';
import { CartList } from '../components/cartList.component';

const Cart = ({match}) => {
    const {path} = match;
    return(
        <Switch>
            <Route path={`${path}`} component={
                withProtectedRoute([CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_NOT_NULL])(CartList)
            }/>
        </Switch>
    )
}

export default Cart;