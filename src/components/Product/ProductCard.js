import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Menu } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import {
  ActivityService,
  ActivityTypeService,
  ReportService,
} from "../../services";
import { ErrorMessage } from "../Error";
import { ReportContent } from "../Report";

const ProductCard = ({
  product,
  deleteProduct,
  isDeleting,
  deleteError,
  error,
}) => {
  const { authUser } = useContext(AuthUserContext);

  return authUser.uid === product.productUserId ? (
    <OwnerProductCard
      product={product}
      deleteProduct={deleteProduct}
      isDeleting={isDeleting}
      deleteError={deleteError}
    />
  ) : (
    <NonOwnerProductCard product={product} error={error} />
  );
};

const OwnerProductCard = ({
  product,
  deleteProduct,
  isDeleting,
  deleteError,
}) => {
  const { authUser } = useContext(AuthUserContext);

  const [totalProfit, setTotalProfit] = useState(null);
  const [sales, setSales] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ReportService.totalProfitForProduct(
      authUser.uid,
      product.productId,
      authUser.token
    )
      .then((res) => {
        setTotalProfit(res.totalProfit);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });

    ReportService.quantitySoldForProduct(
      authUser.uid,
      product.productId,
      authUser.token
    )
      .then((res) => {
        setSales(res.sales);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser, product]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{product.productName}</Card.Header>
        <Card.Meta>{product.productRetailPrice}$</Card.Meta>
        <Card.Description>{product.productDescription}</Card.Description>
      </Card.Content>
      <ReportContent title="Total Profit" value={totalProfit} suffix="USD" />
      <ReportContent
        title="Sold Quantity"
        value={sales}
        fixed={false}
        suffix={product.measureUnitName}
      />
      {product.searchCount && (
        <ReportContent
          title="Search Count"
          value={product.searchCount}
          fixed={false}
          suffix="Searches"
        />
      )}
      <Menu className="ui bottom attached" widths={deleteProduct ? 2 : 1}>
        <Menu.Item as={Link} to={`/products/${product.productId}/edit`}>
          Edit
        </Menu.Item>
        {deleteProduct && (
          <Menu.Item
            as={Button}
            onClick={() => deleteProduct(product.productId)}
            disabled={isDeleting}
          >
            Delete
          </Menu.Item>
        )}
      </Menu>
      {error && <ErrorMessage message={error} />}
      {deleteError && <ErrorMessage message={deleteError} />}
    </Card>
  );
};

const NonOwnerProductCard = ({ product }) => {
  const { authUser } = useContext(AuthUserContext);
  const [error, setError] = useState(null);
  const [addToFavoritesActivity, setAddToFavoritesActivity] = useState(null);
  const [favoriteProductActivity, setFavoriteProductActivity] = useState(null);

  useEffect(() => {
    ActivityTypeService.getAll()
      .then((res) => {
        setAddToFavoritesActivity(
          res.find(
            ({ activityTypeName }) => activityTypeName === "ADD_TO_FAVORITES"
          )
        );
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
    ActivityService.getAllByUserId(authUser.uid, authUser.token)
      .then((res) => {
        const foundFavoriteActivity = res.find(
          (activity) =>
            (activity.activityTypeName === "ADD_TO_FAVORITES") &
            (activity.productId === product.productId)
        );

        if (foundFavoriteActivity === undefined) {
          setFavoriteProductActivity(null);
        } else {
          setFavoriteProductActivity(foundFavoriteActivity);
        }
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  }, [authUser, product]);

  const addToFavorites = () => {
    ActivityService.create(
      authUser.uid,
      {
        activityActivityTypeId: addToFavoritesActivity.activityTypeId,
        activityProductId: product.productId,
      },
      authUser.token
    )
      .then((res) => {
        setFavoriteProductActivity(res);
      })
      .catch((err) => {
        if (typeof err.data === "string") {
          setError(err.data);
        } else {
          setError(err.data.message);
        }
      });
  };

  const removeFromFavorites = () => {
    ActivityService.deleteByActivityId(
      favoriteProductActivity.activityId,
      authUser.token
    )
      .then((res) => {
        setFavoriteProductActivity(null);
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
    if (favoriteProductActivity === null) {
      addToFavorites();
    } else {
      removeFromFavorites();
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>{product.productName}</Card.Header>
        <Card.Meta>{product.productRetailPrice}$</Card.Meta>
        <Card.Description>{product.productDescription}</Card.Description>
      </Card.Content>
      {authUser && authUser.data.userTypeId === 1 && (
        <Menu className="ui bottom attached" widths="2">
          <Menu.Item
            as={Link}
            to={`/products/${product.productId}/add-to-cart`}
          >
            Add To Cart
          </Menu.Item>
          <Menu.Item as={Button} onClick={onClick}>
            {favoriteProductActivity
              ? "Remove From Favorites"
              : "Add To Favorites"}
          </Menu.Item>
        </Menu>
      )}
      {error && <ErrorMessage message={error} />}
    </Card>
  );
};

export default ProductCard;
