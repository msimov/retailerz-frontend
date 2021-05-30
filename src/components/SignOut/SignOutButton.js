import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { FirebaseContext } from "../../context";

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  const onClick = () => {
    firebase.doSignOut();
  };

  return <Dropdown.Item onClick={onClick}>Sign Out</Dropdown.Item>;
};

export default SignOutButton;
