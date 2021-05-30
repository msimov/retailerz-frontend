import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ProductService, StoreProductService } from "../../services";
import { ErrorMessage } from "../Error";

const AddStoreProductForm = ({ storeId }) => {
  const { authUser } = useContext(AuthUserContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    storeProductProductId: null,
  });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    StoreProductService.create(storeId, formData, authUser.token)
      .then((res) => {
        history.push(`/stores/${storeId}/products`);
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
    history.push(`/stores/${storeId}/products`);
  };

  const onSelect = (event, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    ProductService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setProducts(
          res.map(({ productId, productName }) => ({
            key: productId,
            value: productId,
            text: productName,
          }))
        );
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Add Product to Store
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Select
            fluid
            placeholder="Product"
            name="storeProductProductId"
            options={products}
            onChange={onSelect}
            value={formData.storeProductProductId}
          />
          <Button.Group fluid>
            <Button type="button" onClick={onClick}>
              Cancel
            </Button>
            <Button.Or />
            <Button positive>Add</Button>
          </Button.Group>
        </Segment>
      </Form>
      {error && <ErrorMessage message={error} />}
    </Grid.Column>
  );
};

export default AddStoreProductForm;
