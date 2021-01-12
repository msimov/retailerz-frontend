import React, { useContext } from "react";

import { FirebaseContext } from "../context/firebase.context";


const SignOutButton = () => {
    const firebase = useContext(FirebaseContext); 
    return(
        <button type="button" onClick={ firebase.doSignOut }>
            Sign Out
        </button>
    )
};

export {SignOutButton};