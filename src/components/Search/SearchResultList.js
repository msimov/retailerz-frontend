import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ProductService } from "../../services";
import { ErrorMessage } from "../Error";
import { ProductCard } from "../Product";

const SearchResultList = () => {
  const { authUser } = useContext(AuthUserContext);
  const location = useLocation();

  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    ProductService.search(queryParams.get("text"), authUser.token)
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
  }, [authUser, location]);

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

export default SearchResultList;
