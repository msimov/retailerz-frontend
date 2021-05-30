import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { MeasureUnitService } from "../../services";
import { ErrorMessage } from "../Error";

const AddEditMeasureUnitForm = ({ measureUnitId }) => {
  const { authUser } = useContext(AuthUserContext);
  const history = useHistory();

  const isAddMode = !measureUnitId;

  const [formData, setFormData] = useState({
    measureUnitName: "",
  });
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createMeasureUnit() : updateMeasureUnit();
  };

  const createMeasureUnit = () => {
    MeasureUnitService.create(authUser.uid, formData, authUser.token)
      .then((res) => {
        history.push("/measure-units");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const updateMeasureUnit = () => {
    MeasureUnitService.updateByMeasureUnitId(
      measureUnitId,
      formData,
      authUser.token
    )
      .then((res) => {
        history.push("/measure-units");
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
    history.push("/measure-units");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (!isAddMode) {
      MeasureUnitService.findByMeasureUnitId(measureUnitId, authUser.token)
        .then((res) => {
          const fields = ["measureUnitName"];
          let measureUnit = null;
          fields.forEach((field) => {
            measureUnit = { ...measureUnit, [field]: res[field] };
          });
          setFormData(measureUnit);
        })
        .catch((err) => {
          if (typeof err.data === "string") {
            setError(err.data);
          } else {
            setError(err.data.message);
          }
        });
    }
  }, [authUser, measureUnitId, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Measure Unit" : "Edit Measure Unit"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            name="measureUnitName"
            onChange={onChange}
            value={formData.measureUnitName}
          />
          <Button.Group fluid>
            <Button type="button" onClick={onClick}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive>{isAddMode ? "Add" : "Edit"}</Button>
          </Button.Group>
        </Segment>
      </Form>
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default AddEditMeasureUnitForm;
