import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../Firebase';
import AuthUserContext from './context';

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

export default withAuthentication;