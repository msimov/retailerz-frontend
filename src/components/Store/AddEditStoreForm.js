import { LoadScript } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext, GeocodeContext } from "../../context";
import { StoreService } from "../../services";
import { ErrorMessage } from "../Error";
import { Map } from "../Map";

const AddEditStoreForm = ({ storeId }) => {
  const { authUser } = useContext(AuthUserContext);
  const geocode = useContext(GeocodeContext);
  const history = useHistory();

  const isAddMode = !storeId;

  const [formData, setFormData] = useState({
    storeName: "",
    storeAddress: "",
    storeLat: 42.698334,
    storeLng: 23.319941,
  });
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createStore() : updateStore();
  };

  const createStore = () => {
    StoreService.create(authUser.uid, formData, authUser.token)
      .then((res) => {
        history.push("/stores");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const updateStore = () => {
    StoreService.updateByStoreId(storeId, formData, authUser.token)
      .then((res) => {
        history.push("/stores");
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
    history.push("/stores");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onPositionChange = ({ lat, lng }) => {
    geocode.fromLatLng(lat, lng).then((res) => {
      setFormData({
        ...formData,
        storeAddress: res.results[0].formatted_address,
        storeLat: lat,
        storeLng: lng,
      });
    });
  };

  useEffect(() => {
    if (!isAddMode) {
      StoreService.findByStoreId(storeId, authUser.token)
        .then((res) => {
          const fields = ["storeName", "storeAddress", "storeLat", "storeLng"];
          let store = null;
          fields.forEach((field) => {
            store = { ...store, [field]: res[field] };
          });
          setFormData(store);
        })
        .catch((err) => {
          if (typeof err.data === "string") {
            setError(err.data);
          } else {
            setError(err.data.message);
          }
        });
    }
  }, [authUser, storeId, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Store" : "Edit Store"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            name="storeName"
            onChange={onChange}
            value={formData.storeName}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Address"
            name="storeAddress"
            onChange={onChange}
            value={formData.storeAddress}
          />
          <Form.Field>
            <LoadScript googleMapsApiKey={`${process.env.REACT_APP_API_KEY}`}>
              <Map
                position={{ lat: formData.storeLat, lng: formData.storeLng }}
                setPosition={onPositionChange}
              />
            </LoadScript>
          </Form.Field>
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

export default AddEditStoreForm;
