import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { SignOutButton } from "../components/signOutButton.component";
import AuthUserContext from "../context/authUser.context";
import { Button, Container, Menu } from 'semantic-ui-react'
import { SearchForm } from "./searchForm.component";

const Navbar = () => {

    const {authUser} = useContext(AuthUserContext);

    return(authUser ? <NavbarAuth/> : <NavbarNonAuth/>)

};

const NavbarAuth = () => (
    <Menu stackable>
        <Menu.Item header as={Link} to='/home'>Retailerz</Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item>
                <SearchForm />
            </Menu.Item>
            <Menu.Item>
                <SignOutButton />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

const NavbarNonAuth = () => (
    <Menu stackable>
            <Menu.Item header as={Link} to='/'>Retailerz</Menu.Item>
            <Menu.Menu position='right'>                
                <Menu.Item as='a'>
                    Sign In
                </Menu.Item>
                <Menu.Item as='a'>
                    Sign Up
                </Menu.Item>
            </Menu.Menu>
    </Menu>
);

export {Navbar};