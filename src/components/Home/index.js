import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { Link } from "react-router-dom";

const HomePage = () => (
    <RetailerHomePage/>
);

const RetailerHomePage = () => {
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

export {RetailerHomePage};

export default HomePage;