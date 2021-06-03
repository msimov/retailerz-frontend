import { useContext, useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ActivityService, ProductService } from "../../services";
import { ErrorMessage } from "../Error";
import { ProductCard } from "../Product";

const FavoriteProductsList = () => {
  const { authUser } = useContext(AuthUserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    ActivityService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        res.forEach((activity) => {
          if ((activity.activityName = "ADD_TO_FAVORITES")) {
            ProductService.findByProductId(activity.productId, authUser.token)
              .then((res) => {
                setProducts((state) => [...state, res]);
              })
              .catch((err) => {
                if (typeof err.data === "string") {
                  setError(err.data);
                } else {
                  setError(err.data.message);
                }
              });
          }
        });
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

export default FavoriteProductsList;
