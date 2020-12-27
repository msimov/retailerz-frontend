import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext, withFirebase } from '../Firebase';
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
            <AuthUserContext.Provider value={ authUser }>
                {authUser === undefined ? <div>Loading...</div> :<Component { ...props }/>}
            </AuthUserContext.Provider>
        );
        
    }
    return withFirebase(WithAuthentication);
}


export default withAuthentication;