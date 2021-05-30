import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { StoreProductsList } from "../../components/StoreProduct";
import { ListLayout } from "../../layouts";

const StoreProducts = ({ match }) => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Store Products</Menu.Item>
          <Menu.Item
            as={Link}
            to={`/stores/${match.params.storeId}/products/add`}
          >
            Add Product To Store
          </Menu.Item>
        </Menu>
      }
      list={<StoreProductsList storeId={match.params.storeId} />}
    />
  );
};

export default StoreProducts;
