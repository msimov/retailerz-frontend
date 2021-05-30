import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import {
  OperationService,
  OperationTypeService,
  ProductService,
  StoreProductService,
} from "../../services";
import { ErrorMessage } from "../Error";

const AddToCartForm = ({ productId }) => {
  const history = useHistory();
  const { authUser } = useContext(AuthUserContext);

  const [formData, setFormData] = useState({
    operationCount: "",
    operationStoreId: null,
  });
  const [product, setProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [addToCartOperation, setAddToCartOperation] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    OperationService.create(
      authUser.uid,
      {
        ...formData,
        operationProductId: product.productId,
        operationOperationTypeId: addToCartOperation.operationTypeId,
      },
      authUser.token
    )
      .then((res) => {
        history.push("/cart");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSelect = (event, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const onClick = () => {
    history.goBack();
  };

  useEffect(() => {
    ProductService.findByProductId(productId, authUser.token)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });

    StoreProductService.getAllByProductId(productId, authUser.token)
      .then((res) => {
        setStores(
          res.map(({ storeId, storeName }) => ({
            key: storeId,
            value: storeId,
            text: storeName,
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

    OperationTypeService.getAll().then((res) => {
      setAddToCartOperation(
        res.find(({ operationTypeName }) => operationTypeName === "ADD_TO_CART")
      );
    });
  }, [authUser, productId]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        Add To Cart
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            placeholder="Count"
            name="operationCount"
            type="number"
            onChange={onChange}
          />
          <Form.Select
            fluid
            placeholder="Store"
            name="operationStoreId"
            options={stores}
            onChange={onSelect}
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

export default AddToCartForm;
