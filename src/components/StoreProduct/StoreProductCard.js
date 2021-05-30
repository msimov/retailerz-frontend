import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Menu } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ReportService } from "../../services";
import { ErrorMessage } from "../Error";
import { ReportContent } from "../Report";

const StoreProductCard = ({
  storeProduct,
  deleteStoreProduct,
  isDeleting,
  deleteError,
}) => {
  const { authUser } = useContext(AuthUserContext);
  const [totalProfit, setTotalProfit] = useState(null);
  const [sales, setSales] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ReportService.totalProfitForProductForStore(
      authUser.uid,
      storeProduct.storeId,
      storeProduct.productId,
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

    ReportService.quantitySoldForProductForStore(
      authUser.uid,
      storeProduct.storeId,
      storeProduct.productId,
      authUser.token
    ).then((res) => {
      setSales(res.sales);
    });
  }, [authUser, storeProduct]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{storeProduct.productName}</Card.Header>
        <Card.Meta>{storeProduct.productRetailPrice}$</Card.Meta>
        <Card.Description>{storeProduct.productDescription}</Card.Description>
      </Card.Content>
      <ReportContent title="Total Profit" value={totalProfit} suffix="USD" />
      <ReportContent
        title="Solq Quantity"
        value={sales}
        suffix={storeProduct.measureUnitName}
      />
      <Menu className="ui bottom attached" widths={2}>
        <Menu.Item as={Link} to={`/products/${storeProduct.productId}/edit`}>
          Edit
        </Menu.Item>
        <Menu.Item
          as={Button}
          onClick={() => deleteStoreProduct(storeProduct.storeProductProductId)}
          disabled={isDeleting}
        >
          Remove
        </Menu.Item>
      </Menu>
      {deleteError && <ErrorMessage message={deleteError} />}
      {error && <ErrorMessage message={error} />}
    </Card>
  );
};

export default StoreProductCard;
