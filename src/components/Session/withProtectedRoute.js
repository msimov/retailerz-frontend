import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

const withProtectedRoute = (condition, route) => Component => {
    class WithProtectedRoute extends React.Component {

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(route);
                    }
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => {
                        if(authUser === undefined) {
                            return <div>Loading...</div>
                        }
                        return condition(authUser) ? <Component { ...this.props } /> : <div>Loading...</div>
                    }
                    }
                </AuthUserContext.Consumer>
            ); 
        }
    }
    return compose(
        withRouter,
        withFirebase
    )(WithProtectedRoute);
}

export default withProtectedRoute;