import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "../Session";
import SignOutButton from '../SignOut';


const Navigation = () => {
    const {authUser} = useContext(AuthUserContext);

    return(authUser ? <NavigationAuth/> : <NavigationNonAuth/>)

};

const NavigationAuth = () => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();

    return(
        <div>
            <ul>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.OPERATIONS}>Operations</Link>
                </li>
                <li>
                    <Link to={ROUTES.PRODUCTS}>Products</Link>
                </li>
                <li>
                    <Link to={`/${ROUTES.USERS}/${currentUser.uid}`}>User</Link>
                <li>
                    <Link to={`/${ROUTES.USERS}/${currentUser.uid}/${ROUTES.STORES}`}>Stores</Link>
                </li>
                </li>
                <li>
                    <SignOutButton/>
                </li>
            </ul>
        </div>
    )
};

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