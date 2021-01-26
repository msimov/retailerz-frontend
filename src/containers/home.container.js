import React, { useContext, useEffect, useState } from "react";
import { CustomerLinks } from "../components/customerLinks.component";
import { RetailerLinks } from "../components/retailerLinks.component";
import AuthUserContext from "../context/authUser.context";
import UserTypeService from "../services/userType.service";

const Home = () => {


    const [retailerType, setRetailerType] = useState(null);
    const [customerType, setCustomerType] = useState(null);

    const {authUser} = useContext(AuthUserContext);

    useEffect(() => {
        UserTypeService.getAll().then(res => {
            res.forEach(userType => {
                if(userType.userTypeName === "CUSTOMER") {
                    setCustomerType(userType.userTypeId);
                } else if(userType.userTypeName === "RETAILER") {
                    setRetailerType(userType.userTypeId)
                }
            });
        })
    }, [])
    
    return(
        <div>
            <h1>Home Page</h1>
            {
                authUser.data.userTypeId === retailerType ? <RetailerLinks /> : 
                authUser.data.userTypeId === customerType ? <CustomerLinks /> : 
                null
            }
        </div>
    )
};


export default Home;