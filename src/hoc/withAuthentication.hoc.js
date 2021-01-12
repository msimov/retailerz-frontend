import React, { useContext, useEffect, useState } from 'react';
import AuthUserContext from '../context/authUser.context';
import { FirebaseContext } from "../context/firebase.context";
const withAuthentication = Component => {
    const WithAuthentication = (props) => {
        

        const firebase = useContext(FirebaseContext);
        const [authUser, setAuthUser] = useState(undefined);

        useEffect(() => {
            const listener = firebase.onAuthUserListener(
                authUser => {
                    setAuthUser(authUser);
                },
                () => {
                    setAuthUser(null);
                }
            )

            return () => {
                listener();
            }
        }, [firebase])

        return (
            <AuthUserContext.Provider value={ {authUser, setAuthUser} }>
                {
                    authUser === undefined ? <div>Loading...</div> : <Component { ...props }/>
                }
            </AuthUserContext.Provider>
        );
        
    }
    return WithAuthentication;
}

export { withAuthentication };