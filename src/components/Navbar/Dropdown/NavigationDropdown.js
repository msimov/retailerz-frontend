import { Link } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";

const NavigationDropdown = () => {
  return (
    <Dropdown item icon="grid layout" simple text="Menu">
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/inventory">
          Inventory
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/groups">
          Groups
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/measure-units">
          Measure Units
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/operations">
          Operations
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/products">
          Products
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/stores">
          Stores
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavigationDropdown;
