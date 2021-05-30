import { Menu } from "semantic-ui-react";
import { TotalProfitCard } from "../../components/TotalProfit";
import { ListLayout } from "../../layouts";

const TotalProfit = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Total Profit</Menu.Item>
        </Menu>
      }
      list={<TotalProfitCard />}
    />
  );
};

export default TotalProfit;
