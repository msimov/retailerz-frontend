import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {List} from './List';
import {AddEdit} from './AddEdit';

const Operations = ({match}) => {
    const {path} = match;

    return(
        <Switch>
            <Route exact path={`${path}/add`} component={AddEdit}/>
            
            <Route path={`${path}/:operationId/edit`} component={AddEdit} />

            <Route path={`${path}`} component={List}/>
        </Switch>
    )
}

export default Operations;