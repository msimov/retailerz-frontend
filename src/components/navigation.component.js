import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { SignOutButton } from "../components/signOutButton.component";
import AuthUserContext from "../context/authUser.context";
import { Menu } from 'semantic-ui-react'

const Navigation = () => {

    const {authUser} = useContext(AuthUserContext);

    return(authUser ? <NavigationAuth/> : <NavigationNonAuth/>)
    
};

const NavigationAuth = () => (
    <Menu>
        <Menu.Item header as={Link} to='/home'>Retailerz</Menu.Item>
        <Menu.Item position='right'>
            <SignOutButton />
        </Menu.Item>
    </Menu>
);

const NavigationNonAuth = () => (
    <Menu>
        <Menu.Item header as={Link} to='/'>Retailerz</Menu.Item>
        <Menu.Item
            as={Link}
            to='/sign-in'
            name="signIn"
        />
        <Menu.Item
            as={Link}
            to='/sign-up'
            name="signUp"
        />
    </Menu>
);

export {Navigation};