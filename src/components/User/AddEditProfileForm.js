import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { UserService, UserTypeService } from "../../services";
import { ErrorMessage } from "../Error";

const AddEditProfileForm = () => {
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const history = useHistory();
  const location = useLocation();

  const isAddMode = location.pathname === "/profile/add";
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userUserTypeId: null,
  });
  const [error, setError] = useState(null);
  const [userTypes, setUserTypes] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createUser() : updateUser();
  };

  const createUser = () => {
    UserService.create(authUser.uid, formData, authUser.token)
      .then((res) => {
        setAuthUser({
          ...authUser,
          data: res,
        });
        history.push("/profile");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const updateUser = () => {
    UserService.updateByUserId(authUser.uid, formData, authUser.token)
      .then((res) => {
        history.push("/profile");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const onClick = () => {
    history.push("/profile");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSelect = (event, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    UserTypeService.getAll().then((res) => {
      setUserTypes(
        res.map(({ userTypeId, userTypeName }) => ({
          key: userTypeId,
          value: userTypeId,
          text: userTypeName,
        }))
      );
    });

    if (!isAddMode) {
      UserService.findByUserId(authUser.uid, authUser.token).then((res) => {
        const fields = ["userFirstName", "userLastName", "userUserTypeId"];
        let userInfo = null;
        fields.forEach((field) => {
          userInfo = { ...userInfo, [field]: res[field] };
        });
        setFormData(userInfo);
      });
    }
  }, [authUser, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Profile Information" : "Edit Profile Information"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="First Name"
            name="userFirstName"
            onChange={onChange}
            value={formData.userFirstName}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Last Name"
            name="userLastName"
            onChange={onChange}
            value={formData.userLastName}
          />
          {isAddMode ? (
            <Form.Select
              fluid
              placeholder="Account Type"
              name="userUserTypeId"
              options={userTypes}
              onChange={onSelect}
              value={formData.userUserTypeId}
            />
          ) : null}
          {isAddMode ? (
            <Button positive fluid>
              Add
            </Button>
          ) : (
            <Button.Group fluid>
              <Button type="button" onClick={onClick}>
                Cancel
              </Button>
              <Button.Or />
              <Button positive>Save</Button>
            </Button.Group>
          )}
        </Segment>
      </Form>
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default AddEditProfileForm;
