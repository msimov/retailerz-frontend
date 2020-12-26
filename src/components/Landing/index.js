import React from "react";
import { withProtectedRoute } from "../Session";
import * as ROUTES from '../../constants/routes';

const LandingPage = () => (
    <div>
        <h1>Landing Page</h1>
    </div>
);


const condition = authUser => authUser == null;

export default withProtectedRoute(condition, ROUTES.HOME)(LandingPage);