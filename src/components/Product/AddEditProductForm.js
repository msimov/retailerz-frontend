import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import {
  GroupService,
  MeasureUnitService,
  ProductService,
  TaxGroupService,
} from "../../services";
import { ErrorMessage } from "../Error";

const AddEditProductForm = ({ productId }) => {
  const history = useHistory();
  const { authUser } = useContext(AuthUserContext);
  const isAddMode = !productId;

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productGroupId: null,
    productBarcode: "",
    productMeasureUnitId: null,
    productTaxGroupId: null,
    productRetailPrice: "",
    productDeliveryPrice: "",
  });
  const [groups, setGroups] = useState([]);
  const [measureUnits, setMeasureUnits] = useState([]);
  const [taxGroups, setTaxGroups] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    return isAddMode ? createProduct() : updateProduct();
  };

  const createProduct = () => {
    ProductService.create(authUser.uid, formData, authUser.token)
      .then((res) => {
        history.push("/products");
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const updateProduct = (data) => {
    ProductService.updateByProductId(productId, formData, authUser.token)
      .then((res) => {
        history.push("/products");
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
    history.push("/products");
  };

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSelect = (event, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    GroupService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setGroups(
          res.map(({ groupId, groupName }) => ({
            key: groupId,
            value: groupId,
            text: groupName,
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

    MeasureUnitService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setMeasureUnits(
          res.map(({ measureUnitId, measureUnitName }) => ({
            key: measureUnitId,
            value: measureUnitId,
            text: measureUnitName,
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

    if (!isAddMode) {
      ProductService.findByProductId(productId, authUser.token)
        .then((res) => {
          const fields = [
            "productName",
            "productDescription",
            "productGroupId",
            "productBarcode",
            "productMeasureUnitId",
            "productTaxGroupId",
            "productRetailPrice",
            "productDeliveryPrice",
          ];
          let product = null;
          fields.forEach((field) => {
            product = { ...product, [field]: res[field] };
          });
          setFormData(product);
        })
        .catch((err) => {
          if (typeof err.data === "string") {
            setError(err.data);
          } else {
            setError(err.data.message);
          }
        });
    }
    TaxGroupService.getAll()
      .then((res) => {
        setTaxGroups(
          res.map(({ taxGroupId, taxGroupPercentage }) => ({
            key: taxGroupId,
            value: taxGroupId,
            text: taxGroupPercentage + "%",
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
  }, [authUser, productId, isAddMode]);

  return (
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        {isAddMode ? "Add Product" : "Edit Product"}
      </Header>
      <Form size="large" onSubmit={onSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Name"
            name="productName"
            onChange={onChange}
            value={formData.productName}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Description"
            name="productDescription"
            onChange={onChange}
            value={formData.productDescription}
          />
          <Form.Select
            fluid
            placeholder="Group"
            name="productGroupId"
            options={groups}
            onChange={onSelect}
            value={formData.productGroupId}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Barcode"
            name="productBarcode"
            onChange={onChange}
            value={formData.productBarcode}
          />
          <Form.Select
            fluid
            placeholder="Measure Unit"
            name="productMeasureUnitId"
            options={measureUnits}
            onChange={onSelect}
            onC
            value={formData.productMeasureUnitId}
          />
          <Form.Select
            fluid
            placeholder="Tax Group"
            name="productTaxGroupId"
            options={taxGroups}
            onChange={onSelect}
            value={formData.productTaxGroupId}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Retail Price"
            name="productRetailPrice"
            onChange={onChange}
            value={formData.productRetailPrice}
          />
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Delivery Price"
            name="productDeliveryPrice"
            onChange={onChange}
            value={formData.productDeliveryPrice}
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

export default AddEditProductForm;
