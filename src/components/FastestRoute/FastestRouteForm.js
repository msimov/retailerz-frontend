import { LoadScript } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { AuthUserContext, GeocodeContext } from "../../context";
import {
  OperationService,
  OperationTypeService,
  RouteXLService,
} from "../../services";
import { ErrorMessage } from "../Error";
import Map from "../Map/Map";

const FastestRouteForm = () => {
  const { authUser } = useContext(AuthUserContext);
  const history = useHistory();
  const geocode = useContext(GeocodeContext);

  const [route, setRoute] = useState(null);
  const [locations, setLocations] = useState(null);
  const [formData, setFormData] = useState({
    homeAddress: "Sofia",
    homeLat: 42.698334,
    homeLng: 23.319941,
  });
  const [isEnabled, setIsEnabled] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    OperationTypeService.getAll().then((res) => {
      const addToCartOperation = res.find(
        ({ operationTypeName }) => operationTypeName === "ADD_TO_CART"
      );
      OperationService.getAllByUserIdAndOperationTypeId(
        authUser.uid,
        addToCartOperation.operationTypeId,
        authUser.token
      )
        .then((res) => {
          let locations = res.map((operation) => {
            return {
              address: operation.storeAddress,
              lat: operation.storeLat,
              lng: operation.storeLng,
            };
          });
          setLocations(locations);
        })
        .catch((err) => {
          if (typeof err.data === "string") {
            setError(err.data);
          } else {
            setError(err.data.message);
          }
        });
    });
  }, [authUser]);

  const onSubmit = (event) => {
    event.preventDefault();

    setIsEnabled(false);

    const startEndLocation = {
      address: formData.homeAddress,
      lat: formData.homeLat,
      lng: formData.homeLng,
    };

    let finalLocations = [
      {
        ...startEndLocation,
      },
      ...locations,
      {
        ...startEndLocation,
      },
    ];

    RouteXLService.generateRoute(finalLocations)
      .then((res) => {
        setIsEnabled(true);
        setRoute(
          Object.entries(res.route).map((route) => ({ [route[0]]: route[1] }))
        );
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
    history.push("/cart");
  };

  const onPositionChange = ({ lat, lng }) => {
    geocode.fromLatLng(lat, lng).then((res) => {
      setFormData({
        ...formData,
        homeAddress: res.results[0].formatted_address,
        homeLat: lat,
        homeLng: lng,
      });
    });
  };

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Fastest Route
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Field>
            <LoadScript googleMapsApiKey={`${process.env.REACT_APP_API_KEY}`}>
              <Map
                position={{ lat: formData.homeLat, lng: formData.homeLng }}
                setPosition={onPositionChange}
              />
            </LoadScript>
          </Form.Field>
          <Button.Group fluid>
            <Button type="button" onClick={onClick}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive disabled={!isEnabled}>
              Generate
            </Button>
          </Button.Group>
        </Segment>
      </Form>
      {route && (
        <Message>
          {route.map((currentRoute, index) => {
            return (
              <p key={index}>{index + 1 + ". " + currentRoute[index].name}</p>
            );
          })}
        </Message>
      )}
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default FastestRouteForm;
