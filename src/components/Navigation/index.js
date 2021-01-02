import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from "../Session";
import SignOutButton from '../SignOut';


const Navigation = () => {
    const {authUser} = useContext(AuthUserContext);

    return(authUser ? <NavigationAuth/> : <NavigationNonAuth/>)

};

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.CREATE_STORE}>Create Store</Link>
            </li>
            <li>
                <Link to={ROUTES.CREATE_PRODUCT}>Create Product</Link>
            </li>
            <li>
                <Link to={ROUTES.ADD_OPERATION}>Add Operation</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
    </ul>
);
export default Navigation;