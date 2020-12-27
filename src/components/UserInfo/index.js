import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import * as CONDITIONS from '../../constants/conditions';
import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from "../Firebase";
import { AuthUserContext, withProtectedRoute } from "../Session";


const UserInfoPage = () => (
    <div>
        <h1>User Info</h1>
        <UserInfoForm/>
    </div>
)

const UserInfoForm = () => {
    const firebase = useContext(FirebaseContext);
    const history = useHistory();
    const {authUser, setAuthUser} = useContext(AuthUserContext);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [type, setType] = useState(1)
    const [error, setError] = useState(null)

    const resetState = () => {
        setFirstName('');
        setLastName('');
        setType(1);
        setError(null);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const currentUser = firebase.getCurrentUser();
        currentUser.getIdToken().then((idToken) => {
            axios.post(
                'http://localhost:3001/users',
                {id: currentUser.uid, email: currentUser.email, firstName, lastName, type},
                {headers: {Authorization: `Bearer ${idToken}`}}
            )
            .then((res) => {
                resetState();
                setAuthUser({...authUser, data: res.data});
                history.push(ROUTES.HOME);
            })
            .catch((error) => {
                if(error.response !== undefined) {
                    setError(error.response.data);  
                } else {
                    setError(error);
                }
            })
        }).catch((error) => {
            setError(error);
        })
    }

    const isInvalid = 
        firstName === '' ||
        lastName === '' ||
        type < 1 ||
        type > 2;

    return(
        <form onSubmit={ onSubmit }>
            <input
                value={ firstName }
                onChange={ e => setFirstName(e.target.value) }
                type="text"
                placeholder="First Name"
            />
            <input
                value={ lastName }
                onChange={ e => setLastName(e.target.value) }
                type="text"
                placeholder="Last Name"
            />
            <input
                value={ type }
                onChange={ e => setType(e.target.value) }
                type="number"
                placeholder="Account Type"
            />
            <button disabled={ isInvalid } type="submit">
                Sign Up
            </button>

            {error && <p>{ error.message }</p>}
        </form>
    );
}

export default withProtectedRoute([CONDITIONS.USER_NOT_NULL, CONDITIONS.USER_DATA_UNDEFINED])(UserInfoPage);

export {UserInfoForm};