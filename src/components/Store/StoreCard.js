import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Menu } from "semantic-ui-react";
import { AuthUserContext } from "../../context";
import { ReportService } from "../../services";
import { ErrorMessage } from "../Error";
import { Map } from "../Map";
import { ReportContent } from "../Report";

const StoreCard = ({ store, deleteStore, isDeleting, deleteError }) => {
  const { authUser } = useContext(AuthUserContext);
  const [totalProfit, setTotalProfit] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    ReportService.totalProfitForStore(
      authUser.uid,
      store.storeId,
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
  }, [authUser, store]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>{store.storeName}</Card.Header>
        <Card.Meta>{store.storeAddress}</Card.Meta>
        <Card.Description>
          <Map
            position={{ lat: store.storeLat, lng: store.storeLng }}
            draggable={false}
          />
        </Card.Description>
      </Card.Content>
      <ReportContent title="Total Profit" value={totalProfit} suffix="USD" />
      <Menu className="ui bottom attached" widths="3">
        <Menu.Item as={Link} to={`/stores/${store.storeId}/edit`}>
          Edit
        </Menu.Item>
        <Menu.Item as={Link} to={`/stores/${store.storeId}/products`}>
          Products
        </Menu.Item>
        <Menu.Item
          as={Button}
          onClick={() => deleteStore(store.storeId)}
          disabled={isDeleting}
        >
          Delete
        </Menu.Item>
      </Menu>
      {error && <ErrorMessage message={error} />}
      {deleteError && <ErrorMessage message={deleteError} />}
    </Card>
  );
};

export default StoreCard;
