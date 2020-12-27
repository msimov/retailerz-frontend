import React from "react";
import { withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
    </div>
);

export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA])(HomePage);