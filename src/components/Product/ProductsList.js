import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { ProductCard } from ".";
import { AuthUserContext } from "../../context";
import { ProductService } from "../../services";
import { ErrorMessage } from "../Error";

const ProductsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    ProductService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser]);

  const deleteProduct = (productId) => {
    setIsDeleting(true);
    ProductService.deleteByProductId(productId, authUser.token)
      .then(() => {
        setIsDeleting(false);
        setProducts((products) =>
          products.filter((product) => product.productId !== productId)
        );
      })
      .catch((err) => {
        setIsDeleting(false);
        if (typeof err.data === "string") {
          setDeleteError(err.data);
        } else {
          setDeleteError(err.data.message);
        }
      });
  };

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card.Group centered>
      {products &&
        products.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            deleteProduct={deleteProduct}
            isDeleting={isDeleting}
            deleteError={deleteError}
          />
        ))}
    </Card.Group>
  );
};

export default ProductsList;
