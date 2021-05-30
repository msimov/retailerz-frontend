import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { StoreProductCard } from ".";
import { AuthUserContext } from "../../context";
import { StoreProductService } from "../../services";
import { ErrorMessage } from "../Error";

const StoreProductsList = ({ storeId }) => {
  const { authUser } = useContext(AuthUserContext);
  const [storeProducts, setStoreProducts] = useState([]);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    StoreProductService.getAllByStoreId(storeId, authUser.token)
      .then((res) => {
        setStoreProducts(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser, storeId]);

  const deleteStoreProduct = (storeProductProductId) => {
    setIsDeleting(true);
    StoreProductService.deleteByStoreIdAndProductId(
      storeId,
      storeProductProductId,
      authUser.token
    )
      .then(() => {
        setIsDeleting(false);
        setStoreProducts((storeProducts) =>
          storeProducts.filter(
            (storeProduct) =>
              storeProduct.storeProductProductId !== storeProductProductId
          )
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
      {storeProducts &&
        storeProducts.map((storeProduct, index) => (
          <StoreProductCard
            key={index}
            storeProduct={storeProduct}
            deleteStoreProduct={deleteStoreProduct}
            deleteError={deleteError}
            isDeleting={isDeleting}
          />
        ))}
    </Card.Group>
  );
};

export default StoreProductsList;
