import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { FirebaseContext } from "../../context";

const SignInWithGoogleButton = ({ setError }) => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const onClick = () => {
    firebase
      .doSignInWithGoogle()
      .then((socialAuthUser) => {
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          history.push("/profile/add");
        } else {
          history.push("/profile");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Button onClick={onClick} color="google plus" size="large" type="button">
      <Icon name="google" /> Sign In With Google
    </Button>
  );
};

export default SignInWithGoogleButton;
