import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';
import { UserInfoForm } from "../UserInfo";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";

const CreateWarehousePage = () => (
    <div>
        <h1>Create Warehouse</h1>
        <CreateWarehouseForm/>
    </div>
)


const CreateWarehouseForm = () => {
    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const resetState = () => {
        setLocation('');
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const currentUser = firebase.getCurrentUser();
        currentUser.getIdToken().then((idToken) => {
            axios.post(
                `http://localhost:3001/users/${currentUser.uid}/warehouses`,
                {location},
                {headers: {Authorization: `Bearer ${idToken}`}}
            ).then(res => {
                resetState();
                history.push(ROUTES.HOME);
            }).catch(error => {
                if(error.response !== undefined) {
                    setError(error.response.data);  
                } else {
                    setError(error);
                }
            })
        }).catch(error => {
            setError(error);
        })
    }

    const isInvalid = 
        location === '';

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ location }
                onChange={ e => setLocation(e.target.value) }
                type="text"
                placeholder="Warehouse Location"
            />
            <button disabled={ isInvalid } type="submit">
                Create Warehouse
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
    
}

export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(CreateWarehousePage)

export {UserInfoForm};