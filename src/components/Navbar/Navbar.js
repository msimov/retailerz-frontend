import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import {
  NavigationDropdown,
  ProfileDropdown,
  ReportsDropdown,
} from "./Dropdown";
import { SearchMenu } from "./Menu";

const Navbar = () => {
  const { authUser } = useContext(AuthUserContext);
  return (
    <Menu stackable>
      <Menu.Item>Retailerz</Menu.Item>
      {authUser ? (
        authUser.data ? (
          authUser.data.userUserTypeId === 2 ? (
            <>
              <NavigationDropdown />
              <ReportsDropdown />
              <ProfileDropdown />
            </>
          ) : (
            <ProfileDropdown />
          )
        ) : null
      ) : (
        <>
          <Menu.Item as={Link} to="/sign-in">
            Sign In
          </Menu.Item>{" "}
          <Menu.Item as={Link} to="/sign-up">
            Sign Up
          </Menu.Item>
        </>
      )}
      {authUser && authUser.data && <SearchMenu />}
    </Menu>
  );
};

export default Navbar;
