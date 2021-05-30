import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const ReportsDropdown = () => {
  return (
    <Dropdown item icon="chart line" simple>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/reports/total-profit">
          Total Profit
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/reports/most-searched-products">
          Most Searched Products
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ReportsDropdown;
