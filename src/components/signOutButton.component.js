import React, { useContext } from "react";
import { Button } from "semantic-ui-react";

import { FirebaseContext } from "../context/firebase.context";


const SignOutButton = () => {
    const firebase = useContext(FirebaseContext); 

    const onClick = () => {
        firebase.doSignOut()
    }

    return(
        <Button
            type="button"
            color='teal'
            onClick={onClick}>
            Sign Out
        </Button>
    )
};

export {SignOutButton};