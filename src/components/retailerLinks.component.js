import { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/firebase.context";

const RetailerLinks = () => {
    const firebase = useContext(FirebaseContext);
    const currentUser = firebase.getCurrentUser();
    
    return(
        <div>
            <Link to={`/users/${currentUser.uid}`}>My Profile</Link>
            <Link to={`/users/${currentUser.uid}/stores`}>My Stores</Link>
            <Link to={`/users/${currentUser.uid}/products`}>My Products</Link>
            <Link to={`/users/${currentUser.uid}/operations`}>My Operations</Link>
            <Link to={`/users/${currentUser.uid}/measure-units`}>My Measure Units</Link>
            <Link to={`/users/${currentUser.uid}/groups`}>My Groups</Link>
        </div>
    );
}


export {RetailerLinks};
