import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";


const PasswordChangeForm = () => {

    const firebase = useContext(FirebaseContext);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const resetState = () => {
        setPassword('');
        setConfirmPassword('');
        setError('');
    }

    const onSubmit = (event) => {
        event.preventDefault();

        firebase
            .doPasswordUpdate(password)
            .then(() => {
                resetState();
            })
            .catch((error) => {
                setError(error);
            });
    }

    const isInvalid =
        password !== confirmPassword ||
        password === '';

    return(
        <form onSubmit={onSubmit}>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="New Password"
            />
            <input
                value={ confirmPassword }
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={ isInvalid } type="submit">
                Reset Password
            </button>

            { error && <p>{ error.message }</p> }
        </form>
    );

} 

export default PasswordChangeForm;