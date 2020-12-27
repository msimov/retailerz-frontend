import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import AuthUserContext from './context';

const withProtectedRoute = (condition, route) => Component => {
    const WithProtectedRoute = (props) => {

        const firebase = useContext(FirebaseContext);
        const history = useHistory();
        
        useEffect(() => {
            const listener = firebase.auth.onAuthStateChanged(
                authUser => {
                    if(!condition(authUser)) {
                        history.push(route);
                    }
                }
            )
            
            return () => {
                listener();
            }
        }, [firebase.auth, history]);

        return (
            <AuthUserContext.Consumer>
                { authUser => condition(authUser) ? <Component { ...props } /> : <div>Loading...</div> }
            </AuthUserContext.Consumer>
        ); 
        
    }
    return WithProtectedRoute;
}

export default withProtectedRoute;