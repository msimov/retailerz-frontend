import React, { useState, useEffect, useContext } from "react";
import { Card } from "semantic-ui-react";
import { ProductCard } from "../Product";
import { AuthUserContext } from "../../context";
import { ProductService } from "../../services";
import { ErrorMessage } from "../Error";

const RecommendedProductsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ProductService.getAllRecommendedByUserId(authUser.uid, authUser.token)
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

  return error ? (
    <ErrorMessage message={error} />
  ) : (
    <Card.Group centered>
      {products &&
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
    </Card.Group>
  );
};

export default RecommendedProductsList;
