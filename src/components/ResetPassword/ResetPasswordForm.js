import { useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { FirebaseContext } from "../../context";
import { ErrorMessage } from "../Error";

const ResetPasswordForm = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    firebase
      .doPasswordReset(formData.email)
      .then(() => {
        history.push("/sign-in");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const onClick = () => {
    history.push("/sign-in");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Reset Your Password
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            placeholder="E-mail address"
            name="email"
            onChange={onChange}
          />
          <Button.Group fluid>
            <Button type="button" onClick={onClick}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive>Reset password</Button>
          </Button.Group>
        </Segment>
      </Form>
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default ResetPasswordForm;
