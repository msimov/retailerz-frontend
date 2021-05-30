import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { GroupService } from "../../services";
import { ErrorMessage } from "../Error";

const AddEditGroupForm = ({ groupId }) => {
  const history = useHistory();
  const { authUser } = useContext(AuthUserContext);

  const isAddMode = !groupId;

  const [formData, setFormData] = useState({
    groupName: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createGroup() : updateGroup();
  };

  const createGroup = () => {
    GroupService.create(authUser.uid, formData, authUser.token)
      .then((res) => {
        history.push("/groups");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const updateGroup = (data) => {
    GroupService.updateByGroupId(groupId, formData, authUser.token)
      .then((res) => {
        history.push("/groups");
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
    history.push("/groups");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!isAddMode) {
      GroupService.findByGroupId(groupId, authUser.token)
        .then((res) => {
          const fields = ["groupName"];
          let group = null;
          fields.forEach((field) => {
            group = { ...group, [field]: res[field] };
          });
          setFormData(group);
        })
        .catch((err) => {
          if (typeof err.data === "string") {
            setError(err.data);
          } else {
            setError(err.data.message);
          }
        });
    }
  }, [authUser, groupId, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Group" : "Edit Group"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            name="groupName"
            onChange={onChange}
            value={formData.groupName}
          />
          <Button.Group fluid>
            <Button type="button" onClick={onClick}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive>{isAddMode ? "Add" : "Save"}</Button>
          </Button.Group>
        </Segment>
      </Form>
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default AddEditGroupForm;
