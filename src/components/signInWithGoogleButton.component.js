import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react"
import { FirebaseContext } from "../context/firebase.context";

const SignInWithGoogleButton = ({setError}) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const onClick = () => {
        firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                history.go(0)
            })
            .catch((error) => {
                setError(error);
            });
    }

    return(
        <Button
            onClick={onClick}
            color='google plus' 
            size='large'
            type='button'
        >
            <Icon name='google'/> Sign In With Google
        </Button>
    )
}

export {SignInWithGoogleButton}