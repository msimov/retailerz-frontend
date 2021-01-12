import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthUserContext from '../context/authUser.context';
import { FirebaseContext } from "../context/firebase.context";

const withProtectedRoute = (conditions) => Component => {
    const WithProtectedRoute = (props) => {
        
        const firebase = useContext(FirebaseContext);
        const {authUser} = useContext(AuthUserContext);
        const history = useHistory();

        useEffect(() => {
            const checkConditions = (authUser) => {
                conditions.some(({condition, redirect}) => {
                    if(!condition(authUser)) {
                        history.push(redirect);
                        return true;
                    }
                    return false;
                })

            }

            const listener = firebase.onAuthUserListener(
                authUser => {
                    checkConditions(authUser);
                }, () => {
                    checkConditions(null);
                }
            )
            
            return () => {
                listener();
            }
        }, [firebase, history]);

        return conditions.every(({condition}) => condition(authUser)) ? <Component { ...props } /> : <div>Loading...</div>    
    }
    return WithProtectedRoute;
}

export default withProtectedRoute;