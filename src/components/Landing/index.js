import React from "react";
import { withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';

const LandingPage = () => (
    <div>
        <h1>Landing Page</h1>
    </div>
);

export default withProtectedRoute([CONDITIONS.USER_NULL])(LandingPage);