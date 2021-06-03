import { Menu } from "semantic-ui-react";
import { FavoriteProductsList } from "../../components/Favorite";
import { ListLayout } from "../../layouts";

const FavoriteProducts = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Favorite Products</Menu.Item>
        </Menu>
      }
      list={<FavoriteProductsList />}
    />
  );
};

export default FavoriteProducts;
