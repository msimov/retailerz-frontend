import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withProtectedRoute } from "../Session";
import * as CONDITIONS from '../../constants/conditions';
import { UserInfoForm } from "../UserInfo";
import * as ROUTES from "../../constants/routes";
import { FirebaseContext } from "../Firebase";
import Select from 'react-select';

const CreateStorePage = () => (
    <div>
        <h1>Create Store</h1>
        <CreateStoreForm/>
    </div>
)


const CreateStoreForm = () => {

    const history = useHistory();
    const firebase = useContext(FirebaseContext);

    const [location, setLocation] = useState('');
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [error, setError] = useState(null);

    const [warehouses, setWarehouses] = useState([])


    useEffect(() => {
        const currentUser = firebase.getCurrentUser();

        currentUser.getIdToken().then(idToken => {
            axios.get(`http://localhost:3001/users/${currentUser.uid}/warehouses`).then(res => {
                setWarehouses(res.data.map(({id, location}) => ({value: id, label: location})))
            })
        })
    }, [firebase])

    const resetState = () => {
        setLocation('');
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const currentUser = firebase.getCurrentUser();

        currentUser.getIdToken().then(idToken => {
            axios.post(
                `http://localhost:3001/users/${currentUser.uid}/stores`, 
                {location, warehouse: selectedWarehouse.value},
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
        })
    }

    const isInvalid = 
        location === '' ||
        selectedWarehouse === null;

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ location }
                onChange={ e => setLocation(e.target.value) }
                type="text"
                placeholder="Store Location"
            />
            <Select 
                value={selectedWarehouse}
                onChange={(selectedWarehouse)  => setSelectedWarehouse(selectedWarehouse)}
                options={warehouses}
            />
            <button disabled={ isInvalid } type="submit">
                Create Store
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
    
}

export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_HAS_DATA, CONDITIONS.USER_TYPE_RETAILER])(CreateStorePage)

export {UserInfoForm};