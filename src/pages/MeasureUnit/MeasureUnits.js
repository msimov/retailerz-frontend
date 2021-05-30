import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { MeasureUnitsList } from "../../components/MeasureUnit";
import { ListLayout } from "../../layouts";

const MeasureUnits = () => {
  return (
    <ListLayout
      menu={
        <Menu>
          <Menu.Item header>Measure Units</Menu.Item>
          <Menu.Item as={Link} to={`/measure-units/add`}>
            Add New Measure Unit
          </Menu.Item>
        </Menu>
      }
      list={<MeasureUnitsList />}
    />
  );
};

export default MeasureUnits;
