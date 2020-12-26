import React from "react";
import { withProtectedRoute } from "../Session";
import * as ROUTES from '../../constants/routes';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
    </div>
);


const condition = authUser => !!authUser;

export default withProtectedRoute(condition, ROUTES.SIGN_IN)(HomePage);