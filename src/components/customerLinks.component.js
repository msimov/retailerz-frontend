import { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";

const CustomerLinks = () => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    
    return(
        <div>
            <Link to={`/users/${currentUser.uid}`}>My Profile</Link>
            <Link to={`/users/${currentUser.uid}/cart`}>My Cart</Link>
            <Link to={`/search`}>Search</Link>
        </div>
    );
}


export {CustomerLinks};
