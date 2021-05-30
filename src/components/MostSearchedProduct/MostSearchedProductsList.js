import { useContext, useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ReportService } from "../../services";
import { ErrorMessage } from "../Error";
import { ProductCard } from "../Product";

const MostSearchedProductsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ReportService.mostSearchedProducts(authUser.uid, authUser.token)
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

export default MostSearchedProductsList;
