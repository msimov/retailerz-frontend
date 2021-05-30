import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import {
  OperationService,
  OperationTypeService,
  ProductService,
  StoreService,
} from "../../services";

const AddEditOperationForm = ({ operationId }) => {
  const { authUser } = useContext(AuthUserContext);
  const history = useHistory();

  const isAddMode = !operationId;

  const [formData, setFormData] = useState({
    operationOperationTypeId: null,
    operationStoreId: null,
    operationProductId: null,
    operationCount: "",
  });
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [operationTypes, setOperationTypes] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createOperation() : updateOperation();
  };

  const createOperation = () => {
    OperationService.create(authUser.uid, formData, authUser.token).then(
      (res) => {
        history.push("/operations");
      }
    );
  };

  const updateOperation = (data) => {
    OperationService.updateByOperationId(
      operationId,
      formData,
      authUser.token
    ).then((res) => {
      history.push("/operations");
    });
  };

  const onClick = () => {
    history.push("/operations");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSelect = (event, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    ProductService.getAllByUserId(authUser.uid, authUser.token).then((res) => {
      setProducts(
        res.map(({ productId, productName }) => ({
          key: productId,
          value: productId,
          text: productName,
        }))
      );
    });
    StoreService.getAllByUserId(authUser.uid, authUser.token).then((res) => {
      setStores(
        res.map(({ storeId, storeName }) => ({
          key: storeId,
          value: storeId,
          text: storeName,
        }))
      );
    });
    OperationTypeService.getAll().then((res) => {
      setOperationTypes(
        res.map(({ operationTypeId, operationTypeName }) => ({
          key: operationTypeId,
          value: operationTypeId,
          text: operationTypeName,
        }))
      );
    });

    if (!isAddMode) {
      OperationService.findByOperationId(operationId, authUser.token).then(
        (res) => {
          const fields = [
            "operationOperationTypeId",
            "operationStoreId",
            "operationProductId",
            "operationCount",
          ];
          let operation = null;
          fields.forEach((field) => {
            operation = { ...operation, [field]: res[field] };
          });
          setFormData(operation);
        }
      );
    }
  }, [authUser, operationId, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Operation" : "Edit Operation"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Select
            fluid
            placeholder="Operation Type"
            name="operationOperationTypeId"
            options={operationTypes}
            onChange={onSelect}
            value={formData.operationOperationTypeId}
          />
          <Form.Select
            fluid
            placeholder="Store"
            name="operationStoreId"
            options={stores}
            onChange={onSelect}
            value={formData.operationStoreId}
          />
          <Form.Select
            fluid
            placeholder="Product"
            name="operationProductId"
            options={products}
            onChange={onSelect}
            value={formData.operationProductId}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Count"
            name="operationCount"
            onChange={onChange}
            value={formData.operationCount}
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
    </Grid.Column>
  );
};

export default AddEditOperationForm;
