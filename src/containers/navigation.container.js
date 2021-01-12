import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { SignOutButton } from "../components/signOutButton.component";
import AuthUserContext from "../context/authUser.context";

const Navigation = () => {
    const {authUser} = useContext(AuthUserContext);

    return(authUser ? <NavigationAuth/> : <NavigationNonAuth/>)

};

const NavigationAuth = () => {

    return(
        <div>
            <ul>
                <li>
                    <Link to={'/home'}>Home</Link>
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
            <Link to={'/'}>Landing</Link>
        </li>
        <li>
            <Link to={'/sign-in'}>Sign In</Link>
        </li>
        <li>
            <Link to={'/sign-up'}>Sign Up</Link>
        </li>
    </ul>
);
export default Navigation;